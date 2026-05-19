"use client";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Track which entry the progress line has reached
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const count = data.length;
    // Each entry occupies an equal slice of progress
    const idx = Math.floor(latest * count);
    setActiveIndex(Math.min(idx, count - 1));
  });

  return (
    <div className="w-full font-body" ref={containerRef}>
      {/* Header */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:px-8">
        <motion.h2
          className="font-serif text-2xl font-bold text-white sm:text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          The Journey So Far
        </motion.h2>
        <motion.p
          className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          From curiosity and code to systems and design — here's how the pieces came together.
        </motion.p>
      </div>

      {/* Timeline entries */}
      <div ref={ref} className="relative mx-auto max-w-5xl pb-20">
        {data.map((item, index) => {
          const isActive = index <= activeIndex;

          return (
            <div
              key={index}
              className="flex justify-start pt-10 md:gap-10 md:pt-16"
            >
              {/* Left sticky title */}
              <div className="sticky top-28 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
                {/* Dot */}
                <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(180,35%,20%)] md:left-3">
                  <motion.div
                    className="h-4 w-4 rounded-full border-2"
                    animate={{
                      borderColor: isActive ? "hsl(174, 55%, 55%)" : "hsl(180, 20%, 35%)",
                      backgroundColor: isActive ? "hsl(174, 55%, 45%)" : "hsl(180, 35%, 20%)",
                      scale: isActive ? 1.15 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </div>
                {/* Title (desktop) */}
                <motion.h3
                  className="hidden pl-16 font-serif text-xl font-bold md:block md:text-2xl"
                  animate={{
                    color: isActive ? "hsl(174, 55%, 70%)" : "hsl(180, 15%, 45%)",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {item.title}
                </motion.h3>
              </div>

              {/* Right content with background card */}
              <div className="relative w-full pl-16 pr-4 md:pl-4">
                {/* Title (mobile) */}
                <motion.h3
                  className="mb-4 block text-left font-serif text-lg font-bold md:hidden"
                  animate={{
                    color: isActive ? "hsl(174, 55%, 70%)" : "hsl(180, 15%, 45%)",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {item.title}
                </motion.h3>

                {/* Content card */}
                <motion.div
                  className="rounded-xl px-5 py-5 sm:px-6 sm:py-6"
                  animate={{
                    backgroundColor: isActive ? "hsla(0, 0%, 100%, 1)" : "hsla(0, 0%, 100%, 0)",
                    boxShadow: isActive
                      ? "0 4px 24px hsla(0, 0%, 0%, 0.12)"
                      : "0 0px 0px hsla(0, 0%, 0%, 0)",
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0.4 }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.content}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          );
        })}

        {/* Animated line */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,transparent,hsl(180,20%,35%),transparent)] md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-full rounded-full bg-gradient-to-t from-[hsl(174,55%,45%)] via-[hsl(174,55%,35%)] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
