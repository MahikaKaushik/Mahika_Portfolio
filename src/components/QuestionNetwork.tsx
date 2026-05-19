import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
const questionWords = ["What?", "Why?", "How?", "Where?", "When?", "Who?", "Which?", "Could?", "Should?"];

const QuestionNode = ({ position, scale, hovered, label }: { position: THREE.Vector3; scale: number; hovered: boolean; label: string }) => {
  const ref = useRef<THREE.Group>(null!);
  const baseY = position.y;

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 0.8 + position.x * 2) * 0.08;
      const targetScale = hovered ? scale * 1.3 : scale;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    }
  });

  const fontSize = label.length > 5 ? 0.18 : 0.22;

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={fontSize}
        color="hsl(174, 45%, 25%)"
        anchorX="center"
        anchorY="middle"
        font={undefined}
        fontWeight={700}
      >
        {label}
      </Text>
      <mesh>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="hsl(174, 40%, 50%)" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};
const ConnectionLine = ({ start, end, hovered }: { start: THREE.Vector3; end: THREE.Vector3; hovered: boolean }) => {
  const lineRef = useRef<any>(null);

  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints([start, end]);
    const mat = new THREE.LineBasicMaterial({ color: new THREE.Color("hsl(174, 35%, 55%)"), transparent: true, opacity: 0.25 });
    return new THREE.Line(geo, mat);
  }, [start, end]);

  useFrame(() => {
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, hovered ? 0.6 : 0.25, 0.05);
    }
  });

  return <primitive object={lineObj} ref={lineRef} />;
};

const Scene = ({ hovered, mousePos }: { hovered: boolean; mousePos: React.MutableRefObject<{ x: number; y: number }> }) => {
  const groupRef = useRef<THREE.Group>(null!);

  const { nodes, connections } = useMemo(() => {
    const nodePositions = [
      { position: new THREE.Vector3(-1.5, 0.3, 0), scale: 1.2 },
      { position: new THREE.Vector3(-0.8, -0.2, 0.2), scale: 0.8 },
      { position: new THREE.Vector3(-0.3, 0.5, -0.1), scale: 1.0 },
      { position: new THREE.Vector3(0.4, -0.1, 0.3), scale: 0.9 },
      { position: new THREE.Vector3(0.9, 0.4, -0.2), scale: 1.1 },
      { position: new THREE.Vector3(1.5, -0.3, 0.1), scale: 0.7 },
      { position: new THREE.Vector3(0, 0.1, 0.15), scale: 1.3 },
      { position: new THREE.Vector3(-1.1, 0.6, -0.15), scale: 0.6 },
      { position: new THREE.Vector3(1.2, 0.1, 0.25), scale: 0.85 },
    ];

    const conns: [number, number][] = [
      [0, 1], [1, 3], [2, 4], [3, 6], [4, 5],
      [0, 2], [6, 4], [1, 6], [5, 8], [7, 2],
      [7, 0], [3, 8], [6, 8],
    ];

    return { nodes: nodePositions, connections: conns };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      const targetRotX = hovered ? my * 0.25 : Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      const targetRotY = hovered ? mx * 0.25 : Math.cos(state.clock.elapsedTime * 0.2) * 0.05;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
    }
  });

  return (
    <group ref={groupRef}>
      {connections.map(([a, b], i) => (
        <ConnectionLine
          key={`c-${i}`}
          start={nodes[a].position}
          end={nodes[b].position}
          hovered={hovered}
        />
      ))}
      {nodes.map((node, i) => (
        <QuestionNode
          key={`n-${i}`}
          position={node.position}
          scale={node.scale}
          hovered={hovered}
          label={questionWords[i]}
        />
      ))}
    </group>
  );
};

const QuestionNetwork = () => {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mousePos.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mousePos.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "200px" }}
      className="relative overflow-hidden rounded-lg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <Scene hovered={hovered} mousePos={mousePos} />
      </Canvas>
    </div>
  );
};

export { QuestionNetwork };
