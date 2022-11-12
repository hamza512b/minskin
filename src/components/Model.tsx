import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { TextureLoader } from 'three'
import { useFrame, useLoader } from '@react-three/fiber'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { rotJoint } from '../utils/rotJoint'
import { useAtom } from 'jotai'
import { fileUrlAtom } from '../utils/atoms'
import customToast from '../utils/toast'
import { basepath } from '../utils/basepath'

type JavaGLTFResult = GLTF & {
  nodes: {
    body: THREE.Mesh
    bodyalpha002: THREE.Mesh
    head: THREE.Mesh
    headalpha002: THREE.Mesh
    leftArm: THREE.Mesh
    leftArmalpha002: THREE.Mesh
    leftLeg: THREE.Mesh
    leftLegalpha: THREE.Mesh
    rightArm: THREE.Mesh
    rightArmalpha002: THREE.Mesh
    rightLeg: THREE.Mesh
    rightLegalpha002: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
  }
}

type PocketGLTFResult = GLTF & {
  nodes: {
    body002: THREE.Mesh
    bodyalpha: THREE.Mesh
    head001: THREE.Mesh
    headalpha: THREE.Mesh
    leftArm002: THREE.Mesh
    leftArmalpha: THREE.Mesh
    leftLegalpha002: THREE.Mesh
    leftLeg002: THREE.Mesh
    rightArm002: THREE.Mesh
    rightArmalpha: THREE.Mesh
    rightLeg002: THREE.Mesh
    rightLegalpha: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
  }
}
export function Model(props: JSX.IntrinsicElements['group'] & { isPocket: boolean }) {
  const { nodes: javaNodes, materials: javaMaterials } = useGLTF(`${basepath}/java.glb`) as JavaGLTFResult
  const { nodes: pocketNodes, materials: pocketMaterials } = useGLTF(`${basepath}/pocket.glb`) as PocketGLTFResult
  const ref = useRef<THREE.Mesh>()
  const [fileUrl] = useAtom(fileUrlAtom)
  useFrame(({ mouse }) => {
    if (ref.current) rotJoint(ref.current, mouse)
  })
  const colorMap = useLoader(TextureLoader, fileUrl)
  useEffect(() => {
    if (colorMap.source.data.height !== 64 || colorMap.source.data.width !== 64) return customToast("Image size is not 64x64.")

    colorMap.flipY = false;
    colorMap.magFilter = THREE.NearestFilter;
    colorMap.minFilter = THREE.LinearMipMapLinearFilter;
    colorMap.flipY = false;
    colorMap.encoding = THREE.sRGBEncoding;
    javaMaterials['Material.001'].alphaTest = .5;
    pocketMaterials['Material.001'].alphaTest = .5;
    javaMaterials['Material.001'].map = colorMap;
    pocketMaterials['Material.001'].map = colorMap;
  }, [colorMap])

  return (
    <group {...props} dispose={null} receiveShadow>
      <mesh castShadow ref={ref as any} geometry={javaNodes.head.geometry} material={javaMaterials['Material.001']} position={[0, 0.63, 0]} rotation={[Math.PI, 0, Math.PI]} scale={0.25}>
        <mesh castShadow geometry={javaNodes.headalpha002.geometry} material={javaMaterials['Material.001']} scale={1.05} />
      </mesh>
      <mesh castShadow geometry={javaNodes.body.geometry} material={javaMaterials['Material.001']} rotation={[Math.PI, 0, Math.PI]} scale={[0.13, 0.38, 0.13]}>
        <mesh castShadow geometry={javaNodes.bodyalpha002.geometry} material={javaMaterials['Material.001']} scale={1.05} />
      </mesh>
      {props.isPocket ? (
        <group {...props} dispose={null}>
          <mesh castShadow geometry={pocketNodes.leftArm002.geometry} material={pocketMaterials['Material.001']}>
            <mesh castShadow geometry={pocketNodes.leftArmalpha.geometry} material={pocketMaterials['Material.001']} />
          </mesh>
          <mesh castShadow geometry={pocketNodes.rightArm002.geometry} material={pocketMaterials['Material.001']}>
            <mesh castShadow geometry={pocketNodes.rightArmalpha.geometry} material={pocketMaterials['Material.001']} />
          </mesh>
        </group>
      ) : (
        <>
          <mesh castShadow geometry={javaNodes.leftArm.geometry} material={javaMaterials['Material.001']} position={[-0.38, 0, 0]} rotation={[Math.PI, 0, Math.PI]} scale={[0.13, 0.38, 0.13]}>
            <mesh castShadow geometry={javaNodes.leftArmalpha002.geometry} material={javaMaterials['Material.001']} scale={1.05} />
          </mesh><mesh geometry={javaNodes.rightArm.geometry} material={javaMaterials['Material.001']} position={[0.38, 0, 0]} rotation={[Math.PI, 0, Math.PI]} scale={[0.13, 0.38, 0.13]}>
            <mesh castShadow geometry={javaNodes.rightArmalpha002.geometry} material={javaMaterials['Material.001']} scale={1.05} />
          </mesh>
        </>
      )}
      <mesh castShadow geometry={javaNodes.leftLeg.geometry} material={javaMaterials['Material.001']} position={[-0.13, -0.75, 0]} rotation={[Math.PI, 0, Math.PI]} scale={[0.13, 0.38, 0.13]}>
        <mesh castShadow geometry={javaNodes.leftLegalpha.geometry} material={javaMaterials['Material.001']} scale={1.05} />
      </mesh>
      <mesh castShadow geometry={javaNodes.rightLeg.geometry} material={javaMaterials['Material.001']} position={[0.13, -0.75, 0]} rotation={[Math.PI, 0, Math.PI]} scale={[0.13, 0.38, 0.13]}>
        <mesh castShadow geometry={javaNodes.rightLegalpha002.geometry} material={javaMaterials['Material.001']} scale={1.05} />
      </mesh>
    </group>
  )
}

useGLTF.preload(`${basepath}/java.glb`)
useGLTF.preload(`${basepath}/pocket.glb`)