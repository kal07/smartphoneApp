import React from "react"
import { useStep } from "@/context/useStep"

import { cn } from "@/lib/utils"

import { Progress } from "./ui/progress"

export default function Steps() {
  const step = useStep((state) => state.step)
  const maxStep = useStep((state) => state.maxStep)

  const ArrayIndex = React.useMemo(
    () =>
      Array(maxStep)
        .fill(0)
        .map((_, i) => i + 1),
    [maxStep]
  )

  return (
    <div className=" w-screen">
      <Progress value={(step * 100) / maxStep} className="h-2 rounded-none" />
      <div className={cn(` mt-2 grid grid-cols-4`)}>
        {ArrayIndex.map((v) => (
          <div key={v} className=" flex items-center justify-center">
            <p
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-black transition-all",
                v <= step &&
                  "border-primary bg-primary font-semibold text-white"
              )}
            >
              {v.toString().padStart(2, "0")}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
