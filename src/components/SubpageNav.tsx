import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const caseStudies = [
  { path: "/work/ucd", label: "Unified Customer Definition" },
  { path: "/work/control-tower", label: "CR Control Tower" },
  { path: "/work/system-unification", label: "System Unification" },
];

interface SubpageNavProps {
  label: string;
  darkSectionId?: string;
}

export function SubpageNav({ label, darkSectionId = "hero-dark" }: SubpageNavProps) {
  const [isLight, setIsLight] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const currentStudy = caseStudies.find((cs) => cs.path === location.pathname);
  const otherStudies = caseStudies.filter((cs) => cs.path !== location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      const darkSection = document.getElementById(darkSectionId);
      if (!darkSection) {
        setIsLight(false);
        return;
      }
      const rect = darkSection.getBoundingClientRect();
      setIsLight(rect.bottom < 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [darkSectionId]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBackHome = () => {
    navigate("/#work");
  };

  return (
    <div className="fixed left-0 right-0 top-5 z-50 flex justify-center px-4">
      <motion.div
        className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-2xl transition-colors duration-300 ${
          isLight
            ? "border-foreground/[0.06] bg-background/70"
            : "border-white/10 bg-white/10"
        }`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <button
          onClick={handleBackHome}
          className={`flex items-center gap-2 rounded-xl px-2 py-1.5 font-body text-sm transition-colors ${
            isLight
              ? "text-foreground/70 hover:bg-foreground/[0.04] hover:text-foreground"
              : "text-white/80 hover:bg-white/10 hover:text-white"
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back home</span>
        </button>

        <div className={`mx-1 h-5 w-px transition-colors duration-300 ${isLight ? "bg-foreground/[0.08]" : "bg-white/20"}`} />

        {/* Case study switcher */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex items-center gap-1.5 rounded-xl px-2 py-1.5 font-body text-sm font-medium transition-colors ${
              isLight
                ? "text-foreground hover:bg-foreground/[0.04]"
                : "text-white hover:bg-white/10"
            }`}
          >
            {label}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 min-w-[240px] overflow-hidden rounded-xl border border-foreground/[0.08] bg-background/90 shadow-xl backdrop-blur-2xl"
              >
                <div className="px-3 py-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Case Studies
                  </p>
                </div>
                {otherStudies.map((study) => (
                  <Link
                    key={study.path}
                    to={study.path}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 font-body text-sm text-foreground/80 transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
                  >
                    {study.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
