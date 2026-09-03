import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   CASE PLAYER — the shared slide-player engine.

   Extracted verbatim from the UCD case study so all three studies
   run the same machinery. A case study file now holds only its
   SLIDES array plus its own title / summary / end slides.

   Two card voices, deliberately distinct:
     UX PRINCIPLE  — the psychology (violet)
     MY DESIGN CALL — the designer's decision + why (teal)
   ══════════════════════════════════════════════════════════════ */

/* ─────────────── slide model ─────────────── */

export type Frame = {
  src?: string;
  node?: ReactNode;
  alt?: string;
  wide?: boolean;
  /** Region to keep lit while the rest of the screen darkens, in % of the image. */
  spot?: { x: string; y: string; w: string; h: string };
  /** Override --screenscale for this frame only. */
  scale?: string;
};

export type Detail = { src: string; x?: string; r?: string; y?: string; h?: string };

export type Slide =
  | { kind: "title" }
  | {
      kind: "scene";
      avatar?: string;
      who?: string;
      say: ReactNode;
      psych?: number;
      /** Full-bleed illustration in place of the default plate. */
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
      detail?: Detail;
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
      detail?: Detail;
      /** Leave the screen untouched and let the card overlap it. */
      sharp?: boolean;
    }
  | {
      kind: "statement";
      avatar?: string;
      who?: string;
      say: ReactNode;
      psych?: number;
    }
  | { kind: "summary" }
  | { kind: "end" };

/* ─────────────── config ───────────────
   Avatars that are illustrated marks rather than portraits get
   object-contain instead of the portrait crop. Carried in context so
   the deep Speaker → Avatar path needs no prop threading. */

const PlayerCfg = createContext<{ contain: Set<string> }>({ contain: new Set() });

/* ─────────────── UI pieces ─────────────── */

export function PsychMeter({ value, delta }: { value: number; delta?: number }) {
  const d = delta ?? 0;
  const prev = Math.max(0, Math.min(100, value - d));
  const lo = Math.min(value, prev);
  const hi = Math.max(value, prev);
  const bandH = Math.max(hi - lo, 7); // keep the number legible on small moves
  const down = d < 0;

  const ref = hi; // drop → the level it fell from; rise → the level it reached
  const good = ref >= 66,
    mid = ref >= 40 && ref < 66;
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

export function Sticky({ children, who }: { children: ReactNode; who?: string }) {
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

export function SpeechBubble({ children, who }: { children: ReactNode; who?: string }) {
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

export function Avatar({
  src,
  size = 118,
  circle,
}: {
  src: string;
  size?: number | string;
  circle?: boolean;
}) {
  const { contain } = useContext(PlayerCfg);
  if (circle) {
    const isMark = contain.has(src);
    return (
      <span
        className="block shrink-0 overflow-hidden rounded-full bg-gradient-to-b from-slate-700 to-slate-900 ring-2 ring-white/15"
        style={{ width: size, height: size, boxShadow: "0 10px 34px rgba(0,0,0,.6)" }}
      >
        <img
          src={src}
          alt=""
          className={
            isMark
              ? "h-full w-full object-contain"
              : "h-full w-full scale-[1.35] object-cover object-top"
          }
          style={isMark ? undefined : { transformOrigin: "50% 22%" }}
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
export function ScreenStage({
  frame,
  blurred,
  dim,
  detail,
}: {
  frame: Frame;
  blurred?: boolean;
  dim?: boolean;
  detail?: Detail;
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
export function Speaker({
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

export function RaisedDetail({ d }: { d: Detail }) {
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

export function HandPointer({ x, y }: { x: string; y: string }) {
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

export function RoughCircle({ x, y, w, h }: { x: string; y: string; w: string; h: string }) {
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

export function KeyCap({ children, hot }: { children: ReactNode; hot?: boolean }) {
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

/* ─────────────── title credits ───────────────
   Project, client and role are three different grains; running them
   together on one dot-separated line makes the reader guess which is
   which. Both case studies use this same schema so they read as a
   matched pair. `run` is the project's own duration — deliberately
   separate from the player's story-duration line below it. */
export function TitleCredits({
  project,
  client,
  role,
  run,
}: {
  project: string;
  client: string;
  role: string;
  run?: string;
}) {
  const cells: [string, string][] = [
    ["Project", project],
    ["Client", client],
    ["My role", role],
  ];
  if (run) cells.push(["Duration", run]);
  return (
    <dl className="mt-10 flex flex-wrap items-start justify-center gap-x-10 gap-y-5 sm:gap-x-14">
      {cells.map(([k, v]) => (
        <div key={k} className="text-center">
          <dt className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 sm:text-[11px]">
            {k}
          </dt>
          <dd className="mt-1.5 font-body text-[14px] font-medium text-white/85 sm:text-[16px]">
            {v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function KeyboardHint() {
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

export function SceneSlide({ s, fallbackAvatar }: { s: Extract<Slide, { kind: "scene" }>; fallbackAvatar: string }) {
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
      <Speaker avatar={s.avatar ?? fallbackAvatar} who={s.who} say={s.say} sticky />
    </div>
  );
}

export function StatementSlide({ s }: { s: Extract<Slide, { kind: "statement" }> }) {
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

export function UiSlide({ s }: { s: Extract<Slide, { kind: "ui" }> }) {
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

export function CardSlide({ s }: { s: Extract<Slide, { kind: "card" }> }) {
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

/* ─────────────── summary helpers ─────────────── */

/** Every beat that carries a psych reading, in slide order. */
export function journeyBeats(slides: Slide[]) {
  return slides.flatMap((sl) =>
    (sl.kind === "ui" || sl.kind === "scene") && (sl as { psych?: number }).psych !== undefined
      ? [{ v: (sl as { psych?: number }).psych as number, label: (sl as { beat?: string }).beat }]
      : []
  );
}

/* ─────────────── player ─────────────── */

function readHash(max: number) {
  if (typeof window === "undefined") return 0;
  const m = /s=(\d+)/.exec(window.location.hash);
  if (!m) return 0;
  return Math.min(Math.max(parseInt(m[1], 10) - 1, 0), max - 1);
}

export function CasePlayer({
  slides,
  fallbackAvatar,
  containAvatars = [],
  defaultBackdrop,
  backdropOpacity = 0.22,
  backdropScrim = "linear-gradient(180deg, rgba(8,8,7,.72) 0%, rgba(8,8,7,.55) 45%, rgba(8,8,7,.88) 100%), radial-gradient(70% 50% at 50% 0%, rgba(45,110,105,.22), transparent 70%)",
  renderTitle,
  renderSummary,
  renderEnd,
}: {
  slides: Slide[];
  /** Used when a scene slide omits its avatar. */
  fallbackAvatar: string;
  /** Avatars drawn as marks, not portraits — rendered object-contain. */
  containAvatars?: string[];
  defaultBackdrop: string;
  /** The ambient plate is tuned per study — a dark office interior and a
      lit sunset need different weight to sit behind a screenshot equally
      quietly. Defaults are UCD's. */
  backdropOpacity?: number;
  backdropScrim?: string;
  renderTitle: () => ReactNode;
  renderSummary: () => ReactNode;
  renderEnd: () => ReactNode;
}) {
  const n = slides.length;
  const [i, setI] = useState(() => readHash(n));
  const s = slides[i];

  const cfg = React.useMemo(() => ({ contain: new Set(containAvatars) }), [containAvatars.join("|")]); // eslint-disable-line react-hooks/exhaustive-deps

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
    <PlayerCfg.Provider value={cfg}>
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
          key="plate"
          src={defaultBackdrop}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ opacity: backdropOpacity }}
        />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: slideBackdrop
            ? "linear-gradient(180deg, transparent 55%, rgba(8,8,7,.55) 100%)"
            : backdropScrim,
        }}
      />

      {/* back — the end slide has its own Back to all work, so this would be the same action twice */}
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
            {s.kind === "title" && renderTitle()}
            {s.kind === "scene" && <SceneSlide s={s} fallbackAvatar={fallbackAvatar} />}
            {s.kind === "statement" && <StatementSlide s={s} />}
            {s.kind === "ui" && <UiSlide s={s} />}
            {s.kind === "card" && <CardSlide s={s} />}
            {s.kind === "summary" && renderSummary()}
            {s.kind === "end" && renderEnd()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* progress dots */}
      <div className="relative z-30 flex shrink-0 items-center justify-center gap-1.5 px-6 pb-4 pt-2">
        {slides.map((_, idx) => (
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
    </PlayerCfg.Provider>
  );
}
