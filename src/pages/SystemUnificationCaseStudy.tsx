import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mahikaReflection from "@/assets/mahika-reflection.png";
import { SubpageNav } from "@/components/SubpageNav";
import { Footer } from "@/components/Footer";
import { ChevronLeft, ChevronRight, Search, GitBranch, BarChart3, BookOpen, X } from "lucide-react";

/* ═══════════════════════════════════════════
   SLIDE 1 — THE PROJECT
   ═══════════════════════════════════════════ */
function ConvergenceVisual() {
  const variants = [
    { label: "Primary",    colors: ["#3B82F6", "#1E40AF"], rx: 6  },
    { label: "Action",     colors: ["#10B981", "#059669"], rx: 20 },
    { label: "Confirm",    colors: ["#6366F1", "#4338CA"], rx: 2  },
    { label: "Submit",     colors: ["#F59E0B", "#D97706"], rx: 12 },
    { label: "Apply",      colors: ["#EF4444", "#DC2626"], rx: 8  },
  ];

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-xs mx-auto">
      {/* Before: scattered variants */}
      <motion.p
        className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
      >
        11 verticals · 11 interpretations
      </motion.p>
      <div className="flex flex-wrap gap-2 justify-center">
        {variants.map((v, i) => (
          <motion.div
            key={v.label}
            className="px-3 py-1.5 font-mono text-[10px] font-semibold text-white shadow-sm"
            style={{
              background: `linear-gradient(135deg, ${v.colors[0]}, ${v.colors[1]})`,
              borderRadius: v.rx,
            }}
            initial={{ opacity: 0, scale: 0.7, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.07, duration: 0.4, ease: "backOut" }}
          >
            {v.label}
          </motion.div>
        ))}
      </div>

      {/* Arrow */}
      <motion.div
        className="flex flex-col items-center gap-1 py-1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
      >
        <div className="w-px h-5 bg-border/60" />
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M6 8L0 0H12L6 8Z" fill="hsl(var(--primary))" opacity="0.6" />
        </svg>
        <p className="font-mono text-[9px] text-primary/70 uppercase tracking-wider">Unified</p>
      </motion.div>

      {/* After: single design token */}
      <motion.div
        className="flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/8 px-6 py-3"
        initial={{ opacity: 0, scale: 0.88, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.45, ease: "backOut" }}
      >
        <div className="h-3 w-3 rounded-full bg-primary" />
        <span className="font-mono text-[11px] font-bold text-primary">btn-primary</span>
        <span className="font-mono text-[9px] text-muted-foreground">· v1.0 · 1 token</span>
      </motion.div>

      <motion.p
        className="font-mono text-[9px] text-center text-muted-foreground"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
      >
        one component · governed · shared
      </motion.p>
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
          Design Systems · Platform UX · Cisco Systems
        </motion.p>
        <motion.h1
          className="font-serif text-4xl sm:text-5xl font-semibold text-foreground tracking-tight leading-[1.08] mb-5"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, duration: 0.5 }}
        >
          Experience Unification
        </motion.h1>
        <motion.p
          className="font-body text-base text-muted-foreground leading-relaxed mb-8"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.5 }}
        >
          Eleven product verticals. Each built independently. Each looking and
          behaving differently. This project was the systematic audit, scoring,
          and alignment work to bring them under one unified enterprise
          experience — without breaking a single one.
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22, duration: 0.5 }}
        >
          {[
            { n: "11",        l: "product verticals audited" },
            { n: "5",         l: "audit phases" },
            { n: "1",         l: "unified design system" },
            { n: "3 tiers",   l: "maturity mapping" },
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
        <ConvergenceVisual />
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 2 — MY ROLE
   ═══════════════════════════════════════════ */
const DELIVERABLES = [
  {
    icon: Search,
    label: "UX Auditing",
    desc: "Systematically evaluated atomic elements, foundational components, visual systems, and behavioral patterns across all 11 verticals to surface inconsistencies",
  },
  {
    icon: BarChart3,
    label: "Experience Scoring",
    desc: "Quantified experience quality into a scoring model — turning subjective 'this feels off' into defensible, comparable maturity data",
  },
  {
    icon: GitBranch,
    label: "Design-to-Dev Traceability",
    desc: "Mapped design decisions to their implementation reality. Found where code diverged from intent, and built the bridge back",
  },
  {
    icon: BookOpen,
    label: "Governance Framework",
    desc: "Defined how new components get introduced, reviewed, and maintained — so the design system doesn't drift back to chaos in 12 months",
  },
];

function SlideRole() {
  return (
    <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-center px-6 py-4">
      <motion.div
        className="flex flex-col items-center lg:items-start gap-5"
        initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <img src={mahikaReflection} alt="Mahika Kaushik" className="w-36 h-36 rounded-2xl object-cover object-top shadow-lg" />
          <span className="absolute -bottom-2 -right-2 rounded-full bg-primary px-3 py-1 font-mono text-[11px] font-bold text-primary-foreground shadow">
            UX Lead
          </span>
        </div>
        <div>
          <p className="font-serif text-lg font-semibold text-foreground">Mahika Kaushik</p>
          <p className="font-body text-sm text-muted-foreground">UX Design · Cisco Systems</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Experience Audit", "Design Systems", "Governance", "Traceability"].map((tag) => (
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
   ═══════════════════════════════════════════ */
function SlideProblem() {
  const fragments = [
    { text: "Date pickers",          sub: "3 different components, none shared",        x: "2%",  y: "2%",  rot: -4  },
    { text: "Button hierarchy",      sub: "every team had its own definition",           x: "58%", y: "0%",  rot: 5   },
    { text: "No shared tokens",      sub: "colours hard-coded per vertical",            x: "4%",  y: "52%", rot: -3  },
    { text: "Design ≠ code",         sub: "spec says one thing, prod delivers another", x: "60%", y: "52%", rot: 4   },
    { text: "No governance",         sub: "no review process, no deprecation path",     x: "26%", y: "76%", rot: -2  },
  ];

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
          Eleven products. Eleven experiences. Users felt like they were switching apps mid-workflow.
        </motion.h2>
        <motion.p
          className="font-body text-base text-muted-foreground leading-relaxed mb-6"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, duration: 0.5 }}
        >
          This wasn't an aesthetics problem — it was a systems failure. Each
          vertical had evolved independently, building its own components,
          patterns, and behaviours. Design decisions weren't reaching code.
          Nobody owned the seams between products. And there was no process to
          stop it getting worse.
        </motion.p>
        <motion.div
          className="flex gap-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22, duration: 0.5 }}
        >
          <div>
            <p className="font-serif text-2xl font-bold" style={{ color: "hsl(var(--destructive))" }}>11</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">diverged verticals</p>
          </div>
          <div>
            <p className="font-serif text-2xl font-bold" style={{ color: "hsl(var(--destructive))" }}>0</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">governance process before this</p>
          </div>
        </motion.div>
      </div>

      {/* Fragment cloud */}
      <div className="relative h-[320px] w-full">
        {fragments.map((f, i) => (
          <motion.div
            key={i}
            className="absolute rounded-xl border border-border/60 bg-card px-4 py-3"
            style={{ left: f.x, top: f.y, transform: `rotate(${f.rot}deg)`, maxWidth: 192 }}
            initial={{ opacity: 0, scale: 0.8, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: "backOut" }}
          >
            <p className="font-mono text-[11px] font-semibold text-foreground">{f.text}</p>
            <p className="font-body text-xs text-muted-foreground mt-0.5 leading-snug">{f.sub}</p>
          </motion.div>
        ))}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
        >
          <svg width="100%" height="100%" className="absolute inset-0">
            {[[120,70,220,140],[80,190,210,200],[260,55,200,140],[65,255,220,220]].map(([x1,y1,x2,y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
            ))}
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 4 — THE PROCESS
   ═══════════════════════════════════════════ */
const STEPS = [
  {
    n: "01",
    label: "Audit",
    desc: "Evaluated all 11 verticals across four layers: atomic elements, foundational components, visual design systems, and behavioural patterns. Every inconsistency logged, not eyeballed.",
    delay: 0.12,
  },
  {
    n: "02",
    label: "Score",
    desc: "Built an experience maturity score for each vertical. Quantified what was previously subjective — gave the team numbers to prioritise and convince stakeholders without arguing over taste.",
    delay: 0.22,
  },
  {
    n: "03",
    label: "Map",
    desc: "Placed every vertical on a 3-tier maturity map: Current Design (where it is), Harmonised Design (next reachable state), North Star (target state). No vertical skips a tier.",
    delay: 0.32,
  },
  {
    n: "04",
    label: "Trace + Govern",
    desc: "Mapped design decisions to code output. Where they diverged, we built traceability. Then wrote the governance framework — the rulebook that stops it drifting back.",
    delay: 0.42,
  },
];

function MaturityTiers() {
  const tiers = [
    { label: "North Star",        sub: "target state",           w: "60%",  shade: 0.9, accent: "hsl(var(--primary))" },
    { label: "Harmonised Design", sub: "next reachable state",   w: "78%",  shade: 0.6, accent: "hsl(var(--primary))" },
    { label: "Current Design",    sub: "where each vertical is", w: "100%", shade: 0.3, accent: "hsl(var(--primary))" },
  ];

  return (
    <div className="flex flex-col items-end gap-2 w-full">
      {tiers.map((tier, i) => (
        <motion.div
          key={tier.label}
          className="flex flex-col justify-center rounded-xl px-4 py-3 self-end"
          style={{
            width: tier.w,
            background: `rgba(4,164,176,${tier.shade * 0.18 + 0.06})`,
            border: `1px solid rgba(4,164,176,${tier.shade * 0.32})`,
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.28 + i * 0.12, duration: 0.5, ease: "backOut" }}
        >
          <p className="font-serif text-xs font-semibold text-foreground">{tier.label}</p>
          <p className="font-mono text-[9px] text-muted-foreground mt-0.5">{tier.sub}</p>
        </motion.div>
      ))}
      <motion.p
        className="font-mono text-[9px] text-muted-foreground text-right mt-1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
      >
        no vertical skips a tier
      </motion.p>
    </div>
  );
}

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
          Audit first. Score it. Map where each product sits. Then build the path forward.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
        >
          <MaturityTiers />
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
            <div className="flex flex-col items-center shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/8">
                <span className="font-mono text-[11px] font-bold text-primary">{step.n}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-px flex-1 bg-border/50 my-1" style={{ minHeight: 24 }} />
              )}
            </div>
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
const COMPONENTS = [
  { name: "btn-primary",    status: "Governed",  color: "#10B981" },
  { name: "date-picker",    status: "Governed",  color: "#10B981" },
  { name: "data-table",     status: "Governed",  color: "#10B981" },
  { name: "nav-shell",      status: "In Review", color: "#F59E0B" },
];

function DesignSystemScreen() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-foreground/[0.07] bg-background shadow-xl" style={{ maxWidth: 420 }}>
      {/* Chrome */}
      <div className="flex items-center gap-2 border-b border-foreground/[0.06] bg-muted/30 px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
        <div className="h-2.5 w-2.5 rounded-full bg-accent-gold/40" />
        <div className="h-2.5 w-2.5 rounded-full bg-primary/40" />
        <span className="ml-3 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Design System · Component Library</span>
      </div>

      {/* Stats row */}
      <motion.div
        className="flex gap-0 border-b border-foreground/[0.06]"
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
      >
        {[
          { label: "Verticals", val: "11" },
          { label: "Components", val: "40+" },
          { label: "Governed", val: "100%" },
        ].map((s, i) => (
          <div key={s.label} className="flex-1 px-4 py-3 text-center" style={{ borderRight: i < 2 ? "1px solid hsl(var(--border) / 0.4)" : undefined }}>
            <p className="font-serif text-lg font-bold text-primary">{s.val}</p>
            <p className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Maturity tiers summary */}
      <div className="mx-4 mt-4">
        <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground mb-2">Maturity Coverage</p>
        {[
          { tier: "North Star",        count: "3 verticals",  pct: 27,  color: "#10B981" },
          { tier: "Harmonised Design", count: "6 verticals",  pct: 55,  color: "#04A4B0" },
          { tier: "Current Design",    count: "2 verticals",  pct: 18,  color: "#6366F1" },
        ].map((row, i) => (
          <motion.div key={row.tier} className="flex items-center gap-2 mb-2"
            initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22 + i * 0.08 }}
          >
            <span className="font-mono text-[8px] text-muted-foreground w-28 shrink-0 leading-tight">{row.tier}</span>
            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ background: row.color }}
                initial={{ width: 0 }} animate={{ width: `${row.pct}%` }}
                transition={{ delay: 0.38 + i * 0.08, duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <span className="font-mono text-[8px] text-muted-foreground shrink-0">{row.count}</span>
          </motion.div>
        ))}
      </div>

      {/* Component list */}
      <div className="mx-4 mt-4 mb-4">
        <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground mb-2">Component Status</p>
        <div className="space-y-1.5">
          {COMPONENTS.map((c, i) => (
            <motion.div key={c.name} className="flex items-center justify-between rounded-lg border border-border/40 bg-card px-3 py-2"
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48 + i * 0.06 }}
            >
              <span className="font-mono text-[9px] text-foreground">{c.name}</span>
              <span className="font-mono text-[8px] font-semibold px-2 py-0.5 rounded-full"
                style={{ color: c.color, background: `${c.color}1A` }}
              >
                {c.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Governance badge */}
      <div className="flex items-center justify-between border-t border-foreground/[0.04] bg-muted/20 px-4 py-2">
        <span className="font-mono text-[9px] text-muted-foreground">Governance framework · Active</span>
        <span className="font-mono text-[9px] font-semibold" style={{ color: "#10B981" }}>● Live</span>
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
          One design system. One governance process. Eleven products that feel like one.
        </motion.h2>
        <motion.p
          className="font-body text-base text-muted-foreground leading-relaxed mb-6"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, duration: 0.5 }}
        >
          The design system is governed and growing. Every component has a defined
          status, a maturity tier, and a traceability line back to its design
          intent. New components go through review — not just get added because
          someone needed something quickly.
        </motion.p>

        <motion.blockquote
          className="border-l-2 border-primary/30 pl-4 mb-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22, duration: 0.5 }}
        >
          <p className="font-serif text-sm italic text-muted-foreground leading-relaxed">
            "The hard part wasn't designing the system. It was convincing 11
            product teams — all proud of their own work — that shared
            components weren't a constraint. They were leverage."
          </p>
        </motion.blockquote>

        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}
        >
          {[
            { val: "11 verticals",    label: "Audited and mapped"             },
            { val: "5 phases",        label: "Audit to governance"            },
            { val: "1 system",        label: "Unified, governed, traceable"   },
            { val: "3 tiers",         label: "Maturity model in production"   },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border/60 bg-card p-4">
              <p className="font-serif text-lg font-bold text-primary mb-1">{s.val}</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
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
        <DesignSystemScreen />
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SLIDE REGISTRY + VARIANTS
   ═══════════════════════════════════════════ */
const SLIDES = [
  { id: "project",  label: "Project",  component: SlideProject  },
  { id: "role",     label: "Role",     component: SlideRole     },
  { id: "problem",  label: "Problem",  component: SlideProblem  },
  { id: "process",  label: "Process",  component: SlideProcess  },
  { id: "outcome",  label: "Outcome",  component: SlideOutcome  },
];

const slideVariants = {
  enter:  (dir: number) => ({ opacity: 0, y: dir > 0 ? 24 : -24 }),
  center: { opacity: 1, y: 0 },
  exit:   (dir: number) => ({ opacity: 0, y: dir > 0 ? -24 : 24 }),
};

/* ═══════════════════════════════════════════
   ExperienceUnificationCarousel — named export
   ═══════════════════════════════════════════ */
export function ExperienceUnificationCarousel({ onClose }: { onClose?: () => void }) {
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
      style={{ width: "min(96vw, 1120px)", height: "min(92vh, 740px)", borderRadius: 20 }}
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 16 }}
      transition={{ duration: 0.3, ease: [0.32, 0, 0.68, 1] }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top bar */}
      <div className="shrink-0 flex items-center justify-between gap-4 px-6 py-3.5 border-b border-border/40 bg-background">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mr-3">
            {SLIDES[slide].label}
          </span>
          {SLIDES.map((s, i) => (
            <button key={s.id} onClick={() => go(i)} aria-label={s.label}
              className="transition-all duration-300 rounded-full"
              style={{ width: i === slide ? 24 : 7, height: 7, background: i === slide ? "hsl(var(--primary))" : "hsl(var(--border))" }}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-muted-foreground tabular-nums">{slide + 1} / {SLIDES.length}</span>
          {onClose && (
            <button onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
              aria-label="Close"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Slide area */}
      <div className="relative flex-1 overflow-hidden flex items-center">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={slide} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.36, ease: [0.32, 0, 0.68, 1] }}
            className="absolute inset-0 flex items-center justify-center overflow-y-auto py-6"
          >
            <SlideContent />
          </motion.div>
        </AnimatePresence>
        <button onClick={prev} disabled={slide === 0}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background/90 text-muted-foreground backdrop-blur transition-all hover:text-foreground disabled:opacity-20"
        >
          <ChevronLeft size={16} />
        </button>
        <button onClick={next} disabled={slide === SLIDES.length - 1}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background/90 text-muted-foreground backdrop-blur transition-all hover:text-foreground disabled:opacity-20"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Bottom nav */}
      <div className="shrink-0 flex items-center justify-between px-6 py-3 border-t border-border/40 bg-background">
        <button onClick={prev} disabled={slide === 0}
          className="flex items-center gap-1.5 font-body text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
        >
          <ChevronLeft size={14} />
          {slide > 0 ? SLIDES[slide - 1].label : ""}
        </button>
        <button onClick={next} disabled={slide === SLIDES.length - 1}
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
   Default export — standalone page wrapper
   ═══════════════════════════════════════════ */
export default function SystemUnificationCaseStudy() {
  return (
    <div className="min-h-screen bg-background">
      <SubpageNav />
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-16">
        <ExperienceUnificationCarousel />
      </main>
      <Footer />
    </div>
  );
}
