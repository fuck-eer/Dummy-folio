"use client"

import { HeroVisual } from "@/components/scene/hero-visual"
import { MailtoLink } from "@/components/mailto-link"
import { Reveal } from "@/components/reveal"
import { SITE } from "@/lib/site"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -top-24 right-[-10%] size-[420px] rounded-full bg-copper/15 blur-3xl" />
        <div className="absolute bottom-0 left-[-10%] size-72 rounded-full bg-copper/10 blur-3xl" />
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:py-28">
        <div>
          <Reveal
            immediate
            className="inline-flex w-fit items-center gap-2 rounded-full bg-card px-3 py-1.5 text-xs text-muted-foreground ring-1 ring-foreground/10"
          >
            <span className="pulse-dot size-1.5 rounded-full bg-copper" />
            Open to freelance development and consulting
          </Reveal>
          <Reveal
            immediate
            delay={0.08}
            className="mt-6 font-heading text-[clamp(3.25rem,8vw,6.25rem)] leading-[0.92] tracking-tight"
          >
            <h1 className="font-normal">
              Nishchay
              <span className="block italic text-copper">Chauhan</span>
            </h1>
          </Reveal>
          <Reveal
            immediate
            delay={0.16}
            className="mt-6 font-mono text-xs tracking-[0.16em] text-foreground uppercase sm:text-sm"
          >
            <p className="m-0">{SITE.role}</p>
          </Reveal>
          <Reveal
            immediate
            delay={0.22}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            <p className="m-0">
              I build software people can ship, and I help teams make technical
              decisions they will not have to unwind later. Web apps, APIs, MVPs,
              and architecture reviews — scoped in writing, explained in plain
              language.
            </p>
          </Reveal>
          <Reveal
            immediate
            delay={0.3}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <MailtoLink className="w-full sm:w-auto">Book a consultation</MailtoLink>
            <a
              href="#work"
              className="inline-flex h-12 items-center justify-center rounded-full px-5 text-[15px] font-medium text-foreground ring-1 ring-border transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none"
            >
              See selected work
            </a>
          </Reveal>
          <Reveal immediate delay={0.4} className="mt-4 text-sm text-muted-foreground">
            <p className="m-0">
              Opens your email to {SITE.email}. Nothing is stored on this site.
            </p>
          </Reveal>
        </div>
        <HeroVisual />
      </div>
    </section>
  )
}
