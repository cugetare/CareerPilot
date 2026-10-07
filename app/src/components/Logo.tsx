export function Reticle({ className = "", dot = "var(--color-flare)", ticks = true }: { className?: string; dot?: string; ticks?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <circle cx="50" cy="50" r="31" fill="none" stroke="currentColor" strokeWidth="13" />
      {ticks && <path d="M50 0V22M50 78V100M0 50H22M78 50H100" stroke="currentColor" strokeWidth="13" />}
      <circle cx="50" cy="50" r="9" fill={dot} />
    </svg>
  );
}

export function Logo({ className = "text-2xl" }: { className?: string }) {
  return (
    <span className={`font-extrabold tracking-tight whitespace-nowrap leading-none ${className}`} aria-label="CareerPilot">
      CareerPil
      <Reticle className="inline-block h-[0.6em] w-[0.6em] align-[-0.02em] mx-[0.02em]" />t
    </span>
  );
}
