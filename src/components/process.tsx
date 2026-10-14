import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { steps } from "@/lib/site"

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <SectionHeading
            id="process-title"
            index="03"
            label="Process"
            title="How I work."
            lede="Short cycles, written decisions, and a handoff you can run without me in the room."
          />
        </Reveal>
        <div className="relative mt-12">
          <div
            aria-hidden
            className="absolute top-4 right-6 left-6 hidden h-px bg-border md:block"
          />
          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((step, i) => (
              <Reveal key={step.title} as="li" delay={i * 0.06} className="relative">
                <span className="relative z-10 inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-background px-2 font-mono text-xs text-copper ring-1 ring-border">
                  {step.index}
                </span>
                <h3 className="mt-4 font-heading text-2xl tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
