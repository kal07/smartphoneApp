import { useQuery } from "@tanstack/react-query"

export const useCheckQrCode = (generatedQrcodeData) =>
  useQuery({
    queryKey: ["qrcode", "check"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/service/qrcode-check/${generatedQrcodeData?.uid}`
      ).then((res) => res.json())
      return res
    },
    refetchInterval: 1000 * 5,
    enabled: !!generatedQrcodeData,
  })
