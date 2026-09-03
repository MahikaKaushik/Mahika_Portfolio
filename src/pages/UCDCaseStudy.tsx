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
  type Frame,
  type Slide,
} from "@/components/case-player";

/* ══════════════════════════════════════════════════════════════
   UNIFIED CUSTOMER DEFINITION — slide-player case study.
   The player engine lives in @/components/case-player; this file
   holds only the story: personas, mock screens, SLIDES, and the
   three bespoke slides (title, summary, end).
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <TitleCredits
            project="Unified Customer Definition"
            client="Cisco"
            role="Sole designer"
            run="10 months"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex items-center gap-2.5 font-body text-[13px] font-medium uppercase tracking-[0.14em] text-white/40 sm:text-[14px]"
        >
          <Clock size={16} strokeWidth={1.5} /> Story duration: 6 min
        </motion.p>
      </div>
      <KeyboardHint />
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

export default function UCDCaseStudy() {
  return (
    <CasePlayer
      slides={SLIDES}
      fallbackAvatar={P.neutral}
      containAvatars={[SYS_AV]}
      defaultBackdrop="/case-study/office-bg.webp"
      renderTitle={() => <TitleSlide />}
      renderSummary={() => <SummarySlide />}
      renderEnd={() => <EndSlide />}
    />
  );
}
