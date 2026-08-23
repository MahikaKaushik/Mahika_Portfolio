import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Download } from "lucide-react";
import heroImage from "@/assets/mahika-photo.webp";

const navLinks = [
  { label: "Work", href: "/#work", id: "work" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [inView, setInView] = useState<string | null>(null);

  /* Which home section is on screen. Hash matching was unreliable — it kept
     whatever you last clicked, so Contact stayed lit halfway up the page. */
  useEffect(() => {
    if (pathname !== "/") {
      setInView(null);
      return;
    }
    const els = ["work", "about", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top) setInView(top.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [pathname]);

  /* /about keeps About lit, so the tab survives "Know more about me". */
  const isActive = (id: string) =>
    id === "about" ? pathname.startsWith("/about") || inView === "about" : pathname === "/" && inView === id;

  return (
    <div className="fixed left-0 right-0 top-5 z-50 flex justify-center px-4">
      <motion.nav
        className="flex items-center gap-1 rounded-2xl border border-foreground/[0.06] bg-background/60 px-2.5 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-2xl backdrop-saturate-150"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl px-3 py-1.5 transition-colors hover:bg-foreground/[0.04]"
        >
          <img src={heroImage} alt="Mahika Kaushik" width={28} height={28} decoding="async" className="h-7 w-7 rounded-lg object-cover" />
          <span className="hidden font-body text-sm font-medium text-foreground sm:inline">
            Mahika Kaushik
          </span>
        </Link>

        {/* Mobile hamburger */}
        <button
          className="ml-1 rounded-lg p-1.5 text-foreground/60 transition-colors hover:bg-foreground/[0.04] md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {open ? (
              <>
                <line x1="4" y1="4" x2="14" y2="14" />
                <line x1="14" y1="4" x2="4" y2="14" />
              </>
            ) : (
              <>
                <line x1="3" y1="5" x2="15" y2="5" />
                <line x1="3" y1="9" x2="15" y2="9" />
                <line x1="3" y1="13" x2="15" y2="13" />
              </>
            )}
          </svg>
        </button>

        {/* Desktop links */}
        <div className="mx-1 hidden h-5 w-px bg-foreground/[0.08] md:block" />

        {navLinks.map((link) => {
          const active = isActive(link.id);
          return (
            <a
              key={link.label}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`hidden rounded-xl px-3.5 py-1.5 font-body text-sm transition-all md:block ${
                active
                  ? "bg-foreground/[0.08] font-medium text-foreground"
                  : "text-foreground/80 hover:bg-foreground/[0.04] hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          );
        })}

        <div className="mx-1 hidden h-5 w-px bg-foreground/[0.08] md:block" />

        <a
          href="/resume.pdf"
          download="Mahika-Kaushik-Resume.pdf"
          className="group hidden items-center gap-1.5 rounded-xl bg-foreground/[0.06] px-3.5 py-1.5 font-body text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.1] md:inline-flex"
        >
          <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
          Resume
        </a>

      </motion.nav>

      {/* Mobile dropdown */}
      {open && (
        <motion.div
          className="absolute top-full mt-2 flex flex-col gap-1 rounded-2xl border border-foreground/[0.06] bg-background/90 p-2 shadow-lg backdrop-blur-2xl md:hidden"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navLinks.map((link) => {
            const active = isActive(link.id);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`rounded-xl px-5 py-2 font-body text-sm transition-all ${
                  active
                    ? "bg-foreground/[0.08] font-medium text-foreground"
                    : "text-foreground/80 hover:bg-foreground/[0.04]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="/resume.pdf"
            download="Mahika-Kaushik-Resume.pdf"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1.5 rounded-xl bg-foreground/[0.06] px-5 py-2 font-body text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.1]"
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </a>
        </motion.div>
      )}
    </div>
  );
}
