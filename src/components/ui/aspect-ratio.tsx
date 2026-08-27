import * as React from "react"

import { cn } from "@/lib/utils"

// aspect-ratio als Inline-Style statt Tailwind-v4-Syntax `aspect-(--ratio)`
// (existiert unter Tailwind v3 nicht). forwardRef, weil lazy-image.tsx den
// Container-Ref für die useInView-Erkennung braucht (React 18 reicht refs
// nicht als Prop durch).
const AspectRatio = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { ratio: number }
>(({ ratio, className, style, ...props }, ref) => {
  return (
    <div
      data-slot="aspect-ratio"
      ref={ref}
      style={{ aspectRatio: ratio, ...style }}
      className={cn("relative", className)}
      {...props}
    />
  )
})
AspectRatio.displayName = "AspectRatio"

export { AspectRatio }
