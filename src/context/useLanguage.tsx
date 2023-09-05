import { create } from "zustand"

import { defaultLocal, messages } from "@/lib/intl"

interface language {
  language: string
  langList: string[]
  changeLanguage: (lang: string) => void
}

export const useLanguage = create<language>((set) => ({
  language: defaultLocal(),
  langList: Object.keys(messages),
  changeLanguage: (language) => {
    set({ language })
    localStorage.setItem("local", language)
  },
}))
