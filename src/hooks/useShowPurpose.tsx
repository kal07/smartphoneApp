import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { useGlobalState } from "@/context/globalInfo"

export const useShowPurpose = () => {
  const globalState = useGlobalState()
  const { price_id } = useParams()

  return useQuery({
    queryKey: ["user", globalState.photo_id, globalState.signature_id],
    queryFn: async () => {
      const formData = new FormData()
      formData.append("price_id", price_id!)
      formData.append("photoUid", globalState.photo_id!)
      globalState.signature_id &&
        formData.append("signatureUid", globalState.signature_id!)

      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/purpose/show-purpose-spec`,
        { method: "post", body: formData }
      ).then((res) => res.json())
      return res
    },
    enabled: !!price_id && !!globalState.photo_id,
  })
}
