import { useState } from "react";
import customerHierarchyImg from "@/assets/customer-hierarchy.webp";
import controlTowerImg from "@/assets/control-tower.webp";
import { motion, useReducedMotion } from "framer-motion";
import { FloatingIconsHero } from "@/components/ui/floating-icons-hero-section";
import { WorkCard, WorkGrid } from "@/components/WorkCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
    className="absolute right-1.5 top-1.5 z-30 rounded-full bg-background/85 p-1.5 text-foreground opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100"
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
    description: "Made 20M scattered customer records legible in one hierarchy — then made the high-stakes changes to it safe enough, and cheap enough, that people actually made them.",
    tags: ["50+ Spreadsheets", "4 Hierarchies", "1 Platform"],
    projectType: "Enterprise CRM / Data Management",
    href: "/work/ucd",
    icon: <Users className="h-7 w-7" />,
    preview: <UCDAnimatedPreview />,
    titleClassName: "whitespace-nowrap",
    wide: true,
  },
  {
    title: "CR Control Tower",
    description: "Created a centralized dashboard to monitor CRM data quality, detect system pollution, and track operational SLAs across enterprise data sources.",
    tags: ["15 Systems", "8K Issues", "3 Views"],
    projectType: "Data Quality / Analytics",
    href: "/work/control-tower",
    icon: <BarChart3 className="h-7 w-7" />,
    preview: <ControlTowerPreview />,
    comingSoon: true,
  },
  {
    title: "Experience Unification",
    description: "Audited product interfaces and designed a scalable system to align multiple platforms under a unified enterprise experience.",
    tags: ["11 Verticals", "40+ Components", "1 System"],
    projectType: "Design Systems / UX Strategy",
    href: "/work/system-unification",
    icon: <Layers className="h-7 w-7" />,
    preview: <UnificationBackground />,
    comingSoon: true,
  },
];

const Index = () => {



  return (
    <div className="relative bg-background">
      <Navbar />

      {/* Scroll container */}
      <div className="relative h-[200vh]">
        {/* HERO — sticky, white bg */}
        <section className="sticky top-0 z-10 h-screen">
          <FloatingIconsHero
            title="I design systems that think"
            highlightWord="think"
            italicWord="systems"
            subtitle="I design enterprise systems where data, workflows, and people intersect — helping teams move from confusion to clear, confident decisions."
            ctaText="Explore my work"
            ctaHref="#work"
            icons={heroIcons}
          />
        </section>
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
              Flagship Products
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

          <WorkGrid>
            {projects.map((project) => (
              <WorkCard key={project.title} {...project} />
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



    </div>
  );
};

export default Index;
