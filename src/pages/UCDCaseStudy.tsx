import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mahikaReflection from "@/assets/mahika-reflection.png";
import { SubpageNav } from "@/components/SubpageNav";
import { Footer } from "@/components/Footer";
import { ChevronLeft, ChevronRight, Search, Users, Layers, Zap, X } from "lucide-react";
import { UCDBackground } from "@/components/bento-backgrounds";

/* ═══════════════════════════════════════════
   SLIDE 1 — THE PROJECT
   ═══════════════════════════════════════════ */
const LAYERS = [
  { code: "C1", label: "One complete view",    sub: "The whole customer, once",       pct: 52,  dark: true  },
  { code: "C2", label: "Corporate umbrella",   sub: "All subsidiaries, one family",  pct: 68,  dark: true  },
  { code: "C3", label: "Internal divisions",   sub: "How business units relate",      pct: 82,  dark: false },
  { code: "C4", label: "Account level",        sub: "Every booking, every contract",  pct: 100, dark: false },
];

function LayerStack() {
  return (
    <div className="flex flex-col items-center gap-2.5 w-full max-w-sm mx-auto select-none">
      {LAYERS.map((l, i) => (
        <motion.div
          key={l.code}
          className="flex items-center gap-3 rounded-xl px-5 py-3.5"
          style={{
            width: `${l.pct}%`,
            background: l.dark
              ? `rgba(20,78,72,${1 - i * 0.1})`
              : `rgba(13,148,136,${0.9 - (i - 2) * 0.15})`,
            boxShadow: "0 4px 16px rgba(0,0,0,0.14), 0 1px 3px rgba(0,0,0,0.08)",
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.55, ease: "backOut" }}
        >
          <span className="font-mono text-xs font-bold text-white/50 shrink-0 w-6">{l.code}</span>
          <div className="min-w-0">
            <p className="font-serif text-sm font-semibold text-white truncate">{l.label}</p>
            <p className="font-body text-[11px] text-white/55 truncate">{l.sub}</p>
          </div>
        </motion.div>
      ))}
      <motion.div
        className="mt-1 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.6 }}
      >
        <p className="font-mono text-xs text-muted-foreground tracking-wide">foundation → complete view</p>
      </motion.div>
    </div>
  );
}

function SlideProject() {
  return (
    <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center px-6 py-4">
      <div>
        <motion.p
          className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        >
          Enterprise UX · Cisco Systems
        </motion.p>
        <motion.h1
          className="font-serif text-4xl sm:text-5xl font-semibold text-foreground tracking-tight leading-[1.08] mb-5"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, duration: 0.5 }}
        >
          Unified Customer Definition
        </motion.h1>
        <motion.p
          className="font-body text-base text-muted-foreground leading-relaxed mb-8"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.5 }}
        >
          A company-wide system for answering one question no one could answer
          consistently — <em>who is our customer?</em> Built as a four-layer data
          architecture connecting every sales territory, booking, and customer record
          into a single source of truth.
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22, duration: 0.5 }}
        >
          {[
            { n: "1,500+", l: "new records/day" },
            { n: "35,000+", l: "sales nodes aligned" },
            { n: "20M+", l: "party IDs unified" },
          ].map((s) => (
            <div key={s.n}>
              <p className="font-serif text-2xl font-bold text-primary">{s.n}</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.18, duration: 0.6 }}
      >
        <LayerStack />
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 2 — MY ROLE
   ═══════════════════════════════════════════ */
const DELIVERABLES = [
  { icon: Search, label: "Discovery",        desc: "Interviewed sales specialists, data stewards, and GEO leads across 3 regions to map where the current process broke down" },
  { icon: Layers, label: "Steward Workflow", desc: "Designed the end-to-end review-and-disposition flow for data stewards — the core daily-use product of the program" },
  { icon: Users, label: "Team Alignment",   desc: "Built shared diagrams and facilitated alignment workshops across 4 GEO teams and engineering" },
  { icon: Zap,   label: "Communication",    desc: "Wrote executive video scripts and produced explainer assets for a 10,000-person internal rollout" },
];

function SlideRole() {
  return (
    <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-center px-6 py-4">
      <motion.div
        className="flex flex-col items-center lg:items-start gap-5"
        initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <img
            src={mahikaReflection}
            alt="Mahika Kaushik"
            className="w-36 h-36 rounded-2xl object-cover object-top shadow-lg"
          />
          <span className="absolute -bottom-2 -right-2 rounded-full bg-primary px-3 py-1 font-mono text-[11px] font-bold text-primary-foreground shadow">
            Lead UX
          </span>
        </div>
        <div>
          <p className="font-serif text-lg font-semibold text-foreground">Mahika Kaushik</p>
          <p className="font-body text-sm text-muted-foreground">UX Design · Cisco Systems</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Research", "Systems Design", "Facilitation", "Storytelling"].map((tag) => (
            <span key={tag} className="rounded-full border border-border px-3 py-1 font-mono text-[10px] text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {DELIVERABLES.map((d, i) => (
          <motion.div
            key={d.label}
            className="rounded-2xl border border-border/60 bg-card p-5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
          >
            <d.icon size={18} className="text-primary mb-3" />
            <p className="font-serif text-sm font-semibold text-foreground mb-1.5">{d.label}</p>
            <p className="font-body text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 3 — THE PROBLEM
   Sticky-note chaos board
   ═══════════════════════════════════════════ */
type StickyNote = {
  bg: string; rot: number; x: string; y: string; w: number; h: number;
  tape: boolean; lines: string[]; delay: number;
  isEmail?: boolean; isFile?: boolean;
};

const NOTES: StickyNote[] = [
  { bg: "bg-yellow-200", rot: -8,  x: "2%",  y: "3%",  w: 122, h: 102, tape: true,  lines: ["ACME Corp", "owner: Sarah?", "or John??"],                       delay: 0    },
  { bg: "bg-pink-200",   rot: 9,   x: "37%", y: "0%",  w: 128, h: 100, tape: false, lines: ["merger Jan'24", "→ updated", "WHERE??"],                          delay: 0.08 },
  { bg: "bg-blue-100",   rot: -3,  x: "72%", y: "4%",  w: 132, h: 90,  tape: true,  isEmail: true, lines: ["Re: client status", "\"can you confirm—\""],       delay: 0.16 },
  { bg: "bg-purple-100", rot: -6,  x: "80%", y: "40%", w: 114, h: 80,  tape: true,  lines: ["check w/Finance", "before merge"],                                delay: 0.24 },
  { bg: "bg-green-100",  rot: 10,  x: "72%", y: "72%", w: 116, h: 98,  tape: true,  lines: ["division??", "see Anne", "(she left)"],                            delay: 0.32 },
  { bg: "bg-yellow-100", rot: -7,  x: "37%", y: "78%", w: 128, h: 80,  tape: false, lines: ["wrong contact", "x3 emails", "no reply"],                         delay: 0.40 },
  { bg: "bg-white",      rot: 5,   x: "2%",  y: "70%", w: 142, h: 92,  tape: false, isFile: true,  lines: ["Q3_pricing_v3", "FINAL_final.xlsx", "/Drive/old/"],delay: 0.48 },
  { bg: "bg-orange-100", rot: 4,   x: "2%",  y: "37%", w: 124, h: 84,  tape: false, lines: ["client tier:", "A or B?", "asked twice"],                         delay: 0.56 },
];

function ChaosBoard() {
  return (
    <div className="relative mx-auto h-[380px] w-full">
      <div
        className="absolute h-36 w-36 rounded-full pointer-events-none"
        style={{
          left: "62%", top: "18%",
          background: "radial-gradient(circle, rgba(120,60,30,0.16) 0%, rgba(120,60,30,0.07) 55%, rgba(120,60,30,0) 75%)",
          filter: "blur(2px)",
        }}
      />
      {NOTES.map((n, i) => (
        <motion.div
          key={i}
          className={`absolute ${n.bg} px-4 py-3`}
          style={{
            left: n.x, top: n.y, width: n.w, height: n.h,
            transform: `rotate(${n.rot}deg)`,
            boxShadow: "0 6px 14px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.08)",
            borderRadius: "2px",
            zIndex: 1,
          }}
          initial={{ opacity: 0, y: 22, scale: 0.86 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: n.delay, duration: 0.55, ease: "backOut" }}
        >
          {n.tape && (
            <div
              className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2"
              style={{ background: "rgba(200,200,200,0.55)", boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}
            />
          )}
          {n.isEmail && (
            <div className="mb-1.5 border-b border-foreground/15 pb-1 font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
              From: jen@co
            </div>
          )}
          {n.isFile && (
            <div className="mb-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">📄 .xlsx</div>
          )}
          {n.lines.map((line, j) => (
            <p key={j} className="font-hand leading-tight text-foreground/85" style={{ fontSize: "15px", fontWeight: j === 0 ? 700 : 400 }}>
              {line}
            </p>
          ))}
        </motion.div>
      ))}

      {/* Central sticky — static wrapper keeps Framer scale from hijacking the position */}
      <div className="absolute" style={{ left: "50%", top: "46%", transform: "translate(-50%, -50%) rotate(-2deg)", zIndex: 20 }}>
        <motion.div
          className="flex flex-col items-center justify-center bg-yellow-300 px-6 py-5 text-center"
          style={{
            width: 236, height: 184,
            boxShadow: "0 0 0 6px rgba(251,191,36,0.38), 0 22px 44px rgba(0,0,0,0.28), 0 4px 10px rgba(0,0,0,0.12)",
          }}
          initial={{ opacity: 0, scale: 0.65 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.75, ease: "backOut" }}
        >
          <div className="absolute -top-3 left-1/2 h-5 w-20 -translate-x-1/2" style={{ background: "rgba(255,255,255,0.7)", boxShadow: "0 2px 4px rgba(0,0,0,0.10)" }} />
          <p className="font-hand text-[1.85rem] font-bold leading-tight text-foreground">Who is our customer?</p>
          <p className="mt-2.5 font-hand text-base text-foreground/60">nobody had one answer</p>
        </motion.div>
      </div>

      {[
        { x: "44%", y: "10%", size: 36, rot: -14, delay: 1.1 },
        { x: "90%", y: "44%", size: 44, rot: 12,  delay: 1.3 },
        { x: "8%",  y: "88%", size: 30, rot: 18,  delay: 1.5 },
      ].map((q, i) => (
        <motion.div
          key={i}
          className="absolute font-hand font-bold text-primary/50 select-none pointer-events-none"
          style={{ left: q.x, top: q.y, fontSize: `${q.size}px`, transform: `rotate(${q.rot}deg)`, zIndex: 5 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: q.delay, duration: 0.4, ease: "backOut" }}
        >
          ?
        </motion.div>
      ))}
    </div>
  );
}

function SlideProblem() {
  return (
    <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-center px-6 py-4">
      <div>
        <motion.p
          className="font-mono text-[10px] uppercase tracking-widest text-destructive/70 mb-3"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        >
          The Problem
        </motion.p>
        <motion.h2
          className="font-serif text-3xl sm:text-4xl font-semibold text-foreground leading-tight mb-5"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07, duration: 0.5 }}
        >
          Nobody could answer the same question twice.
        </motion.h2>
        <motion.p
          className="font-body text-base text-muted-foreground leading-relaxed mb-6"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, duration: 0.5 }}
        >
          Across a global sales org, the definition of "customer" changed depending
          on who you asked. Finance reported one number, sales another.
          Sellers fought over ownership. Commissions went wrong. Planning took
          30 weeks because the underlying data had no consistent structure.
        </motion.p>
        <motion.div
          className="flex gap-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22, duration: 0.5 }}
        >
          <div>
            <p className="font-serif text-2xl font-bold" style={{ color: "hsl(var(--destructive))" }}>30 weeks</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">annual planning cycle</p>
          </div>
          <div>
            <p className="font-serif text-2xl font-bold" style={{ color: "hsl(var(--destructive))" }}>1,500+</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">unresolved records/day</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <ChaosBoard />
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 4 — THE PROCESS
   How we worked through it
   ═══════════════════════════════════════════ */
const STEPS = [
  {
    n: "01",
    label: "Listen",
    desc: "40+ stakeholder interviews across sales reps, data stewards, and GEO leads in 3 regions. Core finding: the same customer had a different name, tier, and owner depending on which system you asked.",
    delay: 0.12,
  },
  {
    n: "02",
    label: "Frame",
    desc: "Proposed a four-layer \"house\" model — C4 accounts at the foundation, up through C3 divisions and C2 corporate umbrellas, to a single C1 view of the whole customer. Mapped it against the 35,000-node sales hierarchy.",
    delay: 0.22,
  },
  {
    n: "03",
    label: "Design",
    desc: "Built the steward workflow for reviewing and placing unresolved party IDs. Created the Rosetta Stone bridge — an alignment diagram showing how UCD and the sales hierarchy speak the same language. Ran cross-GEO workshops.",
    delay: 0.32,
  },
  {
    n: "04",
    label: "Deliver",
    desc: "Wrote executive explainer scripts for a 10,000-person rollout. Integrated the definition into OCC, CCW, EA, and ATD. Planning went from 30 weeks to 8. Customer mapping dropped from 18 months to 4.",
    delay: 0.42,
  },
];

function SlideProcess() {
  return (
    <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 items-start px-6 py-4">
      <div className="lg:pt-2">
        <motion.p
          className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        >
          The Process
        </motion.p>
        <motion.h2
          className="font-serif text-3xl sm:text-4xl font-semibold text-foreground leading-tight mb-5"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, duration: 0.5 }}
        >
          From 30 weeks of confusion to 8 weeks of clarity.
        </motion.h2>
        <motion.p
          className="font-body text-base text-muted-foreground leading-relaxed mb-7"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.5 }}
        >
          We started close to shore — a clear problem to solve. Somewhere between
          IT constraints and reopening feedback loops, we ended up mid-ocean.
          Cutting scope at week three instead of week nine would have saved us.
        </motion.p>
        <motion.div
          className="flex gap-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
        >
          {[
            { before: "30 wks", after: "8 wks",  label: "Annual planning" },
            { before: "18 mo",  after: "4 mo",   label: "Customer mapping" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border/60 bg-card px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{s.label}</p>
              <div className="flex items-baseline gap-1.5">
                <span className="font-body text-xs text-muted-foreground line-through">{s.before}</span>
                <span className="font-serif text-xl font-bold text-primary">{s.after}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex flex-col gap-0">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.n}
            className="flex gap-5 pb-6"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: step.delay, duration: 0.45 }}
          >
            {/* Step spine */}
            <div className="flex flex-col items-center gap-0 shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/8">
                <span className="font-mono text-[11px] font-bold text-primary">{step.n}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-px flex-1 bg-border/50 my-1" style={{ minHeight: 24 }} />
              )}
            </div>
            {/* Step content */}
            <div className="pb-1">
              <p className="font-serif text-base font-semibold text-foreground mb-1">{step.label}</p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 5 — THE OUTCOME
   ═══════════════════════════════════════════ */
function HierarchyScreen() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden border border-foreground/[0.06] bg-background shadow-xl"
      style={{ maxWidth: 420 }}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-foreground/[0.06] bg-muted/30 px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
        <div className="h-2.5 w-2.5 rounded-full bg-accent-gold/40" />
        <div className="h-2.5 w-2.5 rounded-full bg-primary/40" />
        <span className="ml-3 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Customer 360 · UCD</span>
      </div>

      {/* Toolbar row */}
      <div className="flex items-center gap-3 border-b border-foreground/[0.04] px-4 py-2 bg-muted/10">
        <div className="h-5 w-28 rounded-md bg-primary/10" />
        <div className="ml-auto h-5 w-16 rounded-md bg-muted/60" />
        <div className="h-5 w-10 rounded-md bg-muted/60" />
      </div>

      {/* Hierarchy rows */}
      <div className="flex flex-col gap-2 px-4 py-4 bg-gradient-to-b from-background to-secondary/20">
        {/* C1 */}
        <motion.div
          className="flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/20 px-3 py-2.5"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="h-3 w-3 rounded-sm bg-primary shrink-0" />
          <span className="font-mono text-[11px] font-semibold text-primary flex-1">Acme Corporation</span>
          <span className="rounded-full bg-primary/15 px-2 py-0.5 font-mono text-[9px] font-bold text-primary">C1</span>
        </motion.div>

        {/* C2 */}
        {[
          { name: "Acme Holdings Ltd",    level: "C2", delay: 0.26, indent: 4  },
          { name: "Acme Tech Division",   level: "C3", delay: 0.37, indent: 10 },
          { name: "Acme Cloud — US",      level: "C4", delay: 0.45, indent: 16 },
          { name: "Acme Cloud — EU",      level: "C4", delay: 0.52, indent: 16 },
          { name: "Acme Security Group",  level: "C3", delay: 0.60, indent: 10 },
          { name: "Acme Finance Ltd",     level: "C4", delay: 0.67, indent: 16 },
        ].map((row) => (
          <motion.div
            key={row.name}
            className="flex items-center gap-2 rounded-lg border border-foreground/[0.04] bg-muted/40 px-3 py-2"
            style={{ marginLeft: row.indent }}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: row.delay }}
          >
            <div className="h-0.5 w-3 bg-primary/20 shrink-0" />
            <span className="font-mono text-[10px] text-foreground/70 flex-1 truncate">{row.name}</span>
            <span className="font-mono text-[9px] text-muted-foreground">{row.level}</span>
          </motion.div>
        ))}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-foreground/[0.04] bg-muted/20 px-4 py-2">
        <span className="font-mono text-[9px] text-muted-foreground">7 nodes · 1 hierarchy</span>
        <span className="font-mono text-[9px] font-semibold text-primary">● Live</span>
      </div>
    </div>
  );
}

function SlideOutcome() {
  return (
    <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center px-6 py-4">
      <div>
        <motion.p
          className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        >
          The Outcome
        </motion.p>
        <motion.h2
          className="font-serif text-3xl sm:text-4xl font-semibold text-foreground leading-tight mb-5"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07, duration: 0.5 }}
        >
          One definition. Every system speaks it.
        </motion.h2>
        <motion.p
          className="font-body text-base text-muted-foreground leading-relaxed mb-8"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, duration: 0.5 }}
        >
          For the first time, finance and sales read the same customer record.
          Sellers stopped fighting over ownership. Commissions traced cleanly.
          And the questions nobody could answer — answered.
        </motion.p>
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22, duration: 0.5 }}
        >
          {[
            { before: "30 weeks", after: "8 weeks",   label: "Annual planning"         },
            { before: "18 months", after: "4 months", label: "Customer mapping"        },
            { before: "50+ sheets", after: "1 system", label: "Source of truth"        },
            { before: "Fragmented", after: "4 tools",  label: "Integrated into"        },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border/60 bg-card p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{s.label}</p>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-body text-xs text-muted-foreground line-through">{s.before}</span>
                <span className="font-serif text-lg font-bold text-primary">{s.after}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.18, duration: 0.55 }}
      >
        <HierarchyScreen />
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SLIDE REGISTRY
   ═══════════════════════════════════════════ */
const SLIDES = [
  { id: "project",  label: "Project",  component: SlideProject  },
  { id: "role",     label: "Role",     component: SlideRole     },
  { id: "problem",  label: "Problem",  component: SlideProblem  },
  { id: "process",  label: "Process",  component: SlideProcess  },
  { id: "outcome",  label: "Outcome",  component: SlideOutcome  },
];

/* ═══════════════════════════════════════════
   FRAMER VARIANTS
   ═══════════════════════════════════════════ */
const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 24 : -24 }),
  center: { opacity: 1, y: 0 },
  exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -24 : 24 }),
};

/* ═══════════════════════════════════════════
   UCDCarousel — named export
   Used by the modal in Index.tsx
   ═══════════════════════════════════════════ */
export function UCDCarousel({ onClose }: { onClose?: () => void }) {
  const [slide, setSlide] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const go = useCallback((n: number) => {
    setDir(n > slide ? 1 : -1);
    setSlide(n);
  }, [slide]);

  const prev = useCallback(() => { if (slide > 0) go(slide - 1); }, [slide, go]);
  const next = useCallback(() => { if (slide < SLIDES.length - 1) go(slide + 1); }, [slide, go]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "Escape" && onClose) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, onClose]);

  const SlideContent = SLIDES[slide].component;

  return (
    <motion.div
      className="relative flex flex-col bg-background border border-border/40 shadow-2xl overflow-hidden"
      style={{
        width: "min(96vw, 1120px)",
        height: "min(92vh, 740px)",
        borderRadius: 20,
      }}
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 16 }}
      transition={{ duration: 0.3, ease: [0.32, 0, 0.68, 1] }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Top bar ── */}
      <div className="shrink-0 flex items-center justify-between gap-4 px-6 py-3.5 border-b border-border/40 bg-background">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mr-3">
            {SLIDES[slide].label}
          </span>
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              aria-label={s.label}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === slide ? 24 : 7,
                height: 7,
                background: i === slide ? "hsl(var(--primary))" : "hsl(var(--border))",
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
            {slide + 1} / {SLIDES.length}
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
              aria-label="Close"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* ── Slide area ── */}
      <div className="relative flex-1 overflow-hidden flex items-center">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={slide}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.36, ease: [0.32, 0, 0.68, 1] }}
            className="absolute inset-0 flex items-center justify-center overflow-y-auto py-6"
          >
            <SlideContent />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          disabled={slide === 0}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background/90 text-muted-foreground backdrop-blur transition-all hover:text-foreground disabled:opacity-20"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={next}
          disabled={slide === SLIDES.length - 1}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background/90 text-muted-foreground backdrop-blur transition-all hover:text-foreground disabled:opacity-20"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* ── Bottom nav ── */}
      <div className="shrink-0 flex items-center justify-between px-6 py-3 border-t border-border/40 bg-background">
        <button
          onClick={prev}
          disabled={slide === 0}
          className="flex items-center gap-1.5 font-body text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
        >
          <ChevronLeft size={14} />
          {slide > 0 ? SLIDES[slide - 1].label : ""}
        </button>
        <button
          onClick={next}
          disabled={slide === SLIDES.length - 1}
          className="flex items-center gap-1.5 font-body text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
        >
          {slide < SLIDES.length - 1 ? SLIDES[slide + 1].label : ""}
          <ChevronRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   DEFAULT EXPORT — standalone page (direct URL)
   ═══════════════════════════════════════════ */
export default function UCDCaseStudy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SubpageNav label="Case Study" darkSectionId="hero-dark" />
      <div className="flex-1 flex items-center justify-center py-10 px-4">
        <UCDCarousel />
      </div>
      <Footer />
    </div>
  );
}
