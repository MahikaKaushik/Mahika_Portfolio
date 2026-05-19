import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, Line } from "@react-three/drei";
import { useRef, useState, Suspense } from "react";
import * as THREE from "three";

/* ─── Sticky Note Node ─── */
const StickyNote = ({
  position,
  label,
  sublabel,
  color,
  shadowColor,
  rotate,
  pinColor,
  size = "normal",
}: {
  position: [number, number, number];
  label: string;
  sublabel?: string;
  color: string;
  shadowColor: string;
  rotate?: string;
  pinColor?: string;
  size?: "large" | "normal" | "small";
}) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        hovered ? 0.05 : 0,
        0.1
      );
    }
  });

  const width = size === "large" ? 180 : size === "small" ? 120 : 145;
  const padding = size === "large" ? "px-5 py-4" : size === "small" ? "px-3 py-2.5" : "px-4 py-3";

  return (
    <group ref={ref} position={position}>
      <Html
        center
        distanceFactor={8}
        style={{ pointerEvents: "auto" }}
      >
        <div
          className="cursor-pointer select-none transition-all duration-300"
          style={{
            transform: `rotate(${rotate || "0deg"}) scale(${hovered ? 1.08 : 1})`,
            filter: hovered ? "brightness(1.05)" : "none",
          }}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          {/* Pin */}
          {pinColor && (
            <div
              className="absolute -top-2 left-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full shadow-md z-10"
              style={{ backgroundColor: pinColor }}
            />
          )}
          <div
            className={`rounded-xl ${padding} border`}
            style={{
              width: `${width}px`,
              backgroundColor: color,
              borderColor: shadowColor,
              boxShadow: `3px 3px 0px ${shadowColor}`,
            }}
          >
            <p
              className={`font-semibold text-center ${
                size === "large" ? "text-[11px]" : "text-[9px]"
              }`}
              style={{ color: "hsl(200, 15%, 20%)" }}
            >
              {label}
            </p>
            {sublabel && (
              <p
                className="text-center mt-0.5"
                style={{
                  fontSize: size === "large" ? "8px" : "7px",
                  color: "hsl(200, 10%, 45%)",
                }}
              >
                {sublabel}
              </p>
            )}
          </div>
        </div>
      </Html>
    </group>
  );
};

/* ─── Connection Line ─── */
const ConnectionLine = ({
  start,
  end,
  color = "hsl(174, 45%, 50%)",
  dashed = false,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  dashed?: boolean;
}) => (
  <Line
    points={[start, end]}
    color={color}
    lineWidth={dashed ? 1 : 1.5}
    dashed={dashed}
    dashSize={0.15}
    gapSize={0.1}
    opacity={0.5}
    transparent
  />
);

/* ─── Floating Particles ─── */
const Particles = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 60;
  const positions = useRef(
    Float32Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 14)
  );

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="hsl(174, 40%, 60%)" transparent opacity={0.4} />
    </points>
  );
};

/* ─── Slow Auto-Rotate ─── */
const AutoRotate = () => {
  const { camera } = useThree();
  const angle = useRef(0);

  useFrame((_, delta) => {
    angle.current += delta * 0.08;
    const radius = 10;
    camera.position.x = Math.sin(angle.current) * radius;
    camera.position.z = Math.cos(angle.current) * radius;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

/* ─── Scene ─── */
const MindMapScene = () => {
  const apps = [
    {
      name: "CRM Portal",
      pos: [-3, 1.5, 0] as [number, number, number],
      color: "hsl(45, 90%, 88%)",
      shadow: "hsl(45, 60%, 70%)",
      pin: "hsl(174, 55%, 40%)",
      rotate: "-2deg",
      patterns: [
        { label: "Sidebar Nav", pos: [-5, 2.5, 1] as [number, number, number], rotate: "1.5deg" },
        { label: "Inline Forms", pos: [-5, 0.5, 1] as [number, number, number], rotate: "-1deg" },
      ],
    },
    {
      name: "Sales Dashboard",
      pos: [3, 1.5, 0] as [number, number, number],
      color: "hsl(0, 80%, 92%)",
      shadow: "hsl(0, 50%, 78%)",
      pin: "hsl(0, 70%, 60%)",
      rotate: "2deg",
      patterns: [
        { label: "Top Bar Nav", pos: [5, 2.5, 1] as [number, number, number], rotate: "-1.5deg" },
        { label: "Modal Forms", pos: [5, 0.5, 1] as [number, number, number], rotate: "1deg" },
      ],
    },
    {
      name: "Analytics Hub",
      pos: [-3, -1.5, 0] as [number, number, number],
      color: "hsl(260, 60%, 92%)",
      shadow: "hsl(260, 35%, 80%)",
      pin: "hsl(260, 55%, 60%)",
      rotate: "1.5deg",
      patterns: [
        { label: "Tab Navigation", pos: [-5, -0.5, 1] as [number, number, number], rotate: "-0.5deg" },
        { label: "Wizard Forms", pos: [-5, -2.5, 1] as [number, number, number], rotate: "1.5deg" },
      ],
    },
    {
      name: "Admin Console",
      pos: [3, -1.5, 0] as [number, number, number],
      color: "hsl(220, 80%, 93%)",
      shadow: "hsl(220, 50%, 80%)",
      pin: "hsl(220, 70%, 60%)",
      rotate: "-1.5deg",
      patterns: [
        { label: "Hybrid Nav", pos: [5, -0.5, 1] as [number, number, number], rotate: "0.5deg" },
        { label: "Mixed Patterns", pos: [5, -2.5, 1] as [number, number, number], rotate: "-1deg" },
      ],
    },
  ];

  const center: [number, number, number] = [0, 0, -0.5];

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.4} />

      <Particles />

      {/* Center node */}
      <StickyNote
        position={center}
        label="Product Ecosystem"
        sublabel="fragmented patterns"
        color="hsl(174, 50%, 88%)"
        shadowColor="hsl(174, 35%, 68%)"
        pinColor="hsl(174, 55%, 40%)"
        rotate="0deg"
        size="large"
      />

      {/* App nodes + their patterns */}
      {apps.map((app) => (
        <group key={app.name}>
          {/* Center → App connection */}
          <ConnectionLine start={center} end={app.pos} />

          {/* App node */}
          <StickyNote
            position={app.pos}
            label={app.name}
            color={app.color}
            shadowColor={app.shadow}
            pinColor={app.pin}
            rotate={app.rotate}
          />

          {/* App → Pattern connections */}
          {app.patterns.map((p) => (
            <group key={p.label}>
              <ConnectionLine start={app.pos} end={p.pos} color={app.shadow} dashed />
              <StickyNote
                position={p.pos}
                label={p.label}
                color="white"
                shadowColor="hsl(200, 10%, 82%)"
                rotate={p.rotate}
                size="small"
              />
            </group>
          ))}
        </group>
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
        rotateSpeed={0.5}
        autoRotate={false}
      />
    </>
  );
};

/* ─── Exported Component ─── */
export const FragmentationMindMap3D = () => (
  <div className="relative mt-12 w-full">
    <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
      Pattern Fragmentation Across Applications
    </p>
    <p className="mb-6 text-center text-[11px] text-muted-foreground/60">
      Drag to rotate · Interactive 3D mind map
    </p>
    <div className="mx-auto h-[420px] w-full max-w-4xl overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-muted/50 to-background sm:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <MindMapScene />
        </Suspense>
      </Canvas>
    </div>
  </div>
);
