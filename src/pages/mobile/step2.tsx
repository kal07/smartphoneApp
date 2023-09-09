import React from "react"
import { AlertCircle } from "lucide-react"
import { useIntl } from "react-intl"
import { z } from "zod"

import greenCheck from "@/assets/check-round-green.svg"
import pro from "@/assets/icon-best.svg"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useGlobalState } from "@/context/globalInfo"
import { useStep } from "@/context/useStep"
import { usePrice } from "@/hooks/usePrice"
import { getBasePrice, getPremiumOffer } from "@/lib/dataLayer"
// import { useShowPurpose } from "@/hooks/useShowPurpose"
import { cn } from "@/lib/utils"

export default function MobileStep2() {
  const setStep = useStep((state) => state.setStep)
  React.useEffect(() => {
    setStep(2)
  }, [setStep])

  // const purpose = useShowPurpose()

  const [localStep, nextStep] = React.useReducer((curr) => curr + 1, 0)

  return (
    <div className="flex flex-1 flex-col">
      {localStep === 0 && <Email nextStep={nextStep} />}
      {localStep === 1 && <Offer/>}
    </div>
  )
}

function Email({ nextStep }) {
  const intl = useIntl()

  const [error, setError] = React.useState<string | null>(null)
  const [email, setEmail] = React.useState("")
  const [confirmEmail, setConfirmEmail] = React.useState("")
  const setGlobalEmail = useGlobalState((state) => state.setEmail)

  React.useEffect(() => {
    setError(null)
  }, [email, confirmEmail])

  const checkAndNext = () => {
    const check = z.string().email().safeParse(email)
    if (!check.success) {
      setError("EmailApp.email_error")
    } else if (email.trim() !== confirmEmail.trim()) {
      setError("EmailApp.email_error1")
    } else {
      setGlobalEmail(email)
      nextStep()
    }
  }

  return (
    <div className=" m-auto flex w-[90%] flex-1 flex-col">
      <h1 className="mb-4 text-2xl font-bold">
        {intl.formatMessage({ id: "EmailApp.title_email" })}
      </h1>
      <div className="mt-5 flex flex-1 flex-col gap-5">
        <Alert
          variant="destructive"
          className={cn(
            "bg-destructive text-white transition",
            !error && "opacity-0"
          )}
        >
          <AlertCircle color="white" className="h-4 w-4" />
          <AlertTitle>
            {intl.formatMessage({ id: error ?? "EmailApp.email_error" })}
          </AlertTitle>
        </Alert>
        <div>
          <p className="mb-1">
            {intl.formatMessage({ id: "EmailApp.email_address" })}
          </p>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="dominique.rheaume@gmail.com"
            className=" border-[2px] bg-transparent transition focus-within:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div>
          <p className="mb-1">
            {intl.formatMessage({ id: "EmailApp.email_confirmation" })}
          </p>
          <Input
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            placeholder="dominique.rheaume@gmail.com"
            className=" border-[2px] bg-transparent transition focus-within:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
      <Button
        className="m-auto w-60 rounded-full bg-black"
        onClick={checkAndNext}
      >
        {intl.formatMessage({ id: "beforePhoto.continue" })}
      </Button>
    </div>
  )
}

function Offer() {
  const price = usePrice()
  const premiumOffer = getPremiumOffer(price.data?.result)
  // const shipmentOffer = getShipmentOffer(price.data?.result)

  return (
    <div className=" m-auto flex w-[90%] flex-1 flex-col">
      {!premiumOffer?.length && <OnlyFreeOffer />}
    </div>
  )
}

function OnlyFreeOffer() {
  const intl = useIntl()
  const price = usePrice()

  const formattedPrice = getBasePrice(price.data?.result)
  const items = [
    "Compliance_guarantee",
    "Background_removal",
    "Photo_check_by_trained_expert",
    "Adjustments",
    "Receive_immediately_in_e-mail",
    "Printable_template",
    "receive_exact",
    "Print_order",
  ]
  return (
    <div className="flex-1">
      <div className="flex items-center justify-center rounded-md  border-[2px] border-primary p-4">
        <img src={pro} alt="" />
      </div>
      <h1 className="my-5 text-2xl text-gray-400">
        {intl.formatMessage({ id: "yourPlan.title_your_plan" })}
      </h1>
      <p>{intl.formatMessage({ id: "yourPlan.what_feature" })}</p>
      <Separator />
      <div className="flex flex-1 flex-col gap-2 p-2">
        {items.map((i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <p>{intl.formatMessage({ id: `yourPlan.${i}` })}</p>
            <img src={greenCheck} alt="" />
          </div>
        ))}
      </div>
      <Button
        onClick={() => {}}
        className="m-auto flex w-60 rounded-full bg-black"
      >
        {intl.formatMessage({ id: "yourPlan.proceed_price" })} {formattedPrice}
      </Button>
    </div>
  )
}
