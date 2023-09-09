import { useQuery } from "@tanstack/react-query"

export const useGetOriginCountry = () =>
  useQuery({
    queryKey: ["user", "currentCOuntry"],
    queryFn: async () => {
      let originCountry = localStorage.getItem("originCountry")
      if (!originCountry) {
        originCountry = await fetch("https://ipapi.co/country/").then((res) =>
          res.text()
        )
        localStorage.setItem("originCountry", originCountry!)
      }
      return originCountry
    },
    staleTime: Infinity,
  })
