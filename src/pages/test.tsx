import React from "react"
import Webcam from "react-webcam"

export function Test() {
  const camRef = React.useRef<Webcam>(null)
  const [image, setImage] = React.useState<string | null>(null)
  const clickme = async () => {
    const image = camRef.current!.getScreenshot()
    // const blob = await fetch(image!).then((res) => res.blob())
    // const url = window.URL.createObjectURL(blob!)
    // window.location.assign(url)
    // window.open(url, "_blank")
    // camRef.current!.video?.pause()
    setImage(image)
  }

  return (
    <div>
      aaaa
      <Webcam
        className=" h-96 w-72  object-cover"
        ref={camRef}
        forceScreenshotSourceSize
        screenshotFormat={"image/jpeg"}
        mirrored
        screenshotQuality={1}
      />
      <button onClick={clickme}>clickme</button>
      <img src={image || ""} alt="" className=" h-96 w-72  object-cover" />
    </div>
  )
}
