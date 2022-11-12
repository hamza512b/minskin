import { useAtom } from "jotai";
import { Suspense } from "react";
import { isPocketAtom } from "../utils/atoms";
import { Model } from "./Model";
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Plane } from "@react-three/drei"

export default function ThreeScene() {
  const [isPocket] = useAtom(isPocketAtom)

  return (
    <Canvas className='!w-full !h-full' camera={{ fov: 60 }} dpr={[1, 2]} shadows>
      <ambientLight color={0x404040} intensity={2.5} />
      <directionalLight color={0xFFFFFF} intensity={.1} position={[4, 5, 4]} />
      <spotLight position={[10, 10, 10]} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
      <hemisphereLight args={[0x3399CC, 0x44445b, 1]} />
      <fog attach="fog" args={["white", 0, 40]} />
      <Suspense fallback={null}>
        <Model isPocket={isPocket} />
      </Suspense>
      <Plane args={[1000, 1000, 1000]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.14, 0]} receiveShadow>
        <meshPhongMaterial attach="material" color={0xE5EAEF} />
      </Plane>
      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} enablePan={false} minDistance={.5} maxDistance={4.5} />
    </Canvas>
  )
}