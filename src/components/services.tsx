import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { services } from "@/lib/site"

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <SectionHeading
            id="services-title"
            index="02"
            label="Services"
            title="Four ways to work together."
            lede="Engagements stay specific. A feature, an MVP, an API, or a review of something already in motion."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.05}>
              <article className="lift flex h-full flex-col rounded-3xl bg-card p-6 ring-1 ring-foreground/10 sm:p-8">
                <p className="font-mono text-xs tracking-[0.18em] text-copper">
                  {service.index}
                </p>
                <h3 className="mt-4 font-heading text-2xl tracking-tight sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {service.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
