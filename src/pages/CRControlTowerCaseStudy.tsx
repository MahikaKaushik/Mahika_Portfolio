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
   CR CONTROL TOWER — slide-player case study.
   Engine lives in @/components/case-player.

   Thesis: closing the distance between noticing something is wrong
   and it actually getting fixed. The platform argument (build
   finding once, build changing once, in the right place) rides in
   the design-call cards and lands as payoff, not preamble.

   Cast is taken from the real screens: Priya Mehta raises,
   Daniel Cruz works it. The meter never leaves Priya — including
   the stretch after she submits where she is blind by design.
   ══════════════════════════════════════════════════════════════ */

const STEWARD = "Priya · Data Steward";
const AGENT = "Daniel · Data Operations";

const AV = "/case-study/avatars";
const IMG = "/case-study/cr";
const SYS_AV = `${AV}/system.svg`;

/* CR has its own cast. The two studies sit side by side on the work
   page, so sharing UCD's two faces made them read as stock art rather
   than as people. Same house illustration (Open Peeps, CC0), different
   silhouettes — long hair and a full beard both survive the 60px the
   speech bubble actually renders at. */
const P = {
  neutral: `${AV}/cr-priya-neutral.svg`,
  happy: `${AV}/cr-priya-happy.svg`,
  worried: `${AV}/cr-priya-worried.svg`,
  flat: `${AV}/cr-priya-flat.svg`,
  angry: `${AV}/cr-priya-angry.svg`,
  delighted: `${AV}/cr-priya-delighted.svg`,
  doubt: `${AV}/cr-priya-doubt.svg`,
  done: `${AV}/cr-priya-done.svg`,
};
const D = {
  neutral: `${AV}/cr-daniel-neutral.svg`,
  worried: `${AV}/cr-daniel-worried.svg`,
  happy: `${AV}/cr-daniel-happy.svg`,
  explain: `${AV}/cr-daniel-explain.svg`,
};

/* ─────────────── in-slide mock screens ───────────────
   The "before" has no product to screenshot — it was an inbox. So it
   gets drawn. Finalize is rebuilt too: the real capture names real
   banks as misfiled data, which is not a claim to publish. */

/** The system of record, before any of this existed. */
function InboxMock() {
  const mail = [
    ["Ops mailbox", "RE: RE: RE: Northwind sitting under the wrong parent?", "…forwarding again, I don't think anyone picked this up —", true, "9:04"],
    ["Dana W.", "FW: duplicate party — 3rd time raising this one", "Same company, two IDs, both active. Attaching the sheet.", true, "8:41"],
    ["Ravi K.", "URGENT: bookings landed on the wrong GU (again)", "This is the second quarter close it's broken. Who owns—", true, "Yest"],
    ["Tom B.", "Hierarchy fix — see attached hierarchy_v7_FINAL_v2.xlsx", "Ignore the last one, that version was stale. This is the—", true, "Yest"],
    ["Dana W.", "which spreadsheet is current??", "There are four in the drive and they don't agree.", false, "Mon"],
    ["Ops mailbox", "Merger cleanup — who actually owns this now?", "Looping in three teams. Apologies if you're the wrong—", true, "Mon"],
    ["Ravi K.", "RE: Halcyon subsidiaries — closing the loop", "Did we ever action this? Can't find a record either way.", false, "Fri"],
  ] as const;
  return (
    <div className="w-full overflow-hidden rounded-xl bg-white text-slate-900 shadow-2xl">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">
          Customer Data — shared mailbox
        </span>
        <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 font-mono text-[10px] font-bold text-white">
          412 unread
        </span>
      </div>
      {mail.map(([who, subj, snip, clip, when], i) => (
        <div
          key={subj}
          className={`grid grid-cols-[132px_1fr_46px] items-baseline gap-3 border-b border-slate-100 px-5 py-3 last:border-0 ${
            i < 4 ? "bg-blue-50/40" : ""
          }`}
        >
          <span className={`truncate text-[12.5px] ${i < 4 ? "font-bold" : "text-slate-600"}`}>{who}</span>
          <span className="min-w-0">
            <span className={`block truncate text-[13px] ${i < 4 ? "font-bold" : ""}`}>
              {clip && <span className="mr-1.5 text-slate-400">📎</span>}
              {subj}
            </span>
            <span className="block truncate text-[11.5px] text-slate-400">{snip}</span>
          </span>
          <span className="text-right font-mono text-[10.5px] text-slate-400">{when}</span>
        </div>
      ))}
    </div>
  );
}

/** One of those threads, opened. */
function ThreadMock() {
  const chain = [
    ["Ravi K.", "Tue 09:12", "Can someone confirm Northwind's parent? Two systems disagree."],
    ["Dana W.", "Tue 14:38", "I think it moved in the merger. Checking with the other team."],
    ["Tom B.", "Wed 11:02", "It's not in my sheet. Which sheet are you looking at?"],
    ["Dana W.", "Thu 08:55", "The one on the drive. There are four. Attaching mine."],
    ["Ravi K.", "Mon 16:20", "Bumping — quarter close is Friday and this is still open."],
  ] as const;
  return (
    <div className="w-full overflow-hidden rounded-xl bg-white text-slate-900 shadow-2xl">
      <div className="border-b border-slate-200 px-6 py-3.5">
        <p className="text-[15px] font-bold leading-tight">
          RE: RE: RE: Northwind sitting under the wrong parent?
        </p>
        <p className="mt-1 font-mono text-[10.5px] uppercase tracking-wider text-slate-400">
          9 messages · 3 teams · 11 days · nobody assigned
        </p>
      </div>
      <div className="px-6 py-4">
        {chain.map(([who, when, body], i) => (
          <div key={when} className="border-b border-slate-100 py-2.5 last:border-0" style={{ paddingLeft: i * 14 }}>
            <p className="mb-0.5">
              <span className="text-[12px] font-bold">{who}</span>
              <span className="ml-2 font-mono text-[10px] text-slate-400">{when}</span>
            </p>
            <p className="text-[12.5px] leading-snug text-slate-600">{body}</p>
          </div>
        ))}
        <div className="mt-3 flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <span className="text-slate-400">📎</span>
          <span className="font-mono text-[11px] text-slate-500">
            hierarchy_fix_v7_FINAL_v2.xlsx
          </span>
        </div>
      </div>
    </div>
  );
}

/** Checking one fact, the old way: four tools, four answers. */
function FourToolsMock() {
  const tools = [
    ["Customer Registry", "Party ID", "238457", "NORTHWIND TRADING", "Parent: Cisco Systems, LTD"],
    ["Salesforce", "Account ID", "ACC-99213", "Northwind Trading Ltd.", "Parent: — not set —"],
    ["D&B", "DUNS", "41-983-2277", "NORTHWIND TRADING LIMITED", "Parent: Halcyon Finance Group"],
    ["Coverage (SAV)", "SAV ID", "SAV-884213", "Northwind — EMEA", "Parent: Halcyon Retail Bank"],
  ] as const;
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4">
        {tools.map(([tool, idLabel, id, name, parent]) => (
          <div key={tool} className="overflow-hidden rounded-lg bg-white text-slate-900 shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-slate-300" />
              <span className="h-2 w-2 rounded-full bg-slate-300" />
              <span className="ml-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-500">
                {tool}
              </span>
            </div>
            <div className="px-4 py-3">
              <div className="mb-2.5 rounded border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-[10px] text-slate-400">
                🔍 search by {idLabel.toLowerCase()}…
              </div>
              <p className="font-mono text-[10px] text-slate-400">{idLabel}</p>
              <p className="mb-1.5 font-mono text-[12px] font-bold">{id}</p>
              <p className="truncate text-[12.5px] font-semibold">{name}</p>
              <p className="mt-0.5 truncate text-[11px] text-slate-500">{parent}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
        Same company · four IDs · three different parents
      </p>
    </div>
  );
}

function FinalizeMock() {
  const rows = [
    ["NORTHWIND TRADING", "238457"],
    ["HALCYON FINANCE GROUP PLC", "238458"],
    ["HALCYON RETAIL BANK", "238459"],
    ["HALCYON COMMERCIAL FINANCE", "238460"],
  ] as const;
  return (
    <div className="w-full overflow-hidden rounded-xl bg-white text-slate-900 shadow-2xl">
      <div className="px-7 pt-6">
        <p className="font-serif text-[20px] font-bold leading-tight">
          Finalize Parent Party Decisions
        </p>
        <div className="mt-4 flex gap-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-3">
          <span className="text-[15px] leading-none text-amber-600">⚠</span>
          <p className="text-[12px] leading-relaxed text-amber-900">
            You are about to finalize <b>4</b> parent party assignments in a single action. Once
            finalized, these cannot be edited from this case. To change them later a new change
            request will be required.
          </p>
        </div>
      </div>

      <div className="px-7 py-5">
        <div className="grid grid-cols-[1.5fr_1.1fr_1.3fr] gap-3 border-b border-slate-300 pb-2 font-mono text-[9px] uppercase tracking-wider text-slate-400">
          <span>Party</span>
          <span>Losing parent</span>
          <span>Winning parent</span>
        </div>
        {rows.map(([name, id]) => (
          <div
            key={id}
            className="grid grid-cols-[1.5fr_1.1fr_1.3fr] gap-3 border-b border-slate-100 py-2.5 last:border-0"
          >
            <span className="text-[12.5px]">
              <b className="block truncate font-semibold">{name}</b>
              <span className="font-mono text-[10px] text-slate-400">{id}</span>
            </span>
            <span className="text-[12px] text-slate-600">
              Cisco Systems, LTD
              <span className="block font-mono text-[10px] text-slate-400">827134</span>
            </span>
            <span className="text-[12px] text-slate-600">
              Global Tech Services — Loveland
              <span className="block font-mono text-[10px] text-slate-400">32652047</span>
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-7 py-3.5">
        <span className="text-[12px] font-semibold text-slate-500">Cancel</span>
        <span className="rounded bg-blue-600 px-4 py-1.5 text-[12px] font-semibold text-white">
          Confirm &amp; Finalize
        </span>
      </div>
    </div>
  );
}

/** The head of the story. Four verbs are the whole job; none of them had a
    product. Drawn, not captured — there was nothing here to screenshot, which
    is exactly the finding. The right column is what each verb actually cost. */
function FourVerbsMock() {
  const rows = [
    ["Find", "something in 20M records is wrong", "wait for someone downstream to complain", "no signal"],
    ["Check", "is it actually wrong, or just different?", "four tools, five mails, two spreadsheets", "they disagree"],
    ["Correct", "get the record changed", "email someone and hope", "no owner"],
    ["Maintain", "make sure it stays fixed", "—", "no record either way"],
  ] as const;
  return (
    <div className="w-full overflow-hidden rounded-xl bg-white text-slate-900 shadow-2xl">
      <div className="flex items-baseline gap-3 border-b border-slate-200 bg-slate-100 px-6 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
          The job · four verbs
        </span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
          where it happened · what it cost
        </span>
      </div>
      {rows.map(([verb, what, how, cost]) => (
        <div
          key={verb}
          className="grid grid-cols-[104px_1fr_1fr_120px] items-baseline gap-4 border-b border-slate-100 px-6 py-4 last:border-0"
        >
          <span className="font-serif text-[17px] font-bold">{verb}</span>
          <span className="text-[12.5px] leading-snug text-slate-500">{what}</span>
          <span className="text-[13px] leading-snug">{how}</span>
          <span className="whitespace-nowrap text-right font-mono text-[10.5px] uppercase tracking-wider font-bold text-red-500">
            {cost}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────── frames ─────────────── */

const F_VERBS: Frame = { node: <FourVerbsMock />, wide: true };
const F_DEMO: Frame = { src: `${IMG}/demographics.webp`, alt: "Demographics — what we have" };
const F_INBOX: Frame = { node: <InboxMock />, wide: true };
const F_THREAD: Frame = { node: <ThreadMock />, wide: true };
const F_TOOLS: Frame = { node: <FourToolsMock />, wide: true };
const F_OVERVIEW: Frame = { src: `${IMG}/pollution-overview.webp`, alt: "Pollution overview" };
const F_RECORDS: Frame = { src: `${IMG}/pollution-records.webp`, alt: "Pollution records" };
const F_SEARCH: Frame = { src: `${IMG}/search-landing.webp`, alt: "One Search" };
const F_360: Frame = { src: `${IMG}/search-360.webp`, alt: "Party 360 view" };
const F_AI: Frame = { src: `${IMG}/search-ai.webp`, alt: "Ask instead of search" };
const F_RAISE: Frame = { src: `${IMG}/search-create-case.webp`, alt: "Create a case from search" };
const F_SUBMITTED: Frame = { src: `${IMG}/case-submitted.webp`, alt: "Case submitted" };
const F_BUCKET: Frame = { src: `${IMG}/request-bucket.webp`, alt: "Request bucket" };
const F_MOREINFO: Frame = { src: `${IMG}/need-more-info.webp`, alt: "Agent requests more information" };
const F_IMPACT: Frame = { src: `${IMG}/impact-view.webp`, alt: "Business impact" };
const F_RESPONDER: Frame = { src: `${IMG}/responder-view.webp`, alt: "Responder view" };
const F_CONCERN: Frame = { src: `${IMG}/concern-locked.webp`, alt: "Concern raised and locked" };
const F_LOG: Frame = { src: `${IMG}/activity-log.webp`, alt: "Activity log" };
const F_APPROVE: Frame = { src: `${IMG}/acm-approve.webp`, alt: "Attribute approval" };
const F_NOTIFY: Frame = { src: `${IMG}/ucdm-notification.webp`, alt: "Case notifications back in UCDM" };
const F_PUNCHOUT: Frame = {
  src: `${IMG}/ucdm-punchout.webp`,
  alt: "Create CR Case from UCDM",
  /* the party list behind the modal is live customer data — light the modal only */
  spot: { x: "18%", y: "6%", w: "63%", h: "84%" },
};
const F_BULK: Frame = { src: `${IMG}/bulk-apply.webp`, alt: "Bulk reason code" };
const F_MERGE: Frame = { src: `${IMG}/create-or-merge.webp`, alt: "Create or merge draft" };
/* Finalize stays a rebuild: the real capture names real banks as misfiled data. */
const F_FINAL: Frame = { node: <FinalizeMock />, wide: true };

/* ─────────────── the story ─────────────── */

const SLIDES: Slide[] = [
  { kind: "title" },

  /* ══ ACT 1 — SEVEN MONTHS AGO ═══════════════════════════════
     Four verbs are the job. Not one of them had a place to happen.
     No product screens in this act on purpose: the absence is the
     point, and it makes the first real screen in Act 2 land. */

  {
    kind: "scene",
    avatar: P.neutral,
    who: STEWARD,
    psych: 62,
    say: (
      <>
        My job is four verbs. <b>Find</b> what's wrong, <b>check</b> it, <b>correct</b> it, and keep
        it fixed.
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_VERBS,
    beat: "four verbs, no product",
    psych: 50,
    delta: -12,
    avatar: P.flat,
    who: STEWARD,
    say: (
      <>
        Not one of them had <b>anywhere to happen</b>.
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_INBOX,
    beat: "the inbox",
    psych: 42,
    delta: -8,
    avatar: P.worried,
    who: STEWARD,
    say: (
      <>
        To correct anything, I emailed someone. <b>That was the workflow.</b>
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_THREAD,
    psych: 32,
    delta: -10,
    avatar: P.angry,
    who: STEWARD,
    say: (
      <>
        Nine messages. Three teams. Eleven days. <b>Still broken.</b>
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_TOOLS,
    beat: "four tools disagree",
    psych: 24,
    delta: -8,
    avatar: P.doubt,
    who: STEWARD,
    say: (
      <>
        And to check <i>one fact</i> — four tools, five mails, two spreadsheets. They{" "}
        <b>disagree</b>.
      </>
    ),
  },
  {
    kind: "card",
    variant: "principle",
    tag: "#UX PRINCIPLE",
    title: "Learned helplessness",
    body: (
      <>
        Raise it once, nothing happens. Raise it twice, nothing happens. By the third time, people
        stop raising it at all — and the data quietly rots.
        <br />
        <br />
        The stewards hadn't stopped caring. They had <b>learned that acting changed nothing</b>.
      </>
    ),
    refs: ["Seligman & Maier (1967)", "Learned helplessness — when action stops predicting outcome"],
    behind: F_THREAD,
    psych: 24,
  },
  {
    kind: "statement",
    avatar: P.neutral,
    who: STEWARD,
    psych: 24,
    say: (
      <>
        Seven months later, <b>none of that</b> is how it works.
      </>
    ),
  },

  /* ══ ACT 2 — NOW ════════════════════════════════════════════
     Same four verbs, in the order we shipped them. Each one now
     has a place to happen. FIND · CHECK · CORRECT · MAINTAIN. */

  /* ── FIND ── */
  {
    kind: "ui",
    frame: F_DEMO,
    beat: "find · what have we got",
    psych: 38,
    delta: 14,
    avatar: P.neutral,
    who: STEWARD,
    say: (
      <>
        First question we answered: what do we even <i>have</i>? <b>20.1 million</b> parties, finally
        countable.
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_OVERVIEW,
    beat: "find · how much is wrong",
    psych: 46,
    delta: 8,
    avatar: P.doubt,
    who: STEWARD,
    say: (
      <>
        Second: how much of it is wrong. <b>1.2 million</b> of them are.
      </>
    ),
  },
  {
    kind: "card",
    variant: "call",
    tag: "#MY DESIGN CALL",
    title: "A number you can't act on is just anxiety",
    body: (
      <>
        The overview is very good at <i>how bad</i>. It never says <i>which</i>.
        <br />
        <br />
        So we split the tab. Charts on one side, <b>the actual list</b> on the other.
      </>
    ),
    behind: F_OVERVIEW,
    psych: 46,
  },

  /* ── CHECK ── */
  {
    kind: "ui",
    frame: F_RECORDS,
    beat: "check · which ones",
    psych: 58,
    delta: 12,
    avatar: P.happy,
    who: STEWARD,
    say: (
      <>
        So the number opens. There they are — filter, select, and raise it{" "}
        <b>without leaving the page</b>.
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_BULK,
    psych: 64,
    delta: 6,
    avatar: P.happy,
    who: STEWARD,
    say: (
      <>
        Seven rows, seven reason codes, fourteen clicks. <b>Now one.</b>
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_SEARCH,
    beat: "check · one bar, ten systems",
    psych: 72,
    delta: 8,
    avatar: P.happy,
    who: STEWARD,
    say: (
      <>
        And checking a fact stopped meaning four tools. <b>One bar, ten systems.</b>
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_360,
    psych: 78,
    delta: 6,
    avatar: P.delighted,
    who: STEWARD,
    say: (
      <>
        Every search lands on the party. Its whole 360 — hierarchy, coverage, open cases —{" "}
        <b>one page</b>.
      </>
    ),
  },
  {
    kind: "card",
    variant: "principle",
    tag: "#UX PRINCIPLE",
    title: "Search isn't a module. It's a primitive.",
    body: (
      <>
        Every job here starts the same way: <i>find the thing first</i>. Checking, correcting,
        merging, escalating — all of it.
        <br />
        <br />
        So search isn't a page you visit. It's the <b>front door to every workflow</b> in the
        product.
      </>
    ),
    behind: F_360,
    psych: 78,
  },

  /* ── CORRECT ── */
  {
    kind: "ui",
    frame: F_RAISE,
    beat: "correct · raise it in place",
    psych: 84,
    delta: 6,
    avatar: P.happy,
    who: STEWARD,
    say: (
      <>
        And when something <i>is</i> off, I raise it <b>from where I found it</b>.
      </>
    ),
  },
  {
    kind: "card",
    variant: "call",
    tag: "#MY DESIGN CALL",
    title: "A case is a question, not a proposal",
    body: (
      <>
        The first design assumed the steward already knew the fix, and asked her to submit it.
        <br />
        <br />
        She usually doesn't — she knows something is <i>wrong</i>. So a case carries{" "}
        <b>the evidence and the question</b>, and the person who owns the answer decides.
      </>
    ),
    behind: F_RAISE,
    psych: 84,
  },
  {
    kind: "ui",
    frame: F_BUCKET,
    beat: "correct · picked up",
    psych: 84,
    avatar: P.neutral,
    who: STEWARD,
    say: (
      <>
        It lands in a shared bucket, not a mailbox. <b>Somebody owns it now.</b>
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_IMPACT,
    psych: 84,
    avatar: D.worried,
    who: AGENT,
    say: (
      <>
        Before I touch it: <b>four of six platforms break</b>. The system worked that out, not me.
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_RESPONDER,
    psych: 84,
    avatar: D.neutral,
    who: AGENT,
    say: (
      <>
        One page, one row I can act on. <b>Approve, or raise a concern.</b>
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_CONCERN,
    beat: "correct · someone says no",
    psych: 70,
    delta: -14,
    avatar: P.worried,
    who: STEWARD,
    say: (
      <>
        And someone <i>does</i>. Coverage says no — locked on the case now, <b>with their reason</b>.
      </>
    ),
  },
  {
    kind: "card",
    variant: "call",
    tag: "#MY DESIGN CALL",
    title: "Concern Raised is a state, not a stop",
    body: (
      <>
        The easy build makes an objection kill the case. Then the loudest team wins and nothing is
        ever recorded.
        <br />
        <br />
        So the impact is <b>computed</b>, the objection is <b>permanent</b>, and finalizing is{" "}
        <b>one-way</b>. Disagreement becomes part of the record instead of the end of it.
      </>
    ),
    behind: F_CONCERN,
    psych: 70,
  },

  /* ── MAINTAIN ── */
  {
    kind: "ui",
    frame: F_NOTIFY,
    beat: "maintain · she finds out",
    psych: 86,
    delta: 16,
    avatar: P.happy,
    who: STEWARD,
    say: (
      <>
        Under review. Needs more info. Approved. Rejected — <b>and why</b>. Nobody has to chase
        it.
      </>
    ),
  },
  {
    kind: "ui",
    frame: F_PUNCHOUT,
    beat: "maintain · where the work already is",
    psych: 92,
    delta: 6,
    avatar: P.delighted,
    who: STEWARD,
    say: (
      <>
        And it starts where I already work — twelve case types, one click, <b>from inside UCDM</b>.
      </>
    ),
  },
  {
    kind: "card",
    variant: "call",
    tag: "#MY DESIGN CALL",
    title: "Governance can't live inside a viewer",
    body: (
      <>
        UCDM is where stewards look at customer data. The Control Tower is where it gets{" "}
        <i>changed</i>. Two products, one job.
        <br />
        <br />
        So the punch-out pre-fills the party and hands the case straight back. Nobody has to know{" "}
        <b>which product owns the verb</b>.
      </>
    ),
    behind: F_PUNCHOUT,
    psych: 92,
  },

  {
    kind: "statement",
    avatar: P.done,
    who: STEWARD,
    psych: 92,
    say: (
      <>
        Define the customer. Unify the experience. <b>Then govern the lot.</b>
      </>
    ),
  },
  { kind: "summary" },
  { kind: "end" },
];

/* ─────────────── bespoke slides ─────────────── */

function TitleSlide() {
  return (
    <div className="relative h-full">
      {/* just the office plate from the player, vignetted so white type holds.
          No product screen here — the story earns the dashboard on slide 4. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <span
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(52% 48% at 50% 44%, rgba(8,8,7,.82) 0%, rgba(8,8,7,.58) 58%, rgba(8,8,7,.30) 100%)",
          }}
        />
      </div>
      <div className="relative mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-9 flex items-end justify-center gap-4 sm:gap-6"
        >
          <Avatar src={P.worried} size="clamp(68px,16vh,150px)" />
          <Avatar src={D.explain} size="clamp(68px,16vh,150px)" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="max-w-[19ch] font-serif text-[34px] font-bold leading-[1.06] tracking-tight text-white sm:text-[54px]"
        >
          The Distance Between Noticing and&nbsp;Fixing
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <TitleCredits
            project="CR Control Tower"
            client="Cisco"
            role="Designer + stand-in PM"
            run="7 months"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex items-center gap-2.5 font-body text-[13px] font-medium uppercase tracking-[0.14em] text-white/40 sm:text-[14px]"
        >
          <Clock size={16} strokeWidth={1.5} /> Story duration: 5 min
        </motion.p>
      </div>
      <KeyboardHint />
    </div>
  );
}

function SummarySlide() {
  const beats = useMemo(() => journeyBeats(SLIDES), []);
  const pts = beats.map((b) => b.v);

  const W = 900;
  const H = 320;
  const step = W / Math.max(pts.length - 1, 1);
  const xy = pts.map((p, i) => [i * step, H - (p / 100) * H] as const);
  const col = (v: number) => (v >= 66 ? "#4ade80" : v >= 40 ? "#fbbf24" : "#f87171");

  /* a label sitting above a trough lands inside the V — drop those below instead */
  const labelY = (i: number) => {
    const before = pts[i - 1] ?? pts[i];
    const after = pts[i + 1] ?? pts[i];
    const trough = pts[i] <= before && pts[i] <= after;
    return xy[i][1] + (trough ? 36 : -22);
  };

  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 pb-20">
      <p className="mb-6 font-body text-[13px] font-bold uppercase tracking-[0.18em] text-white/70 sm:text-[15px]">
        One case, end to end
      </p>

      <div className="relative w-full max-w-5xl">
        <svg viewBox={`-72 -34 ${W + 150} ${H + 116}`} className="w-full">
          <defs>
            <marker id="crah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="rgba(255,255,255,.55)" />
            </marker>
          </defs>

          <line x1="0" y1={H} x2={W + 34} y2={H} stroke="rgba(255,255,255,.5)" strokeWidth="3" markerEnd="url(#crah)" />
          <line x1="0" y1={H} x2="0" y2="-18" stroke="rgba(255,255,255,.5)" strokeWidth="3" markerEnd="url(#crah)" />
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
            trusts it
          </text>
          <text x="-14" y={H} textAnchor="end" fill="rgba(255,255,255,.5)" style={{ fontSize: 15 }}>
            gives up
          </text>
        </svg>
      </div>

      <p className="mt-4 max-w-2xl text-center font-body text-[15px] leading-relaxed text-white/70 sm:text-[17px]">
        Everything after <i>case raised</i> happens where she can't see it.{" "}
        <b className="text-white">Closing that gap is the product.</b>
      </p>
    </div>
  );
}

function EndSlide() {
  return (
    <div className="mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 pb-24 text-center">
      <Avatar src={P.done} size={112} />
      <h2 className="mt-6 font-serif text-[30px] font-bold tracking-tight text-white sm:text-[38px]">
        Where it actually is
      </h2>

      <div className="mt-9 grid w-full gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/20 bg-white/[0.06] px-6 py-6 text-left">
          <p className="mb-3 font-body text-[12px] font-bold uppercase tracking-[0.14em] text-emerald-300 sm:text-[13px]">
            Live in production
          </p>
          <p className="font-body text-[15.5px] leading-relaxed text-white/85 sm:text-[17px]">
            The watching half and the governing half.{" "}
            <b className="text-white">Demographics, Pollution Overview, and all six attribute
            change types.</b>
          </p>
        </div>
        <div className="rounded-xl border border-white/20 bg-white/[0.06] px-6 py-6 text-left">
          <p className="mb-3 font-body text-[12px] font-bold uppercase tracking-[0.14em] text-amber-300 sm:text-[13px]">
            Designed, not shipped
          </p>
          <p className="font-body text-[15.5px] leading-relaxed text-white/85 sm:text-[17px]">
            The fixing half — records, search, case management.{" "}
            <b className="text-white">Gated on cleaning the data, not on the design.</b>
          </p>
        </div>
      </div>

      <p className="mt-8 max-w-2xl font-body text-[15.5px] leading-relaxed text-white/70 sm:text-[17px]">
        Which is the right order, and I'd argue for it again. You can safely let people{" "}
        <b className="text-white">see</b> twenty million records long before you let them{" "}
        <b className="text-white">change</b> them.
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

export default function CRControlTowerCaseStudy() {
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
