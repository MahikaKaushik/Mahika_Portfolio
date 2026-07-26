import { motion } from "framer-motion";
import { Brain, Eye, Sparkles, Zap, Target, Search } from "lucide-react";

const sops = [
  {
    icon: <Eye className="h-7 w-7" />,
    accentIcon: <Search className="h-4 w-4" />,
    title: "UX Audit Tool",
    subtitle: "Single-click pre-review pass on my own work",
    description:
      "Before taking a screen to managers or clients, I run a heuristic and WCAG check on it in one click. Catches accessibility gaps, consistency drift, and usability issues early — so review meetings discuss the design, not the bugs I should have caught myself.",
    stat: "1-Click",
    statLabel: "Pre-Review Pass",
    impacts: [
      { icon: <Target className="h-3.5 w-3.5" />, label: "Heuristic + WCAG" },
      { icon: <Eye className="h-3.5 w-3.5" />, label: "Self-Review" },
    ],
    slogan: "\"Catching what I'd want to catch myself — before review.\"",
  },
  {
    icon: <Brain className="h-7 w-7" />,
    accentIcon: <Sparkles className="h-4 w-4" />,
    title: "Design Analyst Guide",
    subtitle: "AI-assisted UX research → PRD workflow",
    description:
      "Turns scattered stakeholder inputs — recordings, notes, raw requirements — into structured user stories, epics, and PRD-ready artifacts. Bridges UX research, product definition, and engineering handoff in a single AI-assisted workflow.",
    stat: "v1",
    statLabel: "Work in Progress",
    impacts: [
      { icon: <Zap className="h-3.5 w-3.5" />, label: "Story Generation" },
      { icon: <Sparkles className="h-3.5 w-3.5" />, label: "PRD Synthesis" },
    ],
    slogan: "\"Bridging research and engineering handoff.\"",
  },
];

export const AiSopCards = () => (
  <motion.div
    className="mb-12"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6 }}
  >

    {/* Cards */}
    <div className="grid grid-cols-1 gap-5">
      {sops.map((sop, i) => (
        <motion.div
          key={sop.title}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.06] backdrop-blur-md transition-all duration-500 hover:border-white/25 hover:bg-white/[0.10]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -4 }}
        >
          {/* Ambient glow */}
          <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-white/20 blur-[80px] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-white/15 blur-[60px] opacity-0 transition-opacity duration-700 group-hover:opacity-60" />

          {/* Inner gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative z-10 flex h-full flex-col md:flex-row md:items-stretch p-6 sm:p-8">
            {/* Left: Card content */}
            <div className="flex flex-1 flex-col">
              {/* Top row: Icon + Title + Stat */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/[0.12] text-white ring-1 ring-white/[0.15] transition-all duration-300 group-hover:bg-white/[0.18] group-hover:scale-110">
                    {sop.icon}
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-semibold text-white sm:text-2xl">
                      {sop.title}
                    </h4>
                    <p className="mt-0.5 inline-flex items-center gap-1.5 font-mono text-xs text-white/70">
                      {sop.accentIcon}
                      {sop.subtitle}
                    </p>
                  </div>
                </div>

                {/* Big stat - right */}
                <div className="text-right shrink-0">
                  <span className="font-serif text-4xl font-bold leading-none text-white">
                    {sop.stat}
                  </span>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-white/80">
                    {sop.statLabel}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/75">
                {sop.description}
              </p>

              {/* Impact row */}
              <div className="mt-6 flex items-center gap-3 border-t border-white/[0.08] pt-5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/75">
                  Impact
                </span>
                <div className="flex flex-wrap gap-2">
                  {sop.impacts.map((impact) => (
                    <span
                      key={impact.label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.07] px-3 py-1.5 font-mono text-[11px] text-white/75 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.12] group-hover:text-white/90"
                    >
                      {impact.icon}
                      {impact.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Slogan */}
            <div className="mt-8 flex items-center border-t border-white/[0.08] pt-6 md:mt-0 md:ml-8 md:border-t-0 md:border-l md:pt-0 md:pl-8">
              <p className="font-serif text-xl leading-snug text-white/80 italic md:text-2xl md:max-w-[260px]">
                {sop.slogan}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);
