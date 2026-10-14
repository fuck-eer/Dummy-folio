import { ArrowUpRight } from "lucide-react"

import { MAILTO, SITE } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-heading text-2xl tracking-tight">{SITE.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{SITE.role}</p>
        </div>
        <ul className="flex flex-col gap-2 text-sm sm:flex-row sm:gap-6">
          <li>
            <a
              href={MAILTO}
              className="underline decoration-copper/40 underline-offset-4 hover:decoration-copper"
            >
              {SITE.email}
              <span className="sr-only"> (opens your email application)</span>
            </a>
          </li>
          <li>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline decoration-copper/40 underline-offset-4 hover:decoration-copper"
            >
              GitHub
              <ArrowUpRight aria-hidden className="size-3.5" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="border-t border-border/70">
        <p className="mx-auto w-full max-w-6xl px-5 py-4 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase sm:px-8">
          Static site · email is the only intake · no form submissions stored here
        </p>
      </div>
    </footer>
  )
}
