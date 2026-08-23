import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/mahika-photo.webp";
import { CrmDashboardMockup } from "@/components/CrmDashboardMockup";

interface IconData {
  id: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className: string;
}

export interface FloatingIconsHeroProps {
  /** Rendered in the display serif, italic — a second accent alongside highlightWord. */
  italicWord?: string;
  title: string;
  highlightWord?: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  icons: IconData[];
}

const FloatingIcon = ({
  mouseX,
  mouseY,
  iconData,
  index,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  iconData: IconData;
  index: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - cx, 2) + Math.pow(e.clientY - cy, 2)
        );
        if (distance < 150) {
          const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
          const force = (1 - distance / 150) * 50;
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  const IconComp = iconData.icon;

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className={cn("absolute z-0", iconData.className)}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <div className="rounded-2xl border border-foreground/[0.06] bg-background/80 p-3 shadow-sm backdrop-blur-sm">
        <IconComp className="h-7 w-7" />
      </div>
    </motion.div>
  );
};

export const FloatingIconsHero = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & FloatingIconsHeroProps
>(({ className, title, highlightWord, italicWord, subtitle, ctaText, ctaHref, icons, ...props }, ref) => {
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        mouseX.current = e.clientX;
        mouseY.current = e.clientY;
      }}
      className={cn(
        "relative flex w-full flex-col items-center justify-start overflow-hidden bg-background px-4 pb-6 pt-[8vh] md:min-h-screen md:pb-0 md:pt-[20vh]",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {icons.map((iconData, index) => (
          <FloatingIcon
            key={iconData.id}
            mouseX={mouseX}
            mouseY={mouseY}
            iconData={iconData}
            index={index}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <motion.div
          className="h-28 w-28 overflow-hidden rounded-full border-2 border-primary/20 bg-primary/5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img src={heroImage} alt="Mahika Kaushik" width={112} height={112} decoding="async" className="h-full w-full object-cover" />
        </motion.div>

        <motion.h1
          className="whitespace-normal text-center font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl md:whitespace-nowrap md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {(() => {
            const highlight = (text: string, key: string) =>
              highlightWord && text.includes(highlightWord) ? (
                <span key={key}>
                  {text.split(highlightWord)[0]}
                  <span className="animate-gradient-text bg-gradient-to-r from-foreground via-primary/60 to-foreground bg-[length:300%_auto] bg-clip-text text-transparent">
                    {highlightWord}
                  </span>
                  {text.split(highlightWord)[1]}
                </span>
              ) : (
                <span key={key}>{text}</span>
              );

            if (italicWord && title.includes(italicWord)) {
              const [before, after] = title.split(italicWord);
              return (
                <>
                  {highlight(before, "a")}
                  <span className="font-display italic font-semibold tracking-[-0.005em] pr-[0.05em]">
                    {italicWord}
                  </span>
                  {highlight(after, "b")}
                </>
              );
            }
            return highlight(title, "t");
          })()}
        </motion.h1>

        <motion.p
          className="max-w-3xl font-body text-base text-muted-foreground sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {subtitle}
        </motion.p>

        <motion.p
          className="max-w-2xl font-body text-[13px] text-muted-foreground sm:text-[15px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Enterprise Data Platforms · Governance &amp; Policy UX · Design Systems · AI-Native Tooling
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <button
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full bg-primary px-6 py-2.5 font-body text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {ctaText}
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full border border-foreground/10 px-6 py-2.5 font-body text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            ✦ Contact Me
          </button>
        </motion.div>

        <CrmDashboardMockup />
      </div>
    </div>
  );
});
FloatingIconsHero.displayName = "FloatingIconsHero";
