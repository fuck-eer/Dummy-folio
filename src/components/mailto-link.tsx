import type { VariantProps } from "class-variance-authority"
import { Mail } from "lucide-react"
import type { ReactNode } from "react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MAILTO } from "@/lib/site"

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>

export function MailtoLink({
  children = "Book a consultation",
  variant = "default",
  className,
  showIcon = true,
  iconOnly = false,
}: {
  children?: ReactNode
  variant?: ButtonVariant
  className?: string
  showIcon?: boolean
  iconOnly?: boolean
}) {
  return (
    <a
      href={MAILTO}
      className={cn(
        buttonVariants({ variant, size: iconOnly ? "icon" : "lg" }),
        iconOnly ? "size-11 rounded-full" : "h-12 rounded-full px-5 text-[15px]",
        className,
      )}
    >
      {showIcon ? <Mail aria-hidden className="size-4" /> : null}
      {iconOnly ? <span className="sr-only">{children}</span> : children}
      <span className="sr-only"> (opens your email application)</span>
    </a>
  )
}
