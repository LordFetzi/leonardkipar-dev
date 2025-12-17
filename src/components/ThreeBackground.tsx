import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import vertexShader from '../shaders/vertexShaderBG.glsl'
import fragmentShader from '../shaders/fragmentShaderBG.glsl'

function getCssColor(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#ffffff'
}

function AnimatedTopoPlane() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const time = useRef(0)
  const mouse = useRef<[number, number]>([0.5, 0.5])
  const { size, viewport } = useThree()
  const pixelRatio = window.devicePixelRatio || 1

  const [planeSize, setPlaneSize] = useState<[number, number]>([viewport.width, viewport.height])

  // 🖱️ Maus
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      mouse.current = [e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight]
    }
    window.addEventListener('mousemove', updateMouse)
    return () => window.removeEventListener('mousemove', updateMouse)
  }, [])

  // 🎨 Persistente Uniforms
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorContour: { value: new THREE.Color(getCssColor('--contour-color')) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(size.width * pixelRatio, size.height * pixelRatio) }
  }), [])

  // Bei Resize Viewport + Auflösung aktualisieren
  useEffect(() => {
    uniforms.uResolution.value.set(size.width * pixelRatio, size.height * pixelRatio)
    setPlaneSize([viewport.width, viewport.height])
  }, [size, viewport, pixelRatio, uniforms])


  useFrame((_, delta) => {
    time.current += delta
    uniforms.uTime.value = time.current
    uniforms.uMouse.value.set(...mouse.current)
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry key={planeSize.toString()} args={[...planeSize, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        transparent
      />
    </mesh>
  )
}

export default function ThreeBackground() {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(window.devicePixelRatio || 1)
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        pointerEvents: 'none',
      }}
    >
      <AnimatedTopoPlane />
    </Canvas>
  )
}