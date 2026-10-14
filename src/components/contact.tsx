import { ArrowUpRight } from "lucide-react"

import { MailtoLink } from "@/components/mailto-link"
import { Reveal } from "@/components/reveal"
import { MAILTO, SITE } from "@/lib/site"

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-copper/8" />
          <div className="bg-grid absolute inset-0 opacity-70" />
        </div>
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.18em] text-copper uppercase">
              07 <span className="px-2 text-muted-foreground">/</span> Contact
            </p>
            <h2
              id="contact-title"
              className="mt-3 max-w-3xl font-heading text-4xl leading-[1.05] tracking-tight text-balance sm:text-6xl"
            >
              Tell me what you are trying to build.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A short email is the whole intake. Include the problem, any
              deadline, and whether you want a build, a review, or a
              conversation to find out which.
            </p>
            <a
              href={MAILTO}
              className="mt-8 inline-flex max-w-full flex-wrap font-heading text-[clamp(1.75rem,4vw,3.25rem)] leading-tight tracking-tight underline decoration-copper/40 decoration-1 underline-offset-8 hover:decoration-copper"
            >
              <span>nishchaychauhan8</span>
              <span className="text-copper">@gmail.com</span>
              <span className="sr-only"> (opens your email application)</span>
            </a>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MailtoLink className="w-full sm:w-auto">Book a consultation</MailtoLink>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-1 rounded-full px-5 text-[15px] font-medium ring-1 ring-border transition-colors hover:bg-background/70 focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none"
              >
                View GitHub
                <ArrowUpRight aria-hidden className="size-4" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            <p className="mt-4 max-w-xl text-sm text-muted-foreground">
              Your mail app opens with the subject already set to “
              {SITE.subject}”. There is no calendar bot and no form backend.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
