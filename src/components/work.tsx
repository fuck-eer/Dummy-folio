import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { projects, SITE } from "@/lib/site"

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <SectionHeading
            id="work-title"
            index="05"
            label="Selected work"
            title="Public highlights, linked as they are."
            lede="No client logos and no invented metrics. These are projects from the GitHub profile under the name Nishchay."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.05}>
              <article className="lift flex h-full flex-col rounded-3xl bg-card p-6 ring-1 ring-foreground/10 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-heading text-3xl tracking-tight">{project.name}</h3>
                  <Badge variant="secondary" className="mt-1 rounded-full">
                    {project.status}
                  </Badge>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/90 sm:text-base">
                  {project.summary}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.note}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <Badge variant="outline" className="rounded-full font-normal">
                        {tag}
                      </Badge>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-5 text-sm">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium underline decoration-copper/40 underline-offset-4 hover:decoration-copper"
                  >
                    {project.linkLabel}
                    <ArrowUpRight aria-hidden className="size-3.5" />
                    <span className="sr-only"> for {project.name} (opens in a new tab)</span>
                  </a>
                  {project.site ? (
                    <a
                      href={project.site.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-copper"
                    >
                      {project.site.label}
                      <ArrowUpRight aria-hidden className="size-3.5" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 text-sm text-muted-foreground">
            The rest of the public repositories are on{" "}
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-copper/40 underline-offset-4 hover:decoration-copper"
            >
              github.com/fuck-eer
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            . Profile name: {SITE.githubName}.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
