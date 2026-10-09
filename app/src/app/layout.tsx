import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { StoreProvider } from "@/components/store";
import { Shell } from "@/components/Shell";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "CareerPilot · demo",
  description: "Know whether you fit the job, and why. Clickable demo with illustrative data.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Shell>{children}</Shell>
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  );
}
