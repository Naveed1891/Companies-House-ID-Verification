import Stripe from "stripe";
import { resolveStripe } from "@/lib/server/settings";

/**
 * Stripe client resolved from CEO-managed settings (falling back to .env).
 * Async because the secret key may live in the database.
 */
export async function getStripeClient(): Promise<Stripe> {
  const { secretKey } = await resolveStripe();
  if (!secretKey) throw new Error("Stripe is not configured.");
  return new Stripe(secretKey);
}

export async function getWebhookSecret(): Promise<string> {
  const { webhookSecret } = await resolveStripe();
  if (!webhookSecret) throw new Error("Stripe webhook secret is not configured.");
  return webhookSecret;
}

export async function isStripeReady(): Promise<boolean> {
  return (await resolveStripe()).configured;
}
