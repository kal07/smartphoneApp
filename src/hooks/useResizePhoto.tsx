import { useMutation } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { resizePhoto } from "@/lib/dataLayer"

import { useGetOriginCountry } from "./useGetOriginCountry"

export const useResizePhoto = () => {
  const { data: country_code } = useGetOriginCountry()
  const { price_id } = useParams()

  return useMutation({
    mutationFn: async (variable: { photo }) => {
      return await resizePhoto({
        photo: variable.photo,
        country_code,
        purpose_id: price_id,
      }).then((res) => res.blob())
    },
  })
}
