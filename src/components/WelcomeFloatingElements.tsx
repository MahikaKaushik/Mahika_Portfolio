import { motion } from "framer-motion";
import { useMemo } from "react";

interface GlobeNode {
  x: number;
  y: number;
  z: number;
  label: string;
  size: number;
  delay: number;
}

// Distribute points on a sphere using fibonacci spiral
function fibonacciSphere(count: number): { x: number; y: number; z: number }[] {
  const points: { x: number; y: number; z: number }[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
    });
  }
  return points;
}

const labels = [
  "UX", "UI", "API", "DB", "C1", "C2", "DS", "IA", "HCI", "SYS",
  "CX", "AB", "MVP", "KPI", "OKR", "PM", "QA", "CI", "CD", "AI",
  "ML", "DX", "FE", "BE", "SDK", "JWT", "SSO", "CMS", "CDN", "SPA",
];

const GLOBE_RADIUS = 48; // percentage of container

export function WelcomeFloatingElements() {
  const nodes = useMemo(() => {
    const spherePoints = fibonacciSphere(30);
    return spherePoints
      .map((p, i): GlobeNode => ({
        x: 50 + p.x * GLOBE_RADIUS,
        y: 50 + p.y * GLOBE_RADIUS,
        z: p.z,
        label: labels[i % labels.length],
        size: 20 + (p.z + 1) * 8,
        delay: i * 0.3,
      }))
      .filter((node) => {
        // Exclude nodes in the center text area
        const dx = Math.abs(node.x - 50);
        const dy = Math.abs(node.y - 50);
        return dx > 18 || dy > 14;
      });
  }, []);

  // Generate connecting lines between nearby nodes
  const connections = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; opacity: number; delay: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 22) {
          const avgZ = (nodes[i].z + nodes[j].z) / 2;
          lines.push({
            x1: nodes[i].x,
            y1: nodes[i].y,
            x2: nodes[j].x,
            y2: nodes[j].y,
            opacity: 0.08 + (avgZ + 1) * 0.12,
            delay: (i + j) * 0.15,
          });
        }
      }
    }
    return lines;
  }, [nodes]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Globe rotation container */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        {/* Connection lines */}
        <svg className="absolute inset-0 h-full w-full">
          {connections.map((line, i) => (
            <motion.line
              key={`wire-${i}`}
              x1={`${line.x1}%`}
              y1={`${line.y1}%`}
              x2={`${line.x2}%`}
              y2={`${line.y2}%`}
              stroke="white"
              strokeWidth="0.5"
              strokeDasharray="3 3"
              initial={{ opacity: 0 }}
              animate={{ opacity: [line.opacity * 0.5, line.opacity, line.opacity * 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: line.delay }}
            />
          ))}
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => {
          const opacity = 0.15 + (node.z + 1) * 0.35;
          const scale = 0.6 + (node.z + 1) * 0.3;

          return (
            <motion.div
              key={`node-${i}`}
              className="absolute flex items-center justify-center"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: `translate(-50%, -50%) scale(${scale})`,
              }}
              animate={{
                scale: [scale, scale * 1.1, scale],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: node.delay,
              }}
            >
              <div
                className="flex items-center justify-center rounded-lg border font-mono text-[7px]"
                style={{
                  width: node.size,
                  height: node.size,
                  borderColor: `rgba(255,255,255,${opacity * 0.4})`,
                  backgroundColor: `rgba(255,255,255,${opacity * 0.06})`,
                  color: `rgba(255,255,255,${opacity})`,
                  backdropFilter: node.z > 0.3 ? "blur(1px)" : undefined,
                }}
              >
                {node.label}
              </div>
            </motion.div>
          );
        })}

        {/* Orbit rings */}
        {[0.6, 0.8, 1].map((r, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border"
            style={{
              width: `${GLOBE_RADIUS * 2 * r}%`,
              height: `${GLOBE_RADIUS * 2 * r}%`,
              left: `${50 - GLOBE_RADIUS * r}%`,
              top: `${50 - GLOBE_RADIUS * r}%`,
              borderColor: `rgba(255,255,255,${0.04 + i * 0.02})`,
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
          />
        ))}
      </motion.div>
    </div>
  );
}
