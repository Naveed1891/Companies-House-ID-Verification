import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify OTP",
  robots: { index: false, follow: false },
};

export default function VerifyOtpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
