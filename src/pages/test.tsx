import React from "react"
import Webcam from "react-webcam"

export function Test() {
  const camRef = React.useRef<Webcam>(null)
  const clickme = async () => {
    const image = camRef.current!.getScreenshot()
    console.log(image)
    // const blob = await fetch(image!).then((res) => res.blob())
    // const url = window.URL.createObjectURL(blob!)
    // window.location.assign(url)
    // window.open(url, "_blank")
    // camRef.current!.video?.pause()
  }

  return (
    <div>
      <Webcam
        className="object-cover"
        ref={camRef}
        forceScreenshotSourceSize
        screenshotFormat={"image/jpeg"}
        mirrored
        screenshotQuality={1}
      />
      <button onClick={clickme}>clickme</button>
    </div>
  )
}
