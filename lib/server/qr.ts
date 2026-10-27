import QRCode from "qrcode";

/** Render `text` as a PNG data URL suitable for an <img src>. */
export async function qrDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    width: 240,
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#0B0C0C", light: "#ffffff" },
  });
}
