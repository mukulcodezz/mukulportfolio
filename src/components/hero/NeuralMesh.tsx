import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Suspense } from 'react'

function NeuralNetwork() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const { mouse } = useThree()

  const { positions, connections } = useMemo(() => {
    const count = 70
    const positions: THREE.Vector3[] = []

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 0.7 + Math.random() * 0.5
      positions.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ))
    }

    const connections: number[] = []
    const threshold = 0.55
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < threshold) {
          connections.push(...positions[i].toArray(), ...positions[j].toArray())
        }
      }
    }

    return { positions, connections }
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const nodeGeometry = useMemo(() => new THREE.SphereGeometry(0.015, 6, 6), [])
  const nodeMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: '#a78bfa' }), [])
  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: '#7c3aed', transparent: true, opacity: 0.25 }), [])
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(connections, 3))
    return geo
  }, [connections])

  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.12
    groupRef.current.rotation.x += delta * 0.04
    groupRef.current.rotation.y += mouse.x * 0.005
    groupRef.current.rotation.x += mouse.y * 0.003

    if (meshRef.current) {
      positions.forEach((pos, i) => {
        dummy.position.copy(pos)
        dummy.updateMatrix()
        meshRef.current!.setMatrixAt(i, dummy.matrix)
      })
      meshRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[nodeGeometry, nodeMaterial, positions.length]} />
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
    </group>
  )
}

export default function NeuralMesh() {
  return (
    <div className="w-full aspect-square max-w-lg mx-auto">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border border-[#7c3aed]/30 animate-pulse" />
        </div>
      }>
        <Canvas camera={{ position: [0, 0, 2.5], fov: 60 }} dpr={[1, 1.5]}>
          <NeuralNetwork />
        </Canvas>
      </Suspense>
    </div>
  )
}
