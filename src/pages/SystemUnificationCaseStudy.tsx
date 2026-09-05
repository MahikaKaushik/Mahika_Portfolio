import { useEffect, useMemo, useRef, useState } from "react";
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

/* A team presenting at a whiteboard. UCD is set where the work is used
   and CR in the tower that watches it; this study is an argument made to
   a room, so it is set in the room. Carried on every slide, not just the
   title. */
const TITLE_ART = `${IMG}/whiteboard.webp`;

/* The platform, drawn as the thing it is made of.

   Not an earth with product pins in it — the sphere IS the applications.
   Each name sits on the surface, the whole thing turns, and you can grab
   it and spin it yourself.

   Positioning is orthographic on purpose. A perspective divide pushes the
   front-centre names outward past the limb, which breaks the circular
   silhouette and makes the whole thing read as a word cloud rather than a
   sphere. Depth is carried by size, weight, opacity and — the cue that
   actually sells it — horizontal foreshortening, so a name at the edge is
   squashed as though lying on a surface turning away.

   Canvas rather than DOM: forty labels re-drawn every frame is nothing for
   a canvas and a lot of churn for React. */

const PLATFORM_APPS = [
  "Quoting", "Estimates", "Orders", "Renewals", "Subscriptions",
  "Discounts", "Catalog", "Trials", "Deals", "Pricing",
  "Billing", "Approvals", "Proposals", "Contracts", "Returns",
  "Credits", "Provisioning", "Forecasting", "Entitlements", "Notifications",
];

function GlobeMock() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const W = 1000;
    const H = 620;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = W * dpr;
    cv.height = H * dpr;

    const cx = W / 2;
    const cy = H / 2 - 8;
    const R = 252;

    /* two of each name, so the surface is dense enough to have a silhouette */
    const N = 40;
    const GOLDEN = Math.PI * (3 - Math.sqrt(5));
    const seeds = Array.from({ length: N }, (_, i) => {
      const y = 1 - ((i + 0.5) / N) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const th = GOLDEN * i;
      return {
        label: PLATFORM_APPS[i % PLATFORM_APPS.length],
        x0: Math.cos(th) * r,
        y0: y,
        z0: Math.sin(th) * r,
      };
    });

    const still = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    let spin = 18;                 // degrees about the vertical axis
    let tilt = 10;                 // degrees leaning toward the viewer
    let vSpin = 0;                 // leftover velocity from a drag
    let vTilt = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let lastT = 0;

    const AUTO = still ? 0 : 7;    // degrees per second

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const a = (spin * Math.PI) / 180;
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      const tl = (tilt * Math.PI) / 180;
      const ct = Math.cos(tl);
      const st = Math.sin(tl);

      const pts = seeds.map((s) => {
        const x1 = s.x0 * ca + s.z0 * sa;
        const z1 = -s.x0 * sa + s.z0 * ca;
        const y2 = s.y0 * ct - z1 * st;
        const z2 = s.y0 * st + z1 * ct;
        return { label: s.label, x: cx + x1 * R, y: cy - y2 * R, z: z2 };
      });

      pts.sort((p, q) => p.z - q.z);

      for (const p of pts) {
        const t = (p.z + 1) / 2;                       // 0 back … 1 front
        const size = 11 + 14 * Math.pow(t, 1.5);
        const alpha = 0.12 + 0.88 * Math.pow(t, 2);
        const weight = t > 0.78 ? 650 : t > 0.45 ? 550 : 450;
        /* squash toward the limb — the cue that makes it a surface */
        const sx = 0.28 + 0.72 * Math.abs(p.z);
        const accent = t > 0.9;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.scale(sx, 1);
        ctx.font = `${weight} ${size.toFixed(1)}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if (accent) {
          ctx.shadowColor = "rgba(246,181,63,.45)";
          ctx.shadowBlur = 16;
          ctx.fillStyle = `rgba(250,200,110,${alpha.toFixed(3)})`;
        } else {
          ctx.shadowColor = "rgba(0,0,0,.6)";
          ctx.shadowBlur = 7;
          ctx.fillStyle = `rgba(226,233,244,${alpha.toFixed(3)})`;
        }
        ctx.fillText(p.label, 0, 0);
        ctx.restore();
      }

      ctx.textBaseline = "alphabetic";
      ctx.textAlign = "center";
      ctx.font = "400 16px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = "rgba(132,151,184,.85)";
      ctx.fillText("Cisco Commerce. Twenty applications, one invoice.", cx, H - 10);
    };

    let raf = 0;
    let prev: number | null = null;
    const tick = (now: number) => {
      const dt = prev === null ? 0 : Math.min(0.05, (now - prev) / 1000);
      prev = now;
      if (!dragging) {
        spin += AUTO * dt + vSpin * dt;
        tilt = Math.max(-58, Math.min(58, tilt + vTilt * dt));
        vSpin *= 0.94;             // let a flick coast, then settle
        vTilt *= 0.94;
        if (Math.abs(vSpin) < 0.5) vSpin = 0;
        if (Math.abs(vTilt) < 0.5) vTilt = 0;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    /* ── grab and spin ── */
    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = performance.now();
      vSpin = 0;
      vTilt = 0;
      cv.setPointerCapture(e.pointerId);
      cv.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const scale = W / cv.getBoundingClientRect().width; // canvas units per css px
      const dx = (e.clientX - lastX) * scale;
      const dy = (e.clientY - lastY) * scale;
      const now = performance.now();
      const dt = Math.max(8, now - lastT) / 1000;

      spin += dx * 0.22;
      tilt = Math.max(-58, Math.min(58, tilt + dy * 0.16));
      vSpin = (dx * 0.22) / dt;
      vTilt = (dy * 0.16) / dt;

      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      cv.releasePointerCapture?.(e.pointerId);
      cv.style.cursor = "grab";
    };

    cv.style.cursor = "grab";
    cv.addEventListener("pointerdown", down);
    cv.addEventListener("pointermove", move);
    cv.addEventListener("pointerup", up);
    cv.addEventListener("pointercancel", up);

    return () => {
      cancelAnimationFrame(raf);
      cv.removeEventListener("pointerdown", down);
      cv.removeEventListener("pointermove", move);
      cv.removeEventListener("pointerup", up);
      cv.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <div className="w-full">
      <canvas
        ref={ref}
        className="block h-auto w-full select-none"
        style={{ aspectRatio: "1000 / 620", touchAction: "none" }}
        aria-label="A sphere made of the twenty Cisco Commerce applications. Drag to spin it."
      />
    </div>
  );
}

/* Two verticals, one job — look at the line items on a deal. Two rather
   than five: at five across nothing was readable, and the claim only
   needs two things to compare.

   Marks are placed as a percentage of each screenshot, so they track the
   image at any size. Numbers rather than four separate labels, because
   captions on top of a screenshot at this scale become the noise they are
   trying to point at. */

type Mark = { n: number; x: string; y: string; w: string; h: string };

const QUOTES_MARKS: Mark[] = [
  { n: 1, x: "25%", y: "9.8%", w: "50%", h: "5.8%" },   // six-step stepper
  { n: 2, x: "1%", y: "32%", w: "24%", h: "5%" },        // plain underlined tabs
  { n: 3, x: "87%", y: "31.8%", w: "12.3%", h: "5.4%" }, // "Save and Continue"
  { n: 4, x: "1.5%", y: "37%", w: "96.5%", h: "9.5%" },  // yellow banner, numbered list
];

const RENEWALS_MARKS: Mark[] = [
  { n: 1, x: "25%", y: "9.8%", w: "50%", h: "10%" },     // no stepper at all
  { n: 4, x: "1%", y: "20.8%", w: "28%", h: "3.5%" },    // red error chips
  { n: 2, x: "1%", y: "25%", w: "39%", h: "5.4%" },      // boxed tabs with icons
  { n: 3, x: "91.5%", y: "24.9%", w: "8.5%", h: "4.6%" },// "Continue"
];

function Marks({ marks }: { marks: Mark[] }) {
  return (
    <>
      {marks.map((m) => (
        <span
          key={`${m.n}-${m.y}`}
          aria-hidden
          className="pointer-events-none absolute rounded-[3px]"
          style={{
            left: m.x, top: m.y, width: m.w, height: m.h,
            border: "2px solid #f4353f",
            boxShadow: "0 0 0 1px rgba(0,0,0,.28)",
          }}
        >
          <span
            className="absolute flex items-center justify-center rounded-full font-body font-bold text-white"
            style={{
              left: "-9px", top: "-9px", width: "18px", height: "18px",
              fontSize: "11px", background: "#f4353f",
            }}
          >
            {m.n}
          </span>
        </span>
      ))}
    </>
  );
}

function TwoVerticalsMock() {
  const shots = [
    { src: `${IMG}/v-quotes.webp`, name: "Quotes", marks: QUOTES_MARKS },
    { src: `${IMG}/v-renewals.webp`, name: "Renewals", marks: RENEWALS_MARKS },
  ];
  const legend = [
    ["1", "Where am I", "a six-step stepper — or nothing at all"],
    ["2", "Section tabs", "plain underlined text — or boxed, with icons"],
    ["3", "The main button", "“Save and Continue” — or just “Continue”"],
    ["4", "Something is wrong", "a yellow banner — or small red chips"],
  ];
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {shots.map((s) => (
          <figure key={s.name} className="m-0">
            <figcaption className="mb-2 text-center font-body text-[14px] font-bold uppercase tracking-[0.16em] text-amber-300 sm:text-[17px]">
              {s.name}
            </figcaption>
            <div className="relative">
              <img
                src={s.src}
                alt={`The items screen in ${s.name}`}
                className="block w-full rounded-md border border-white/20 shadow-[0_26px_70px_-18px_rgba(0,0,0,.95)]"
              />
              <Marks marks={s.marks} />
            </div>
          </figure>
        ))}
      </div>

      <ul className="mt-3.5 grid grid-cols-2 gap-x-6 gap-y-1.5 sm:mt-4 sm:grid-cols-4">
        {legend.map(([n, label, detail]) => (
          <li key={n} className="flex items-start gap-2">
            <span
              className="mt-[2px] flex shrink-0 items-center justify-center rounded-full font-body font-bold text-white"
              style={{ width: "16px", height: "16px", fontSize: "10px", background: "#f4353f" }}
            >
              {n}
            </span>
            <span className="font-body text-[11.5px] leading-snug text-white/55 sm:text-[13px]">
              <b className="text-white/85">{label}</b>
              <br />
              {detail}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────── frames ─────────────── */

const F_GLOBE: Frame      = { node: <GlobeMock />, wide: true };
const F_TWO: Frame        = { node: <TwoVerticalsMock />, wide: true, scale: "92%" };
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
    kind: "ui",
    frame: F_GLOBE,
    beat: "one platform, on paper",
    psych: 70,
    avatar: M.neutral,
    who: ME,
    say: (
      <>
        Cisco Commerce isn't one product. It's <b>twenty separate applications</b> — quoting,
        ordering, renewals, discounts — built by different teams over years, and sold to
        customers as one thing.
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_TWO,
    beat: "same job, different products",
    psych: 60,
    avatar: M.worried,
    who: ME,
    say: (
      <>
        Put two of them side by side and you'd <b>never guess they came from the same
        company</b>.
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
    /* Rings the first card's IMPACT line — the thing that turns this from
       a list of complaints into an argument. RoughCircle positions against
       the slide, not the screenshot, so nudge x/y if it sits off. */
    circle: { x: "27%", y: "27%", w: "26%", h: "12%" },
    say: (
      <>
        We wrote down every way they disagreed. <b>Eight kinds of damage</b> — and, next to each
        one, <b>what it costs the business</b>.
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
        {/* Edge to edge, and softened. The desk is uniformly bright and full
            of fine detail — wireframes, sticky-note lettering — which sat
            directly behind the title and fought it. A short blur turns it
            back into a setting rather than a competing subject, and the
            slight upscale keeps the blur from bleeding a soft edge. */}
        <img
          src={TITLE_ART}
          alt=""
          className="absolute inset-0 h-full w-full scale-105 object-cover"
          style={{ opacity: 0.62, filter: "blur(5px) saturate(.92)" }}
        />
        {/* An even wash, not a radial. A centred dark oval over a uniformly
            lit photo reads as a smudge; CR could use one because the tower
            was already dark in the middle and bright at the windows. */}
        <span
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,8,7,.74) 0%, rgba(8,8,7,.60) 42%, rgba(8,8,7,.66) 70%, rgba(8,8,7,.86) 100%)",
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
      defaultBackdrop={TITLE_ART}
      backdropOpacity={0.42}
      backdropScrim="linear-gradient(180deg, rgba(8,8,7,.80) 0%, rgba(8,8,7,.64) 45%, rgba(8,8,7,.88) 100%), radial-gradient(70% 50% at 50% 0%, rgba(150,110,60,.12), transparent 70%)"
      renderTitle={() => <TitleSlide />}
      renderSummary={() => <SummarySlide />}
      renderEnd={() => <EndSlide />}
    />
  );
}
