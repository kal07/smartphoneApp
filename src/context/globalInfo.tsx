import { create } from "zustand"

interface Step {
  photo_id: string | null
  setPhoto_id: (id) => void

  signature_id: string | null
  setSignature_id: (id) => void

  email: string | null
  setEmail: (email) => void
}

export const useGlobalState = create<Step>((set) => ({
  photo_id: null,
  setPhoto_id: (photo_id) => set({ photo_id }),

  signature_id: null,
  setSignature_id: (signature_id) => set({ signature_id }),

  email: null,
  setEmail: (email) => set({ email }),
}))
