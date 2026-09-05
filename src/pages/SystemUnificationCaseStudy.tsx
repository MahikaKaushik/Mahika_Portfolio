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
   Mahika as the face. Three acts: the audit earns the right to be
   heard, the scoring makes it actionable, and then the obvious fix
   turns out to be unaffordable. The wall on slide 15 is the hinge —
   the answer is not a better system, it is adopting the one the rest
   of the company already uses, and migrating in pieces anyone will
   fund.
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

/* A designer's desk — wireframes, swatches, sticky notes. The other two
   studies are set where the work is used; this one is set where the work
   is made, which is the right room for a study about craft.

   It carries much lower than the tower does in CR, because this plate is
   bright white paper and the screens on top of it are bright white UI.
   At any higher value the screenshots stop separating from their own
   background. */
const TITLE_ART = `${IMG}/desk.webp`;

/* ─────────────── frames ─────────────── */

const F_CHALLENGES: Frame = { src: `${IMG}/challenges.webp`, alt: "Eight kinds of inconsistency, each with its business cost" };
const F_AUDIT: Frame      = { src: `${IMG}/audit-assess.webp`, alt: "Every kind of component, catalogued across all twenty applications" };
const F_BUTTONS: Frame    = { src: `${IMG}/button-variations.webp`, alt: "Thirty different button styles found across the applications" };
const F_HUB: Frame        = { src: `${IMG}/unification-hub.webp`, alt: "Every application scored for consistency" };
const F_DEVGAP: Frame     = { src: `${IMG}/design-vs-dev.webp`, alt: "What was designed, next to what engineering actually shipped" };
const F_ROADMAP: Frame    = { src: `${IMG}/roadmap.webp`, alt: "The six-phase path from old patterns to the company standard" };
const F_HARMONISED: Frame = { src: `${IMG}/old-vs-new.webp`, alt: "The same Commerce screen, old design beside the rebuilt one" };
const F_PILLARS: Frame    = { src: `${IMG}/state-of-platform.webp`, alt: "The three standing rules proposed to keep it consistent" };

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
        Cisco Commerce isn't one product. It's <b>twenty separate applications</b> — quoting,
        ordering, renewals, discounts — built by different teams over years, and sold to
        customers as one thing.
      </>
    ),
  },
  {
    kind: "scene",
    avatar: M.worried,
    who: ME,
    psych: 60,
    say: (
      <>
        Open three of them side by side and you'd swear <b>three different companies</b> built
        them.
      </>
    ),
  },
  {
    kind: "scene",
    avatar: M.worried,
    who: ME,
    psych: 52,
    say: (
      <>
        So people had to <b>re-learn the interface</b> every time they moved between products.
        Same company. Same afternoon.
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_CHALLENGES,
    beat: "eight fractures",
    psych: 44,
    delta: -8,
    avatar: M.worried,
    who: ME,
    say: (
      <>
        We wrote down every way they disagreed. <b>Eight kinds of damage</b> — and what each one
        costs the business.
      </>
    ),
  },
  {
    kind: "scene",
    avatar: M.flat,
    who: ME,
    beat: "no mandate",
    psych: 38,
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
    psych: 34,
    say: (
      <>
        So this was never a design brief. It was <b>a case we had to build</b> — and carry to the
        executives who decide what gets funded.
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_AUDIT,
    beat: "we counted",
    psych: 48,
    delta: 14,
    avatar: M.driven,
    who: ME,
    say: (
      <>
        So we counted. <b>Every button, every form field, every alert</b> — by hand, in all
        twenty applications.
      </>
    ),
  },
  {
    kind: "card",
    variant: "principle",
    tag: "The method",
    title: "You can\u0027t fix consistency with taste. You fix it with proof.",
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
    psych: 48,
  },
  {
    kind: "ui",
    frame: F_BUTTONS,
    beat: "the button wall",
    psych: 62,
    delta: 14,
    avatar: M.happy,
    who: ME,
    say: (
      <>
        Thirty ways to draw one button. Same word, same job, <b>thirty different answers</b>.
      </>
    ),
  },

  /* ══ ACT 2 — TURN IT INTO A NUMBER LEADERSHIP CAN ACT ON ══ */

  {
    kind: "ui",
    frame: F_HUB,
    beat: "every app scored",
    psych: 76,
    delta: 14,
    avatar: M.delighted,
    who: ME,
    say: (
      <>
        So instead of opinions, we scored every one — shared patterns, usability, interaction
        clarity. <b>Nothing scored above 7.5 out of ten.</b>
      </>
    ),
  },
  {
    kind: "statement",
    avatar: M.neutral,
    who: ME,
    psych: 76,
    say: (
      <>
        And there was no such thing as <b>partly fixing</b> one. A team either rebuilt an
        application completely, or left it alone.
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_DEVGAP,
    beat: "design ≠ shipped",
    psych: 68,
    delta: -8,
    avatar: M.doubt,
    who: ME,
    say: (
      <>
        Then a second problem: <b>what engineering shipped often wasn't what design had
        drawn.</b>
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_ROADMAP,
    beat: "a sequenced path",
    psych: 80,
    delta: 12,
    avatar: M.driven,
    who: ME,
    say: (
      <>
        So we proposed six phases — cheap visual fixes first, risky structural ones last, so{" "}
        <b>live customers would never feel it</b>.
      </>
    ),
  },

  /* ══ ACT 3 — THE FIX NOBODY COULD AFFORD ══
     Slide 14 is the obvious answer, pitched high on purpose so that
     slide 15 — the cost of it — has somewhere to fall from. */

  {
    kind: "scene",
    avatar: M.happy,
    who: ME,
    beat: "rebuild it all",
    psych: 88,
    say: (
      <>
        The obvious fix was to rebuild all twenty properly. One language, one system,{" "}
        <b>done once.</b>
      </>
    ),
  },
  {
    kind: "statement",
    avatar: M.shocked,
    who: ME,
    psych: 40,
    say: <>Nobody was ever going to pay for that.</>,
  },
  {
    kind: "card",
    variant: "principle",
    tag: "The wall",
    title: "The number never cleared",
    body: (
      <>
        Twenty ageing applications, all of them live, all of them with customers working inside
        them right now — rebuilt at the same time, by teams who each had their own roadmap
        already. Every version of that estimate came back the same way.{" "}
        <b>A plan nobody funds is not a plan.</b>
      </>
    ),
    behind: F_ROADMAP,
    psych: 40,
  },
  {
    kind: "scene",
    avatar: M.doubt,
    who: ME,
    beat: "nobody would fund it",
    psych: 56,
    say: (
      <>
        So the question changed. Not <i>what should it look like</i> — but{" "}
        <b>how do you move twenty applications onto one standard you can actually afford?</b>
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
        And we didn't have to invent the standard. Cisco already had one — <b>Magnetic</b> — and
        every part of the company outside Commerce was already using it.
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_HARMONISED,
    beat: "proved on one screen",
    psych: 84,
    delta: 10,
    avatar: M.happy,
    who: ME,
    say: (
      <>
        We redesigned one real screen using Magnetic, just to show <b>it holds up in actual
        work</b>.
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
        What we proposed was two rules instead of one migration. Every new piece of work uses
        Magnetic from day one, so <b>the mess stops growing immediately</b>. Old applications
        never get a big-bang rebuild — but the moment anyone opens one up for any other reason,
        that part gets rebuilt properly. <b>You pay the debt down exactly where someone is
        already working</b>, which is the only place a budget was ever going to come from.
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
    say: (
      <>
        And three rules to stop it <b>quietly drifting back</b>.
      </>
    ),
  },

  /* ══ CLOSE ══ */

  {
    kind: "statement",
    avatar: M.neutral,
    who: ME,
    psych: 92,
    say: (
      <>
        <b>Zero</b> applications fully converted so far. Seven being designed. The rest is
        waiting on budget — <b>not on the plan</b>.
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
        {/* a blurred, blown-out copy fills the frame so the fitted plate
            below has no hard letterbox edge */}
        <img
          src={TITLE_ART}
          alt=""
          className="absolute inset-0 h-full w-full scale-110 object-cover"
          style={{ opacity: 0.16, filter: "blur(34px) saturate(.75)" }}
        />
        {/* the whole desk, fitted rather than cropped */}
        <img
          src={TITLE_ART}
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
          style={{ opacity: 0.38 }}
        />
        <span
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(62% 60% at 50% 47%, rgba(8,8,7,.96) 0%, rgba(8,8,7,.88) 40%, rgba(8,8,7,.66) 74%, rgba(8,8,7,.52) 100%)",
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
          className="max-w-[19ch] font-serif text-[34px] font-bold leading-[1.06] tracking-tight text-white sm:text-[54px]"
        >
          The Migration Nobody Would&nbsp;Fund
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
  const pts = beats.map((b) => b.v);

  const W = 900;
  const H = 320;
  const step = W / Math.max(pts.length - 1, 1);
  const xy = pts.map((p, i) => [i * step, H - (p / 100) * H] as const);
  const col = (v: number) => (v >= 66 ? "#4ade80" : v >= 40 ? "#fbbf24" : "#f87171");

  /* a label above a trough lands inside the V — drop those below instead */
  const labelY = (i: number) => {
    const before = pts[i - 1] ?? pts[i];
    const after = pts[i + 1] ?? pts[i];
    const trough = pts[i] <= before && pts[i] <= after;
    return xy[i][1] + (trough ? 36 : -22);
  };

  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 pb-20">
      <p className="mb-6 font-body text-[13px] font-bold uppercase tracking-[0.18em] text-white/70 sm:text-[15px]">
        One proposal, end to end
      </p>

      <div className="relative w-full max-w-5xl">
        <svg viewBox={`-92 -34 ${W + 190} ${H + 116}`} className="w-full">
          <defs>
            <marker id="euah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="rgba(255,255,255,.55)" />
            </marker>
          </defs>

          <line x1="0" y1={H} x2={W + 34} y2={H} stroke="rgba(255,255,255,.5)" strokeWidth="3" markerEnd="url(#euah)" />
          <line x1="0" y1={H} x2="0" y2="-18" stroke="rgba(255,255,255,.5)" strokeWidth="3" markerEnd="url(#euah)" />
          <line
            x1="0" y1={H / 2} x2={W + 20} y2={H / 2}
            stroke="rgba(255,255,255,.35)" strokeWidth="2" strokeDasharray="9 9"
          />

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
                transition={{ delay: 0.2 + i * 0.07, duration: 0.25 }}
              />
            );
          })}

          {xy.map(([x, y], i) => (
            <motion.circle
              key={`c${i}`}
              cx={x} cy={y} r="8"
              fill={col(pts[i])}
              stroke="#0d0c0b"
              strokeWidth="3"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + i * 0.07, duration: 0.2 }}
            />
          ))}

          {beats.map((b, i) =>
            b.label ? (
              <motion.text
                key={`t${i}`}
                x={xy[i][0]}
                y={labelY(i)}
                textAnchor="middle"
                fill="rgba(255,255,255,.8)"
                style={{ fontSize: 17, fontWeight: 600 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.07, duration: 0.3 }}
              >
                {b.label}
              </motion.text>
            ) : null
          )}

          <text x="-14" y="10" textAnchor="end" fill="rgba(255,255,255,.5)" style={{ fontSize: 15 }}>
            we have a case
          </text>
          <text x="-14" y={H} textAnchor="end" fill="rgba(255,255,255,.5)" style={{ fontSize: 15 }}>
            no way through
          </text>
        </svg>
      </div>

      <p className="mt-4 max-w-2xl text-center font-body text-[15px] leading-relaxed text-white/70 sm:text-[17px]">
        The audit didn't fix a single screen.{" "}
        <b className="text-white">It made the problem fundable.</b>
      </p>
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
            What we produced
          </p>
          <p className="font-body text-[15.5px] leading-relaxed text-white/85 sm:text-[17px]">
            A hand audit of all twenty applications, a consistency score for each one, and a map
            of how far every app sat from the standard. Then the proposal: a six-phase path, and{" "}
            <b className="text-white">use the company's design system by default</b> on anything
            new.
          </p>
        </div>
        <div className="rounded-xl border border-white/20 bg-white/[0.06] px-6 py-6 text-left">
          <p className="mb-3 font-body text-[12px] font-bold uppercase tracking-[0.14em] text-amber-300 sm:text-[13px]">
            Honest state
          </p>
          <p className="font-body text-[15.5px] leading-relaxed text-white/85 sm:text-[17px]">
            Zero applications fully converted. Seven being designed.{" "}
            <b className="text-white">The rest is waiting on budget, not on the plan.</b>
          </p>
        </div>
      </div>

      <p className="mt-8 max-w-2xl font-body text-[15.5px] leading-relaxed text-white/70 sm:text-[17px]">
        This was our first project at Copan, and it argued its way to the top of the platform.
        Making twenty products feel like one turned out to be{" "}
        <b className="text-white">a money problem wearing a design problem's clothes</b> — the
        winning move was never a prettier interface, it was a migration anyone could afford.
      </p>

      <Link
        to="/#work"
        className="group mt-10 inline-flex self-start items-center gap-2 rounded-full bg-white px-6 py-3 font-body text-[15px] font-semibold text-slate-900 shadow-[0_10px_30px_-8px_rgba(0,0,0,.7)] transition hover:bg-white/90"
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
      defaultBackdrop={`${IMG}/desk.webp`}
      backdropOpacity={0.12}
      backdropScrim="linear-gradient(180deg, rgba(8,8,7,.90) 0%, rgba(8,8,7,.80) 45%, rgba(8,8,7,.95) 100%), radial-gradient(70% 50% at 50% 0%, rgba(150,96,40,.12), transparent 70%)"
      renderTitle={() => <TitleSlide />}
      renderSummary={() => <SummarySlide />}
      renderEnd={() => <EndSlide />}
    />
  );
}
