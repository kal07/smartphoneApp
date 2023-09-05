import React from "react"
import { useIntl } from "react-intl"

import flag from "@/assets/flag.svg"
import info from "@/assets/info.svg"
import preview from "@/assets/preview.png"
import { Separator } from "@/components/ui/separator"
import { useStep } from "@/context/useStep"

export function Step2() {
  const setStep = useStep((state) => state.setStep)

  React.useEffect(() => {
    setStep(2)
  }, [setStep])

  return (
    <>
      <div className="flex flex-1 flex-col gap-6">
        <Offer />
        <Photo />
        <PhotoInfo />
      </div>
      <div className="flex-1">
        
      </div>
    </>
  )
}

const Offer = () => {
  const intl = useIntl()
  return (
    <div className=" flex w-fit gap-5 rounded-xl border bg-white p-4">
      <div className="flex min-w-[150px] items-center  gap-4">
        <img src={flag} alt="" />
        <p className=" text-[#4D4D4D]">
          {intl.formatMessage({ id: "france" })}
        </p>
      </div>
      <Separator orientation="vertical" className="h-auto" />
      <div className="flex min-w-[150px] items-center  gap-4">
        <img src={flag} alt="" />
        <p className=" text-[#4D4D4D]">
          {intl.formatMessage({ id: "Permis de conduire - code ePhoto" })}
        </p>
      </div>
    </div>
  )
}

const Photo = () => <img src={preview} alt="" className="rounded-2xl" />

const PhotoInfo = () => {
  const intl = useIntl()
  return (
    <div className="flex max-w-sm items-center gap-4 rounded-xl bg-[#646464] p-4 text-white">
      <img src={info} alt="" />
      <p>
        {intl.formatMessage({
          id: "Ceci n’est qu’un aperçu de vos photos après traitement automatique.",
        })}
      </p>
    </div>
  )
}
