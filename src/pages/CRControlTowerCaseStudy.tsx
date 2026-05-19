import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mahikaReflection from "@/assets/mahika-reflection.png";
import { SubpageNav } from "@/components/SubpageNav";
import { Footer } from "@/components/Footer";
import { ChevronLeft, ChevronRight, Activity, BarChart3, Database, Users, X } from "lucide-react";

/* ═══════════════════════════════════════════
   SLIDE 1 — THE PROJECT
   ═══════════════════════════════════════════ */
function SlideProject() {
  return (
    <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center px-6 py-4">
      <div>
        <motion.p
          className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        >
          Enterprise Analytics · Cisco Systems · Active
        </motion.p>
        <motion.h1
          className="font-serif text-4xl sm:text-5xl font-semibold text-foreground tracking-tight leading-[1.08] mb-5"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, duration: 0.5 }}
        >
          CR Control Tower
        </motion.h1>
        <motion.p
          className="font-body text-base text-muted-foreground leading-relaxed mb-8"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.5 }}
        >
          The first consolidated visibility dashboard for Customer Records data
          health — pulling from 15 source systems into one place. Built by two
          designers from a 17-minute stakeholder recording, with a backend team
          still building the data layer in parallel.
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22, duration: 0.5 }}
        >
          {[
            { n: "15",       l: "source systems consolidated" },
            { n: "2",        l: "designers on the project" },
            { n: "Phase 1",  l: "visibility shipped" },
            { n: "Phase 2",  l: "actionability — coming" },
          ].map((s) => (
            <div key={s.n}>
              <p className="font-serif text-2xl font-bold text-primary">{s.n}</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Three-tier hierarchy visual */}
      <motion.div
        className="flex flex-col items-center gap-3 w-full max-w-xs mx-auto"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.18, duration: 0.6 }}
      >
        {[
          { label: "At a Glance",   sub: "How bad is it?",              w: "100%", shade: 0.9 },
          { label: "Data Quality",  sub: "Where is it coming from?",    w: "84%",  shade: 0.7 },
          { label: "Demographics",  sub: "Is it getting better?",       w: "68%",  shade: 0.5 },
        ].map((tier, i) => (
          <motion.div
            key={tier.label}
            className="flex items-center gap-3 rounded-xl px-5 py-3.5"
            style={{
              width: tier.w,
              background: `rgba(13,148,136,${tier.shade * 0.22 + 0.08})`,
              border: `1px solid rgba(13,148,136,${tier.shade * 0.3})`,
              boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: "backOut" }}
          >
            <div className="min-w-0">
              <p className="font-serif text-sm font-semibold text-foreground">{tier.label}</p>
              <p className="font-mono text-[10px] text-muted-foreground">{tier.sub}</p>
            </div>
          </motion.div>
        ))}
        <motion.p
          className="font-mono text-xs text-muted-foreground text-center mt-1"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
        >
          three tiers · three questions · phase 1
        </motion.p>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 2 — MY ROLE
   ═══════════════════════════════════════════ */
const DELIVERABLES = [
  { icon: Database,  label: "Dashboard Architecture", desc: "Designed the 3-tier hierarchy — At a Glance, Data Quality, Demographics — mapping each view to the questions ops leads actually asked" },
  { icon: BarChart3, label: "Chart & Metric Design",  desc: "Decided what to surface, what to defer, and when a bar chart was a crutch vs the right answer. Pushed back on trend-lining everything" },
  { icon: Users,     label: "Backend Collaboration",  desc: "Worked with data engineers to align on what was computable vs desirable. Design changed when data changed — and vice versa" },
  { icon: Activity,  label: "Scope Negotiation",      desc: "Held the line on Phase 1 = visibility only. Documented what got deferred and why, so Phase 2 doesn't start from scratch" },
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
            Co-Lead UX
          </span>
        </div>
        <div>
          <p className="font-serif text-lg font-semibold text-foreground">Mahika Kaushik</p>
          <p className="font-body text-sm text-muted-foreground">UX Design · Cisco Systems</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Dashboard Design", "Data Viz", "Scope Mgmt", "Eng Collab"].map((tag) => (
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
    { text: "15 source systems",     sub: "no shared health view",               x: "2%",  y: "4%",  rot: -5  },
    { text: "8000 bucket",           sub: "~400 unresolved party IDs / day",      x: "60%", y: "2%",  rot: 6   },
    { text: "Manual weekly reports", sub: "already stale on arrival",             x: "2%",  y: "54%", rot: -3  },
    { text: "Duplicate GUIDs",       sub: "across 8 source systems",              x: "65%", y: "54%", rot: 5   },
    { text: "Data or UI change?",    sub: "nobody knew which to fix first",       x: "30%", y: "76%", rot: -4  },
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
          The data existed across 15 systems. None of it talked to each other.
        </motion.h2>
        <motion.p
          className="font-body text-base text-muted-foreground leading-relaxed mb-6"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, duration: 0.5 }}
        >
          Customer Records data was fragmented across 15 source systems with no
          consolidated view. The 8000 bucket — unresolved party IDs stuck in
          a holding geo — accumulated ~400 records daily. Ops teams caught
          problems after deals broke, not before. And there was no first place
          to even look.
        </motion.p>
        <motion.div
          className="flex gap-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22, duration: 0.5 }}
        >
          <div>
            <p className="font-serif text-2xl font-bold" style={{ color: "hsl(var(--destructive))" }}>~400</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">unresolved records / day</p>
          </div>
          <div>
            <p className="font-serif text-2xl font-bold" style={{ color: "hsl(var(--destructive))" }}>0</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">shared views before this</p>
          </div>
        </motion.div>
      </div>

      {/* Fragment cloud */}
      <div className="relative h-[320px] w-full">
        {fragments.map((f, i) => (
          <motion.div
            key={i}
            className="absolute rounded-xl border border-border/60 bg-card px-4 py-3"
            style={{ left: f.x, top: f.y, transform: `rotate(${f.rot}deg)`, maxWidth: 180 }}
            initial={{ opacity: 0, scale: 0.8, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: "backOut" }}
          >
            <p className="font-mono text-[11px] font-semibold text-foreground">{f.text}</p>
            <p className="font-body text-xs text-muted-foreground mt-0.5 leading-snug">{f.sub}</p>
          </motion.div>
        ))}
        {/* Connecting lines hint */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
        >
          <svg width="100%" height="100%" className="absolute inset-0">
            {[[120,80,220,150],[80,180,200,200],[260,60,200,150],[60,260,220,220]].map(([x1,y1,x2,y2], i) => (
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
   The honest version
   ═══════════════════════════════════════════ */
const STEPS = [
  {
    n: "01",
    label: "17 Minutes",
    desc: "Our entire source of truth was a 17-minute stakeholder recording. Two designers mapped every ask, every implied need, every pain point from those minutes into a working brief. No follow-up session for weeks.",
    delay: 0.12,
  },
  {
    n: "02",
    label: "Design Before Data",
    desc: "The backend team had no data yet — they were building the pipelines in parallel. We designed against what should exist. They built toward what could exist. We met in the middle over two months of weekly syncs.",
    delay: 0.22,
  },
  {
    n: "03",
    label: "The Fight",
    desc: "We pushed for actionability — a dashboard that tells you what to do next. The business pushed for visibility — just show everything. New metrics arrived weekly. Everything became a bar chart. We said: it's not actionable. They said: we need visibility first.",
    delay: 0.32,
  },
  {
    n: "04",
    label: "The Tradeoff",
    desc: "We landed on a compromise: Phase 1 ships visibility only. Actionability is documented, scoped, and waiting for Phase 2. It's not what we wanted. But it's the right call for where the product and data both are right now.",
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
          Design and data were built simultaneously — neither waiting for the other.
        </motion.h2>
        <motion.div
          className="space-y-3 mb-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.14, duration: 0.5 }}
        >
          <div className="rounded-xl border border-amber-200 bg-amber-50/60 px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-amber-700 mb-0.5">Our position</p>
            <p className="font-body text-sm text-amber-900">"This isn't actionable — users won't know what to do."</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Their position</p>
            <p className="font-body text-sm text-foreground">"We need visibility first. Action is Phase 2."</p>
          </div>
          <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-primary mb-0.5">Common ground</p>
            <p className="font-body text-sm text-foreground">Visibility ships. Actionability is scoped and documented for Phase 2.</p>
          </div>
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
   Honest version + dashboard screen
   ═══════════════════════════════════════════ */
const SOURCES = [
  { name: "CCW Suite",       pct: 100, color: "#EF4444" },
  { name: "Sales CRM",       pct: 66,  color: "#F59E0B" },
  { name: "Deal Mgmt",       pct: 47,  color: "#04A4B0" },
  { name: "Coverage",        pct: 26,  color: "#6366F1" },
];

function DashboardScreen() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-foreground/[0.07] bg-background shadow-xl" style={{ maxWidth: 420 }}>
      {/* Chrome */}
      <div className="flex items-center gap-2 border-b border-foreground/[0.06] bg-muted/30 px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
        <div className="h-2.5 w-2.5 rounded-full bg-accent-gold/40" />
        <div className="h-2.5 w-2.5 rounded-full bg-primary/40" />
        <span className="ml-3 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">CR Control Tower · At a Glance</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-foreground/[0.06] bg-muted/10 px-4">
        {["At a Glance", "Data Quality", "Demographics"].map((tab, i) => (
          <div key={tab} className="px-3 py-2 font-mono text-[9px]"
            style={{
              borderBottom: i === 0 ? "2px solid hsl(var(--primary))" : "2px solid transparent",
              color: i === 0 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Health banner */}
      <motion.div
        className="mx-4 mt-4 rounded-xl border border-foreground/[0.06] bg-card p-4"
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
      >
        <p className="font-mono text-[10px] text-foreground/70 mb-1">
          15 source systems · data health overview
        </p>
        <p className="font-mono text-[9px] text-muted-foreground mb-3">
          ~400 party IDs entering 8000 bucket / day · Phase 1 visibility
        </p>
        <div className="flex flex-wrap gap-1.5">
          {[
            { l: "Systems", v: "15",      c: "#6366F1" },
            { l: "8000 Bucket", v: "~400/day", c: "#EF4444" },
            { l: "Theaters", v: "4",      c: "#04A4B0" },
            { l: "Phase", v: "1 of 2",  c: "#10B981" },
          ].map((c) => (
            <span key={c.l} className="rounded-full px-2.5 py-1 font-mono text-[9px]"
              style={{ background: `${c.c}1A`, color: c.c }}
            >
              {c.l}: <strong>{c.v}</strong>
            </span>
          ))}
        </div>
      </motion.div>

      {/* Top sources */}
      <div className="mx-4 mt-3 mb-4">
        <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground mb-2">Pollution by Source System</p>
        <div className="space-y-2.5">
          {SOURCES.map((s, i) => (
            <motion.div key={s.name} className="flex items-center gap-2"
              initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.07 }}
            >
              <span className="font-mono text-[9px] text-muted-foreground w-24 shrink-0">{s.name}</span>
              <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: s.color }}
                  initial={{ width: 0 }} animate={{ width: `${s.pct}%` }}
                  transition={{ delay: 0.35 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Phase badge */}
      <div className="flex items-center justify-between border-t border-foreground/[0.04] bg-muted/20 px-4 py-2">
        <span className="font-mono text-[9px] text-muted-foreground">Actionability → Phase 2</span>
        <span className="font-mono text-[9px] font-semibold" style={{ color: "#F59E0B" }}>● In Development</span>
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
          The first single view of CR data health. Phase 1. Shipped.
        </motion.h2>
        <motion.p
          className="font-body text-base text-muted-foreground leading-relaxed mb-6"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, duration: 0.5 }}
        >
          Visibility landed. Ops teams have one place to look now — not fifteen.
          The 8000 bucket, pollution by source, duplicate clusters, theater breakdown:
          all visible, for the first time, in one dashboard.
        </motion.p>

        {/* Honest reflection */}
        <motion.blockquote
          className="border-l-2 border-amber-400/50 pl-4 mb-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22, duration: 0.5 }}
        >
          <p className="font-serif text-sm italic text-muted-foreground leading-relaxed">
            "I'm not fully happy with it. We wanted to tell people what to do next —
            not just what's happening. But you can't skip to actionability when the
            underlying data is still being built. Visibility first was the right call.
            Phase 2 is documented and waiting."
          </p>
        </motion.blockquote>

        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}
        >
          {[
            { val: "15 systems",  label: "Consolidated into one view"    },
            { val: "3 tiers",     label: "At a Glance · DQ · Demo"       },
            { val: "Phase 1",     label: "Visibility delivered"           },
            { val: "Phase 2",     label: "Actionability — scoped & next"  },
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
        <DashboardScreen />
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
   CRControlTowerCarousel — named export
   ═══════════════════════════════════════════ */
export function CRControlTowerCarousel({ onClose }: { onClose?: () => void }) {
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
   DEFAULT EXPORT — standalone page
   ═══════════════════════════════════════════ */
export default function CRControlTowerCaseStudy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SubpageNav label="Case Study" darkSectionId="hero-dark" />
      <div className="flex-1 flex items-center justify-center py-10 px-4">
        <CRControlTowerCarousel />
      </div>
      <Footer />
    </div>
  );
}
