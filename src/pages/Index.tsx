import { useRef, useEffect, useState, useCallback } from "react";
import customerHierarchyImg from "@/assets/customer-hierarchy.webp";
import controlTowerImg from "@/assets/control-tower.webp";
import { useScroll, useTransform, motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { FloatingIconsHero } from "@/components/ui/floating-icons-hero-section";
import { WorkCard, WorkGrid } from "@/components/WorkCard";
import { AiSopCards } from "@/components/AiSopCards";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WelcomeFloatingElements } from "@/components/WelcomeFloatingElements";
import { AboutSection } from "@/components/AboutSection";
import { CollaborateSection } from "@/components/CollaborateSection";
import {
  UCDBackground,
  UnificationBackground,
  DataQualityBackground,
} from "@/components/bento-backgrounds";
import {
  FigmaIcon, FramerIcon, AppleIcon, GoogleIcon, NotionIcon,
  LinearIcon, HierarchyIcon, DashboardIcon, GovernanceIcon,
  DesignSystemIcon, DataFlowIcon, EnterpriseIcon, ProtoPieIcon,
} from "@/components/icons";
import { Users, BarChart3, Layers, Pause, Play } from "lucide-react";
import { UCDCarousel } from "@/pages/UCDCaseStudy";
import { CRControlTowerCarousel } from "@/pages/CRControlTowerCaseStudy";
import { ExperienceUnificationCarousel } from "@/pages/SystemUnificationCaseStudy";

const heroIcons = [
  { id: 1, icon: FigmaIcon, className: "top-[8%] left-[8%]" },
  { id: 2, icon: FramerIcon, className: "top-[15%] right-[10%]" },
  { id: 3, icon: AppleIcon, className: "top-[5%] left-[30%]" },
  { id: 4, icon: GoogleIcon, className: "top-[5%] right-[30%]" },
  { id: 5, icon: ProtoPieIcon, className: "top-[40%] left-[4%]" },
  { id: 6, icon: NotionIcon, className: "top-[40%] right-[4%]" },
  { id: 7, icon: LinearIcon, className: "bottom-[20%] left-[8%]" },
  { id: 8, icon: HierarchyIcon, className: "bottom-[20%] right-[8%]" },
  { id: 9, icon: DashboardIcon, className: "bottom-[8%] left-[25%]" },
  { id: 10, icon: GovernanceIcon, className: "bottom-[8%] right-[25%]" },
  { id: 11, icon: DesignSystemIcon, className: "top-[25%] left-[18%]" },
  { id: 12, icon: DataFlowIcon, className: "top-[25%] right-[18%]" },
  { id: 13, icon: EnterpriseIcon, className: "bottom-[35%] left-[18%]" },
];
/* WCAG 2.2.2 (Pause, Stop, Hide) — the work-card previews auto-pan on an
   indefinite loop, so they need a way to stop. Motion also yields entirely to
   a prefers-reduced-motion setting. */
const useAutoPan = () => {
  const prefersReducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  return { stopped: prefersReducedMotion || paused, paused, setPaused };
};

const PreviewPauseButton = ({
  paused,
  onToggle,
  label,
}: {
  paused: boolean;
  onToggle: () => void;
  label: string;
}) => (
  <button
    type="button"
    onClick={(e) => {
      // The whole card is clickable — don't open the case study.
      e.stopPropagation();
      onToggle();
    }}
    aria-label={`${paused ? "Play" : "Pause"} the ${label} preview animation`}
    className="absolute bottom-1.5 right-1.5 z-20 rounded-full bg-background/85 p-1.5 text-foreground opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100"
  >
    {paused ? <Play className="h-2.5 w-2.5" /> : <Pause className="h-2.5 w-2.5" />}
  </button>
);

const UCDAnimatedPreview = () => {
  const { stopped, paused, setPaused } = useAutoPan();
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-foreground/90">
      <motion.img
        src={customerHierarchyImg}
        alt="Customer Hierarchy"
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-left-top"
        animate={
          stopped
            ? { scale: 1.2, x: "0%", y: "0%" }
            : {
                scale: [1.2, 1.8, 1.8, 1.2],
                x: ["0%", "-15%", "-25%", "0%"],
                y: ["0%", "-10%", "-20%", "0%"],
              }
        }
        transition={
          stopped
            ? { duration: 0.3 }
            : {
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.35, 0.65, 1],
              }
        }
      />
      <PreviewPauseButton
        paused={paused}
        onToggle={() => setPaused((p) => !p)}
        label="Unified Customer Definition"
      />
    </div>
  );
};

const ControlTowerPreview = () => {
  const { stopped, paused, setPaused } = useAutoPan();
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-foreground/90">
      <motion.img
        src={controlTowerImg}
        alt="CR Control Tower Dashboard"
        loading="lazy"
        decoding="async"
        className="absolute top-0 left-0 w-full"
        style={{ width: "100%" }}
        animate={stopped ? { y: "0%" } : { y: ["0%", "-44%", "-44%", "0%"] }}
        transition={
          stopped
            ? { duration: 0.3 }
            : {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.4, 0.6, 1],
              }
        }
      />
      <PreviewPauseButton
        paused={paused}
        onToggle={() => setPaused((p) => !p)}
        label="CR Control Tower"
      />
    </div>
  );
};

const projects = [
  {
    title: "Unified Customer Definition",
    description: "Replaced fragmented CRM spreadsheets with a hierarchy-first platform to manage enterprise customer structures, operations, and governance in a single system.",
    tags: ["50+ Spreadsheets", "4 Hierarchies", "1 Platform"],
    projectType: "Enterprise CRM / Data Management",
    href: "/work/ucd",
    icon: <Users className="h-7 w-7" />,
    preview: <UCDAnimatedPreview />,
    titleClassName: "whitespace-nowrap",
  },
  {
    title: "CR Control Tower",
    description: "Created a centralized dashboard to monitor CRM data quality, detect system pollution, and track operational SLAs across enterprise data sources.",
    tags: ["15 Systems", "8K Issues", "3 Views"],
    projectType: "Data Quality / Analytics",
    href: "/work/control-tower",
    icon: <BarChart3 className="h-7 w-7" />,
    preview: <ControlTowerPreview />,
  },
  {
    title: "Experience Unification",
    description: "Audited product interfaces and designed a scalable system to align multiple platforms under a unified enterprise experience.",
    tags: ["11 Verticals", "40+ Components", "1 System"],
    projectType: "Design Systems / UX Strategy",
    href: "/work/system-unification",
    icon: <Layers className="h-7 w-7" />,
    preview: <UnificationBackground />,
    // Third of three cards in a two-column grid — span both so it doesn't
    // sit as an orphan half-row.
    wide: true,
  },
];

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showUCDModal, setShowUCDModal] = useState(false);
  const openUCDModal  = useCallback(() => setShowUCDModal(true),  []);
  const closeUCDModal = useCallback(() => setShowUCDModal(false), []);

  const [showCRModal, setShowCRModal] = useState(false);
  const openCRModal  = useCallback(() => setShowCRModal(true),  []);
  const closeCRModal = useCallback(() => setShowCRModal(false), []);

  const [showEUModal, setShowEUModal] = useState(false);
  const openEUModal  = useCallback(() => setShowEUModal(true),  []);
  const closeEUModal = useCallback(() => setShowEUModal(false), []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const welcomeScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.94]);
  const welcomeOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const welcomeY = useTransform(scrollYProgress, [0, 0.08], ["0%", "-3%"]);
  const welcomeRadius = useTransform(scrollYProgress, [0, 0.08], ["0px", "24px"]);
  const welcomePointerEvents = useTransform(scrollYProgress, (v) => v > 0.06 ? "none" : "auto");
  const welcomeVisibility = useTransform(scrollYProgress, (v) => v > 0.09 ? "hidden" : "visible");

  const heroOpacity = useTransform(scrollYProgress, [0.02, 0.09], [0, 1]);
  const heroScale = useTransform(scrollYProgress, [0.02, 0.09], [1.04, 1]);

  // Always start from top on mount (welcome screen first)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollPastWelcome = () => {
    if (!containerRef.current) return;
    const target = containerRef.current.offsetHeight * 0.12;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div className="relative bg-background">
      <Navbar />

      {/* Scroll container for welcome→hero transition */}
      <div ref={containerRef} className="relative h-[200vh]">
        {/* WELCOME — fixed, dark teal, zooms out */}
        <motion.section
          className="fixed inset-0 z-20 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[hsl(174,45%,15%)] via-[hsl(174,40%,22%)] to-[hsl(180,35%,18%)]"
          style={{
            scale: welcomeScale,
            opacity: welcomeOpacity,
            y: welcomeY,
            borderRadius: welcomeRadius,
            pointerEvents: welcomePointerEvents,
            visibility: welcomeVisibility,
            willChange: "transform",
          }}
        >
          <WelcomeFloatingElements />

          <GooeyText
            texts={["Mahika", "Designer", "Builder", "Thinker"]}
            morphTime={1.5}
            cooldownTime={0.5}
            className="h-20 w-full max-w-2xl sm:h-28"
            textClassName="font-serif text-4xl sm:text-6xl md:text-8xl font-semibold text-white"
          />

          <p className="mt-4 px-4 text-center font-serif text-lg text-white/70 italic sm:mt-6 sm:text-xl md:text-2xl">
            Complex systems, clear experiences.
          </p>

          <div className="mt-4 flex flex-col items-center gap-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/80">
              UX Designer · B.Tech Computer Science
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
              Panchkula, India
            </p>
          </div>

          <motion.button
            onClick={scrollPastWelcome}
            aria-label="Scroll to main content"
            className="group absolute bottom-10 flex flex-col items-center gap-2.5 cursor-pointer"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70 transition-colors group-hover:text-white">
              Scroll
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-lg text-white/80 transition-all group-hover:border-white/80 group-hover:bg-white/10 group-hover:text-white">
              ↓
            </span>
          </motion.button>
        </motion.section>

        {/* HERO — sticky, white bg, sits behind welcome */}
        <motion.section
          className="sticky top-0 z-10 h-screen"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <FloatingIconsHero
            title="I design systems that think"
            highlightWord="think"
            subtitle="I design enterprise systems where data, workflows, and people intersect — helping teams move from confusion to clear, confident decisions."
            ctaText="Explore my work"
            ctaHref="#work"
            icons={heroIcons}
          />
        </motion.section>
      </div>

      {/* Fade transition gradient from hero to work — desktop only */}
      <div className="relative z-30 h-0 sm:h-20 md:h-40 sm:bg-gradient-to-b sm:from-transparent sm:via-background/60 sm:to-background" />

      {/* WORK SECTION — white bg */}
      <section id="work" className="relative z-30 bg-teal-900 px-4 py-16 sm:px-6 sm:py-24 dark:bg-teal-950">
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="relative inline-block font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent blur-xl" />
              Curated Work
            </h2>
            <motion.p
              className="mt-4 w-full font-body text-lg text-white/80 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Blending research, design, and strategy to build meaningful enterprise platforms
            </motion.p>
            <motion.p
              className="mx-auto mt-3 max-w-xl font-body text-sm text-white/60"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              This interface showcases a curated representation of client work. Due to confidentiality agreements, project details are simplified.
            </motion.p>
          </motion.div>

          <AiSopCards />

          <WorkGrid>
            {projects.map((project) => (
              <WorkCard
                key={project.title}
                {...project}
                onOpenModal={
                project.title === "Unified Customer Definition" ? openUCDModal :
                project.title === "CR Control Tower" ? openCRModal :
                project.title === "Experience Unification" ? openEUModal :
                undefined
              }
              />
            ))}
          </WorkGrid>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <AboutSection />

      {/* COLLABORATE SECTION */}
      <CollaborateSection />

      {/* FOOTER */}
      <Footer />

      {/* CR CONTROL TOWER MODAL */}
      <AnimatePresence>
        {showCRModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            style={{ background: "rgba(0,0,0,0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCRModal}
          >
            <CRControlTowerCarousel onClose={closeCRModal} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* EXPERIENCE UNIFICATION MODAL */}
      <AnimatePresence>
        {showEUModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            style={{ background: "rgba(0,0,0,0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeEUModal}
          >
            <ExperienceUnificationCarousel onClose={closeEUModal} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* UCD MODAL */}
      <AnimatePresence>
        {showUCDModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            style={{ background: "rgba(0,0,0,0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeUCDModal}
          >
            <UCDCarousel onClose={closeUCDModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
