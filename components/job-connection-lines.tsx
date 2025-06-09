"use client"

import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
}

export function JobConnectionLines() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create nodes
    const nodes: Point[] = []
    const nodeCount = 15

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      })
    }

    // Animation
    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      ctx.strokeStyle =
        getComputedStyle(document.documentElement).getPropertyValue("--primary-400") || "rgba(96, 165, 250, 0.2)"
      ctx.lineWidth = 1

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.globalAlpha = 1 - distance / 150
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      ctx.fillStyle =
        getComputedStyle(document.documentElement).getPropertyValue("--primary-500") || "rgba(59, 130, 246, 0.5)"

      for (let i = 0; i < nodes.length; i++) {
        ctx.beginPath()
        ctx.arc(nodes[i].x, nodes[i].y, 3, 0, Math.PI * 2)
        ctx.fill()

        // Move nodes
        nodes[i].x += Math.sin(Date.now() * 0.001 + i) * 0.5
        nodes[i].y += Math.cos(Date.now() * 0.001 + i) * 0.5

        // Keep within bounds
        if (nodes[i].x < 0) nodes[i].x = canvas.width
        if (nodes[i].x > canvas.width) nodes[i].x = 0
        if (nodes[i].y < 0) nodes[i].y = canvas.height
        if (nodes[i].y > canvas.height) nodes[i].y = 0
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
