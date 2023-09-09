import React from "react"
import { SwitchCamera } from "lucide-react"
import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import Webcam from "react-webcam"

import introPhoto from "@/assets/gif desktop.gif"
import { Spinner } from "@/components/Spinner"
import { Button } from "@/components/ui/button"
import { useGlobalState } from "@/context/globalInfo"
import { useStep } from "@/context/useStep"
import { usePrice } from "@/hooks/usePrice"
import { useResizePhoto } from "@/hooks/useResizePhoto"
import { useUploadPhoto } from "@/hooks/useUploadPhoto"
import { needSignature } from "@/lib/dataLayer"

export default function MobileStep1() {
  const navigate = useNavigate()
  const price = usePrice()
  const setStep = useStep((state) => state.setStep)
  React.useEffect(() => {
    setStep(1)
  }, [setStep])

  const [localStep, nextStep] = React.useReducer((curr) => curr + 1, 0)

  const signatureNeeded = needSignature(price.data?.result)

  React.useEffect(() => {
    if (!signatureNeeded && localStep > 1) {
      navigate("./step2")
    }
  }, [localStep, signatureNeeded, navigate])

  return (
    <div className="flex flex-1 flex-col">
      {localStep === 0 && <IntroPhoto nextStep={nextStep} />}
      {localStep === 1 && (
        <PhotoHandler nextStep={nextStep} signatureNeeded={signatureNeeded} />
      )}
    </div>
  )
}

function IntroPhoto({ nextStep }: { nextStep: () => void }) {
  const intl = useIntl()
  return (
    <div className=" m-auto flex max-w-[90%] flex-1 flex-col">
      <h1 className="mb-4 text-2xl font-bold">
        {intl.formatMessage({ id: "beforePhoto.title_before_photo" })}
      </h1>
      <img className="flex-1 object-contain" src={introPhoto} />
      <Button onClick={nextStep} className="m-auto w-60 rounded-full bg-black">
        {intl.formatMessage({ id: "beforePhoto.continue" })}
      </Button>
    </div>
  )
}

// function InformationPhoto({ nextStep }: { nextStep: () => void }) {
//   const intl = useIntl()
//   return <></>
// }

function PhotoHandler({
  nextStep,
}: {
  nextStep: () => void
  signatureNeeded: boolean
}) {
  const [photo, setPhoto] = React.useState<string | null>(null)
  const uploadPhoto = useUploadPhoto()
  const setPhoto_id = useGlobalState((state) => state.setPhoto_id)

  const onUpload = async () => {
    await uploadPhoto.mutateAsync(
      { photo, type: "photo" },
      { onSuccess: (data) => setPhoto_id(data.uid) }
    )
    nextStep()
  }
  return (
    <>
      {!photo ? (
        <TakePhoto setPhoto={setPhoto} />
      ) : (
        <PreviewPhoto
          nextStep={onUpload}
          photo={photo}
          tryAgain={() => setPhoto(null)}
          uploadPhoto={uploadPhoto}
        />
      )}
    </>
  )
}

function TakePhoto({ setPhoto }: { setPhoto }) {
  const intl = useIntl()

  const resizePhoto = useResizePhoto()

  const webcamRef = React.useRef<Webcam>(null)
  const [devices, setVideoDevices] = React.useState<any>(null)
  React.useLayoutEffect(() => {
    ;(async () => {
      const videoDevices = await navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => devices.filter(({ kind }) => kind === "videoinput"))
      setVideoDevices({ videoDevices, selected: 0 })
    })()
  }, [])

  const changeCamera = React.useCallback(
    () => () => {
      const maxLength = devices?.videoDevices?.length - 1
      const nextIndex =
        devices.selected + 1 > maxLength ? 0 : devices.selected + 1
      setVideoDevices((curr: object) => ({ ...curr, selected: nextIndex }))
    },
    [devices, setVideoDevices]
  )

  const takePhoto = async () => {
    const photo = await webcamRef.current!.getScreenshot()
    webcamRef.current!.video?.pause()
    resizePhoto.mutateAsync(
      { photo },
      {
        onSuccess: () => {
          setPhoto(photo)
        },
      }
    )
  }

  return (
    <div className=" m-auto flex w-[90%] flex-1 flex-col">
      <h1 className="mb-4 text-2xl font-bold">
        {intl.formatMessage({ id: "beforePhoto.title_before_photo" })}
      </h1>
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
        <Button
          onClick={changeCamera}
          className=" flex-1 rounded-full border border-black bg-white text-black hover:bg-transparent"
          disabled={resizePhoto.isLoading}
        >
          <SwitchCamera />
        </Button>
        <Button
          onClick={takePhoto}
          className="flex-1 rounded-full bg-black hover:bg-black"
          disabled={resizePhoto.isLoading}
        >
          {intl.formatMessage({ id: "homeMobile.take_photo" })}
          {resizePhoto.isLoading && <Spinner />}
        </Button>
      </div>
    </div>
  )
}

function PreviewPhoto({
  nextStep,
  photo,
  tryAgain,
  uploadPhoto,
}: {
  nextStep: () => void
  photo: string
  tryAgain: () => void
  uploadPhoto: any
}) {
  const intl = useIntl()

  return (
    <div className=" m-auto flex w-[90%] flex-1 flex-col">
      <h1 className="mb-4 text-2xl font-bold">
        {intl.formatMessage({ id: "beforePhoto.take_photo_mobile" })}
      </h1>
      <img src={photo} className=" h-full grow rounded object-cover " />
      <div className="mt-5 flex w-full gap-5">
        <Button
          onClick={tryAgain}
          className=" flex-1 rounded-full border border-black bg-white text-black hover:bg-transparent"
          disabled={uploadPhoto.isLoading}
        >
          {intl.formatMessage({ id: "photoShootMobile.try_another" })}
        </Button>
        <Button
          onClick={nextStep}
          className="flex-1 rounded-full bg-black hover:bg-black"
          disabled={uploadPhoto.isLoading}
        >
          {intl.formatMessage({ id: "photoShootMobile.yes_continue" })}
          {uploadPhoto.isLoading && <Spinner />}
        </Button>
      </div>
    </div>
  )
}
