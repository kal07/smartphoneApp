import { useMutation } from "@tanstack/react-query"

import { uploadPhoto } from "@/lib/dataLayer"

export const useUploadPhoto = () =>
  useMutation({
    mutationFn: async (variables: { photo; type }) => {
      return await uploadPhoto({
        photo: variables.photo,
        type: variables?.type,
      }).then((res) => res.json())
    },
  })
