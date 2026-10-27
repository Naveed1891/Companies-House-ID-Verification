import type { Prisma, PrismaClient } from "@prisma/client";

type TxClient = Prisma.TransactionClient | PrismaClient;

const ORDER_SEQ_KEY = "order_seq";
const ORDER_SEQ_START = 10000;

function pad2(value: number): string {
  return value < 10 ? `0${value}` : String(value);
}

/** Customer-facing order reference, e.g. DK-092026-10001. */
export function formatOrderReference(sequenceNo: number, when: Date = new Date()): string {
  const mm = pad2(when.getUTCMonth() + 1);
  const yyyy = when.getUTCFullYear();
  return `DK-${mm}${yyyy}-${sequenceNo}`;
}

/**
 * Atomically reserve the next global order sequence number (>= 10000).
 * The INSERT ... ON DUPLICATE KEY UPDATE increments under a row lock, so
 * concurrent checkouts always receive distinct numbers. Must run inside a
 * transaction so the follow-up SELECT reads this transaction's own increment.
 */
export async function nextOrderSequence(tx: TxClient): Promise<number> {
  await tx.$executeRaw`
    INSERT INTO \`Counter\` (\`key\`, \`value\`, \`updatedAt\`)
    VALUES (${ORDER_SEQ_KEY}, ${ORDER_SEQ_START}, NOW(3))
    ON DUPLICATE KEY UPDATE \`value\` = \`value\` + 1, \`updatedAt\` = NOW(3)
  `;
  const rows = await tx.$queryRaw<Array<{ value: bigint | number }>>`
    SELECT \`value\` FROM \`Counter\` WHERE \`key\` = ${ORDER_SEQ_KEY}
  `;
  return Number(rows[0].value);
}
