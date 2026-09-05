import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import {
  CasePlayer,
  Avatar,
  Sticky,
  KeyboardHint,
  TitleCredits,
  journeyBeats,
  type Frame,
  type Slide,
} from "@/components/case-player";

/* ══════════════════════════════════════════════════════════════
   EXPERIENCE UNIFICATION — slide-player case study.
   Engine lives in @/components/case-player.

   Thesis: the best design system isn't the one you invent, it's the
   one your organisation will actually adopt.

   This is the only one of the three studies with no user persona —
   the protagonist is the design team, so it narrates in "we" with
   Mahika as the face. Structure is a three-act reversal: the audit
   earns the right to be heard, the scoring makes it actionable, and
   then the system we built gets killed. The crash on slide 15 is the
   whole point; every beat before it exists to raise the fall.
   ══════════════════════════════════════════════════════════════ */

const ME = "Mahika · Design";

const AV = "/case-study/avatars";
const IMG = "/case-study/eu";

const M = {
  neutral: `${AV}/eu-mk-neutral.svg`,
  worried: `${AV}/eu-mk-worried.svg`,
  flat: `${AV}/eu-mk-flat.svg`,
  driven: `${AV}/eu-mk-driven.svg`,
  happy: `${AV}/eu-mk-happy.svg`,
  delighted: `${AV}/eu-mk-delighted.svg`,
  doubt: `${AV}/eu-mk-doubt.svg`,
  shocked: `${AV}/eu-mk-shocked.svg`,
  done: `${AV}/eu-mk-done.svg`,
};

/* Backdrop for the title slide. Swap this constant when the art lands —
   nothing else needs to change. Until then the title falls back to the
   player's default plate. */
const TITLE_ART: string | null = null;

/* ─────────────── frames ─────────────── */

const F_CHALLENGES: Frame = { src: `${IMG}/challenges.webp`, alt: "The eight fractures, each with its cost" };
const F_AUDIT: Frame      = { src: `${IMG}/audit-assess.webp`, alt: "Component inventory across the platform" };
const F_BUTTONS: Frame    = { src: `${IMG}/button-variations.webp`, alt: "Button variations across the application" };
const F_HUB: Frame        = { src: `${IMG}/unification-hub.webp`, alt: "Every application scored" };
const F_DEVGAP: Frame     = { src: `${IMG}/design-vs-dev.webp`, alt: "Proposed design against what shipped" };
const F_ROADMAP: Frame    = { src: `${IMG}/roadmap.webp`, alt: "Six-phase harmonisation path" };
const F_HARMONISED: Frame = { src: `${IMG}/current-vs-harmonised.webp`, alt: "The same screen rebuilt on Magnetic" };
const F_PILLARS: Frame    = { src: `${IMG}/state-of-platform.webp`, alt: "Three governance pillars" };

/* ─────────────── the story ─────────────── */

const SLIDES: Slide[] = [
  { kind: "title" },

  /* ══ ACT 1 — THE PROBLEM IS REAL, AND WE MADE IT MEASURABLE ══
     Establishes what the artifact actually is before any of the work:
     nobody commissioned this. There was no redesign project to join, so
     the audit is not diligence, it is ammunition for a room we did not
     control. Without that framing the manual count reads as thorough
     rather than necessary. Confidence falls through the diagnosis and
     only climbs once evidence replaces opinion. */

  {
    kind: "scene",
    avatar: M.neutral,
    who: ME,
    psych: 70,
    say: (
      <>
        Cisco Commerce isn't one product. It's <b>twenty applications</b> across eleven-plus
        verticals — sold to customers as a single platform.
      </>
    ),
  },
  {
    kind: "scene",
    avatar: M.worried,
    who: ME,
    psych: 58,
    say: (
      <>
        Open three of them side by side and you'd swear <b>three different companies</b> built
        them.
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_CHALLENGES,
    beat: "eight fractures",
    psych: 46,
    delta: -12,
    avatar: M.worried,
    who: ME,
    say: (
      <>
        Eight fractures. Every one with <b>a cost attached</b>.
      </>
    ),
  },
  {
    kind: "scene",
    avatar: M.flat,
    who: ME,
    psych: 40,
    say: (
      <>
        And nobody had asked us to fix it. No redesign project. No budget. <b>No mandate.</b>
      </>
    ),
  },
  {
    kind: "statement",
    avatar: M.driven,
    who: ME,
    psych: 36,
    say: (
      <>
        So this was never a design brief. It was <b>a case we had to build</b> — and carry to the
        people who own the platform.
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_AUDIT,
    beat: "we counted",
    psych: 50,
    delta: 14,
    avatar: M.driven,
    who: ME,
    say: (
      <>
        So we counted. <b>Twenty applications, twenty-one components</b> — by hand.
      </>
    ),
  },
  {
    kind: "card",
    variant: "principle",
    tag: "The method",
    title: "Zero AI, in the middle of the AI era",
    body: (
      <>
        Every screen in every application, read by two people. It was a rough, relentless
        stretch — and it is the only reason the findings were <b>undeniable</b>. We weren't
        presenting to our own team. We were asking a leadership group that had never budgeted
        for this to believe a problem existed, and <b>nobody argues with a count they can
        check</b>.
      </>
    ),
    behind: F_AUDIT,
    psych: 50,
  },
  {
    kind: "ui",
    frame: F_BUTTONS,
    beat: "the button wall",
    psych: 64,
    delta: 14,
    avatar: M.happy,
    who: ME,
    say: (
      <>
        Thirty ways to draw one button. <b>Now it isn't an opinion.</b>
      </>
    ),
  },

  /* ══ ACT 2 — TURN IT INTO A NUMBER LEADERSHIP CAN ACT ON ══ */

  {
    kind: "ui",
    frame: F_HUB,
    beat: "every app scored",
    psych: 78,
    delta: 14,
    avatar: M.delighted,
    who: ME,
    say: (
      <>
        Every app scored. <b>3.5 to 7.5</b> out of ten.
      </>
    ),
  },
  {
    kind: "statement",
    avatar: M.neutral,
    who: ME,
    psych: 78,
    say: (
      <>
        Current <b>13</b>. Harmonised <b>0</b>. Northstar <b>7</b>. A vague complaint became a
        portfolio.
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_DEVGAP,
    beat: "design ≠ shipped",
    psych: 70,
    delta: -8,
    avatar: M.doubt,
    who: ME,
    say: (
      <>
        Then the second gap: <b>what shipped wasn't what we designed.</b>
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_ROADMAP,
    beat: "a sequenced path",
    psych: 82,
    delta: 12,
    avatar: M.driven,
    who: ME,
    say: (
      <>
        Six phases, sequenced so <b>live users never feel it</b>.
      </>
    ),
  },

  /* ══ ACT 3 — KILL YOUR DARLING ══
     The reversal. Slide 14 is deliberately the highest point in the
     study so that slide 15 has somewhere to fall from. */

  {
    kind: "scene",
    avatar: M.happy,
    who: ME,
    psych: 92,
    say: (
      <>
        And we had built our own design system. Considered. Clean. <b>Ours.</b>
      </>
    ),
  },
  {
    kind: "statement",
    avatar: M.shocked,
    who: ME,
    psych: 38,
    say: <>Cisco didn't want it.</>,
  },
  {
    kind: "card",
    variant: "principle",
    tag: "Why it died",
    title: "Not because it was bad",
    body: (
      <>
        Adoption stalled — no other team would standardise on a system that wasn't
        Cisco-wide, and <b>Magnetic already was</b>. Meanwhile re-skinning twenty legacy
        applications in one go was financially out of the question. A good system nobody
        adopts is <b>an expensive opinion</b>.
      </>
    ),
    behind: F_ROADMAP,
    psych: 38,
  },
  {
    kind: "scene",
    avatar: M.doubt,
    who: ME,
    psych: 50,
    say: (
      <>
        So the question changed. Not <i>what should the system be</i> — but{" "}
        <b>how do we adopt one we can afford?</b>
      </>
    ),
  },
  {
    kind: "statement",
    avatar: M.driven,
    who: ME,
    psych: 74,
    say: (
      <>
        Don't invent. <b>Adopt.</b>
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_HARMONISED,
    beat: "the model works",
    psych: 84,
    delta: 10,
    avatar: M.happy,
    who: ME,
    say: (
      <>
        The same screen, rebuilt on Magnetic. <b>The model works.</b>
      </>
    ),
  },
  {
    kind: "card",
    variant: "call",
    tag: "My design call",
    title: "Magnetic by default. Migrate when touched.",
    body: (
      <>
        Two rules instead of one migration. Every new scope follows Magnetic from day one, so
        <b> the fragmentation stops growing immediately</b> — no new debt. Legacy apps never get
        a big-bang redesign; whenever a scope reopens one, we remodel that part.{" "}
        <b>Debt gets paid exactly where work is already happening</b>, which is the only place
        anyone will fund it.
      </>
    ),
    behind: F_HARMONISED,
    psych: 84,
  },
  {
    kind: "ui",
    frame: F_PILLARS,
    beat: "so it can't drift back",
    psych: 92,
    delta: 8,
    avatar: M.done,
    who: ME,
    say: <>Three pillars, so it can't drift back.</>,
  },

  /* ══ CLOSE ══ */

  {
    kind: "statement",
    avatar: M.neutral,
    who: ME,
    psych: 92,
    say: (
      <>
        <b>Zero</b> apps fully harmonised yet. Seven in design. Legacy gated on cost — not on
        the plan.
      </>
    ),
  },

  { kind: "summary" },
  { kind: "end" },
];

/* ─────────────── title ─────────────── */

function TitleSlide() {
  return (
    <div className="relative h-full">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {TITLE_ART && (
          <img
            src={TITLE_ART}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: 0.66 }}
          />
        )}
        <span
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(58% 56% at 50% 47%, rgba(8,8,7,.92) 0%, rgba(8,8,7,.78) 42%, rgba(8,8,7,.40) 76%, rgba(8,8,7,.22) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-9 flex items-end justify-center"
        >
          <Avatar src={M.worried} size="clamp(68px,16vh,150px)" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="max-w-[18ch] font-serif text-[34px] font-bold leading-[1.06] tracking-tight text-white sm:text-[54px]"
        >
          The Design System We&nbsp;Killed
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <TitleCredits
            project="Commerce Experience Unification"
            client="Cisco"
            role="Co-auditor, with my lead"
            run="2 months"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex items-center gap-2.5 font-body text-[13px] font-medium uppercase tracking-[0.14em] text-white/40 sm:text-[14px]"
        >
          <Clock size={16} strokeWidth={1.5} /> Story duration: 4 min
        </motion.p>
      </div>
      <KeyboardHint />
    </div>
  );
}

/* ─────────────── summary ─────────────── */

function SummarySlide() {
  const beats = useMemo(() => journeyBeats(SLIDES), []);
  return (
    <div className="relative mx-auto flex h-full max-w-5xl flex-col justify-center px-6 py-16">
      <p className="mb-2 font-body text-[12px] font-bold uppercase tracking-[0.16em] text-amber-300">
        The whole arc
      </p>
      <h2 className="mb-10 max-w-[22ch] font-serif text-[30px] font-bold leading-[1.1] tracking-tight text-white sm:text-[42px]">
        Confidence is not a straight line.
      </h2>
      <Sticky beats={beats} />
    </div>
  );
}

/* ─────────────── end ─────────────── */

function EndSlide() {
  return (
    <div className="relative mx-auto flex h-full max-w-4xl flex-col justify-center px-6 py-16">
      <p className="mb-3 font-body text-[12px] font-bold uppercase tracking-[0.16em] text-amber-300">
        What it taught us
      </p>

      <h2 className="max-w-[24ch] font-serif text-[30px] font-bold leading-[1.12] tracking-tight text-white sm:text-[44px]">
        The best design system isn't the one you invent. It's the one your organisation will
        actually adopt.
      </h2>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <div className="rounded-xl border border-white/20 bg-white/[0.06] px-6 py-6 text-left">
          <p className="mb-3 font-body text-[12px] font-bold uppercase tracking-[0.14em] text-amber-300 sm:text-[13px]">
            Shipped
          </p>
          <p className="font-body text-[15.5px] leading-relaxed text-white/85 sm:text-[17px]">
            A 20-app audit and scoring baseline, a Current → Harmonised → Northstar map, a
            six-phase migration path, and <b className="text-white">Magnetic by default</b> for
            every new scope.
          </p>
        </div>
        <div className="rounded-xl border border-white/20 bg-white/[0.06] px-6 py-6 text-left">
          <p className="mb-3 font-body text-[12px] font-bold uppercase tracking-[0.14em] text-amber-300 sm:text-[13px]">
            Honest state
          </p>
          <p className="font-body text-[15.5px] leading-relaxed text-white/85 sm:text-[17px]">
            Zero applications fully harmonised. Seven in design.{" "}
            <b className="text-white">Legacy migration is gated on cost, not on the plan.</b>
          </p>
        </div>
      </div>

      <p className="mt-8 max-w-2xl font-body text-[15.5px] leading-relaxed text-white/70 sm:text-[17px]">
        This was our first project at Copan, and the one that argued its way to platform
        leadership. Unification turned out to be{" "}
        <b className="text-white">an economics and governance problem</b> wearing a design
        problem's clothes.
      </p>

      <Link
        to="/#work"
        className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-body text-[15px] font-semibold text-slate-900 shadow-[0_10px_30px_-8px_rgba(0,0,0,.7)] transition hover:bg-white/90"
      >
        <ArrowLeft size={16} strokeWidth={2.4} className="transition-transform group-hover:-translate-x-0.5" />
        Back to all work
      </Link>
    </div>
  );
}

/* ─────────────── player ─────────────── */

export default function SystemUnificationCaseStudy() {
  return (
    <CasePlayer
      slides={SLIDES}
      fallbackAvatar={M.neutral}
      defaultBackdrop="/case-study/office-bg.webp"
      renderTitle={() => <TitleSlide />}
      renderSummary={() => <SummarySlide />}
      renderEnd={() => <EndSlide />}
    />
  );
}
