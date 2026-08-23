import { ReactNode, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Clock, X } from "lucide-react";
import { Link } from "react-router-dom";

interface WorkCardProps {
  title: string;
  description: string;
  tags: string[];
  projectType?: string;
  href: string;
  cta?: string;
  preview: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  comingSoon?: boolean;
  className?: string;
  titleClassName?: string;
  onOpenModal?: () => void;
  /** Span both grid columns. Widens the preview panel to keep the
      content/preview balance from going lopsided at double width. */
  wide?: boolean;
}

const WorkCard = ({
  title,
  description,
  tags,
  projectType,
  href,
  preview,
  disabled,
  comingSoon,
  className,
  titleClassName,
  onOpenModal,
  wide,
}: WorkCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const isClickable = !disabled && !comingSoon;
  const inProgress = disabled || comingSoon;

  const handleClick = () => {
    if (comingSoon) setShowModal(true);
    else if (onOpenModal) onOpenModal();
  };

  return (
    <>
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card",
        inProgress
          ? "cursor-default border-dashed border-foreground/20 shadow-none"
          : "border-border/50 shadow-sm",
        !inProgress && (disabled || comingSoon || onOpenModal || href) && "cursor-pointer",
        wide && "md:col-span-2",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={inProgress ? undefined : {
        scale: 1.015,
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      whileTap={inProgress ? undefined : { scale: 0.99 }}
      onClick={handleClick}
    >
      {/* Everything the card shows, greyed and frozen when parked.
          The badge sits outside this so the filter can't touch it. */}
      <MotionConfig reducedMotion={inProgress ? "always" : "user"}>
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-[1fr_auto]",
          inProgress && "pointer-events-none select-none opacity-45 grayscale [&_*]:!animate-none"
        )}
      >
      {/* Left - Content */}
      <div className="flex flex-col gap-4 p-6 sm:p-8">
        {/* Header: Title + Project Type */}
        <div>
          <h3 className={cn("font-serif text-xl font-semibold text-foreground sm:text-2xl", titleClassName)}>
            {title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
            {projectType && (
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/55 sm:text-[12px]">
                {projectType}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="font-body text-[15px] leading-relaxed text-foreground/75 sm:text-[16.5px] sm:leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Impact metrics */}
        <div className="flex items-center gap-8 border-t border-border/40 pt-4">
          {tags.map((tag, i) => {
            const parts = tag.match(/^([\d+.KkMm%×]+)\s*(.+)$/);
            const value = parts ? parts[1] : tag;
            const label = parts ? parts[2] : "";
            return (
              <div key={i} className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-primary">{value}</span>
                {label && (
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.13em] text-foreground/60">{label}</span>
                )}
              </div>
            );
          })}


        </div>
      </div>

      {/* Right - Preview */}
      <div
        className={cn(
          "relative hidden h-full overflow-hidden bg-gradient-to-br from-muted/30 via-muted/50 to-muted/70 lg:block",
          wide ? "w-[340px] xl:w-[420px]" : "w-[160px] xl:w-[180px]"
        )}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--foreground) / 0.1) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        />
        <div
          className={cn(
cn(
            "absolute inset-0 flex items-center justify-center p-4",
            inProgress && "opacity-25"
          )
          )}
        >
          {preview}
        </div>
      </div>

      </div>
      </MotionConfig>

      {/* Dark scrim, per card, sitting over the greyed content */}
      {inProgress && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl bg-[hsl(180,30%,14%)]/35"
        />
      )}

      {/* Work-in-progress badge — sits above the greyed layer, full strength */}
      {inProgress && (
        <span className="pointer-events-none absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 whitespace-nowrap rounded-xl bg-background px-3 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.10)] sm:px-3.5 sm:py-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:h-8 sm:w-8">
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
          <span className="font-body text-[13px] font-medium text-foreground sm:text-sm">
            Work in progress
          </span>
        </span>
      )}

      {/* Punch-out button */}
      {isClickable && !onOpenModal ? (
        <>
          {/* One link, covering the whole card — keeps a single tab stop and
              a real focus ring instead of a div with an onClick. */}
          <Link
            to={href}
            className="absolute inset-0 z-20 rounded-2xl"
            aria-label={`View ${title} case study`}
          />
          <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 z-20">
            <svg className="block" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M56 0C56 30.928 30.928 56 0 56H56V0Z" className="fill-muted/60" />
            </svg>
            <span className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-110">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </span>
        </>
      ) : isClickable && onOpenModal ? (
        <button
          onClick={onOpenModal}
          className="absolute bottom-0 right-0 z-20"
          aria-label={`Open ${title}`}
        >
          <svg className="block" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M56 0C56 30.928 30.928 56 0 56H56V0Z" className="fill-muted/60" />
          </svg>
          <span className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-110">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </button>
      ) : null}
    </motion.div>

    {/* Coming Soon Modal */}
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="relative mx-4 max-w-sm rounded-2xl bg-card p-8 shadow-2xl border border-border/50"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">Working on it</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                The <span className="font-medium text-foreground">{title}</span> case study is being rebuilt to match the depth of the flagship. Back shortly.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

const WorkGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2", className)}>
    {children}
  </div>
);

export { WorkCard, WorkGrid };
