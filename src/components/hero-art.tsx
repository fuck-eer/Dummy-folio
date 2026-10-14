export function HeroArt() {
  return (
    <figure className="hero-art mx-auto w-full max-w-[460px]" aria-hidden="true">
      <svg viewBox="0 0 520 560" className="h-auto w-full overflow-visible">
        <rect
          x="20"
          y="20"
          width="480"
          height="520"
          rx="32"
          className="fill-card stroke-border"
          strokeWidth="1.5"
        />
        <g className="stroke-foreground/15" strokeWidth="1">
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 7 }).map((__, col) => (
              <circle
                key={`${row}-${col}`}
                cx={78 + col * 52}
                cy={78 + row * 52}
                r="1.2"
                className="fill-foreground/25 stroke-none"
              />
            )),
          )}
        </g>
        <circle
          cx="372"
          cy="148"
          r="78"
          className="stroke-copper"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="372" cy="148" r="5" className="fill-copper" />
        <path
          d="M118 248h64v150h-64"
          className="stroke-foreground"
          strokeWidth="2.5"
          fill="none"
          strokeLinejoin="miter"
        />
        <path
          d="M402 268h-48v120h48"
          className="stroke-foreground/30"
          strokeWidth="2"
          fill="none"
        />
        <g>
          <rect x="168" y="168" width="132" height="10" rx="5" className="fill-foreground" />
          <rect
            x="168"
            y="196"
            width="188"
            height="10"
            rx="5"
            className="fill-foreground/55"
          />
          <rect
            x="168"
            y="224"
            width="96"
            height="10"
            rx="5"
            className="fill-foreground/30"
          />
          <rect
            className="cursor-blink fill-copper"
            x="274"
            y="164"
            width="11"
            height="18"
            rx="1.5"
          />
        </g>
        <g className="semi">
          <circle cx="318" cy="352" r="16" className="fill-copper" />
          <ellipse
            cx="306"
            cy="412"
            rx="13"
            ry="22"
            transform="rotate(-16 306 412)"
            className="fill-copper"
          />
        </g>
        <path
          d="M70 70h22M70 70v22M450 70h-22M450 70v22M70 490h22M70 490v-22M450 490h-22M450 490v-22"
          className="stroke-copper/80"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
      <figcaption className="mt-4 flex items-center justify-between px-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
        <span>Fig. 01</span>
        <span>A loyal cursor</span>
      </figcaption>
    </figure>
  )
}
