// Product analytics for the CareerPilot demo, sent to Vercel Web Analytics.
// Page views are collected on every plan. Custom events (track) are collected
// only on Vercel Pro/Enterprise, with max 2 properties per event on Pro, so
// every event below carries at most 2 properties. Never send personal data.
import { track as vercelTrack } from "@vercel/analytics";
import { getJob } from "@/lib/jobs";

export type EventName =
  | "credit_spent"
  | "credits_exhausted"
  | "credit_blocked"
  | "prepare_started"
  | "strategy_confirmed"
  | "document_generated"
  | "cv_change_reviewed"
  | "document_exported"
  | "apply_clicked"
  | "application_logged"
  | "status_changed"
  | "wallet_opened";

type Props = Record<string, string | number | boolean | null>;

/** Score band used across the PRD metrics: 90+, 70-89, <70. */
export function fitBand(jobId?: string): string {
  const fit = jobId ? getJob(jobId)?.fit : undefined;
  if (fit === undefined) return "unknown";
  return fit >= 90 ? "90+" : fit >= 70 ? "70-89" : "<70";
}

export function track(name: EventName, props?: Props) {
  try {
    vercelTrack(name, props);
  } catch {
    // Analytics must never break the demo.
  }
}
