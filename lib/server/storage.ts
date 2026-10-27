import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getPrivateUploadDir } from "@/lib/env";
import { resolveS3, resolveStorageDriver } from "@/lib/server/settings";

/**
 * Private document storage.
 *
 * Callers must perform the ownership/role check before requesting a URL - this
 * module deliberately knows nothing about who is asking.
 */

export type StoredObject = { storageKey: string };

function safeSegment(value: string): string {
  return value.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

export function buildStorageKey(orderId: string, kind: string, fileName: string): string {
  const ext = path.extname(fileName).slice(0, 12);
  return `orders/${safeSegment(orderId)}/${safeSegment(kind)}/${randomUUID()}${safeSegment(ext)}`;
}

async function s3Client() {
  const { S3Client } = await import("@aws-sdk/client-s3");
  const config = await resolveS3();
  if (!config.bucket || !config.accessKeyId || !config.secretAccessKey) {
    throw new Error("S3 storage is not fully configured.");
  }
  return {
    client: new S3Client({
      region: config.region,
      endpoint: config.endpoint,
      forcePathStyle: config.forcePathStyle,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    }),
    bucket: config.bucket,
  };
}

export async function putObject(
  storageKey: string,
  body: Buffer,
  contentType: string,
): Promise<StoredObject> {
  if ((await resolveStorageDriver()) === "s3") {
    const { PutObjectCommand } = await import("@aws-sdk/client-s3");
    const { client, bucket } = await s3Client();
    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: storageKey,
        Body: body,
        ContentType: contentType,
      }),
    );
    return { storageKey };
  }

  const target = path.join(getPrivateUploadDir(), storageKey);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, body);
  return { storageKey };
}

/**
 * A short-lived URL for S3, or an app-served path locally. The local path is
 * still gated by the download route's ownership check.
 */
export async function getDownloadUrl(storageKey: string, expiresInSeconds = 300): Promise<string> {
  if ((await resolveStorageDriver()) === "s3") {
    const { GetObjectCommand } = await import("@aws-sdk/client-s3");
    const { getSignedUrl } = await import("@aws-sdk/s3-request-presigner");
    const { client, bucket } = await s3Client();
    return getSignedUrl(client, new GetObjectCommand({ Bucket: bucket, Key: storageKey }), {
      expiresIn: expiresInSeconds,
    });
  }
  return `/api/documents/raw?key=${encodeURIComponent(storageKey)}`;
}

/** Local-driver read used by the download route after authorisation. */
export async function readLocalObject(storageKey: string): Promise<Buffer> {
  const base = path.resolve(getPrivateUploadDir());
  const target = path.resolve(base, storageKey);
  // Refuse anything that escapes the upload directory.
  if (!target.startsWith(base + path.sep)) {
    throw new Error("FORBIDDEN");
  }
  return readFile(target);
}
