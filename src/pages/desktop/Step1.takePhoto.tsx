import React from "react"
import { useMutation } from "@tanstack/react-query"
import { SwitchCamera } from "lucide-react"
import { useParams, useSearchParams } from "react-router-dom"
import Webcam from "react-webcam"

import { Button } from "@/components/ui/button"
import { useStep } from "@/context/useStep"

export function Step1TakePhoto() {
  const setStep = useStep((state) => state.setStep)
  React.useEffect(() => {
    setStep(1)
  }, [setStep])

  const { qrcode_id } = useParams()
  const [params] = useSearchParams()

  const [devices, setVideoDevices] = React.useState<any>(null)
  React.useLayoutEffect(() => {
    ;(async () => {
      const videoDevices = await navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => devices.filter(({ kind }) => kind === "videoinput"))
      setVideoDevices({ videoDevices, selected: 0 })
    })()
  }, [])

  const [photoTaken, setPhoto] = React.useState<{
    photo?: string
    signature?: string
  }>({})

  const needSignature = params.get("signature") === "true"

  const capture = React.useCallback(
    (webcamRef: any, type: string) => () => {
      if (webcamRef.current!.video?.paused) {
        webcamRef.current!.video.play()
        return
      }
      const imageSrc = webcamRef.current!.getScreenshot()
      setPhoto((curr) => ({ ...curr, [type]: imageSrc }))
      webcamRef.current!.video?.pause()
    },
    []
  )

  const changeCamera = React.useCallback(
    () => () => {
      const maxLength = devices?.videoDevices?.length - 1
      const nextIndex =
        devices.selected + 1 > maxLength ? 0 : devices.selected + 1
      setVideoDevices((curr: object) => ({ ...curr, selected: nextIndex }))
    },
    [devices, setVideoDevices]
  )

  const sendPhoto = useMutation({
    mutationFn: async (values: any) => {
      const formData = new FormData()
      const blob = await fetch(values.image).then((res) => res.blob())
      formData.append("file", blob)
      formData.append("type", values.type)
      const res = await fetch(
        `https://smartphoneid-api--test-2yx5ebbula-ew.a.run.app/file/upload`,
        { method: "post", body: formData }
      ).then((res) => res.json())
      await fetch(
        `https://smartphoneid-api--test-2yx5ebbula-ew.a.run.app/service/pin-photo-qrcode/${res.uid}/${qrcode_id}`
      )
      return res
    },
  })

  const sendSignature = useMutation({
    mutationFn: async (values: any) => {
      const formData = new FormData()
      const blob = await fetch(values.image).then((res) => res.blob())
      formData.append("file", blob)
      formData.append("type", values.type)
      const res = await fetch(
        `https://smartphoneid-api--test-2yx5ebbula-ew.a.run.app/file/upload`,
        { method: "post", body: formData }
      ).then((res) => res.json())
      await fetch(
        `https://smartphoneid-api--test-2yx5ebbula-ew.a.run.app/service/pin-signature-qrcode/${res.uid}/${qrcode_id}`
      )

      return res
    },
  })

  React.useEffect(() => {
    if (
      sendPhoto?.data?.uid &&
      ((needSignature && sendSignature?.data?.uid) || !needSignature)
    ) {
      setTimeout(() => window.close(), 5000)
    }
  }, [needSignature, sendPhoto?.data?.uid, sendSignature?.data?.uid])

  return (
    <div className="flex w-full flex-col items-center">
      {!sendPhoto?.data?.uid && (
        <TakePhoto
          devices={devices}
          capture={capture}
          changeCamera={changeCamera}
          photo={photoTaken?.photo}
          sendPhoto={sendPhoto}
          clearPhoto={() => {
            setPhoto((curr) => ({ ...curr, photo: undefined }))
          }}
          type="photo"
        />
      )}
      {needSignature && !sendSignature?.data?.uid && sendPhoto?.data?.uid && (
        <TakePhoto
          devices={devices}
          capture={capture}
          changeCamera={changeCamera}
          photo={photoTaken?.signature}
          sendPhoto={sendSignature}
          clearPhoto={() => {
            setPhoto((curr) => ({ ...curr, signature: undefined }))
          }}
          type="signature"
        />
      )}
      {sendPhoto?.data?.uid &&
        ((needSignature && sendSignature?.data?.uid) || !needSignature) && (
          <div>success</div>
        )}
    </div>
  )
}

const TakePhoto = ({
  devices,
  capture,
  changeCamera,
  photo,
  sendPhoto,
  clearPhoto,
  type,
}: {
  devices
  capture: (webcamRef, type: string) => () => void
  changeCamera: () => void
  photo?: string
  sendPhoto: any
  clearPhoto: () => void
  type: string
}) => {
  const webcamRef = React.useRef<Webcam>(null)

  return (
    <>
      <Webcam
        className=" h-full grow rounded object-cover "
        ref={webcamRef}
        forceScreenshotSourceSize
        screenshotFormat={"image/jpeg"}
        mirrored
        screenshotQuality={1}
        videoConstraints={{
          deviceId: devices?.videoDevices[devices?.selected],
        }}
      />
      <div className="mt-5 flex w-full gap-5">
        {!photo && (
          <>
            <Button
              className=" flex-1 rounded-full border border-black bg-transparent text-black hover:bg-transparent"
              onClick={changeCamera}
            >
              <SwitchCamera />
            </Button>
            <Button
              className="flex-1 rounded-full bg-black hover:bg-black"
              onClick={capture(webcamRef, type)}
            >
              Take photo
            </Button>
          </>
        )}
        {photo && (
          <>
            <Button
              className=" flex-1 rounded-full border border-black bg-transparent text-black hover:bg-transparent"
              onClick={() => {
                webcamRef.current!.video?.play()
                clearPhoto()
              }}
            >
              Try Again
            </Button>
            <Button
              className="flex-1 rounded-full bg-black hover:bg-black"
              onClick={() => sendPhoto.mutateAsync({ type, image: photo })}
            >
              Send{" "}
              {sendPhoto.isLoading && (
                <svg className="h-5 w-5 animate-spin " viewBox="0 0 24 24">
                  <circle
                    className="fill-transparent opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
            </Button>
          </>
        )}
      </div>
    </>
  )
}
