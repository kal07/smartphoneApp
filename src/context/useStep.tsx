import { create } from "zustand"

interface Step {
  step: number
  maxStep: number
  nextStep: () => void
  previousStep: () => void
  setStep: (step: number) => void
}

export const useStep = create<Step>((set) => ({
  step: 0,
  maxStep: 4,
  nextStep: () =>
    set((state) => {
      if (state.step >= state.maxStep) {
        return { step: state.maxStep }
      }
      return { step: state.step + 1 }
    }),
  previousStep: () =>
    set((state) => {
      if (state.step <= 0) {
        return { step: 0 }
      }
      return { step: state.step - 1 }
    }),
  setStep: (step: number) => set({ step }),
}))
