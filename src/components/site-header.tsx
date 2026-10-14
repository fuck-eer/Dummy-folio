"use client"

import { Menu } from "lucide-react"
import { useState } from "react"

import { MailtoLink } from "@/components/mailto-link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { mobileNav, nav, SITE } from "@/lib/site"

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
        <a
          href="#top"
          className="group flex items-center gap-2.5 rounded-full focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none"
        >
          <span className="grid size-9 place-items-center rounded-lg bg-foreground font-heading text-lg leading-none text-background">
            N
          </span>
          <span className="font-heading text-lg tracking-tight">
            Nishchay
            <span className="sr-only"> Chauhan, back to top</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <MailtoLink iconOnly className="sm:hidden">
            Email me
          </MailtoLink>
          <MailtoLink showIcon={false} className="hidden h-10 px-4 sm:inline-flex">
            Email me
          </MailtoLink>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-11 lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu aria-hidden />
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="font-heading text-2xl font-normal">
                  {SITE.name}
                </SheetTitle>
                <SheetDescription>{SITE.role}</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="px-4">
                <ul className="flex flex-col">
                  {mobileNav.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-12 items-center rounded-lg px-2 text-lg hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto p-4">
                <MailtoLink className="w-full">Book a consultation</MailtoLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
