import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { principles, SITE } from "@/lib/site"

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:py-28">
        <Reveal>
          <SectionHeading
            id="about-title"
            index="01"
            label="About"
            title="A developer who writes the software and the reasoning."
          />
          <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              I take software development and technical consultation as
              freelance work. That might be a product you need built, an API
              that has to hold up, or a second opinion before you commit to an
              architecture.
            </p>
            <p>
              The public work is on GitHub under the name {SITE.githubName}.
              Recent pieces include CopyKat, a keyboard-driven clipboard
              manager, and ConMan, an early desktop command center for
              AI-assisted coding.
            </p>
            <p>
              I will not invent a client list for this page. If we work
              together, the project stays yours, and I will say so plainly when
              something is outside what I should take on.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <aside className="lift rounded-3xl bg-card p-6 ring-1 ring-foreground/10 sm:p-8">
            <p className="font-mono text-xs tracking-[0.18em] text-copper uppercase">
              On the record
            </p>
            <blockquote className="mt-5 font-heading text-3xl leading-tight tracking-tight sm:text-4xl">
              “{SITE.githubBio}”
            </blockquote>
            <p className="mt-4 text-sm text-muted-foreground">
              GitHub bio, under the name {SITE.githubName}.
            </p>
            <ul className="mt-8 space-y-3 border-t border-border pt-6">
              {principles.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-copper" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>
    </section>
  )
}
