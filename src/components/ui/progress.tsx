import * as React from "react"
import { useLanguage } from "@/context/useLanguage"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const lang = useLanguage((state) => state.language)
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{
          transform: `translateX(${
            //TODO fix this condition
            lang === "ar" ? "" : "-"
          }${100 - (value || 0)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
