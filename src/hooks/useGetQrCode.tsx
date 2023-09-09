import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { needSignature } from "@/lib/dataLayer"

import { usePrice } from "./usePrice"

export const useGetQrCode = () => {
  const { price_id } = useParams()

  const { data } = usePrice()

  return useQuery({
    queryKey: ["qrcode"],
    queryFn: async () => {
      const signature = needSignature(data?.result)
      const url = signature
        ? "/service/photo-signature-qrcode-request/"
        : "/service/photo-qrcode-request/"
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}${url}${price_id}`
      ).then((res) => res.json())
      const formattedRes = {
        qrCode_check_url:
          import.meta.env.VITE_BASE +"/"+
          (res.qrCode_check_url as string).slice(55) +
          `${signature ? "?signature=true" : ""}`,
        uid: res.uid,
      }
      console.log(formattedRes)
      return formattedRes
    },
    enabled: !!data,
  })
}
