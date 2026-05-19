import { motion } from "framer-motion";
import { Link2, Linkedin } from "lucide-react";

const CollaborateSection = () => {
  return (
    <section id="contact" className="relative z-30 bg-background px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="relative rounded-3xl">

          <motion.div
            className="relative rounded-3xl bg-gradient-to-b from-muted/40 to-muted/70 px-6 py-16 text-center sm:px-12 sm:py-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            {/* Floating avatar - Mahika */}
            <motion.div
              className="absolute left-[6%] top-[50%] hidden lg:block"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg">
                  Mahika Kaushik
                </div>
                <div className="h-0 w-0 border-l-[8px] border-t-[6px] border-l-primary border-t-transparent" />
              </div>
            </motion.div>

            {/* Floating avatar - You */}
            <motion.div
              className="absolute right-[8%] top-[22%] hidden sm:block"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-0 w-0 border-r-[8px] border-t-[6px] border-r-destructive border-t-transparent" />
                <div className="rounded-full bg-destructive px-4 py-2 text-sm font-medium text-white shadow-lg">
                  You
                </div>
              </div>
            </motion.div>

            {/* Main content */}
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
              Let's Collaborate Together
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-body text-base text-muted-foreground sm:text-lg">
              If you're building something interesting, I'd love to work together.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="mailto:kaushikmahika@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 font-body text-sm font-medium text-foreground shadow-sm transition-all hover:shadow-md"
              >
                kaushikmahika@gmail.com
                <Link2 className="h-4 w-4 text-muted-foreground" />
              </a>
              <a
                href="https://www.linkedin.com/in/mahika-kaushik-366649219/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-body text-sm font-medium text-background transition-all hover:bg-foreground/90"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { CollaborateSection };
