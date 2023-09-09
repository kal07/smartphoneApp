import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { useLanguage } from "@/context/useLanguage"

import { useGetOriginCountry } from "./useGetOriginCountry"

export const usePrice = () => {
  const { price_id, country_destination } = useParams()
  const { data: originCountry } = useGetOriginCountry()
  const language = useLanguage((state) => state.language)

  return useQuery({
    queryKey: [
      "price_id",
      originCountry,
      country_destination,
      price_id,
      language,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/price/from-country/${originCountry}/to/${country_destination}/for/${price_id}`,
        { headers: { language } }
      ).then((res) => res.json())
      return res
    },
    enabled: Boolean(originCountry),
  })
}
