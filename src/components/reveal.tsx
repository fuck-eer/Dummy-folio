"use client"

import { motion } from "framer-motion"
import { useEffect, useState, type ReactNode } from "react"

const viewport = { once: true, margin: "0px 0px -12% 0px" } as const
const ease = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  immediate = false,
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: "div" | "li"
  immediate?: boolean
}) {
  const [play, setPlay] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setPlay(true)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  if (!play) {
    if (as === "li") return <li className={className}>{children}</li>
    return <div className={className}>{children}</div>
  }

  const motionProps = immediate
    ? {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay, ease },
      }
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport,
        transition: { duration: 0.6, delay, ease },
      }

  if (as === "li") {
    return (
      <motion.li className={className} {...motionProps}>
        {children}
      </motion.li>
    )
  }

  return (
    <motion.div className={className} {...motionProps}>
      {children}
    </motion.div>
  )
}
