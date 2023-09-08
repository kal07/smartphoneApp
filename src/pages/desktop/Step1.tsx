import React from "react"
import { useQuery } from "@tanstack/react-query"
import { useIntl } from "react-intl"
import { QRCode } from "react-qrcode-logo"
import { useNavigate, useParams } from "react-router-dom"

import check from "@/assets/check-white.svg"
import logo from "@/assets/logo.png"
import img from "@/assets/step1-img.png"
import { useStep } from "@/context/useStep"
import { usePrice } from "@/hooks/usePrice"

// import { Check } from "lucide-react"

export function Step1() {
  const navigate = useNavigate()

  const setStep = useStep((state) => state.setStep)
  React.useEffect(() => {
    setStep(1)
  }, [setStep])
  const { price_id } = useParams()
  const { data } = usePrice()

  const {
    data: generatedQrcodeData,
    isLoading: isLoading_generatedQrcode,
    // isError: isError_qrcode,
  } = useQuery({
    queryKey: ["qrcode"],
    queryFn: async () => {
      const url = data?.result?.purpose?.signature_needed
        ? `https://smartphoneid-api--test-2yx5ebbula-ew.a.run.app/service/photo-signature-qrcode-request/${price_id}`
        : `https://smartphoneid-api--test-2yx5ebbula-ew.a.run.app/service/photo-qrcode-request/${price_id}`
      const res = await fetch(url).then((res) => res.json())
      const params = data?.result.purpose?.signature_needed
      const formattedRes = {
        qrCode_check_url:
          `https://192.168.52.36:5173/` +
          (res.qrCode_check_url as string).slice(55) +
          `${params ? "?signature=true" : ""}`,
        uid: res.uid,
      }
      return formattedRes
    },
    enabled: !!data,
  })

  const { data: data_qrcode } = useQuery({
    queryKey: ["qrcode"],
    queryFn: async () => {
      const res = await fetch(
        `https://smartphoneid-api--test-2yx5ebbula-ew.a.run.app/service/qrcode-check/${generatedQrcodeData?.uid}`
      ).then((res) => res.json())
      return res
    },
    refetchInterval: 1000 * 5,
    enabled: !!generatedQrcodeData,
  })

  const firstCondition = data_qrcode?.needPhoto && !!data_qrcode?.photoUrl
  const secondCondition = data_qrcode?.needSignature
    ? !!data_qrcode?.signatureUrl
    : true

  useQuery({
    queryKey: ["qrcodeConsumed"],
    queryFn: async () => {
      const res = await fetch(
        `https://smartphoneid-api--test-2yx5ebbula-ew.a.run.app/service/qrcode-consumed/${generatedQrcodeData?.uid}`
      ).then((res) => res.json())
      return res
    },
    enabled: !!data_qrcode && firstCondition && secondCondition,
  })

  React.useEffect(() => {
    if (data_qrcode) {
      if (firstCondition && secondCondition) {
        navigate(`./${generatedQrcodeData?.uid}/step2`)
      }
    }
  }, [data_qrcode, navigate, generatedQrcodeData?.uid])

  return (
    <>
      <div className=" flex flex-1 grow-[3] items-center justify-center">
        <SmartPhoneQrCode
          url={generatedQrcodeData?.qrCode_check_url}
          isLoading={isLoading_generatedQrcode}
        />
      </div>
      <div className=" flex flex-1 grow-[2] justify-center">
        <SideInfo />
      </div>
    </>
  )
}

function SideInfo() {
  const intl = useIntl()
  const items = [
    "Desktop.beforePhotoDesktop.off_glasses",
    "Desktop.beforePhotoDesktop.even_light",
    "Desktop.beforePhotoDesktop.hair_behind",
    "Desktop.beforePhotoDesktop.neutral_face",
  ]

  return (
    <div className=" m-auto h-fit max-w-md rounded-3xl bg-[#EFEFEF] p-12 px-16 shadow-md max-md:p-8">
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
  )
}

function SmartPhoneQrCode({
  url,
  isLoading,
}: {
  url: string | undefined
  isLoading: boolean
}) {
  const intl = useIntl()
  return (
    <div className=" m-auto flex h-full max-w-xs flex-col items-center justify-center gap-6 border ">
      <h3 className=" text-2xl font-bold">
        {intl.formatMessage({ id: "qrcode title" })}
      </h3>
      {isLoading && <div className="lds-dual-ring"></div>}
      {!isLoading && (
        <QRCode
          value={url}
          logoImage={logo}
          logoWidth={40}
          removeQrCodeBehindLogo
          logoPadding={2}
          size={180}
        />
      )}
      <a href={url} target="_blank" className=" cursor-pointer underline">
        {intl.formatMessage({ id: "qrcode " })}
      </a>
    </div>
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
