"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Logo, Reticle } from "./Logo";
import { useStore } from "./store";
import { Button } from "./ui";

const NAV = [
  { href: "/jobs", label: "Jobs" },
  { href: "/saved", label: "Saved" },
  { href: "/applications", label: "Applications" },
  { href: "/profile", label: "Profile" },
];

export function Shell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const onboarding = path === "/" || path.startsWith("/onboarding");
  const { credits, daily, setWalletOpen } = useStore();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-4 px-6 py-4 lg:gap-6">
          <Link href={onboarding ? "/" : "/dashboard"} className="mr-2">
            <Logo />
          </Link>
          {!onboarding && (
            <nav className="order-3 flex w-full gap-2 overflow-x-auto lg:order-none lg:w-auto lg:gap-4">
              {NAV.map((n) => {
                const active = path.startsWith(n.href);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-12 min-w-28 items-center rounded-lg border px-4 font-semibold lg:w-34 ${
                      active ? "border-navy bg-mist" : "border-line bg-white hover:border-navy"
                    }`}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>
          )}
          <div className="ml-auto flex items-center gap-4">
            {!onboarding && (
              <button
                type="button"
                onClick={() => setWalletOpen(true)}
                className={`flex min-h-12 items-center gap-2 rounded-lg border px-4 text-sm ${
                  credits === 0 ? "border-flare bg-[#fde4dc] text-flare-ink" : "border-line bg-subtle hover:border-navy"
                }`}
                aria-label={`${credits} of ${daily} credits left today. Open credits`}
              >
                <Reticle className="h-4 w-4 text-navy" />
                {credits} / {daily} credits
              </button>
            )}
            <span className="text-sm">EN / DE</span>
            {!onboarding && <span className="font-semibold">Lena</span>}
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-6 py-12 lg:px-12">{children}</main>
      <footer className="bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-wrap gap-x-8 gap-y-2 px-6 py-6 text-sm text-muted">
          <span>Privacy</span>
          <span>No payment changes your ranking</span>
          <span>Imprint</span>
          <span className="ml-auto">Demo · illustrative data only</span>
        </div>
      </footer>
      <WalletDialog />
    </div>
  );
}

function WalletDialog() {
  const { walletOpen, setWalletOpen, credits, daily, setCredits, reset } = useStore();
  if (!walletOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 p-4" role="dialog" aria-modal="true" aria-labelledby="wallet-title" onClick={() => setWalletOpen(false)}>
      <div className="w-full max-w-[520px] rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 id="wallet-title" className="text-2xl font-semibold">Your credits</h2>
        <p className="mt-2">
          {credits} of {daily} free credits left today. Daily credits reset at 00:00 local time. Scores, Why it fits, Apply and Save are always free.
        </p>
        <div className="mt-4 rounded-lg border border-line bg-subtle p-4">
          <p className="font-semibold">Pay as you apply · Coming soon</p>
          <p className="mt-1 text-sm text-muted">Prepaid wallet from €10 · 10 credits for €0.99 · bought credits never expire and never change your ranking.</p>
          <Button disabled className="mt-3">Buy 10 credits</Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => setWalletOpen(false)}>Close</Button>
          <button type="button" className="text-sm text-muted underline" onClick={() => setCredits(0)}>Demo: use all credits</button>
          <button type="button" className="text-sm text-muted underline" onClick={() => { reset(); setWalletOpen(false); }}>Demo: reset</button>
        </div>
      </div>
    </div>
  );
}
