import { motion } from "framer-motion";

export const UCDBackground = () => (
  <div className="flex h-full w-full items-end justify-center bg-gradient-to-b from-background to-secondary/40 px-8 pb-0 pt-4">
    <div className="relative w-full max-w-md rounded-t-2xl border border-b-0 border-foreground/[0.06] bg-background p-6 shadow-lg">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
        <div className="h-2.5 w-2.5 rounded-full bg-accent-gold/40" />
        <div className="h-2.5 w-2.5 rounded-full bg-primary/40" />
        <span className="ml-3 font-mono text-[9px] text-muted-foreground">Customer 360</span>
      </div>
      <div className="flex flex-col gap-2">
        <motion.div
          className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="h-3 w-3 rounded-sm bg-primary" />
          <span className="font-mono text-[10px] font-medium text-primary">Acme Corporation</span>
          <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[8px] text-primary">C1</span>
        </motion.div>
        {[
          { name: "Acme Holdings Ltd", level: "C2", delay: 0.35 },
          { name: "Acme Tech Division", level: "C3", delay: 0.5 },
          { name: "Acme Cloud Services", level: "C4", delay: 0.65 },
        ].map((child) => (
          <motion.div
            key={child.name}
            className="ml-6 flex items-center gap-2 rounded-lg border border-foreground/[0.04] bg-muted/50 px-3 py-1.5"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: child.delay }}
          >
            <div className="h-0.5 w-3 bg-primary/20" />
            <span className="font-mono text-[9px] text-foreground/70">{child.name}</span>
            <span className="ml-auto font-mono text-[8px] text-muted-foreground">{child.level}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export const UnificationBackground = () => {
  const variantButtons = [
    { label: "Submit", style: "rounded-none bg-blue-500 text-white px-3 py-1 text-[9px] font-sans", x: -38, y: -35 },
    { label: "Submit", style: "rounded-full bg-green-600 text-white px-3 py-1 text-[9px] font-mono border border-green-400", x: 30, y: -28 },
    { label: "Submit", style: "rounded-md border border-red-500 text-red-500 px-3 py-1 text-[9px] font-serif bg-transparent", x: -28, y: 30 },
    { label: "Submit", style: "rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 text-[9px] font-sans", x: 35, y: 25 },
    { label: "Submit", style: "rounded-sm bg-yellow-400 text-black px-3 py-1 text-[8px] font-mono uppercase tracking-wider", x: -5, y: -50 },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-background to-secondary/40 overflow-hidden pr-12">
      <div className="relative" style={{ width: 140, height: 140 }}>
        {variantButtons.map((btn, i) => (
          <motion.button
            key={i}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap ${btn.style}`}
            style={{ pointerEvents: "none" }}
            animate={{
              x: [btn.x, btn.x, 0, 0, btn.x],
              y: [btn.y, btn.y, 0, 0, btn.y],
              opacity: [1, 1, 0, 0, 1],
              scale: [1, 1, 0.5, 0.5, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.3, 0.48, 0.72, 0.92],
            }}
          >
            {btn.label}
          </motion.button>
        ))}

        <motion.button
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-primary text-primary-foreground px-4 py-1.5 text-[10px] font-medium shadow-md"
          style={{ pointerEvents: "none" }}
          animate={{
            opacity: [0, 0, 0, 1, 1, 0],
            scale: [0.4, 0.4, 0.4, 1.05, 1, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.35, 0.46, 0.55, 0.74, 0.88],
          }}
        >
          Submit
        </motion.button>
      </div>
    </div>
  );
};

export const OrdersBackground = () => (
  <div className="flex h-full w-full items-end justify-center bg-gradient-to-b from-background to-secondary/40 px-8 pb-0 pt-4">
    <div className="relative w-full max-w-md rounded-t-2xl border border-b-0 border-foreground/[0.06] bg-background p-6 shadow-lg">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
        <div className="h-2.5 w-2.5 rounded-full bg-accent-gold/40" />
        <div className="h-2.5 w-2.5 rounded-full bg-primary/40" />
        <span className="ml-3 font-mono text-[9px] text-muted-foreground">Orders Explorer</span>
      </div>
      <div className="flex flex-col gap-1.5 font-mono text-[10px]">
        <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
          <span className="font-medium text-foreground">ORD-2847</span>
          <span className="rounded-full bg-accent-gold/15 px-2.5 py-0.5 text-[9px] text-accent-gold">Partial</span>
        </div>
        {[
          { id: "LINE-01", product: "Product A", status: "Done", statusColor: "bg-primary/10 text-primary" },
          { id: "LINE-02", product: "Product B", status: "Processing", statusColor: "bg-accent-blue/10 text-accent-blue" },
          { id: "LINE-03", product: "Product C", status: "Failed", statusColor: "bg-destructive/10 text-destructive" },
        ].map((line) => (
          <motion.div
            key={line.id}
            className="ml-4 flex items-center justify-between rounded-lg border border-foreground/[0.03] px-3 py-1.5"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-muted-foreground">└ {line.id} · {line.product}</span>
            <span className={`rounded-full px-2 py-0.5 text-[8px] ${line.statusColor}`}>{line.status}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export const DataQualityBackground = () => (
  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-background to-muted/40 gap-3">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-foreground/[0.06] bg-muted/50">
      <span className="text-3xl">🔒</span>
    </div>
    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
      Confidential
    </span>
    <span className="max-w-[200px] text-center font-mono text-[9px] leading-relaxed text-muted-foreground/60">
      Case study under stakeholder review
    </span>
  </div>
);
