import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { TextureLoader } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { rotJoint } from "../utils/rotJoint";
import { useAtom } from "jotai";
import { fileUrlAtom } from "../utils/atoms";
import customToast from "../utils/toast";
import { basepath } from "../utils/basepath";

type JavaGLTFResult = GLTF & {
  nodes: {
    chest: THREE.Mesh;
    chestOuter: THREE.Mesh;
    head: THREE.Mesh;
    headOuter: THREE.Mesh;
    leftArm: THREE.Mesh;
    leftArmOuter: THREE.Mesh;
    leftLeg: THREE.Mesh;
    leftLegOuter: THREE.Mesh;
    rightArm: THREE.Mesh;
    rightArmOuter: THREE.Mesh;
    rightLeg: THREE.Mesh;
    rightLegOuter: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

type PocketGLTFResult = GLTF & {
  nodes: {
    leftArmPocket: THREE.Mesh;
    leftArmOuterPocket: THREE.Mesh;
    rightArmPocket: THREE.Mesh;
    rightArmOuterPocket: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};
export function Model(
  props: JSX.IntrinsicElements["group"] & { isPocket: boolean }
) {
  const { nodes: javaNodes, materials: javaMaterials } = useGLTF(
    `${basepath}/java.glb`
  ) as JavaGLTFResult;
  const { nodes: pocketNodes, materials: pocketMaterials } = useGLTF(
    `${basepath}/pocket.glb`
  ) as PocketGLTFResult;
  const ref = useRef<THREE.Mesh>();
  const [fileUrl] = useAtom(fileUrlAtom);
  useFrame(({ mouse }) => {
    if (ref.current) rotJoint(ref.current, mouse);
  });
  const colorMap = useLoader(TextureLoader, fileUrl);
  useEffect(() => {
    if (colorMap.source.data.height !== 64 || colorMap.source.data.width !== 64)
      return customToast("Image size is not 64x64.");

    colorMap.flipY = false;
    colorMap.magFilter = THREE.NearestFilter;
    colorMap.minFilter = THREE.LinearMipMapLinearFilter;
    colorMap.flipY = false;
    colorMap.encoding = THREE.sRGBEncoding;
    javaMaterials["Material.001"].alphaTest = 0.5;
    pocketMaterials["Material.001"].alphaTest = 0.5;
    javaMaterials["Material.001"].map = colorMap;
    pocketMaterials["Material.001"].map = colorMap;
  }, [colorMap]);

  return (
    <group {...props} dispose={null} receiveShadow rotation={[0, Math.PI, 0]}>
      <mesh
        castShadow
        ref={ref as any}
        geometry={javaNodes.head.geometry}
        material={javaMaterials["Material.001"]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={1}
      >
        <mesh
          castShadow
          geometry={javaNodes.headOuter.geometry}
          material={javaMaterials["Material.001"]}
          scale={1}
        />
      </mesh>
      <mesh
        castShadow
        geometry={javaNodes.chest.geometry}
        material={javaMaterials["Material.001"]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={1}
      >
        <mesh
          castShadow
          geometry={javaNodes.chestOuter.geometry}
          material={javaMaterials["Material.001"]}
          scale={1.05}
        />
      </mesh>
      {props.isPocket ? (
        <group {...props} dispose={null} rotation={[0, Math.PI, 0]}>
          <mesh
            castShadow
            geometry={pocketNodes.leftArmPocket.geometry}
            material={pocketMaterials["Material.001"]}
          >
            <mesh
              castShadow
              geometry={pocketNodes.leftArmOuterPocket.geometry}
              material={pocketMaterials["Material.001"]}
            />
          </mesh>
          <mesh
            castShadow
            geometry={pocketNodes.rightArmPocket.geometry}
            material={pocketMaterials["Material.001"]}
          >
            <mesh
              castShadow
              geometry={pocketNodes.rightArmOuterPocket.geometry}
              material={pocketMaterials["Material.001"]}
            />
          </mesh>
        </group>
      ) : (
        <>
          <mesh
            castShadow
            geometry={javaNodes.leftArm.geometry}
            material={javaMaterials["Material.001"]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={1}
          >
            <mesh
              castShadow
              geometry={javaNodes.leftArmOuter.geometry}
              material={javaMaterials["Material.001"]}
              scale={1.05}
            />
          </mesh>
          <mesh
            geometry={javaNodes.rightArm.geometry}
            material={javaMaterials["Material.001"]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={1}
          >
            <mesh
              castShadow
              geometry={javaNodes.rightArmOuter.geometry}
              material={javaMaterials["Material.001"]}
              scale={1.05}
            />
          </mesh>
        </>
      )}
      <mesh
        castShadow
        geometry={javaNodes.leftLeg.geometry}
        material={javaMaterials["Material.001"]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={1}
      >
        <mesh
          castShadow
          geometry={javaNodes.leftLegOuter.geometry}
          material={javaMaterials["Material.001"]}
          scale={1.05}
        />
      </mesh>
      <mesh
        castShadow
        geometry={javaNodes.rightLeg.geometry}
        material={javaMaterials["Material.001"]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={1}
      >
        <mesh
          castShadow
          geometry={javaNodes.rightLegOuter.geometry}
          material={javaMaterials["Material.001"]}
          scale={1.05}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload(`${basepath}/java.glb`);
useGLTF.preload(`${basepath}/pocket.glb`);
