/**
 * A customer may complete their application once payment has at least been
 * submitted. For bank transfers that means a payment proof has been uploaded
 * (paymentStatus PENDING); it becomes PAID once staff confirm the transfer.
 * Both states unlock the application; the portal still shows the real payment
 * status so the customer knows confirmation is pending.
 */
export function isPaymentSubmitted(paymentStatus: string): boolean {
  return paymentStatus === "PAID" || paymentStatus === "PENDING";
}
