import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { faqs } from "@/lib/site"

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:py-28">
        <Reveal>
          <SectionHeading
            id="faq-title"
            index="06"
            label="FAQ"
            title="Straight answers."
            lede="Practical questions, without a testimonial carousel."
          />
        </Reveal>
        <Reveal delay={0.06}>
          <Accordion hiddenUntilFound className="border-t border-border">
            {faqs.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q} className="border-border">
                <AccordionTrigger className="py-5 font-heading text-xl font-normal tracking-tight hover:no-underline sm:text-2xl">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
