import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Faq } from "@/components/faq"
import { Hero } from "@/components/hero"
import { Process } from "@/components/process"
import { Services } from "@/components/services"
import { Skills } from "@/components/skills"
import { Work } from "@/components/work"

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <Hero />
      <About />
      <Services />
      <Process />
      <Skills />
      <Work />
      <Faq />
      <Contact />
    </main>
  )
}
