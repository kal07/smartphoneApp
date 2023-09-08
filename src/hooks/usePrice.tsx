import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export const usePrice = () => {
  const { price_id, country_destination } = useParams()

  const {
    data: country_origin,
    // isLoading: isLoading_countryOrigin,
    // isError: isError_countryOrigin,
  } = useQuery({
    queryKey: ["client_country"],
    queryFn: async () => {
      const res = await fetch("https://ipapi.co/country/").then((res) =>
        res.text()
      )
      return res
    },
  })

  const price = useQuery({
    queryKey: ["price_id", country_origin, country_destination, price_id],
    queryFn: async () => {
      const res = await fetch(
        `https://smartphoneid-api--test-2yx5ebbula-ew.a.run.app/price/from-country/${country_origin}/to/${country_destination}/for/${price_id}`
      ).then((res) => res.json())
      return res
    },
    enabled: !!country_origin,
  })
  return price
}
