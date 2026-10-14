import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { skillGroups } from "@/lib/site"

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <SectionHeading
            id="skills-title"
            index="04"
            label="Toolkit"
            title="Tools I reach for."
            lede="This is not a scorecard. Depth follows the problem. Electron is listed because ConMan is an Electron desktop app, not because every project should be one."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.title}
              delay={i * 0.05}
              className={i < 3 ? "lg:col-span-2" : "sm:col-span-1 lg:col-span-3"}
            >
              <article className="lift h-full rounded-3xl bg-card p-6 ring-1 ring-foreground/10">
                <h3 className="font-heading text-2xl tracking-tight">{group.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{group.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Badge
                        variant="outline"
                        className="h-8 rounded-full px-3 text-sm font-normal"
                      >
                        {item}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
