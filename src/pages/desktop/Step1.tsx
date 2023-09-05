import React from "react"
import { useIntl } from "react-intl"

import check from "@/assets/check-white.svg"
import img from "@/assets/step1-img.png"
import { useStep } from "@/context/useStep"

// import { Check } from "lucide-react"

export function Step1() {
  const intl = useIntl()
  const setStep = useStep((state) => state.setStep)

  React.useEffect(() => {
    setStep(1)
  }, [setStep])

  const items = [
    "Desktop.beforePhotoDesktop.off_glasses",
    "Desktop.beforePhotoDesktop.even_light",
    "Desktop.beforePhotoDesktop.hair_behind",
    "Desktop.beforePhotoDesktop.neutral_face",
  ]

  return (
    <>
      <div className=" flex flex-1 grow-[3] items-center justify-center"></div>
      <div className=" flex flex-1 grow-[2] justify-center">
        <div className="h-fit max-w-md rounded-3xl bg-[#EFEFEF] p-12 px-16 shadow-md max-md:p-8">
          <h1 className="text-center text-2xl font-semibold">
            {
              //@ts-expect-error
              intl.formatMessage(
                { id: "Desktop.beforePhotoDesktop.title_before_photo1" },
                {
                  br: (str) => (
                    <span>
                      <br />
                      {str}
                    </span>
                  ),
                }
              )
            }
          </h1>
          <img
            src={img}
            alt=""
            className=" m-auto my-8 w-60 rounded-xl border-4 border-black bg-white p-2"
          />
          <div className="flex flex-col gap-6">
            {items.map((id, i) => (
              <div className="flex items-baseline gap-4">
                <img src={check} className="relative top-1" />
                <p>
                  <span className="me-2 text-2xl font-semibold">
                    {(i + 1).toString().padStart(2, "0")}.
                  </span>

                  {
                    //@ts-expect-error
                    intl.formatMessage(
                      { id },
                      {
                        b: (str) => (
                          <>
                            <br />
                            <span className="font-bold">{str}</span>
                          </>
                        ),
                      }
                    )
                  }
                </p>
              </div>
            ))}
          </div>
          <div></div>
        </div>
      </div>
    </>
  )
}

export const intl = {
  en: {},
  fr: {
    "step1.title": "Comment réussir <br></br> sa photo d’identité ?",
    "step1.recommendation.1": "Les lunettes <b>enlevées</b>",
    "step1.recommendation.2": "Le visage <b>uniformément éclairé</b>",
    "step1.recommendation.3": "Les cheveux <b>derrière les épaules</b>",
    "step1.recommendation.4": "La bouche <b>fermée, pas de sourire</b>",
  },
  ar: {},
}
