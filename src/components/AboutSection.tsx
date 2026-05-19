import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import sketch1 from "@/assets/sketch-1.png";
import sketch2 from "@/assets/sketch-2.png";
import sketch3 from "@/assets/sketch-3.png";
import codeMl from "@/assets/code-ml.jpg";
import codeLogic from "@/assets/code-logic.jpg";
import codeFrontend from "@/assets/code-frontend.jpg";
const LazyQuestionNetwork = lazy(() => import("@/components/QuestionNetwork").then(m => ({ default: m.QuestionNetwork })));

const sketches = [sketch1, sketch2, sketch3];
const codeScreens = [codeMl, codeLogic, codeFrontend];
const codeLabels = ["ML / AI", "Algorithms", "Frontend"];

const StackedSketches = () => {
  const rotations = [-8, 4, -1];
  const offsets = [
    { x: -45, y: 10 },
    { x: 40, y: -8 },
    { x: -2, y: 2 },
  ];

  return (
    <div className="group relative flex h-full min-h-[200px] items-center justify-center">
      {sketches.map((src, i) => (
        <motion.div
          key={i}
          className="absolute h-[160px] w-[130px] overflow-hidden rounded-lg border-2 border-white bg-white shadow-lg sm:h-[185px] sm:w-[148px]"
          style={{ zIndex: i + 1 }}
          initial={{ rotate: rotations[i], x: offsets[i].x, y: offsets[i].y }}
          whileHover={{ scale: 1.15, zIndex: 10, rotate: 0, y: -16, transition: { duration: 0.3, ease: "easeOut" } }}
          whileInView={{ rotate: rotations[i], x: offsets[i].x, y: offsets[i].y }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 * i }}
        >
          <img src={src} alt={`Sketch ${i + 1}`} className="h-full w-full object-cover" />
        </motion.div>
      ))}
    </div>
  );
};

const StackedCodeScreens = () => {
  const rotations = [5, -4, 1];
  const offsets = [
    { x: -35, y: 6 },
    { x: 32, y: -5 },
    { x: -2, y: 2 },
  ];

  return (
    <div className="group relative flex h-full min-h-[170px] items-center justify-center overflow-hidden">
      {codeScreens.map((src, i) => (
        <motion.div
          key={i}
          className="absolute h-[110px] w-[140px] overflow-hidden rounded-lg border border-white/20 bg-[#1e1e2e] shadow-lg sm:h-[125px] sm:w-[160px]"
          style={{ zIndex: i + 1 }}
          initial={{
            rotate: rotations[i],
            x: offsets[i].x,
            y: offsets[i].y,
          }}
          whileHover={{
            scale: 1.15,
            zIndex: 10,
            rotate: 0,
            y: -16,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          whileInView={{
            rotate: rotations[i],
            x: offsets[i].x,
            y: offsets[i].y,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 * i }}
        >
          <img src={src} alt={codeLabels[i]} className="h-full w-full object-cover" />
          <span className="absolute bottom-1 left-2 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[9px] text-white/80">
            {codeLabels[i]}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const stats = [
  {
    value: "15+",
    label: "years of sketching",
    description:
      "Long before interfaces, I sketched portraits and scenes. Drawing shaped how I notice patterns, details, and structure.",
    customPreview: "sketches",
  },
  {
    value: "5+",
    label: "years of coding",
    description:
      "From Java and C++ to machine learning models and system logic — coding trained me to think in structured systems.",
    customPreview: "code",
  },
  {
    value: "∞",
    label: "questions asked",
    description:
      "Most of my process begins with curiosity — asking why things work the way they do and how they could work better.",
    wide: true,
    customPreview: "questions",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative z-30 bg-background px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* About Me Card - Elevated & Pop-out */}
          <motion.div
            className="relative col-span-1 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[hsl(174,45%,18%)] via-[hsl(174,40%,22%)] to-[hsl(180,35%,20%)] p-8 text-white shadow-[0_30px_70px_-15px_rgba(0,80,72,0.45),0_15px_35px_-10px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,90,80,0.1)] lg:col-span-2 lg:-my-8 lg:z-10 animate-[float_5s_ease-in-out_infinite]"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div>
              <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
                I'm Mahika Kaushik
              </h2>
              
              <div className="mt-6 space-y-4 font-body text-sm leading-relaxed text-justify sm:text-base">
                <p className="text-white/90">
                  I didn't start as a designer.<br />
                  <span className="text-white">I started as an engineer.</span>
                </p>
                
                <p className="text-white/70">
                  My early years were spent writing code, training machine learning models, and trying to understand how systems behave under the hood. That experience taught me how complex systems are built — and more importantly, why they often become difficult for people to use.
                </p>
                
                <p className="text-white/90">
                  Over time I realized the hardest problems weren't technical.<br />
                  <span className="text-white font-medium">They were human.</span>
                </p>
                
                <p className="text-white/60 italic">
                  Why do tools meant to simplify work often make it harder?<br />
                  Why do systems that technically function still feel frustrating?
                </p>
                
                <p className="text-white/70">
                  That curiosity slowly pulled me toward design.
                </p>
                
                <p className="text-white/80">
                  Today I sit somewhere between engineering logic and design thinking — designing systems where data, workflows, and people intersect.
                </p>
                
                <p className="pt-2 text-white/90">
                  I still think like an engineer.<br />
                  <span className="text-white font-medium">I just design like a human.</span>
                </p>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="/about"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 font-body text-sm font-medium text-foreground transition-all hover:bg-white/90 hover:shadow-lg sm:w-auto"
              >
                Know more about me
              </a>
            </div>
          </motion.div>

          {/* Stats Cards Grid */}
          <div className="col-span-1 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3">
            {stats.map((stat, index) => {
              const floatDelays = ["0.5s", "1.2s", "0.8s"];
              return (
              <motion.div
                key={stat.label}
                className={`flex flex-col rounded-2xl overflow-hidden border border-[hsl(174,30%,90%)] bg-[hsl(174,30%,96%)] ${stat.wide ? "col-span-2" : ""}`}
                style={{ animation: `float 5s ease-in-out ${floatDelays[index]} infinite` }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.15 * (index + 1) }}
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
                      {stat.value}
                    </span>
                    <span className="text-right text-sm text-muted-foreground mt-2">
                      {stat.label}
                    </span>
                  </div>
                  
                  <div className="my-4 h-px w-full bg-gradient-to-r from-[hsl(174,20%,80%)] via-[hsl(174,15%,85%)] to-transparent" />

                  {/* Stacked previews */}
                  {stat.customPreview === "sketches" && (
                    <div className="mb-4 flex-1">
                      <StackedSketches />
                    </div>
                  )}
                  {stat.customPreview === "code" && (
                    <div className="mb-4 flex-1">
                      <StackedCodeScreens />
                    </div>
                  )}
                  {stat.customPreview === "questions" && (
                    <div className="mb-4 -mx-6">
                      <Suspense fallback={<div className="h-[200px] w-full animate-pulse bg-muted" />}>
                        <LazyQuestionNetwork />
                      </Suspense>
                    </div>
                  )}
                  
                  <p className="font-body text-sm leading-relaxed text-muted-foreground text-justify">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
};

export { AboutSection };
