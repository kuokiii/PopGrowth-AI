'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

interface Icon3DProps {
  icon: 'cube' | 'sphere' | 'torus' | 'cone'
  color?: string
  size?: number
}

export default function Icon3D({ icon, color = '#8884d8', size = 100 }: Icon3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(size, size)
    mountRef.current.appendChild(renderer.domElement)

    let geometry: THREE.BufferGeometry
    switch (icon) {
      case 'cube':
        geometry = new THREE.BoxGeometry()
        break
      case 'sphere':
        geometry = new THREE.SphereGeometry(0.5, 32, 32)
        break
      case 'torus':
        geometry = new THREE.TorusGeometry(0.3, 0.2, 16, 100)
        break
      case 'cone':
        geometry = new THREE.ConeGeometry(0.5, 1, 32)
        break
      default:
        geometry = new THREE.BoxGeometry()
    }

    const material = new THREE.MeshPhongMaterial({ color })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(1, 1, 2)
    scene.add(light)

    camera.position.z = 2

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = false

    const animate = () => {
      requestAnimationFrame(animate)
      mesh.rotation.x += 0.01
      mesh.rotation.y += 0.01
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [icon, color, size])

  return <div ref={mountRef} style={{ width: size, height: size }} />
}

