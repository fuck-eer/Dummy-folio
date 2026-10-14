import { ImageResponse } from "next/og"

export const alt =
  "Nishchay Chauhan, software developer and technical consultant. Email to book a consultation."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#17140f",
          color: "#f6f1e7",
        }}
      >
        <div style={{ width: 18, background: "#e0a85c" }} />
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "68px 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 3,
              color: "#e0a85c",
            }}
          >
            SOFTWARE DEVELOPER & TECHNICAL CONSULTANT
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 86, lineHeight: 1, letterSpacing: -2 }}>
              Nishchay Chauhan
            </div>
            <div
              style={{
                marginTop: 24,
                fontSize: 30,
                color: "#d8cec2",
                maxWidth: 760,
              }}
            >
              Web apps, APIs, MVPs, and architecture reviews.
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#f6f1e7" }}>
            nishchaychauhan8@gmail.com
          </div>
        </div>
        <div
          style={{
            width: 260,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 22,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                background: "#e0a85c",
              }}
            />
            <div
              style={{
                width: 34,
                height: 58,
                borderRadius: 24,
                background: "#e0a85c",
                transform: "rotate(-14deg)",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
