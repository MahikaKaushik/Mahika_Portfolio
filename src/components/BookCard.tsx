import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface BookCardProps {
  title: string;
  description: string;
  tags: string[];
  href: string;
  cta: string;
  cover: ReactNode;
  disabled?: boolean;
  className?: string;
}

const BookCard = ({
  title,
  description,
  tags,
  href,
  cta,
  cover,
  disabled,
  className,
}: BookCardProps) => {
  return (
    <motion.div
      className={cn(
        "group relative h-full perspective-1000",
        disabled && "opacity-70",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Book container */}
      <div className="relative flex h-full flex-col transition-transform duration-500 ease-out group-hover:scale-[1.02]">
        {/* Book spine shadow */}
        <div className="absolute -left-2 top-2 bottom-2 w-4 rounded-l-sm bg-gradient-to-r from-foreground/20 to-transparent blur-sm" />
        
        {/* Book body */}
        <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-foreground/10 bg-card shadow-xl transition-shadow duration-300 group-hover:shadow-2xl">
          {/* Book cover - animated UI preview */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
            {/* Animated cover content */}
            <div className="absolute inset-0">
              {cover}
            </div>
            
            {/* Subtle book page edges on right */}
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-foreground/5 to-transparent" />
            
            {/* Shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
          
          {/* Book content area */}
          <div className="relative p-5 sm:p-6">
            {/* Tags */}
            <div className="mb-3 flex gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex shrink-0 items-center rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-primary/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-primary shadow-sm sm:text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Title */}
            <h3 className="font-serif text-lg font-semibold leading-snug text-foreground sm:text-xl">
              {title}
            </h3>
            
            {/* Description */}
            <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
            
            {/* CTA */}
            <div className="mt-4">
              {!disabled ? (
                <a
                  href={href}
                  className="group/cta inline-flex items-center gap-1.5 font-body text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  {cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  {cta}
                </span>
              )}
            </div>
          </div>
          
          {/* Book binding effect - left edge */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-foreground/10 to-transparent" />
        </div>
        
        {/* Bottom shadow for 3D effect */}
        <div className="absolute -bottom-2 left-4 right-4 h-4 rounded-b-xl bg-foreground/5 blur-md" />
      </div>
    </motion.div>
  );
};

const BookGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8", className)}>
    {children}
  </div>
);

export { BookCard, BookGrid };
