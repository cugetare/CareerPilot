import Link from "next/link";
import type { ReactNode } from "react";

type BtnProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  external?: boolean;
  className?: string;
};

export function Button({ children, href, onClick, variant = "secondary", disabled, external, className = "" }: BtnProps) {
  const base =
    "inline-flex min-h-12 min-w-56 items-center justify-center gap-2 rounded-lg border px-4 text-base font-semibold transition-colors text-center";
  const look = disabled
    ? "border-line bg-subtle text-muted cursor-not-allowed"
    : variant === "primary"
      ? "border-navy bg-navy text-white hover:bg-[#1d3d63]"
      : "border-line bg-white text-navy hover:border-navy";
  const cls = `${base} ${look} ${className}`;
  if (href && !disabled)
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
        {children}
      </a>
    ) : (
      <Link href={href} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  return (
    <button type="button" className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function Card({ title, children, className = "" }: { title?: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-line bg-white p-4 ${className}`}>
      {title && <h2 className="text-2xl font-semibold leading-8">{title}</h2>}
      {children && <div className="mt-2 space-y-1 text-base leading-6">{children}</div>}
    </div>
  );
}

export function ListItem({ title, meta, href }: { title: ReactNode; meta?: ReactNode; href?: string }) {
  const inner = (
    <>
      <p className="font-semibold leading-6">{title}</p>
      {meta && <p className="text-sm leading-5 text-muted">{meta}</p>}
    </>
  );
  const cls = "block rounded-lg border border-line bg-white px-6 py-4";
  return href ? (
    <Link href={href} className={`${cls} hover:border-navy`}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export function Field({ label, value, onChange }: { label: string; value: string; onChange?: (v: string) => void }) {
  return (
    <label className="block rounded-lg border border-line bg-white px-4 py-3">
      <span className="block text-sm leading-5 text-muted">{label}</span>
      {onChange ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full bg-transparent text-base leading-6 outline-none"
        />
      ) : (
        <span className="mt-1 block text-base leading-6">{value}</span>
      )}
    </label>
  );
}

export function PageHead({ crumb, title, sub }: { crumb?: ReactNode; title: string; sub?: ReactNode }) {
  return (
    <div className="space-y-4">
      {crumb && <p className="text-sm text-muted">{crumb}</p>}
      <h1 className="text-[32px] font-bold leading-10">{title}</h1>
      {sub && <p className="text-base leading-6 text-muted">{sub}</p>}
    </div>
  );
}

export function Columns({ main, aside, mainClass = "lg:w-[816px]", asideClass = "lg:w-[496px]" }: { main: ReactNode; aside: ReactNode; mainClass?: string; asideClass?: string }) {
  return (
    <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
      <div className={`flex w-full flex-col gap-4 ${mainClass}`}>{main}</div>
      <div className={`flex w-full flex-col gap-4 ${asideClass}`}>{aside}</div>
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-5 text-muted">{children}</p>;
}
