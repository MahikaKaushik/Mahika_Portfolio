import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  company: string;
  title: string;
  highlight: string;
  highlightIcon?: string;
  href: string;
  background: ReactNode;
  disabled?: boolean;
  className?: string;
}

const ProjectCard = ({
  company,
  title,
  highlight,
  highlightIcon,
  href,
  background,
  disabled,
  className,
}: ProjectCardProps) => {
  const parts = title.split(highlight);

  return (
    <motion.div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-foreground/[0.06] bg-background transition-shadow hover:shadow-xl",
        disabled && "opacity-60 pointer-events-none",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 px-5 pt-6 pb-4 sm:px-8 sm:pt-8">
        <p className="font-body text-xs text-muted-foreground sm:text-sm">{company}</p>
        <h3 className="mt-2 max-w-lg font-body text-lg font-medium leading-snug text-foreground sm:text-xl md:text-2xl">
          {parts[0]}
          {highlight && (
            <span className="mx-1 inline-flex items-center gap-1 rounded-full border border-primary/15 bg-primary/[0.06] px-2 py-0.5 align-middle font-body text-sm font-medium text-primary sm:mx-1.5 sm:gap-1.5 sm:px-3 sm:text-base">
              {highlightIcon && <span className="text-sm">{highlightIcon}</span>}
              {highlight}
            </span>
          )}
          {parts[1]}
        </h3>
        {!disabled && (
          <a
            href={href}
            className="absolute right-5 top-6 rounded-full border border-foreground/[0.1] px-3 py-1 font-body text-xs text-foreground opacity-0 transition-all group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground hover:border-primary sm:right-8 sm:top-8 sm:px-4 sm:py-1.5 sm:text-sm"
          >
            View
          </a>
        )}
        {disabled && (
          <span className="absolute right-5 top-6 rounded-full border border-foreground/[0.06] px-3 py-1 font-mono text-[10px] text-muted-foreground sm:right-8 sm:top-8 sm:px-4 sm:py-1.5 sm:text-xs">
            Coming soon
          </span>
        )}
      </div>

      <div className="relative mt-auto min-h-[200px] flex-1 overflow-hidden sm:min-h-[280px]">
        {background}
      </div>
    </motion.div>
  );
};

const ProjectGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn("grid grid-cols-1 gap-6 lg:grid-cols-2", className)}>
    {children}
  </div>
);

export { ProjectCard, ProjectGrid };
