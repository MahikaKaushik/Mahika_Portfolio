import { motion } from "framer-motion";
import crmScreen from "@/assets/crm-dashboard.webp";

export function CrmDashboardMockup() {
  return (
    <motion.div
      className="mx-auto hidden w-full max-w-5xl px-4 pb-0 sm:mt-16 sm:block"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
    >
      {/* Animated teal border wrapper */}
      <div className="relative rounded-2xl p-[1px] overflow-hidden">
        <div className="absolute inset-0 rounded-2xl">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-300/30 via-teal-500/50 to-teal-300/30 animate-shimmer bg-[length:200%_100%]" />
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_80px_-20px_rgba(0,0,0,0.15)]">
          <img
            src={crmScreen}
            alt="Enterprise CRM Dashboard — At a Glance view"
            width={1920}
            height={1199}
            decoding="async"
            className="w-full h-auto block"
          />
          {/* Progressive blur fade at bottom */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}
