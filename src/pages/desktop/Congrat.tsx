import React from "react"
import { useIntl } from "react-intl"

import android from "@/assets/android.png"
import icon_success from "@/assets/icon-success.svg"
import ios from "@/assets/ios.png"
import { Separator } from "@/components/ui/separator"
import { useStep } from "@/context/useStep"

export function Congrat() {
  const intl = useIntl()
  const setStep = useStep((state) => state.setStep)

  React.useEffect(() => {
    setStep(4)
  }, [setStep])

  return (
    <div className="flex flex-1 grow items-center justify-center text-center">
      <div className="flex max-w-3xl flex-1 flex-col rounded-3xl bg-white px-20 py-14 shadow-md max-md:px-8 max-md:py-10 max-sm:px-6">
        <img src={icon_success} alt="" className="m-auto" />
        <h1 className="mb-4 text-4xl font-bold">
          {intl.formatMessage({ id: "Bravo !" })}
        </h1>
        <p className="mb-2 font-bold">
          Vous avez terminé la commande avec succès !
        </p>
        <p className="m-auto mb-4 max-w-md">
          Nous avons envoyé un email de confirmation avec les détails de la
          commande et du paiement à{" "}
          <span className="font-semibold italic">johndoe@gmail.com</span>.
        </p>
        <p className=" mb-6 text-sm italic text-[#4C4C4C]">
          Merci de vérifier vos spams si vous ne recevez pas vos photos.
        </p>
        <Separator className=" m-auto mb-6 h-[2px] max-w-[180px] bg-primary" />
        <p className="m-auto mb-4 max-w-xs">
          Suivez votre commande en téléchargeant l’application Smartphone iD :
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <a href={"#"}>
            <img src={ios} alt="" className=" w-40 grow-0" />
          </a>
          <a href={"#"}>
            <img src={android} alt="" className=" w-40 grow-0" />
          </a>
        </div>
      </div>
    </div>
  )
}
