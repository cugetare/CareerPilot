import Link from "next/link";
import type { ReactNode } from "react";
import { Reticle } from "./Logo";

type BtnProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  external?: boolean;
  full?: boolean;
  cost?: number;
  className?: string;
};

export function Button({ children, href, onClick, variant = "secondary", disabled, external, full, cost, className = "" }: BtnProps) {
  const base = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-semibold transition ${full ? "w-full" : ""}`;
  const look = disabled
    ? "bg-mist text-muted cursor-not-allowed"
    : variant === "primary"
      ? "bg-navy text-white shadow-card hover:bg-navy-2"
      : variant === "ghost"
        ? "text-navy hover:bg-mist"
        : "bg-white text-navy ring-1 ring-line hover:ring-navy";
  const content = (
    <>
      {children}
      {cost !== undefined && <CostTag cost={cost} inverted={variant === "primary" && !disabled} />}
    </>
  );
  const cls = `${base} ${look} ${className}`;
  if (href && !disabled)
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>{content}</a>
    ) : (
      <Link href={href} className={cls} onClick={onClick}>{content}</Link>
    );
  return (
    <button type="button" className={cls} onClick={onClick} disabled={disabled}>{content}</button>
  );
}

export function CostTag({ cost, inverted }: { cost: number; inverted?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${inverted ? "bg-white/15 text-white" : "bg-mist text-navy"}`}>
      <Reticle className="h-3 w-3" />
      {cost === 0 ? "free" : `−${cost}`}
    </span>
  );
}

export function Card({ children, className = "", tone = "white" }: { children: ReactNode; className?: string; tone?: "white" | "mist" | "navy" | "flare" }) {
  const tones = {
    white: "bg-white shadow-card ring-1 ring-line/70",
    mist: "bg-mist",
    navy: "bg-navy text-white",
    flare: "bg-flare-tint text-navy",
  };
  return <div className={`rounded-3xl p-6 ${tones[tone]} ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{children}</p>;
}

export function Chip({ children, tone = "mist" }: { children: ReactNode; tone?: "mist" | "good" | "flare" | "white" }) {
  const t = { mist: "bg-mist text-navy", good: "bg-good-tint text-good", flare: "bg-flare-tint text-flare-ink", white: "bg-white text-navy ring-1 ring-line" };
  return <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[13px] font-medium ${t[tone]}`}>{children}</span>;
}

export function FitRing({ score, size = 72 }: { score: number; size?: number }) {
  const r = 42, c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-mist)" strokeWidth="10" />
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-navy)" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(score / 100) * c} ${c}`} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-bold" style={{ fontSize: size * 0.27 }}>
        {score}<span className="text-[0.55em] font-semibold">%</span>
      </span>
    </div>
  );
}

export function Field({ label, value, onChange, hint, multiline }: { label: string; value: string; onChange?: (v: string) => void; hint?: string; multiline?: boolean }) {
  const cls = "mt-1.5 w-full rounded-2xl bg-white px-4 py-3 text-[15px] ring-1 ring-line outline-none focus:ring-2 focus:ring-navy";
  return (
    <label className="block">
      <span className="flex items-center justify-between text-sm font-medium">
        {label}
        {hint && <span className="rounded-full bg-flare-tint px-2 py-0.5 text-xs font-semibold text-flare-ink">{hint}</span>}
      </span>
      {onChange ? (
        multiline ? (
          <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={cls} />
        ) : (
          <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
        )
      ) : (
        <span className={`${cls} block bg-canvas`}>{value}</span>
      )}
    </label>
  );
}

export function PageHead({ crumbs, title, sub, right }: { crumbs?: { label: string; href?: string }[]; title: string; sub?: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-2">
        {crumbs && (
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-muted" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden>›</span>}
                {c.href ? <Link href={c.href} className="hover:text-navy">{c.label}</Link> : <span className="text-navy">{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {sub && <p className="max-w-2xl text-base text-muted">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function TwoCol({ main, aside }: { main: ReactNode; aside: ReactNode }) {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="flex min-w-0 flex-col gap-6">{main}</div>
      <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">{aside}</aside>
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="text-[13px] leading-5 text-muted">{children}</p>;
}

export function Stepper({ step, labels }: { step: number; labels: string[] }) {
  return (
    <ol className="flex items-center gap-3">
      {labels.map((l, i) => {
        const n = i + 1, done = n < step, now = n === step;
        return (
          <li key={l} className="flex items-center gap-3">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${now ? "bg-navy text-white" : done ? "bg-good-tint text-good" : "bg-mist text-muted"}`}>{done ? "✓" : n}</span>
            <span className={`hidden text-sm sm:inline ${now ? "font-semibold" : "text-muted"}`}>{l}</span>
            {n < labels.length && <span className="h-px w-6 bg-line sm:w-10" />}
          </li>
        );
      })}
    </ol>
  );
}
