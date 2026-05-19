import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
}: WorkCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const isClickable = !disabled && !comingSoon;

  const handleClick = () => {
    if (comingSoon) setShowModal(true);
    else if (onOpenModal) onOpenModal();
  };

  return (
    <>
    <motion.div
      className={cn(
        "group relative grid grid-cols-1 overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm lg:grid-cols-[1fr_auto]",
        (disabled || comingSoon || onOpenModal) && "cursor-pointer",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.015,
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      whileTap={{ scale: 0.99 }}
      onClick={handleClick}
    >
      {/* Left - Content */}
      <div className="flex flex-col gap-4 p-6 sm:p-8">
        {/* Header: Title + Project Type */}
        <div>
          <h3 className={cn("font-serif text-xl font-semibold text-foreground sm:text-2xl", titleClassName)}>
            {title}
          </h3>
          {projectType && (
            <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:text-[11px]">
              {projectType}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="font-body text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed line-clamp-3">
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
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
                )}
              </div>
            );
          })}

          {(disabled || comingSoon) && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-4 py-2 font-mono text-[11px] text-muted-foreground">
              <Clock className="h-3 w-3" />
              Coming Soon
            </span>
          )}
        </div>
      </div>

      {/* Right - Preview */}
      <div className="relative hidden h-full w-[160px] overflow-hidden bg-gradient-to-br from-muted/30 via-muted/50 to-muted/70 lg:block xl:w-[180px]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--foreground) / 0.1) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center p-4">
          {preview}
        </div>
      </div>

      {/* Punch-out button or Coming Soon badge */}
      {isClickable && !onOpenModal ? (
        <Link
          to={href}
          className="absolute bottom-0 right-0 z-20"
          aria-label={`View ${title}`}
        >
          <svg className="block" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M56 0C56 30.928 30.928 56 0 56H56V0Z" className="fill-muted/60" />
          </svg>
          <span className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-110">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
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
      ) : comingSoon ? (
        <div className="absolute bottom-0 right-0 z-20">
          <svg className="block" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M56 0C56 30.928 30.928 56 0 56H56V0Z" className="fill-muted/60" />
          </svg>
          <span className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-muted border border-border text-muted-foreground shadow-md">
            <Clock className="h-4 w-4" />
          </span>
        </div>
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
              <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">Coming Soon</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                The <span className="font-medium text-foreground">{title}</span> case study is currently being crafted. Check back soon for the full story.
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
