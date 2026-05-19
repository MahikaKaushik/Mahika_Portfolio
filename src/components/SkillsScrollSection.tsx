import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Data ─── */
const skillSections = [
  {
    headline: "Code taught me how to",
    focusWord: "think.",
    bubbles: [
      { label: "Java", bg: "hsl(220, 50%, 95%)", border: "hsl(220, 60%, 70%)" },
      { label: "C++", bg: "hsl(0, 50%, 95%)", border: "hsl(0, 55%, 70%)" },
      { label: "Machine Learning", bg: "hsl(200, 50%, 93%)", border: "hsl(200, 60%, 65%)" },
      { label: "AI Tools", bg: "hsl(30, 55%, 94%)", border: "hsl(30, 60%, 70%)" },
      { label: "Frontend", bg: "hsl(150, 40%, 93%)", border: "hsl(150, 45%, 65%)" },
    ],
  },
  {
    headline: "Users taught me what",
    focusWord: "mattered.",
    bubbles: [
      { label: "User Research", bg: "hsl(340, 50%, 95%)", border: "hsl(340, 50%, 72%)" },
      { label: "Problem Framing", bg: "hsl(200, 50%, 94%)", border: "hsl(200, 55%, 68%)" },
      { label: "Journey Mapping", bg: "hsl(30, 50%, 94%)", border: "hsl(30, 60%, 70%)" },
      { label: "Interaction Design", bg: "hsl(160, 40%, 93%)", border: "hsl(160, 45%, 62%)" },
      { label: "Usability Testing", bg: "hsl(270, 40%, 95%)", border: "hsl(270, 40%, 72%)" },
    ],
  },
  {
    headline: "Design gave me a",
    focusWord: "voice.",
    bubbles: [
      { label: "Figma", bg: "hsl(260, 45%, 95%)", border: "hsl(260, 50%, 72%)" },
      { label: "Design Systems", bg: "hsl(170, 40%, 93%)", border: "hsl(170, 50%, 62%)" },
      { label: "Wireframing", bg: "hsl(20, 55%, 94%)", border: "hsl(20, 60%, 70%)" },
      { label: "Prototyping", bg: "hsl(330, 45%, 95%)", border: "hsl(330, 50%, 72%)" },
      { label: "Visual Comms", bg: "hsl(200, 50%, 94%)", border: "hsl(200, 55%, 68%)" },
    ],
  },
  {
    headline: "Businesses taught me",
    focusWord: "why.",
    bubbles: [
      { label: "Enterprise UX", bg: "hsl(174, 40%, 93%)", border: "hsl(174, 48%, 62%)" },
      { label: "Systems Thinking", bg: "hsl(220, 50%, 94%)", border: "hsl(220, 55%, 68%)" },
      { label: "Workflow Design", bg: "hsl(40, 55%, 94%)", border: "hsl(40, 60%, 68%)" },
      { label: "Info Architecture", bg: "hsl(0, 40%, 95%)", border: "hsl(0, 45%, 72%)" },
      { label: "Product Strategy", bg: "hsl(290, 40%, 95%)", border: "hsl(290, 42%, 72%)" },
    ],
  },
  {
    headline: "AI is reshaping",
    focusWord: "everything.",
    bubbles: [
      { label: "AI Workflows", bg: "hsl(30, 55%, 94%)", border: "hsl(30, 60%, 68%)" },
      { label: "AI Interfaces", bg: "hsl(200, 50%, 94%)", border: "hsl(200, 55%, 68%)" },
      { label: "Platform UX", bg: "hsl(330, 45%, 95%)", border: "hsl(330, 50%, 72%)" },
    ],
  },
];

/* ─── Sticky note positions around card ─── */
const notePositions: { top: string; left: string; rotate: number }[][] = [
  [
    { top: "-14%", left: "2%", rotate: -4 },
    { top: "-12%", left: "68%", rotate: 3 },
    { top: "82%", left: "-4%", rotate: 2.5 },
    { top: "80%", left: "72%", rotate: -3 },
    { top: "90%", left: "34%", rotate: 1.5 },
  ],
  [
    { top: "-16%", left: "0%", rotate: 3 },
    { top: "-14%", left: "66%", rotate: -2.5 },
    { top: "80%", left: "0%", rotate: -3.5 },
    { top: "84%", left: "70%", rotate: 2 },
    { top: "92%", left: "32%", rotate: -1.5 },
  ],
  [
    { top: "-14%", left: "4%", rotate: -2 },
    { top: "-12%", left: "70%", rotate: 4 },
    { top: "78%", left: "-2%", rotate: 3 },
    { top: "82%", left: "68%", rotate: -2.5 },
    { top: "90%", left: "30%", rotate: 2 },
  ],
  [
    { top: "-16%", left: "0%", rotate: 2.5 },
    { top: "-12%", left: "68%", rotate: -3.5 },
    { top: "82%", left: "2%", rotate: -2 },
    { top: "78%", left: "74%", rotate: 3 },
    { top: "94%", left: "36%", rotate: -1 },
  ],
  [
    { top: "-14%", left: "4%", rotate: -3 },
    { top: "-12%", left: "70%", rotate: 2.5 },
    { top: "86%", left: "32%", rotate: -2 },
  ],
];

/* ─── Main export ─── */
export function SkillsScrollSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const scrollToIndex = useCallback((idx: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll("[data-card]");
    const card = cards[idx] as HTMLElement;
    if (!card) return;
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const scrollLeft =
      card.offsetLeft - containerRect.width / 2 + cardRect.width / 2;
    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const cards = container.querySelectorAll("[data-card]");
      let closest = 0;
      let minDist = Infinity;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - centerX);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });

      if (closest !== activeIndex) {
        setShowNotes(false);
        setActiveIndex(closest);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  // Show notes after card settles
  useEffect(() => {
    setShowNotes(false);
    const timer = setTimeout(() => setShowNotes(true), 400);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section className="relative overflow-hidden bg-[hsl(0,0%,96%)] py-16 sm:py-24">
      {/* Left blur gradient */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[hsl(0,0%,96%)] to-transparent sm:w-32 md:w-48" />
      {/* Right blur gradient */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[hsl(0,0%,96%)] to-transparent sm:w-32 md:w-48" />

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[30vw] py-12 scrollbar-hide sm:gap-8 md:gap-10"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {skillSections.map((section, i) => {
          const isActive = i === activeIndex;
          const distance = Math.abs(i - activeIndex);
          const blurPx = distance === 0 ? 0 : distance === 1 ? 3 : 6;
          const scaleVal = isActive ? 1 : 0.85;
          const opacityVal = isActive ? 1 : 0.5;

          return (
            <motion.div
              key={section.focusWord}
              data-card
              className="relative flex-shrink-0 snap-center cursor-pointer"
              style={{ width: "clamp(280px, 50vw, 480px)" }}
              animate={{
                scale: scaleVal,
                opacity: opacityVal,
                filter: `blur(${blurPx}px)`,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={() => scrollToIndex(i)}
            >
              {/* White card */}
              <div className="relative rounded-2xl bg-white px-6 py-12 shadow-[0_8px_40px_hsl(0_0%_0%/0.08)] sm:px-10 sm:py-16 md:px-12 md:py-20">
                <h2 className="text-center font-serif text-2xl font-bold leading-tight text-[hsl(0,0%,62%)] sm:text-3xl md:text-4xl">
                  {section.headline}{" "}
                  <span className="text-[hsl(174,55%,28%)]">
                    {section.focusWord}
                  </span>
                </h2>
              </div>

              {/* Sticky notes */}
              <AnimatePresence>
                {isActive &&
                  showNotes &&
                  section.bubbles.map((bubble, j) => {
                    const pos = (notePositions[i] || notePositions[0])[j];
                    if (!pos) return null;
                    return (
                      <motion.div
                        key={bubble.label}
                        className="absolute z-20 rounded-lg px-3 py-2 shadow-md transition-transform duration-200 hover:rotate-0 hover:scale-110 sm:px-4 sm:py-2.5"
                        style={{
                          top: pos.top,
                          left: pos.left,
                          backgroundColor: bubble.bg,
                          border: `1.5px solid ${bubble.border}`,
                          rotate: pos.rotate,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                          delay: j * 0.08,
                        }}
                      >
                        <span
                          className="whitespace-nowrap text-[10px] font-semibold sm:text-xs"
                          style={{ color: bubble.border }}
                        >
                          {bubble.label}
                        </span>
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="mt-6 flex justify-center gap-2">
        {skillSections.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-6 bg-[hsl(174,55%,35%)]"
                : "w-2 bg-[hsl(0,0%,78%)]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
