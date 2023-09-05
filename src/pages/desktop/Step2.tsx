import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { useIntl } from "react-intl"
import { z } from "zod"

import freeIcon from "@/assets/icon-basic.svg"
import bestIcon from "@/assets/icon-best.svg"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useStep } from "@/context/useStep"
import { cn } from "@/lib/utils"

const schema = z
  .object({
    email: z.string().email(),
    confirmEmail: z.string().email(),
    offer: z.string(),
    proPapper: z.boolean(),
  })
  .refine(({ email, confirmEmail }) => email === confirmEmail, {
    //TODO translate this
    message: "email don't match",
    path: ["confirmEmail"],
  })
const offer = [
  {
    title: "basic",
    text: "free",
    icon: freeIcon,
  },
  { title: "best choice", text: "paid", icon: bestIcon },
]

export function Step2() {
  const intl = useIntl()
  const setStep = useStep((state) => state.setStep)
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      confirmEmail: "",
      offer: offer[1].text,
      proPapper: false,
    },
  })

  const selectOffer = (off: (typeof offer)[number]) => () => {
    form.setValue("offer", off.text)
  }

  React.useEffect(() => {
    setStep(2)
  }, [setStep])
  const offerWatch = form.watch("offer")

  const items1 = ["step2.items1.1", "step2.items1.2"]

  return (
    <>
      <div className="flex-1">
        <div className=" m-auto flex w-fit items-center rounded-2xl border bg-white p-3">
          aaa
        </div>
      </div>
      <div className="flex-1">
        <div className="rounded-2xl bg-[#EFEFEF] p-8">
          <h1>{intl.formatMessage({ id: "step2.title" })}</h1>

          <div className="flex flex-col gap-2">
            {items1.map((id) => (
              <div key={id} className="flex items-center gap-2">
                <span className="flex shrink-0 grow-0 items-center justify-center rounded-lg bg-white p-1">
                  <Check size={14} />
                </span>
                {intl.formatMessage({ id })}
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <p>email</p>
              <Input
                {...form.register("email")}
                placeholder="johndoe@gmail.com"
                className="bg-transparent focus-within:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="flex-1">
              <p>email</p>
              <Input
                {...form.register("confirmEmail")}
                placeholder="johndoe@gmail.com"
                className="bg-transparent focus-within:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {offer.map((off) => (
              <div
                className={cn(
                  "flex w-40 cursor-pointer flex-col overflow-hidden rounded-lg border text-center",
                  offerWatch === off.text && "border-primary"
                )}
                onClick={selectOffer(off)}
              >
                <div
                  className={cn(
                    "bg-slate-400 p-1 text-white",
                    offerWatch === off.text && "bg-black"
                  )}
                >
                  {intl.formatMessage({ id: off.title })}
                </div>
                <div className="flex items-center justify-center gap-4 p-4">
                  <img src={off.icon} alt="" />
                  <p>{intl.formatMessage({ id: off.text })}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <Collapsible>
              <CollapsibleTrigger className=" flex w-full  items-center justify-center">
                <Separator className="flex-1 bg-black" />
                <div className="flex items-center justify-center gap-2 rounded-full border border-black px-4 py-2">
                  {intl.formatMessage({ id: "voir plus" })}
                  <ChevronDown size={16} />
                </div>
                <Separator className="w-16 bg-black" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div>
                  <p>
                    {intl.formatMessage({
                      id: "Voulez-vous recevoir des photos imprimées ?",
                    })}
                  </p>
                  <div className=" flex w-fit items-center gap-4 rounded-xl border border-black px-4 py-2">
                    <Checkbox {...form.register("proPapper")} />
                    Photos imprimées sur papier professionnel
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="flex justify-end">
            <Button
              variant="outline"
              className="border-none bg-transparent hover:bg-transparent"
            >
              {intl.formatMessage({ id: "Précédent" })}
            </Button>
            <Button className=" bg-black">
              {intl.formatMessage({ id: "Continuer" })}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export const intl = {
  en: {},
  fr: {
    "step2.title": "Sélectionnez le plan",
    "step2.items1.1": "Une photo numérique (email)",
    "step2.items1.2": "Une plaquette numérique de vos photos (email)",
  },
  ar: {},
}
