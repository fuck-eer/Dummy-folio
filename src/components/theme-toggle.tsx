"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme()

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={className ?? "size-11"}
      aria-label="Toggle color theme"
      onClick={() => {
        const root = document.documentElement
        const next = root.classList.contains("dark") ? "light" : "dark"
        root.classList.remove("light", "dark")
        root.classList.add(next)
        root.style.colorScheme = next
        setTheme(next)
      }}
    >
      <Sun className="hidden size-4 dark:block" />
      <Moon className="size-4 dark:hidden" />
    </Button>
  )
}
