export type ScenePalette = {
  amber: string
  ink: string
  mist: string
  dark: boolean
}

const fallback: Record<"dark" | "light", ScenePalette> = {
  dark: {
    amber: "#e4b15a",
    ink: "#f4efe6",
    mist: "#c3b6a2",
    dark: true,
  },
  light: {
    amber: "#8a4e28",
    ink: "#3a2e26",
    mist: "#6d5c4e",
    dark: false,
  },
}

function readCssColor(variable: string, fallbackColor: string) {
  const probe = document.createElement("span")
  probe.style.position = "absolute"
  probe.style.left = "-9999px"
  probe.style.color = `var(${variable})`
  document.body.appendChild(probe)
  const value = getComputedStyle(probe).color
  probe.remove()
  if (!value || value === "rgba(0, 0, 0, 0)") return fallbackColor
  return value
}

export function readPalette(dark: boolean): ScenePalette {
  const base = dark ? fallback.dark : fallback.light
  return {
    amber: readCssColor("--copper", base.amber),
    ink: readCssColor("--foreground", base.ink),
    mist: readCssColor("--muted-foreground", base.mist),
    dark,
  }
}
