import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { StoreProvider } from "@/components/store";
import { Shell } from "@/components/Shell";

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
      </body>
    </html>
  );
}
