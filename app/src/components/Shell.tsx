"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Logo, Reticle } from "./Logo";
import { useStore } from "./store";
import { Button } from "./ui";

const NAV = [
  { href: "/dashboard", label: "Home" },
  { href: "/jobs", label: "Jobs" },
  { href: "/saved", label: "Saved" },
  { href: "/applications", label: "Applications" },
  { href: "/profile", label: "Profile" },
];

export function Shell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const bare = path === "/" || path.startsWith("/onboarding");
  const { credits, daily, setWalletOpen } = useStore();

  if (bare)
    return (
      <>
        {children}
        <WalletDialog />
      </>
    );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-line bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
          <Link href="/dashboard" className="shrink-0"><Logo className="text-xl" /></Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => {
              const active = path === n.href || (n.href !== "/dashboard" && path.startsWith(n.href));
              return (
                <Link key={n.href} href={n.href} aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-[15px] font-medium transition ${active ? "bg-mist text-navy" : "text-muted hover:text-navy"}`}>
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <button type="button" onClick={() => setWalletOpen(true)}
              aria-label={`${credits} of ${daily} credits left today. Open credits`}
              className={`flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold ring-1 transition ${credits === 0 ? "bg-flare-tint text-flare-ink ring-flare/40" : "bg-white ring-line hover:ring-navy"}`}>
              <Reticle className="h-4 w-4" />
              {credits}<span className="font-normal text-muted">/ {daily}</span>
            </button>
            <span className="hidden text-sm text-muted sm:inline">EN · DE</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white" aria-label="Lena">L</span>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden">
          {NAV.map((n) => {
            const active = path === n.href || (n.href !== "/dashboard" && path.startsWith(n.href));
            return (
              <Link key={n.href} href={n.href} className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium ${active ? "bg-mist" : "text-muted"}`}>{n.label}</Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">{children}</main>
      <Footer />
      <WalletDialog />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2 px-4 py-6 text-[13px] text-muted sm:px-6">
        <span>Privacy</span>
        <span>Imprint</span>
        <span className="font-medium text-navy">No payment changes your ranking</span>
        <span className="ml-auto">Demo · illustrative data only</span>
      </div>
    </footer>
  );
}

function WalletDialog() {
  const { walletOpen, setWalletOpen, credits, daily, setCredits, reset } = useStore();
  if (!walletOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="wallet-title" onClick={() => setWalletOpen(false)}>
      <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-lift" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist"><Reticle className="h-6 w-6" /></span>
          <div>
            <h2 id="wallet-title" className="text-xl font-bold">Your credits</h2>
            <p className="text-sm text-muted">{credits} of {daily} free credits left today</p>
          </div>
        </div>
        <div className="mt-5 h-2 rounded-full bg-mist"><div className="h-2 rounded-full bg-navy" style={{ width: `${(credits / daily) * 100}%` }} /></div>
        <p className="mt-4 text-[15px]">Daily credits reset at 00:00. Scores, Why it fits, Apply and Save are always free.</p>
        <div className="mt-5 rounded-2xl bg-canvas p-5 ring-1 ring-line">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Pay as you apply</p>
            <span className="rounded-full bg-flare-tint px-2.5 py-0.5 text-xs font-semibold text-flare-ink">Coming soon</span>
          </div>
          <p className="mt-1 text-sm text-muted">Prepaid wallet from €10 · 10 credits for €0.99 · never expire, never change your ranking.</p>
          <Button disabled full className="mt-4">Buy 10 credits · €0.99</Button>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <Button variant="primary" onClick={() => setWalletOpen(false)}>Done</Button>
          <button type="button" className="text-[13px] text-muted underline" onClick={() => setCredits(0)}>Demo: use all</button>
          <button type="button" className="text-[13px] text-muted underline" onClick={() => { reset(); setWalletOpen(false); }}>Demo: reset</button>
        </div>
      </div>
    </div>
  );
}
