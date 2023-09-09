import React from "react"
import { useSearchParams } from "react-router-dom"

import { useStep } from "@/context/useStep"

export const Step1TakePhoto = () => {
  const [params] = useSearchParams()

  const setStep = useStep((state) => state.setStep)
  React.useEffect(() => {
    setStep(1)
  }, [setStep])

  const needSignature = params.get("signature") === "true"

  return <div className="flex w-full flex-col items-center"></div>
}
