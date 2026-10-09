"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { fitBand, track } from "@/lib/analytics";

export type Status = "Applied" | "Interview" | "Offer" | "Rejected";
export type Application = { id: string; role: string; company: string; date: string; doc: string; status: Status };

type State = {
  credits: number;
  prepared: string[];
  strategyConfirmed: string[];
  generated: string[];
  applications: Application[];
};

const DAILY = 10;
const initial: State = {
  credits: 7,
  prepared: [],
  strategyConfirmed: [],
  generated: [],
  applications: [
    { id: "reporting-analyst", role: "Reporting analyst", company: "Example Analytics", date: "2 October", doc: "CV EN v1", status: "Interview" },
  ],
};

type Ctx = State & {
  daily: number;
  spend: (key: string) => boolean;
  has: (list: keyof Pick<State, "prepared" | "strategyConfirmed" | "generated">, key: string) => boolean;
  mark: (list: keyof Pick<State, "prepared" | "strategyConfirmed" | "generated">, key: string) => void;
  logApplication: (a: Application) => void;
  setStatus: (id: string, s: Status) => void;
  setCredits: (n: number) => void;
  reset: () => void;
  walletOpen: boolean;
  setWalletOpen: (v: boolean) => void;
};

const C = createContext<Ctx | null>(null);
const KEY = "careerpilot-demo-v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<State>(initial);
  const [walletOpen, setWalletOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setS({ ...initial, ...JSON.parse(raw) });
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
  }, [s]);

  const ctx: Ctx = {
    ...s,
    daily: DAILY,
    spend: (key) => {
      if (s.generated.includes(key) || s.prepared.includes(key)) return true;
      const jobId = key.split(":")[1];
      if (s.credits <= 0) {
        track("credit_blocked", { band: fitBand(jobId) });
        return false;
      }
      track("credit_spent", { kind: key.split(":")[0], band: fitBand(jobId) });
      if (s.credits === 1) track("credits_exhausted");
      setS((p) => ({ ...p, credits: p.credits - 1 }));
      return true;
    },
    has: (list, key) => s[list].includes(key),
    mark: (list, key) => {
      if (!s[list].includes(key)) {
        if (list === "prepared") track("prepare_started", { band: fitBand(key) });
        if (list === "strategyConfirmed") track("strategy_confirmed", { band: fitBand(key) });
        if (list === "generated") track("document_generated", { kind: key.split(":")[0], band: fitBand(key.split(":")[1]) });
      }
      setS((p) => (p[list].includes(key) ? p : { ...p, [list]: [...p[list], key] }));
    },
    logApplication: (a) => {
      if (!s.applications.some((x) => x.id === a.id)) track("application_logged", { band: fitBand(a.id) });
      setS((p) => (p.applications.some((x) => x.id === a.id) ? p : { ...p, applications: [a, ...p.applications] }));
    },
    setStatus: (id, status) => {
      const prev = s.applications.find((a) => a.id === id)?.status;
      if (prev !== status) track("status_changed", { status, band: fitBand(id) });
      setS((p) => ({ ...p, applications: p.applications.map((a) => (a.id === id ? { ...a, status } : a)) }));
    },
    setCredits: (n) => setS((p) => ({ ...p, credits: n })),
    reset: () => setS(initial),
    walletOpen,
    setWalletOpen: (v) => {
      if (v) track("wallet_opened", { credits: s.credits });
      setWalletOpen(v);
    },
  };
  return <C.Provider value={ctx}>{children}</C.Provider>;
}

export function useStore() {
  const c = useContext(C);
  if (!c) throw new Error("useStore outside StoreProvider");
  return c;
}
