import React from "react"
import { useIntl } from "react-intl"
import { QRCode } from "react-qrcode-logo"

import check from "@/assets/check-white.svg"
import logo from "@/assets/logo.png"
import img from "@/assets/step1-img.png"
import { useStep } from "@/context/useStep"

export function Step1() {
  const setStep = useStep((state) => state.setStep)

  React.useEffect(() => {
    setStep(1)
  }, [setStep])

  return (
    <div className="flex flex-1">
      <div className=" flex-1 grow-[3]">
        <SmartPhoneQrCode url="https://localhost:5173/s1" />
      </div>
      <div className="flex-1 grow-[2] ">
        <SideInfo />
      </div>
    </div>
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
    <div className=" h-fit max-w-md rounded-3xl bg-[#EFEFEF] p-12 px-16 shadow-md max-md:p-8 m-auto">
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

function SmartPhoneQrCode({ url }: { url: string }) {
  const intl = useIntl()
  return (
    <div className=" m-auto flex h-full max-w-xs flex-col items-center justify-center gap-6 border bg-purple-500">
      <h3 className=" text-2xl font-bold">
        {intl.formatMessage({ id: "qrcode title" })}
      </h3>
      <QRCode
        value={url}
        logoImage={logo}
        logoWidth={40}
        removeQrCodeBehindLogo
        logoPadding={2}
        size={180}
      />
      <p className=" cursor-pointer underline">
        {intl.formatMessage({ id: "qrcode " })}
      </p>
    </div>
  )
}
