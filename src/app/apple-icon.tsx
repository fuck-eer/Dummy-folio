import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#1c1712",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#e4b15a",
          fontSize: 96,
          fontWeight: 700,
          letterSpacing: -4,
        }}
      >
        N
      </div>
    ),
    { ...size },
  )
}
