import React, { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Clock } from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   UNIFIED CUSTOMER DEFINITION — slide-player case study
   Growth.design format: full-viewport slides, keyboard driven,
   psych meter, avatars with expressions, sticky dialogue,
   principle cards that blur the screen behind them.

   Two card voices, deliberately distinct:
     UX PRINCIPLE  — the psychology (violet)
     MY DESIGN CALL — Mahika's decision + why (teal)
   So a reader always knows which is research and which is hers.
   ══════════════════════════════════════════════════════════════ */

/* Personas — declared once so a label can never drift between slides. */
const STEWARD = "Priya · Data Steward";
const APPROVER = "Marcus · Approver";
const SYSTEM = "The System";

const AV = "/case-study/avatars";
const IMG = "/case-study/ucd";
const SYS_AV = `${AV}/system.svg`; // the system has a face

const P = {
  neutral: `${AV}/priya-neutral.svg`,
  happy: `${AV}/priya-happy.svg`,
  worried: `${AV}/priya-worried.svg`,
  flat: `${AV}/priya-flat.svg`,
  angry: `${AV}/priya-angry.svg`,
  delighted: `${AV}/priya-delighted.svg`,
  doubt: `${AV}/priya-doubt.svg`,
  done: `${AV}/priya-done.svg`,
};
const A = {
  neutral: `${AV}/appr-neutral.svg`,
  worried: `${AV}/appr-worried.svg`,
  happy: `${AV}/appr-happy.svg`,
  explain: `${AV}/appr-explain.svg`,
};

/* ─────────────── slide model ─────────────── */

type Frame = {
  src?: string;
  node?: ReactNode;
  alt?: string;
  wide?: boolean;
  /** Region to keep lit while the rest of the screen darkens, in % of the image. */
  spot?: { x: string; y: string; w: string; h: string };
  /** Override --screenscale for this frame only. */
  scale?: string;
};

type Slide =
  | { kind: "title" }
  | {
      kind: "scene";
      avatar?: string;
      who?: string;
      say: ReactNode;
      psych?: number;
      /** Full-bleed illustration in place of the office plate. */
      backdrop?: string;
      /** Where the thought sits. Defaults to bottom-left beside the avatar. */
      callout?: "top";
    }
  | {
      kind: "ui";
      frame: Frame;
      psych: number;
      /** Label this point on the summary graph. */
      beat?: string;
      delta?: number;
      avatar: string;
      who?: string;
      say: ReactNode;
      circle?: { x: string; y: string; w: string; h: string };
      pointer?: { x: string; y: string };
      /** A region of this same screen, raised forward while the base dims. */
      detail?: { src: string; x?: string; r?: string; y?: string; h?: string };
    }
  | {
      kind: "card";
      variant: "principle" | "call";
      tag: string;
      title: string;
      body: ReactNode;
      refs?: string[];
      behind: Frame;
      psych: number;
      /** Lift a region of `behind` forward; the rest dims instead of blurring. */
      detail?: { src: string; x?: string; r?: string; y?: string; h?: string };
      /** Leave the screen untouched and let the card overlap it. */
      sharp?: boolean;
    }
  | {
      kind: "statement";
      /** Optional speaker mark above the line. */
      avatar?: string;
      who?: string;
      say: ReactNode;
      psych?: number;
    }
  | { kind: "summary" }
  | { kind: "end" };

/* ─────────────── in-slide mock screens ─────────────── */

function ComplianceMock() {
  const rows = [
    ["Peel Piper Inc.", 72, 4, "Needs attention", "gold"],
    ["Wayne Enterprises", 36, 5, "Critical", "bad"],
    ["Initech", 63, 3, "Needs attention", "gold"],
    ["Globex Inc.", 91, 1, "Healthy", "good"],
    ["Soylent Corp.", 55, 4, "Needs attention", "gold"],
  ] as const;
  const bar = (t: string) =>
    t === "bad" ? "bg-red-500" : t === "good" ? "bg-emerald-500" : "bg-amber-500";
  const txt = (t: string) =>
    t === "bad" ? "text-red-600" : t === "good" ? "text-emerald-600" : "text-amber-600";
  return (
    <div className="w-full overflow-hidden rounded-xl bg-white text-slate-900 shadow-2xl">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-slate-400">
          Policy Studio · Compliance
        </span>
      </div>
      <div className="px-5 py-4">
        <div className="grid grid-cols-[1fr_84px_44px_112px] gap-3 border-b border-slate-200 pb-2 font-mono text-[9px] uppercase tracking-wider text-slate-400">
          <span>Customer</span>
          <span>Health</span>
          <span>Viol.</span>
          <span>Status</span>
        </div>
        {rows.map(([name, h, v, status, tone]) => (
          <div
            key={name}
            className="grid grid-cols-[1fr_84px_44px_112px] items-center gap-3 border-b border-slate-100 py-2.5 last:border-0"
          >
            <span className="truncate text-[13px]">{name}</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-11 overflow-hidden rounded-full bg-slate-200">
                <span className={`block h-full ${bar(tone)}`} style={{ width: `${h}%` }} />
              </span>
              <span className="font-mono text-[10px] text-slate-500">{h}</span>
            </span>
            <span className="font-mono text-[11px] text-slate-600">{v}</span>
            <span className={`font-mono text-[10px] font-bold ${txt(tone)}`}>{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** The two ways to clear one violation, drawn as journeys. */
function StepPathsChart() {
  const paths = [
    {
      name: "Raise an exception",
      total: 12,
      steps: [
        ["select violation", 2],
        ["raise exception", 3],
        ["answer 5 questions", 8],
        ["upload a document", 11],
        ["submit", 12],
      ] as [string, number][],
      wait: -1,
    },
    {
      name: "Create a proposal",
      total: 20,
      steps: [
        ["select violation", 2],
        ["add to cart", 3],
        ["make changes", 8],
        ["run validation", 9],
        ["fix errors", 14],
        ["submit", 15],
        ["review impact", 19],
        ["submit", 20],
      ] as [string, number][],
      wait: 3,
    },
  ];

  const W = 900, H = 102, MAX = 20;
  const tone = (v: number) => (v <= 6 ? "#4ade80" : v <= 13 ? "#fbbf24" : "#f87171");

  return (
    <div className="flex w-full flex-col gap-8" style={{ marginTop: -24, marginBottom: 72 }}>
      <div className="mb-0.5">
        <p
          className="font-body font-bold uppercase tracking-[0.16em] text-white/45"
          style={{ fontSize: "clamp(9px,1.3vh,12px)" }}
        >
          Clearing one violation
        </p>
        <p
          className="mt-1 font-serif font-semibold leading-tight tracking-tight text-white"
          style={{ fontSize: "clamp(15px,2.3vh,23px)" }}
        >
          Two paths to a correction. Neither of them is short.
        </p>
      </div>
      {paths.map((p) => {
        const step = W / Math.max(p.steps.length - 1, 1);
        const xy = p.steps.map(([, v], i) => [i * step, H - (v / MAX) * H] as const);
        return (
          <div key={p.name}>
            <div className="mb-1 flex items-baseline justify-between px-1">
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-body text-[11px] font-semibold text-white/85">
                {p.name}
              </span>
              <span className="font-serif text-[21px] font-bold leading-none" style={{ color: tone(p.total) }}>
                {p.total} <span className="font-body text-[12px] font-medium text-white/45">clicks</span>
              </span>
            </div>
            <svg viewBox={`-8 -12 ${W + 40} ${H + 62}`} className="w-full">
              <defs>
                <marker id={`ah-${p.total}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M0 0 L10 5 L0 10 z" fill="rgba(255,255,255,.45)" />
                </marker>
              </defs>
              <line x1="0" y1={H} x2={W + 24} y2={H} stroke="rgba(255,255,255,.4)" strokeWidth="2" markerEnd={`url(#ah-${p.total})`} />
              {xy.slice(0, -1).map(([x1, y1], i) => {
                const [x2, y2] = xy[i + 1];
                return (
                  <motion.line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={tone(p.steps[i + 1][1])}
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.25 }}
                  />
                );
              })}
              {xy.map(([x, y], i) => (
                <motion.circle
                  key={i} cx={x} cy={y} r="5.5"
                  fill={tone(p.steps[i][1])} stroke="#0d0c0b" strokeWidth="1.5"
                  initial={{ r: 0 }} animate={{ r: 5.5 }}
                  transition={{ delay: 0.2 + i * 0.07, type: "spring", stiffness: 300, damping: 16 }}
                />
              ))}
              {p.wait >= 0 && (
                <g transform={`translate(${p.wait * step}, ${H - (p.steps[p.wait][1] / MAX) * H})`}>
                  <line x1="0" y1="0" x2="0" y2="-26" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="4" y="-30" fill="#fbbf24" fontSize="13" fontWeight="600">⏳ ~2 min wait</text>
                </g>
              )}
              {p.steps.map(([label], i) => {
                const low = i % 2 === 1;
                return (
                  <g key={label + i}>
                    {low && (
                      <line
                        x1={i * step} y1={H + 4} x2={i * step} y2={H + 26}
                        stroke="rgba(255,255,255,.22)" strokeWidth="1"
                      />
                    )}
                    <text
                      x={i * step}
                      y={low ? H + 40 : H + 22}
                      textAnchor={
                        i === 0 ? "start" : i === p.steps.length - 1 ? "end" : "middle"
                      }
                      fill="rgba(255,255,255,.5)"
                      fontSize="13"
                    >
                      {label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        );
      })}
    </div>
  );
}

const F_SHEETS: Frame = {
  src: `${IMG}/before-excel-stack.webp`,
  alt: "A stack of overlapping spreadsheets — the fifty-odd sheets the hierarchy actually lived in",
};
const F_CUSTLIST: Frame = {
  src: `${IMG}/before-customer-list-full.webp`,
  alt: "Legacy customer list — every row flagged for whether something changed",
};
const F_BOOKINGS: Frame = {
  src: `${IMG}/before-bookings-panel.webp`,
  alt: "Booking figures attached to a single customer — year to date, prior year, three-year average",
};
const F_TREE: Frame = {
  src: `${IMG}/ucd-hierarchy-new.webp`,
  alt: "Customer Manager — the full customer hierarchy, C1 down to party level, with cross-level search",
};
const F_CART: Frame = { src: `${IMG}/ucd-proposal-create.webp`, alt: "Proposal creation" };
const F_IMPACT: Frame = {
  src: `${IMG}/ucd-impact-new.webp`,
  alt: "Proposal details — territory impact with losing and gaining entities, and coverage dropped with value at risk",
};
const F_QUEUE_APPR: Frame = { src: `${IMG}/ucd-flow-2-assigned.webp`, alt: "Assigned to me" };
const F_ROUTING: Frame = { src: `${IMG}/ucd-flow-5-routing.webp`, alt: "Approval routing" };
const F_HEALTH: Frame = {
  src: `${IMG}/ucd-health-dashboard.webp`,
  alt: "Health Dashboard — one score derived from open violations, their severity and the bookings behind them",
};
const F_CLICKS: Frame = { node: <StepPathsChart />, wide: true };
const F_DECISIONS: Frame = {
  scale: "60%",
  src: `${IMG}/ucd-phase2-decisions.webp`,
  alt: "Needs your decision — each violation with its recommended action and a single control",
};
const F_Q2: Frame = {
  src: `${IMG}/ucd-phase2-queue.webp`,
  alt: "Phase 2 — a queue of decisions, each with the fix already drafted and one control to accept it",
};

/* ─────────────── the story ─────────────── */

const SLIDES: Slide[] = [
  { kind: "title" },

  {
    kind: "scene",
    backdrop: "/case-study/crowd-definitions.webp",
    avatar: P.neutral,
    who: STEWARD,
    say: (
      <>
        Eleven teams here define <b>“customer”</b> differently. Every one of them is right.
      </>
    ),
  },
  {
    kind: "scene",
    backdrop: "/case-study/crowd-thinking.webp",
    avatar: P.worried,
    who: STEWARD,
    say: <>Which is lovely, until someone asks me who owns an account…</>,
  },
  {
    kind: "ui",
    frame: F_SHEETS,
    beat: "fifty spreadsheets",
    psych: 50,
    avatar: P.flat,
    who: STEWARD,
    say: <>…and the answer lives in here. Fifty-odd sheets, and none of them is <b>the</b> one.</>,
  },
  {
    kind: "ui",
    frame: F_CUSTLIST,
    psych: 36,
    delta: -14,
    avatar: P.worried,
    who: STEWARD,
    say: (
      <>
        Then an acquisition closes. A company has to move under a <b>different parent</b>.
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_CUSTLIST,
    detail: { src: `${IMG}/before-bookings-panel.webp`, r: "calc(9% - 30px)", y: "15%", h: "64%" },
    psych: 20,
    delta: -16,
    avatar: P.angry,
    who: STEWARD,
    say: (
      <>
        Across fifty sheets. By hand. Moving <b>millions in bookings</b> and hoping nothing snaps.
      </>
    ),
  },
  {
    kind: "card",
    variant: "principle",
    tag: "#UX PRINCIPLE",
    title: "The Gulf of Evaluation",
    body: (
      <>
        Priya could see the company she had to move. She couldn't see the bookings, territories and
        commissions hanging off it.
        <br />
        <br />
        So the only way to learn what a change broke was to <b>make it and wait for a complaint</b>.
      </>
    ),
    refs: ["Norman — The Design of Everyday Things (1988)", "The gulfs of execution and evaluation"],
    behind: F_CUSTLIST,
    psych: 20,
  },
  {
    kind: "card",
    variant: "call",
    tag: "#MY DESIGN CALL",
    title: "Two months, zero pixels",
    body: (
      <>
        I read all fifty-plus sheets before drawing anything, asking what every column meant.
        <br />
        <br />
        Then we built the first prototype with <b>no PRD and no brief</b>. Ten months on, it's still
        the reference.
      </>
    ),
    behind: F_SHEETS,
    psych: 20,
  },

  {
    kind: "ui",
    frame: F_TREE,
    beat: "one hierarchy",
    psych: 54,
    delta: 34,
    avatar: P.delighted,
    who: STEWARD,
    say: <>Oh. It's <b>all here</b> — the whole tree, and I can search inside it.</>,
  },
  {
    kind: "card",
    variant: "principle",
    tag: "#UX PRINCIPLE",
    title: "Recognition Over Recall",
    body: (
      <>
        Remembering where a company sits in a tree is a recall task. Recall is slow and error-prone.
        <br />
        <br />
        Showing the full path with every result turns it into <b>recognition</b> — you know it when
        you see it.
      </>
    ),
    refs: ["Nielsen — Heuristic #6", "Recognition rather than recall"],
    behind: F_TREE,
    psych: 54,
  },
  {
    kind: "card",
    variant: "call",
    tag: "#MY DESIGN CALL",
    title: "Search every level. Open collapsed.",
    body: (
      <>
        Search reaches every tier, not just parents. A steward rarely knows which parent a company
        sits under — that's usually what they're looking for.
        <br />
        <br />
        And the tree opens <b>collapsed</b>. Eighteen levels expanded is a wall.
      </>
    ),
    behind: F_TREE,
    psych: 54,
  },
  {
    kind: "ui",
    frame: F_CART,
    psych: 62,
    delta: 8,
    avatar: P.happy,
    who: STEWARD,
    say: <>I can put the <b>whole merger</b> in one request instead of forty.</>,
  },
  {
    kind: "card",
    variant: "call",
    tag: "#MY DESIGN CALL",
    title: "A cart, not a form",
    body: (
      <>
        Corrections arrive in clusters. A merger moves a parent and everything under it.
        <br />
        <br />
        One request per node would <b>multiply the paperwork by the size of the problem</b>.
      </>
    ),
    behind: F_CART,
    psych: 62,
  },
  {
    kind: "ui",
    frame: F_IMPACT,
    beat: "impact up front",
    psych: 78,
    delta: 16,
    avatar: P.delighted,
    who: STEWARD,
    say: <>And it tells me what I'm about to break — <b>before</b> I break it.</>,
  },
  {
    kind: "card",
    variant: "call",
    tag: "#MY DESIGN CALL",
    title: "Impact, in money",
    body: (
      <>
        Consequences shown as a list get argued with. Shown as <b>$8.2M across 22 parties</b>, they
        get a decision.
        <br />
        <br />
        The table colours what's lost against what's gained, so an approver sees their own exposure
        first.
      </>
    ),
    behind: {
      ...F_IMPACT,
      spot: { x: "9%", y: "34.5%", w: "90%", h: "64%" },
    },
    psych: 78,
  },
  {
    kind: "card",
    variant: "principle",
    tag: "#UX PRINCIPLE",
    title: "Loss Aversion",
    body: (
      <>
        Showing what a change will cost moves people more than showing what it achieves.
        <br />
        <br />
        Priya doesn't need convincing the move matters. She needs to see <b>the records that travel
        with it</b>.
      </>
    ),
    refs: ["Kahneman & Tversky (1979)", "Prospect Theory: An Analysis of Decision under Risk"],
    behind: F_IMPACT,
    psych: 78,
  },
  {
    kind: "statement",
    avatar: SYS_AV,
    who: SYSTEM,
    psych: 78,
    say: (
      <>
        So who gets to decide what goes <em>into</em> the system? And what stops everyone filing
        proposals nobody asked for?
      </>
    ),
  },
  {
    kind: "statement",
    avatar: A.neutral,
    who: APPROVER,
    psych: 78,
    say: (
      <>
        Meet Marcus. Nothing moves on his territory until <em>he</em> signs it.
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_QUEUE_APPR,
    psych: 78,
    avatar: A.happy,
    who: APPROVER,
    say: (
      <>
        And now it just <b>lands in my queue</b> — my patch, my numbers. Not an email thread with
        screenshots attached as proof.
      </>
    ),
  },
  {
    kind: "card",
    variant: "principle",
    tag: "#UX PRINCIPLE",
    title: "Diffusion of Responsibility",
    body: (
      <>
        Route a change to “the pool” and nobody owns it. The more people who could act, the fewer
        who do.
        <br />
        <br />
        So the queue splits three ways. <b>Only one tab carries your name</b>, and it's the one that
        gets cleared.
      </>
    ),
    refs: ["Darley & Latané (1968)", "Bystander intervention in emergencies"],
    behind: F_QUEUE_APPR,
    psych: 78,
  },
  {
    kind: "ui",
    frame: F_ROUTING,
    beat: "approvals route",
    psych: 82,
    delta: 4,
    avatar: A.explain,
    who: APPROVER,
    say: <>Right — I only sign off <b>my patch</b>. And I can see who else is deciding.</>,
  },
  {
    kind: "card",
    variant: "call",
    tag: "#MY DESIGN CALL",
    title: "N approvers for N territories",
    body: (
      <>
        Each approver sees exactly what the proposer saw. Different views of the same change is how
        two people agree to different things.
        <br />
        <br />
        Rejection <b>needs a reason</b>, and the reason travels back.
      </>
    ),
    behind: F_ROUTING,
    psych: 82,
  },

  {
    kind: "ui",
    frame: {
      src: `${IMG}/ucd-alerts-panel.webp`,
      alt: "Alerts and notifications — the system reporting its own declining health",
    },
    avatar: P.worried,
    who: STEWARD,
    say: (
      <>
        Every proposal was correct. Every one signed. And the health score is{" "}
        <b>72%, and falling</b>.
      </>
    ),
    psych: 82,
  },
  {
    kind: "statement",
    avatar: SYS_AV,
    who: SYSTEM,
    psych: 82,
    say: (
      <>
        1,500 new customers arrive every day, and some fail the checks on the way in. Keeping this
        score up was never <em>one</em> person's job — it's every steward's, and every approver's.
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_HEALTH,
    psych: 82,
    avatar: P.worried,
    who: STEWARD,
    say: (
      <>
        <b>1,510</b> open violations. And <b>$26.8B</b> of bookings sitting behind them.
      </>
    ),
  },
  {
    kind: "card",
    variant: "call",
    tag: "#MY DESIGN CALL",
    title: "A score, not a list",
    body: (
      <>
        A list of <b>1,510</b> violations is noise. <b>“72%, and falling”</b> is a state you can feel.
        <br />
        <br />
        Severity is weighted, so a violation that breaks money outranks one that breaks tidiness.
      </>
    ),
    behind: F_HEALTH,
    psych: 82,
  },

  {
    kind: "ui",
        frame: F_CLICKS,
    beat: "twenty clicks",
    psych: 38,
    delta: -44,
    avatar: P.angry,
    who: STEWARD,
    say: <>Twelve clicks. Or <b>twenty</b>, with a wait in the middle. …I'll do it later.</>,
  },
  {
    kind: "card",
    variant: "principle",
    tag: "#UX PRINCIPLE",
    title: "Fogg Behaviour Model — B = MAP",
    body: (
      <>
        Behaviour needs motivation, ability and a prompt at once. Remove one and nothing happens.
        <br />
        <br />
        Motivation was never missing — she agreed with every violation. <b>Ability was.</b> So a nag
        would have changed nothing.
      </>
    ),
    refs: ["BJ Fogg — Stanford Behavior Design Lab", "A Behavior Model for Persuasive Design"],
    behind: F_CLICKS,
    psych: 38,
  },

  {
    kind: "statement",
    avatar: SYS_AV,
    who: SYSTEM,
    psych: 38,
    say: (
      <>
        So the next release has one job: stop asking. I'll pick the fix, put it in your queue, and
        make accepting it a <em>single</em> click.
      </>
    ),
  },
  {
    kind: "ui",
        frame: F_Q2,
    beat: "one click",
    psych: 88,
    delta: 50,
    avatar: P.delighted,
    who: STEWARD,
    say: <>It already worked out the fix. I'm mostly just <b>agreeing with it</b>.</>,
  },
  {
    kind: "card",
    variant: "principle",
    tag: "#UX PRINCIPLE",
    title: "The Default Effect",
    body: (
      <>
        A pre-set option gets accepted far more than the same one chosen from scratch. Organ-donor
        consent runs near <b>90%</b> as a default, <b>15%</b> without it.
        <br />
        <br />
        Phase 2 changes what's already done when you arrive: <b>the fix is drafted</b>, so accepting
        is the default.
      </>
    ),
    refs: ["Johnson & Goldstein (2003)", "Do Defaults Save Lives?"],
    behind: F_Q2,
    psych: 88,
  },
  {
    kind: "card",
    variant: "call",
    tag: "#MY DESIGN CALL",
    title: "Force and ease ship together",
    body: (
      <>
        Phase 2 makes the queue mandatory and the fix one click, in the same release.
        <br />
        <br />
        <b>You can only require what you've made cheap.</b> Ship the rule alone and people work
        around it.
      </>
    ),
    sharp: true,
    behind: F_DECISIONS,
    psych: 88,
  },

  { kind: "summary" },
  { kind: "end" },
];

/* ─────────────── UI pieces ─────────────── */

function PsychMeter({ value, delta }: { value: number; delta?: number }) {
  const d = delta ?? 0;
  const prev = Math.max(0, Math.min(100, value - d));
  const lo = Math.min(value, prev);
  const hi = Math.max(value, prev);
  const bandH = Math.max(hi - lo, 7); // keep the number legible on small moves
  const down = d < 0;

  const ref = hi; // drop → the level it fell from; rise → the level it reached
  const good = ref >= 66, mid = ref >= 40 && ref < 66;
  const fill = good
    ? "linear-gradient(180deg,#86efac,#22c55e 55%,#16a34a)"
    : mid
      ? "linear-gradient(180deg,#fde68a,#f59e0b 55%,#d97706)"
      : "linear-gradient(180deg,#fca5a5,#ef4444 55%,#dc2626)";
  const fillGlow = good ? "rgba(34,197,94,.5)" : mid ? "rgba(245,158,11,.5)" : "rgba(239,68,68,.5)";

  /* the move itself: red above the fill when it drops, a brighter cap when it rises */
  const band = down
    ? "linear-gradient(180deg,#fca5a5,#ef4444)"
    : "linear-gradient(180deg,#bbf7d0,#4ade80)";
  const bandGlow = down ? "rgba(239,68,68,.75)" : "rgba(74,222,128,.75)";

  return (
    <div
      className="pointer-events-none absolute inset-y-0 z-20"
      style={{
        left: "var(--rail-l)",
        width: "var(--rail-w)",
        paddingTop: "1.25rem",
        paddingBottom: "calc(1.25rem + (var(--av) * 0.72))",
      }}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-full"
        style={{
          background: "linear-gradient(90deg,#060606,#2c2c2c 38%,#181818 70%,#0b0b0b)",
          boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,.16), inset 3px 0 7px rgba(0,0,0,.9)",
        }}
      >
        {[...Array(9)].map((_, k) => (
          <span
            key={k}
            className="absolute inset-x-0 z-0 bg-white/15"
            style={{ bottom: `${(k + 1) * 10}%`, height: 1 }}
          />
        ))}

        {/* current level */}
        <div
          className="absolute inset-x-0 bottom-0 z-10"
          style={{ height: `${value}%`, background: fill, boxShadow: `0 0 14px 1px ${fillGlow}` }}
        />

        {/* the move — solid, with the number rotated inside it.
            Drawn with the fill, never after it. */}
        {d !== 0 && (
          <div
            className="absolute inset-x-0 z-20 flex items-center justify-center"
            style={{
              /* a rise caps the top of the fill; a drop sits above it.
                 Anchoring this way means the padded band can never overshoot
                 the level the bar actually reads. */
              bottom: down ? `${value}%` : `${Math.max(0, value - bandH)}%`,
              height: `${bandH}%`,
              background: band,
              boxShadow: `0 0 16px 2px ${bandGlow}`,
              borderBottom: "2px solid rgba(255,255,255,.85)",
            }}
          >
            <span
              className="font-body font-extrabold leading-none text-white"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontSize: "clamp(11px,1.5vh,15px)",
                letterSpacing: "-0.02em",
                textShadow: "0 1px 4px rgba(0,0,0,.75)",
              }}
            >
              {d > 0 ? `+${d}` : d}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function Sticky({ children, who }: { children: ReactNode; who?: string }) {
  return (
    <div
      className="bg-[#fbf3ae] text-slate-900 shadow-[5px_5px_0_rgba(0,0,0,.45)]"
      style={{
        maxWidth: "min(30rem, 52vw)",
        padding: "clamp(8px,1.6vh,18px) clamp(12px,2vh,26px)",
      }}
    >
      {who && (
        <p
          className="mb-2 font-body font-bold uppercase tracking-[0.1em] text-slate-700"
          style={{ fontSize: "clamp(10px,1.45vh,13px)" }}
        >
          {who}
        </p>
      )}
      <p
        className="font-toon font-bold italic"
        style={{ fontSize: "clamp(14px,2.5vh,28px)", lineHeight: 1.38 }}
      >
        {children}
      </p>
    </div>
  );
}

function SpeechBubble({ children, who }: { children: ReactNode; who?: string }) {
  return (
    <div
      className="relative bg-white text-slate-900 shadow-[0_14px_44px_-10px_rgba(0,0,0,.75)]"
      style={{
        maxWidth: "min(27rem, 48vw)",
        borderRadius: "clamp(18px,4vh,46px)",
        padding: "clamp(11px,2vh,24px) clamp(16px,2.8vh,34px)",
      }}
    >
      {who && (
        <p
          className="mb-2 font-body font-bold uppercase tracking-[0.1em] text-slate-600"
          style={{ fontSize: "clamp(10px,1.45vh,13px)" }}
        >
          {who}
        </p>
      )}
      <p
        className="font-toon font-bold"
        style={{ fontSize: "clamp(14px,2.4vh,27px)", lineHeight: 1.35 }}
      >
        {children}
      </p>
      {/* curved tapering horn, pointing down-left at the avatar's head */}
      <svg
        aria-hidden
        viewBox="0 0 72 50"
        className="absolute"
        style={{
          left: "clamp(14px,2.4vh,30px)",
          bottom: "clamp(-30px,-3.2vh,-18px)",
          height: "clamp(19px,3.4vh,34px)",
          width: "clamp(27px,4.9vh,49px)",
          filter: "drop-shadow(0 7px 8px rgba(0,0,0,.3))",
        }}
      >
        <path d="M64 0 C60 20 40 34 0 49 C20 30 30 15 28 0 Z" fill="#fff" />
      </svg>
    </div>
  );
}

function Avatar({
  src,
  size = 118,
  circle,
}: {
  src: string;
  size?: number | string;
  circle?: boolean;
}) {
  if (circle) {
    return (
      <span
        className="block shrink-0 overflow-hidden rounded-full bg-gradient-to-b from-slate-700 to-slate-900 ring-2 ring-white/15"
        style={{ width: size, height: size, boxShadow: "0 10px 34px rgba(0,0,0,.6)" }}
      >
        <img
          src={src}
          alt=""
          className={
            src === SYS_AV
              ? "h-full w-full object-contain"
              : "h-full w-full scale-[1.35] object-cover object-top"
          }
          style={src === SYS_AV ? undefined : { transformOrigin: "50% 22%" }}
        />
      </span>
    );
  }
  return (
    <img
      src={src}
      alt=""
      className="shrink-0 select-none drop-shadow-[0_10px_28px_rgba(0,0,0,.65)]"
      style={{ width: size, height: size }}
    />
  );
}

/** The stage a screen sits on — full height, right of the avatar column. */
function ScreenStage({
  frame,
  blurred,
  dim,
  detail,
}: {
  frame: Frame;
  blurred?: boolean;
  dim?: boolean;
  detail?: { src: string; x?: string; r?: string; y?: string; h?: string };
}) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        top: "var(--gutter)",
        right: "var(--gutter)",
        bottom: "var(--gutter)",
        left: "calc(var(--rail-l) + var(--rail-w) + var(--gutter))",
      }}
    >
      <div
        className={`relative flex max-h-full w-full items-center justify-center transition-all duration-500 ${
          blurred ? "scale-[.99] blur-[8px] brightness-[.4]" : dim ? "brightness-[.52] saturate-[.9]" : ""
        }`}
      >
        {frame.src ? (
          <span
            className="relative flex items-center justify-center"
            style={{
              /* constraints live on the wrapper so the percentages resolve
                 against the stage, not against a shrink-to-fit box */
              maxHeight: `min(${frame.scale ?? "var(--screenscale)"}, calc(100% - var(--screeninset)))`,
              maxWidth: frame.scale ?? "var(--screenscale)",
            }}
          >
            <img
              src={frame.src}
              alt={frame.alt ?? ""}
              className="block h-auto max-h-full w-auto max-w-full rounded-lg object-contain shadow-[0_40px_100px_-25px_rgba(0,0,0,.95)]"
            />
            {frame.spot && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="pointer-events-none absolute rounded-md"
                style={{
                  left: frame.spot.x,
                  top: frame.spot.y,
                  width: frame.spot.w,
                  height: frame.spot.h,
                  /* everything outside the box goes dark; the box itself stays untouched */
                  boxShadow: "0 0 0 9999px rgba(6,6,5,.78)",
                  outline: "2px solid rgba(255,255,255,.5)",
                  outlineOffset: 0,
                }}
              />
            )}
          </span>
        ) : (
          <div
            className={frame.wide ? "w-full" : "w-full max-w-3xl"}
            style={{
              maxHeight: "min(var(--screenscale), calc(100% - var(--screeninset)))",
              maxWidth: "var(--screenscale)",
            }}
          >
            {frame.node}
          </div>
        )}
      </div>
      {detail && <RaisedDetail d={detail} />}
    </div>
  );
}

/** Avatar + dialogue, sharing the meter track's baseline. Scales with viewport height. */
function Speaker({
  avatar,
  who,
  say,
  sticky,
}: {
  avatar: string;
  who?: string;
  say: ReactNode;
  sticky?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute bottom-5 z-40 flex items-end gap-3 pr-4"
      style={{
        left: "max(0px, calc(var(--rail-l) + (var(--rail-w) / 2) - (var(--av) / 2)))",
        maxWidth: "calc(100% - var(--rail-l) - 2rem)",
      }}
    >
      <Avatar src={avatar} size="var(--av)" circle />
      <div style={{ paddingBottom: "clamp(6px,1.4vh,16px)" }}>
        {sticky ? <Sticky who={who}>{say}</Sticky> : <SpeechBubble who={who}>{say}</SpeechBubble>}
      </div>
    </motion.div>
  );
}

function RaisedDetail({
  d,
}: {
  d: { src: string; x?: string; r?: string; y?: string; h?: string };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.28, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="absolute z-30 overflow-hidden rounded-2xl bg-white"
      style={{
        ...(d.r ? { right: d.r } : { left: d.x ?? "46%" }),
        top: d.y ?? "16%",
        height: d.h ?? "64%",
        boxShadow: "0 34px 80px -18px rgba(0,0,0,.92), 0 4px 12px rgba(0,0,0,.5)",
      }}
    >
      <img src={d.src} alt="" className="block h-full w-auto" />
    </motion.div>
  );
}

function HandPointer({ x, y }: { x: string; y: string }) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      width={62}
      height={62}
      className="pointer-events-none absolute z-30 drop-shadow-[0_6px_14px_rgba(0,0,0,.6)]"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.45, type: "spring", stiffness: 160, damping: 13 }}
      aria-hidden
    >
      <path
        d="M8 30c0-3 2-5 5-5h13V13c0-3 2-5 5-5s5 2 5 5v10c1-1 3-2 5-2 3 0 5 2 5 5v2c1-1 3-1 4-1 3 0 5 2 5 5v10c0 8-6 14-14 14H32c-6 0-9-2-12-6L8 34z"
        fill="#f6d3ad"
        stroke="#141414"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M20 44l-6-8" stroke="#141414" strokeWidth="3" strokeLinecap="round" />
    </motion.svg>
  );
}

function RoughCircle({ x, y, w, h }: { x: string; y: string; w: string; h: string }) {
  return (
    <motion.svg
      className="pointer-events-none absolute z-30"
      style={{ left: x, top: y, width: w, height: h }}
      viewBox="0 0 200 60"
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      aria-hidden
    >
      <motion.path
        d="M12 30C12 12 55 5 100 5c48 0 90 8 88 26 -2 17-44 24-89 24C55 55 12 47 12 30z"
        fill="none"
        stroke="#fb7185"
        strokeWidth="5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.35, duration: 0.7, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

/* ─────────────── slide renderers ─────────────── */

function KeyCap({ children, hot }: { children: ReactNode; hot?: boolean }) {
  return (
    <span
      className="flex h-[38px] w-[38px] items-center justify-center rounded-[7px] text-[15px] font-bold"
      style={
        hot
          ? {
              background: "linear-gradient(180deg,#4ade80,#22c55e)",
              color: "#08300f",
              boxShadow: "0 3px 0 #15803d, 0 0 22px 4px rgba(34,197,94,.65)",
            }
          : {
              background: "linear-gradient(180deg,#f8f8f6,#e2e2de)",
              color: "#3a3a38",
              boxShadow: "0 3px 0 #b9b9b4",
            }
      }
    >
      {children}
    </span>
  );
}

function KeyboardHint() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="pointer-events-none absolute bottom-24 right-6 z-40 flex flex-col items-end gap-3 sm:bottom-28 sm:right-12"
    >
      <div className="relative rounded-2xl bg-black/35 px-4 py-3.5 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-1.5">
          <KeyCap>▲</KeyCap>
          <div className="flex gap-1.5">
            <KeyCap>◀</KeyCap>
            <KeyCap>▼</KeyCap>
            <KeyCap hot>▶</KeyCap>
          </div>
        </div>
        <motion.div
          className="absolute -bottom-4 right-1"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 64 64" width={46} height={46} aria-hidden
            className="drop-shadow-[0_5px_10px_rgba(0,0,0,.65)]">
            <path
              d="M8 30c0-3 2-5 5-5h13V13c0-3 2-5 5-5s5 2 5 5v10c1-1 3-2 5-2 3 0 5 2 5 5v2c1-1 3-1 4-1 3 0 5 2 5 5v10c0 8-6 14-14 14H32c-6 0-9-2-12-6L8 34z"
              fill="#f6d3ad" stroke="#141414" strokeWidth="3" strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
      <Sticky>
        Use your <b>keyboard arrows</b> to watch the story!
      </Sticky>
    </motion.div>
  );
}

function TitleSlide() {
  return (
    <div className="relative h-full">
      <div className="mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-9 flex items-end justify-center"
        >
          <Avatar src={P.delighted} size="clamp(72px,17vh,164px)" />
          <Avatar src={A.happy} size="clamp(54px,13vh,124px)" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="max-w-[18ch] font-serif text-[34px] font-bold leading-[1.06] tracking-tight text-white sm:text-[54px]"
        >
          The Psychology of Deciding Who a Customer&nbsp;Is
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-9 font-body text-[14px] font-medium uppercase tracking-[0.14em] text-white/60 sm:text-[16px]"
        >
          Unified Customer Definition · Cisco · 10 months
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-3.5 flex items-center gap-2.5 font-body text-[14px] font-medium uppercase tracking-[0.14em] text-white/45 sm:text-[16px]"
        >
          <Clock size={18} strokeWidth={1.5} /> Story duration: 6 min
        </motion.p>
      </div>
      <KeyboardHint />
    </div>
  );
}

function SceneSlide({ s }: { s: Extract<Slide, { kind: "scene" }> }) {
  if (s.callout === "top") {
    return (
      <div className="relative flex h-full justify-center px-5 pt-[7vh]">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="h-fit"
        >
          <Sticky who={s.who}>{s.say}</Sticky>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="relative h-full">
      <Speaker avatar={s.avatar ?? P.neutral} who={s.who} say={s.say} sticky />
    </div>
  );
}

function StatementSlide({ s }: { s: Extract<Slide, { kind: "statement" }> }) {
  return (
    <div className="flex h-full items-center justify-center px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-w-3xl flex-col items-center text-center"
      >
        {s.avatar && (
          <div className="mb-7">
            <Avatar src={s.avatar} size="clamp(64px,15vh,150px)" circle />
          </div>
        )}
        {s.who && (
          <p
            className="mb-4 font-body font-bold uppercase tracking-[0.16em] text-white/55"
            style={{ fontSize: "clamp(10px,1.5vh,14px)" }}
          >
            {s.who}
          </p>
        )}
        <p
          className="font-serif font-semibold leading-[1.18] tracking-[-0.02em] text-white"
          style={{ fontSize: "clamp(24px,4.6vh,50px)" }}
        >
          {s.say}
        </p>
      </motion.div>
    </div>
  );
}

function UiSlide({ s }: { s: Extract<Slide, { kind: "ui" }> }) {
  return (
    <div className="relative h-full">
      <motion.div
        key="stage"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0"
      >
        <ScreenStage frame={s.frame} dim={!!s.detail} />
        {s.circle && <RoughCircle {...s.circle} />}
        {s.pointer && <HandPointer {...s.pointer} />}
        {s.detail && <RaisedDetail d={s.detail} />}
      </motion.div>
      <Speaker avatar={s.avatar} who={s.who} say={s.say} />
    </div>
  );
}

function CardSlide({ s }: { s: Extract<Slide, { kind: "card" }> }) {
  const isP = s.variant === "principle";
  return (
    <div className="relative h-full">
      {/* a spotlighted screen stays sharp — the darkening is the spotlight's job */}
      <ScreenStage
        frame={s.behind}
        blurred={!s.detail && !s.behind.spot && !s.sharp}
        dim={!!s.detail}
        detail={s.detail}
      />
      {/* a light scrim on sharp slides so a white card reads against a white screen,
          without hiding the rows the card is arguing about */}
      {s.sharp && (
        <span aria-hidden className="pointer-events-none absolute inset-0 z-10 bg-black/[0.18]" />
      )}

      {/* the card lives in the band above the nav, never under it */}
      <div
        className="pointer-events-none absolute top-4 z-40 flex items-end justify-end"
        style={{
          left: "var(--gutter)",
          right: "var(--gutter)",
          bottom: "calc(var(--navzone) + var(--gutter))",
        }}
      >
      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto flex max-h-full w-full max-w-[31rem] flex-col overflow-hidden rounded-xl bg-white text-slate-900 shadow-[0_34px_90px_-18px_rgba(0,0,0,.95)]"
        style={{ borderLeft: `6px solid ${isP ? "#7c5cd6" : "#0d9488"}` }}
      >
        <div className="min-h-0 overflow-y-auto px-8 py-7">
          <p
            className="mb-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em]"
            style={{ color: isP ? "#7c5cd6" : "#0d9488" }}
          >
            {s.tag}
          </p>
          <h3
            className="mb-4 font-serif font-bold leading-tight tracking-tight"
            style={{ fontSize: "clamp(20px,3.3vh,27px)" }}
          >
            {s.title}
          </h3>
          <div
            className="text-slate-600"
            style={{ fontSize: "clamp(13.5px,2.1vh,16px)", lineHeight: 1.6 }}
          >
            {s.body}
          </div>
          {s.refs && (
            <div className="mt-5 border-t border-slate-200 pt-3">
              {s.refs.map((r, i) => (
                <p key={r} className="font-body text-[11.5px] italic leading-snug text-slate-400">
                  <sup>{i + 1}</sup> {r}
                </p>
              ))}
            </div>
          )}
        </div>
      </motion.div>
      </div>
    </div>
  );
}

function SummarySlide() {
  /* every beat the steward actually lived through, in order */
  const beats = useMemo(
    () =>
      SLIDES.flatMap((sl) =>
        (sl.kind === "ui" || sl.kind === "scene") && (sl as { psych?: number }).psych !== undefined
          ? [
              {
                v: (sl as { psych?: number }).psych as number,
                label: (sl as { beat?: string }).beat,
              },
            ]
          : []
      ),
    []
  );
  const pts = beats.map((b) => b.v);

  const W = 900;
  const H = 340;
  const step = W / Math.max(pts.length - 1, 1);
  const xy = pts.map((p, i) => [i * step, H - (p / 100) * H] as const);
  const col = (v: number) => (v >= 66 ? "#4ade80" : v >= 40 ? "#fbbf24" : "#f87171");

  /* index of the self-inflicted dip — the click-count slide (lowest point after the tree appears) */
  const dipIdx = useMemo(() => {
    let idx = 0,
      lo = 101;
    pts.forEach((v, i) => {
      if (i > 5 && v < lo) {
        lo = v;
        idx = i;
      }
    });
    return idx;
  }, [pts]);

  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 pb-20">
      <p className="mb-6 font-body text-[13px] font-bold uppercase tracking-[0.18em] text-white/70 sm:text-[15px]">
        The whole journey
      </p>

      <div className="relative w-full max-w-5xl">
        <svg viewBox={`-72 -34 ${W + 150} ${H + 116}`} className="w-full">
          <defs>
            <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="rgba(255,255,255,.55)" />
            </marker>
          </defs>

          {/* axes */}
          <line x1="0" y1={H} x2={W + 34} y2={H} stroke="rgba(255,255,255,.5)" strokeWidth="3" markerEnd="url(#ah)" />
          <line x1="0" y1={H} x2="0" y2="-18" stroke="rgba(255,255,255,.5)" strokeWidth="3" markerEnd="url(#ah)" />

          {/* neutral baseline */}
          <line
            x1="0" y1={H / 2} x2={W + 20} y2={H / 2}
            stroke="rgba(255,255,255,.35)" strokeWidth="2" strokeDasharray="9 9"
          />

          {/* the counterfactual: if force + ease had shipped together */}
          <motion.line
            x1={xy[dipIdx - 1]?.[0] ?? 0}
            y1={xy[dipIdx - 1]?.[1] ?? 0}
            x2={xy[xy.length - 1][0]}
            y2={xy[xy.length - 1][1]}
            stroke="#4ade80"
            strokeWidth="3.5"
            strokeDasharray="11 10"
            strokeLinecap="round"
            opacity={0.45}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          />

          {/* the journey */}
          {xy.slice(0, -1).map(([x1, y1], i) => {
            const [x2, y2] = xy[i + 1];
            return (
              <motion.line
                key={`s${i}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={col(pts[i + 1])}
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.25 }}
              />
            );
          })}

          {xy.map(([x, y], i) => (
            <motion.circle
              key={`d${i}`}
              cx={x} cy={y}
              fill={col(pts[i])}
              stroke="#0d0c0b"
              strokeWidth="2"
              initial={{ r: 0 }}
              animate={{ r: 7 }}
              transition={{ delay: 0.25 + i * 0.06, type: "spring", stiffness: 300, damping: 16 }}
            />
          ))}

          {/* no x-axis name — the shape and the caption carry it */}
          <text
            x={-22}
            y={H / 2}
            textAnchor="middle"
            transform={`rotate(-90 -22 ${H / 2})`}
            fill="rgba(255,255,255,.65)"
            fontSize="16"
            fontWeight="600"
          >
            Psych level
          </text>
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.7, type: "spring", stiffness: 140 }}
          className="absolute -top-2 right-0 text-right"
        >
          <p className="font-serif text-[72px] font-bold leading-none text-emerald-400">A&minus;</p>
          <p className="mt-1 font-body text-[12px] font-bold uppercase tracking-[0.14em] text-white/70">
            after phase 2
          </p>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9, duration: 0.5 }}
        className="mt-9 max-w-2xl text-center font-body text-[17px] leading-relaxed text-white/80 sm:text-[19px]"
      >
        The first dip we inherited. <b className="text-white">The second we built ourselves.</b>
      </motion.p>
    </div>
  );
}

function EndSlide() {
  return (
    <div className="mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 pb-24 text-center">
      <Avatar src={P.delighted} size={112} />
      <h2 className="mt-6 font-serif text-[30px] font-bold tracking-tight text-white sm:text-[38px]">
        Before you go…
      </h2>

      <div className="mt-9 grid w-full gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/20 bg-white/[0.06] px-6 py-6 text-left">
          <p className="mb-3 font-body text-[12px] font-bold uppercase tracking-[0.14em] text-red-300 sm:text-[13px]">
            What I got wrong
          </p>
          <p className="font-body text-[15.5px] leading-relaxed text-white/85 sm:text-[17px]">
            We started close to shore. Then IT constraints landed, closed feedback loops reopened,
            and we were mid-ocean.{" "}
            <b className="text-white">Cutting scope at week three instead of week nine</b> would
            have saved us the distance.
          </p>
        </div>
        <div className="rounded-xl border border-white/20 bg-white/[0.06] px-6 py-6 text-left">
          <p className="mb-3 font-body text-[12px] font-bold uppercase tracking-[0.14em] text-emerald-300 sm:text-[13px]">
            What it taught me
          </p>
          <p className="font-body text-[15.5px] leading-relaxed text-white/85 sm:text-[17px]">
            When people ignore a system that's telling them the truth,{" "}
            <b className="text-white">count the clicks before you blame the people</b>. The answer
            is almost always ability, not motivation.
          </p>
        </div>
      </div>

      <Link
        to="/#work"
        className="group mt-11 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-body text-[15px] font-semibold text-slate-900 shadow-[0_10px_30px_-8px_rgba(0,0,0,.7)] transition hover:bg-white/90"
      >
        <ArrowLeft size={16} strokeWidth={2.4} className="transition-transform group-hover:-translate-x-0.5" />
        Back to all work
      </Link>
    </div>
  );
}

/* ─────────────── player ─────────────── */

function readHash(max: number) {
  if (typeof window === "undefined") return 0;
  const m = /s=(\d+)/.exec(window.location.hash);
  if (!m) return 0;
  return Math.min(Math.max(parseInt(m[1], 10) - 1, 0), max - 1);
}

export default function UCDCaseStudy() {
  const n = SLIDES.length;
  const [i, setI] = useState(() => readHash(n));
  const s = SLIDES[i];

  /* keep the URL in step so a slide can be linked, refreshed and returned to */
  useEffect(() => {
    const want = `#s=${i + 1}`;
    if (window.location.hash !== want) {
      window.history.replaceState(null, "", want);
    }
  }, [i]);

  const next = useCallback(() => setI((v) => Math.min(v + 1, n - 1)), [n]);
  const prev = useCallback(() => setI((v) => Math.max(v - 1, 0)), []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", " ", "Enter"].includes(e.key)) {
        e.preventDefault();
        next();
      }
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev]);

  const slideBackdrop = (s as { backdrop?: string }).backdrop;
  const rawPsych = (s as { psych?: number }).psych;
  const psych = rawPsych === undefined ? null : rawPsych;
  const delta = s.kind === "ui" ? s.delta : undefined;

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden bg-[#0d0c0b] text-white"
      style={
        {
          "--rail-l": "clamp(12px,2.5vw,36px)",
          "--rail-w": "clamp(17px,1.8vw,26px)",
          "--av": "clamp(48px,13vh,132px)",
          "--gutter": "24px",
          "--navzone": "7rem",
          "--screeninset": "12rem",
          /* screens sit at 70% of the stage box — one number to tune them all */
          "--screenscale": "70%",
        } as React.CSSProperties
      }
    >
      {/* ambient backdrop */}
      {slideBackdrop ? (
        <>
          {/* the same art, blown out and blurred, so the letterbox is filled
              with its own colour rather than flat black */}
          <img
            key={`${slideBackdrop}-fill`}
            src={slideBackdrop}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover"
            style={{ opacity: 0.5, filter: "blur(26px) saturate(0.85)" }}
          />
          {/* the art itself, fitted, never upscaled past its own resolution */}
          <img
            key={slideBackdrop}
            src={slideBackdrop}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-contain"
          />
        </>
      ) : (
        <img
          key="office"
          src="/case-study/office-bg.webp"
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0.22 }}
        />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: slideBackdrop
            ? "linear-gradient(180deg, transparent 55%, rgba(8,8,7,.55) 100%)"
            : "linear-gradient(180deg, rgba(8,8,7,.72) 0%, rgba(8,8,7,.55) 45%, rgba(8,8,7,.88) 100%), radial-gradient(70% 50% at 50% 0%, rgba(45,110,105,.22), transparent 70%)",
        }}
      />

      {/* back */}
      {/* the end slide has its own Back to all work, so this would be the same action twice */}
      {s.kind !== "end" && (
      <Link
        to="/#work"
        className="group absolute left-5 top-5 z-40 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 font-body text-[13px] font-semibold text-slate-900 shadow-[0_8px_28px_-8px_rgba(0,0,0,.8)] transition hover:bg-white/90 sm:left-6 sm:top-6 sm:px-5 sm:text-[14px]"
      >
        <ArrowLeft size={16} strokeWidth={2.4} className="transition-transform group-hover:-translate-x-0.5" />
        All work
      </Link>
      )}

      {psych !== null && <PsychMeter value={psych} delta={delta} />}

      {/* stage */}
      <div className="relative z-30 min-h-0 flex-1">
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 overflow-hidden"
          >
            {s.kind === "title" && <TitleSlide />}
            {s.kind === "scene" && <SceneSlide s={s} />}
            {s.kind === "statement" && <StatementSlide s={s} />}
            {s.kind === "ui" && <UiSlide s={s} />}
            {s.kind === "card" && <CardSlide s={s} />}
            {s.kind === "summary" && <SummarySlide />}
            {s.kind === "end" && <EndSlide />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* progress dots */}
      <div className="relative z-30 flex shrink-0 items-center justify-center gap-1.5 px-6 pb-4 pt-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className="rounded-full transition-all"
            style={{
              width: idx === i ? 18 : 6,
              height: 6,
              background: idx === i ? "#fff" : "rgba(255,255,255,.24)",
            }}
          />
        ))}
      </div>

      {/* nav */}
      <div className="absolute bottom-11 z-40 flex items-center gap-2 sm:bottom-14"
        style={{ right: "var(--gutter)" }}>
        <span className="mr-3 font-body text-[15px] font-medium tabular-nums text-white/60 sm:text-[17px]">
          {i + 1} / {n}
        </span>
        <button
          onClick={prev}
          disabled={i === 0}
          aria-label="Previous slide"
          className="flex h-14 w-14 items-center justify-center rounded-full text-white/65 transition hover:bg-white/10 hover:text-white disabled:opacity-20"
        >
          <ChevronLeft size={38} strokeWidth={2.2} />
        </button>
        <button
          onClick={next}
          disabled={i === n - 1}
          aria-label="Next slide"
          className="flex h-14 w-14 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10 hover:text-white disabled:opacity-20"
        >
          <ChevronRight size={38} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}
