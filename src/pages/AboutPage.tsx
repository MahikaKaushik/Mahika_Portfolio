import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, LayoutGrid, Monitor, Zap, PenTool, Lightbulb, Mail, Linkedin, Download } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Timeline } from "@/components/ui/timeline";
import { CollaborateSection } from "@/components/CollaborateSection";
import { Footer } from "@/components/Footer";
import mahikaPhoto from "@/assets/mahika-photo.webp";

const floatingBadges = [
  { label: "Research", icon: Search, color: "hsl(200, 70%, 50%)", top: "5%", left: "-8%" },
  { label: "Design Systems", icon: LayoutGrid, color: "hsl(20, 80%, 55%)", top: "8%", right: "-5%" },
  { label: "UI/UX", icon: Monitor, color: "hsl(150, 50%, 40%)", top: "45%", left: "-12%" },
  { label: "Strategy", icon: Zap, color: "hsl(30, 80%, 55%)", bottom: "30%", right: "-8%" },
  { label: "Systems Thinking", icon: Lightbulb, color: "hsl(120, 45%, 45%)", bottom: "8%", left: "-5%" },
  { label: "Prototyping", icon: PenTool, color: "hsl(320, 60%, 55%)", bottom: "5%", right: "-3%" },
];

const tabs = [
  {
    id: "long-story",
    label: "Long story—short",
    content: (
      <div className="space-y-5 text-base leading-[1.8] text-white/70 sm:text-lg">
        <p><span className="font-semibold text-white">I didn't start as a designer.</span> I started as an engineer. My early years were spent writing code, learning machine learning, and trying to understand how systems behave under the hood. That experience shaped how I see the world today.</p>
        <p>Most problems I encounter don't look like "design problems" at first. They usually appear as messy spreadsheets, confusing workflows, or tools that technically work but nobody enjoys using.</p>
        <p>Somewhere between understanding the chaos and structuring it into something usable — that's where I like to operate.</p>
        <p>The work I enjoy most sits at the intersection of <span className="font-medium text-white">systems</span>, <span className="font-medium text-white">people</span>, and <span className="font-medium text-white">decisions</span>.</p>
        <p>I still think like an engineer. <span className="font-semibold text-white">I just design like a human.</span></p>
      </div>
    ),
  },
  {
    id: "hiring",
    label: "If You're Hiring",
    content: (
      <div className="space-y-5 text-base leading-[1.8] text-white/70 sm:text-lg">
        <p><span className="font-semibold text-white">I'm a UX designer focused on systems and platform design.</span> My work centers on turning fragmented workflows into structured products that teams can actually rely on.</p>
        <p>Recently I've worked on:</p>
        <ul className="ml-4 list-disc space-y-2 text-white/70">
          <li>a customer intelligence platform replacing 50+ spreadsheets</li>
          <li>enterprise order management workflows</li>
          <li>a unified design system across 11 product verticals</li>
          <li>operational dashboards monitoring large-scale data health</li>
        </ul>
        <p>My background in engineering helps me collaborate deeply with technical teams while still advocating for user clarity. I enjoy working on problems where design can bring structure to ambiguity.</p>
      </div>
    ),
  },
  {
    id: "team",
    label: "In a Team",
    content: (
      <div className="space-y-5 text-base leading-[1.8] text-white/70 sm:text-lg">
        <p><span className="font-semibold text-white">I enjoy working with teams that are curious about how things actually work.</span> My process usually starts with asking uncomfortable questions about systems, workflows, and assumptions — and then slowly turning those answers into something people can use.</p>
        <p>I'm most comfortable in environments where designers, engineers, and product thinkers are building together.</p>
        <p><span className="font-semibold text-white">Good teams make good products.</span> And the best ideas usually come from conversations, not screens.</p>
      </div>
    ),
  },
  {
    id: "founder",
    label: "If You're a Founder",
    content: (
      <div className="space-y-5 text-base leading-[1.8] text-white/70 sm:text-lg">
        <p><span className="font-semibold text-white">If you're building something early or complex, design can help bring structure to uncertainty.</span> My approach focuses on understanding the underlying system before jumping to solutions.</p>
        <p>That means identifying how decisions are made, how information flows, and how people actually interact with the product.</p>
        <p>From there, design becomes less about screens and more about creating tools that make the right things obvious.</p>
      </div>
    ),
  },
];


const timelineData = [
  {
    title: "Foundations",
    content: (
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(180,15%,50%)]">2019 — Class 10 · Bhiwani Public School, Bhiwani</p>
        <p className="text-sm font-medium text-[hsl(180,35%,20%)]">Scored 92% in Class 10.</p>
        <p className="text-sm leading-relaxed text-[hsl(180,10%,40%)]">
          School was where curiosity really started shaping how I observe the world. Alongside academics, I spent a lot of time sketching, exploring creative work, and noticing patterns in everyday things — habits that later became the foundation of how I approach design problems.
        </p>
      </div>
    ),
  },
  {
    title: "Discovering Structure",
    content: (
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(180,15%,50%)]">2021 — Class 12 · Bhiwani Public School, Bhiwani</p>
        <p className="text-sm font-medium text-[hsl(180,35%,20%)]">Completed Science stream with 89%.</p>
        <p className="text-sm leading-relaxed text-[hsl(180,10%,40%)]">
          This phase strengthened my interest in analytical thinking. Mathematics, physics, and problem-solving helped me develop a structured approach to understanding systems — something that later translated naturally into UX and product thinking.
        </p>
      </div>
    ),
  },
  {
    title: "Engineering Years",
    content: (
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(180,15%,50%)]">2021 — 2025 · Chandigarh University</p>
        <p className="text-sm font-medium text-[hsl(180,35%,20%)]">B.Tech in Computer Science Engineering · 7.2 CGPA</p>
        <p className="text-sm leading-relaxed text-[hsl(180,10%,40%)]">
          College introduced me deeply to programming, system logic, and machine learning. While learning how software systems are built, I started noticing that many challenges weren't technical — they were about how people interact with those systems.
        </p>
        <p className="text-sm leading-relaxed text-[hsl(180,10%,50%)] italic">
          That realization gradually led me toward UX and product design.
        </p>
      </div>
    ),
  },
  {
    title: "Research Internship",
    content: (
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(180,15%,50%)]">2022 — 2 Months · Alakh Technologies</p>
        <p className="text-sm font-medium text-[hsl(180,35%,20%)]">Research Intern</p>
        <p className="text-sm leading-relaxed text-[hsl(180,10%,40%)]">
          Worked on research exploration around technology and product thinking. This experience exposed me to how research, problem framing, and experimentation influence product decisions.
        </p>
        <p className="text-sm leading-relaxed text-[hsl(180,10%,50%)] italic">
          It was one of the early moments where I began thinking beyond engineering — and closer to design and user experience.
        </p>
      </div>
    ),
  },
  {
    title: "Professional Journey",
    content: (
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(180,15%,50%)]">2025 — Present · Copan Consultancy Services</p>
        <p className="text-sm font-medium text-[hsl(180,35%,20%)]">UX Designer</p>
        <p className="text-sm leading-relaxed text-[hsl(180,10%,40%)]">
          Currently working as a UX Designer, designing enterprise platforms, operational dashboards, and internal product systems. My work focuses on transforming fragmented workflows into structured products — designing systems where data, workflows, and people intersect.
        </p>
        <ul className="ml-4 list-disc space-y-1 text-sm text-[hsl(180,10%,45%)]">
          <li>Customer intelligence platforms</li>
          <li>Large-scale operational dashboards</li>
          <li>Product ecosystem design systems</li>
          <li>AI-assisted internal design tools</li>
        </ul>
      </div>
    ),
  },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("long-story");
  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className="min-h-screen bg-[hsl(180,35%,20%)]">
      <Navbar />

      {/* Hero — dark teal bg */}
      <div id="hero-dark" className="bg-[hsl(180,35%,20%)]">
        {/* Hero Headline */}
        <section className="px-4 pt-28 sm:px-6 sm:pt-36">
          <div className="mx-auto max-w-6xl">
            <motion.h1
              className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.2rem]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-white/40">Designing Systems.</span>
              <br />
              Bringing Clarity. Crafting Impact.
            </motion.h1>
          </div>
        </section>

        {/* Portrait + Tabs Section */}
        <section className="px-4 pt-14 pb-20 sm:px-6 sm:pt-20 sm:pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left — Portrait with floating badges */}
            <motion.div
              className="relative col-span-1 lg:col-span-5"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative mx-auto max-w-[260px] sm:max-w-[420px]">
                {/* Photo */}
                <div className="overflow-hidden rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
                  <img
                    src={mahikaPhoto}
                    alt="Mahika Kaushik"
                    width={664}
                    height={875}
                    decoding="async"
                    className="w-full object-cover"
                  />
                </div>

                {/* Floating badges */}
                {floatingBadges.map((badge, i) => {
                  const Icon = badge.icon;
                  return (
                    <motion.div
                      key={badge.label}
                      className="absolute flex items-center gap-2 rounded-xl bg-background px-2.5 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:px-3 sm:py-2"
                      style={{
                        top: badge.top,
                        left: badge.left,
                        right: badge.right,
                        bottom: badge.bottom,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                      whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                    >
                      <div
                        className="flex h-7 w-7 items-center justify-center rounded-lg"
                        style={{ backgroundColor: badge.color }}
                      >
                        <Icon className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="font-body text-xs font-medium text-foreground">
                        {badge.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Name + CTAs below photo */}
              <div className="mt-6 text-center lg:text-left">
                <h2 className="font-serif text-2xl font-bold">
                  <span className="text-white">Mahika Kaushik</span>
                  <span className="mx-2 text-white/60">—</span>
                  <span className="text-lg text-white/60">UX Designer</span>
                </h2>
                <div className="mt-4 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <a
                    href="mailto:kaushikmahika@gmail.com"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[hsl(180,35%,20%)] transition-transform hover:scale-105"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Email
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mahika-kaushik-366649219/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition-all hover:border-white/50 hover:bg-white/10"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    LinkedIn
                  </a>
                  <a
                    href="/resume.pdf"
                    download="Mahika-Kaushik-Resume.pdf"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition-all hover:border-white/50 hover:bg-white/10"
                  >
                    <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                    Resume
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right — Tabs + Content */}
            <motion.div
              className="col-span-1 lg:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Tab buttons */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 font-body text-sm transition-all ${
                      activeTab === tab.id
                        ? "border-white bg-white text-[hsl(180,35%,20%)] shadow-sm"
                        : "border-white/20 bg-transparent text-white/60 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  className="mt-8"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeContent}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
      </div>

      {/* Hairline between the intro and the timeline — both sit on the same teal */}
      <div className="px-4 sm:px-6">
        <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      {/* Journey Timeline */}
      <section className="bg-[hsl(180,35%,20%)] px-4 sm:px-6">
        <Timeline data={timelineData} />
      </section>

      {/* Collaborate */}
      <CollaborateSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
