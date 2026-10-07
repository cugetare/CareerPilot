import Link from "next/link";
import type { ReactNode } from "react";
import { Logo, Reticle } from "./Logo";
import { Stepper } from "./ui";

export function AuthFrame({ children, step, aside }: { children: ReactNode; step?: number; aside?: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[5fr_7fr]">
      <div className="relative hidden overflow-hidden bg-navy p-12 text-white lg:flex lg:flex-col">
        <Link href="/"><Logo className="text-2xl" /></Link>
        <Reticle className="pointer-events-none absolute -right-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 text-white/[0.06]" dot="rgb(242 84 45 / 0.35)" ticks={false} />
        <div className="relative mt-auto max-w-sm space-y-4">
          {aside ?? (
            <>
              <p className="text-3xl font-bold leading-tight">Know whether you fit the job, and why.</p>
              <p className="text-white/70">Scores and reasons are free. Credits are only spent when CareerPilot writes something for you.</p>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col bg-canvas">
        <div className="flex items-center justify-between px-6 py-5 sm:px-10">
          <Link href="/" className="lg:invisible"><Logo className="text-xl" /></Link>
          {step ? <Stepper step={step} labels={["Upload CV", "Review profile", "Preferences"]} /> : <span className="text-sm text-muted">EN · DE</span>}
        </div>
        <div className="flex flex-1 items-center justify-center px-4 pb-12 sm:px-10">
          <div className="w-full max-w-xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
