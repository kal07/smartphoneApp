import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { ChevronDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { useIntl } from "react-intl"
import { useParams } from "react-router-dom"
import { z } from "zod"

import greenCheck from "@/assets/check-round-green.svg"
import whiteCheck from "@/assets/check-white.svg"
import freeIcon from "@/assets/icon-basic.svg"
import bestIcon from "@/assets/icon-best.svg"
import info from "@/assets/info.svg"
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
import { usePrice } from "@/hooks/usePrice"
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
  const { qrcode_uid, price_id } = useParams()

  const setStep = useStep((state) => state.setStep)
  React.useEffect(() => {
    setStep(2)
  }, [setStep])

  const qrcode = useQuery({
    queryKey: ["qrcodeConsumed"],
    queryFn: async () => {
      const res = await fetch(
        `https://smartphoneid-api--test-2yx5ebbula-ew.a.run.app/service/qrcode-consumed/${qrcode_uid}`
      ).then((res) => res.json())
      return res
    },
    enabled: !!qrcode_uid,
  })

  const planche = useQuery({
    queryKey: ["planche"],
    queryFn: async () => {
      const formData = new FormData()
      formData.append("photoUid", qrcode.data?.photo?.uid)
      formData.append("priceId", price_id as string)
      qrcode.data?.signature?.uid &&
        formData.append("signatureUid", qrcode.data?.signature?.uid)

      const res = await fetch(
        `https://smartphoneid-api--test-2yx5ebbula-ew.a.run.app/purpose/show-purpose-spec`,
        { method: "post", body: formData }
      ).then((res) => res.json())
      const formattedRes = Object.entries(res).map(
        (v) => "data:image/jpeg;base64," + (v[1] as any).base64
      )
      return formattedRes
    },
    enabled: !!qrcode_uid && !!qrcode.data?.photo?.uid,
  })

  const { data } = usePrice()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      confirmEmail: "",
      offer: offer[1].text,
      proPapper: false,
    },
  })

  return (
    <>
      <div className="flex flex-1 flex-col gap-6">
        <Offer data={data} />
        {planche.data &&
          planche.data?.map((v) => <Photo key={v} preview={v} />)}
        <PhotoInfo />
      </div>
      <div className="flex-1">
        <SideInfo form={form} />
      </div>
    </>
  )
}

const Offer = ({ data }: { data: any }) => {
  // const intl = useIntl()
  return (
    <div className=" flex w-fit gap-5 rounded-xl border bg-white p-4">
      <div className="flex min-w-[150px] items-center  gap-4">
        <img
          src={data?.result?.use_in_country?.thumbnail}
          alt=""
          className=" h-5 w-5 object-cover"
        />
        <p className=" text-[#4D4D4D]">
          {data?.result?.use_in_country?.country_name}
        </p>
      </div>
      <Separator orientation="vertical" className="h-auto" />
      <div className="flex min-w-[150px] items-center  gap-4">
        <img
          src={data?.result?.purpose?.icon?.url}
          alt=""
          className=" h-5 w-5 object-cover"
        />
        <p className=" text-[#4D4D4D]">{data?.result?.purpose?.label}</p>
      </div>
    </div>
  )
}
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

const Photo = ({ preview }) => (
  <img src={preview} alt="" className="rounded-2xl" />
)

const SideInfo = ({ form }) => {
  const intl = useIntl()
  const items1 = ["step2.items1.1", "step2.items1.2"]
  const offerWatch = form.watch("offer")
  const selectOffer = (off: (typeof offer)[number]) => () => {
    form.setValue("offer", off.text)
  }
  return (
    <div className="rounded-2xl bg-[#EFEFEF] p-8">
      <h1 className=" mb-4 text-2xl font-bold">
        {intl.formatMessage({ id: "step2.title" })}
      </h1>

      <div className="mb-5 flex flex-col gap-2">
        {items1.map((id) => (
          <div key={id} className="flex items-center gap-2">
            <img src={whiteCheck} alt="" />
            {intl.formatMessage({ id })}
          </div>
        ))}
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <p>email</p>
          <Input
            {...form.register("email")}
            placeholder="johndoe@gmail.com"
            className="bg-transparent focus-within:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="flex-1">
          <p>confirmEmail</p>
          <Input
            {...form.register("confirmEmail")}
            placeholder="johndoe@gmail.com"
            className="bg-transparent focus-within:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
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
            <div
              className={cn(
                "flex items-center justify-center gap-4 p-4",
                offerWatch === off.text && "bg-white"
              )}
            >
              <img src={off.icon} alt="" />
              <p>{intl.formatMessage({ id: off.text })}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-5 flex flex-col gap-2">
        {items1.map((id) => (
          <div key={id} className="flex items-center gap-2">
            <img src={greenCheck} alt="" />
            {intl.formatMessage({ id })}
          </div>
        ))}
      </div>

      <div className="mb-4">
        <Collapsible>
          <CollapsibleTrigger className=" flex w-full  items-center justify-center">
            <Separator className="h-[1px] flex-1 bg-[#4C4C4C]" />
            <div className="flex items-center justify-center gap-2 rounded-full border border-[#4C4C4C] px-4 py-2 font-bold text-[#4C4C4C] ">
              {intl.formatMessage({ id: "Voir plus" })}
              <ChevronDown size={16} />
            </div>
            <Separator className="h-[1px] w-16 bg-[#4C4C4C]" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div>
              <p className="my-4">
                {intl.formatMessage({
                  id: "Voulez-vous recevoir des photos imprimées ?",
                })}
              </p>
              <div className=" flex w-fit items-center gap-4 rounded-xl border border-black px-4 py-3">
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
        <Button className=" rounded-full bg-black">
          {intl.formatMessage({ id: "Continuer" })}
        </Button>
      </div>
    </div>
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
