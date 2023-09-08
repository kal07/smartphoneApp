import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { useIntl } from "react-intl"

import greenCheck from "@/assets/check-round-green.svg"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useStep } from "@/context/useStep"
import { cn } from "@/lib/utils"

export function Step3() {
  const setStep = useStep((state) => state.setStep)
  React.useEffect(() => {
    setStep(3)
  }, [setStep])
  const form = useForm()

  const intl = useIntl()
  const items1 = [
    "step2.items1.1",
    "step2.items1.2",
    "step2.items1.2",
    "step2.items1.2",
  ]

  // const onSubmit = () => {}
  return (
    <div className="flex grow gap-5">
      <div className="flex-1">
        <h1 className="mb-8 text-2xl font-bold">
          Quelle planche imprimée souhaitez-vous commander ?
        </h1>
        <div className="flex flex-col gap-5">
          <Planche />
          <Planche />
        </div>
      </div>
      <div className="flex-[2]">
        <h1 className="mb-8 text-2xl font-bold">Votre adresse de livraison</h1>
        <Form {...form}>
          <form className="space-y-8">
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Prénom*</FormLabel>
                    <FormControl>
                      <Input placeholder="Prénom*" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Nom*</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom*" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nom sur la boîte aux lettres / Entreprise (Optionnel)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="company name*" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="adress"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>adress*</FormLabel>
                    <FormControl>
                      <Input placeholder="Prénom*" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="adress_comp"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>complement adress*</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom*" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="ville"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>ville*</FormLabel>
                    <FormControl>
                      <Input placeholder="Prénom*" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="codepostal"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>code postal*</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom*" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>region*</FormLabel>
                    <FormControl>
                      <Input placeholder="Prénom*" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>counry*</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom*" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
      <div className="flex-1">
        <div className="rounded-2xl bg-[#EFEFEF] px-8 py-10 shadow-md">
          <h1 className="mb-8 text-2xl font-bold">Votre commande</h1>
          <div className="mb-5 flex flex-col gap-2">
            {items1.map((id) => (
              <div key={id} className="flex items-center gap-2">
                <img src={greenCheck} alt="" />
                {intl.formatMessage({ id })}
              </div>
            ))}
          </div>

          <div>
            <Button className="w-full rounded-full bg-black">
              Valider la commande
            </Button>
            <Button variant="ghost" className="">
              Precedent
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Planche = () => {
  const [count, setCount] = React.useState(0)
  return (
    <div
      className={cn(
        "flex gap-2 rounded border border-[#DEDEDE] bg-white p-4 transition-all",
        count && "border-primary"
      )}
    >
      <div className="flex flex-1 flex-col gap-2">
        <h1>1 planche de 6 photos</h1>
        <div className=" h-28 w-40 bg-slate-500"></div>
      </div>
      <div className="flex flex-col items-end justify-between gap-2">
        <Checkbox
          checked={!!count}
          onCheckedChange={(checked) => {
            if (checked) {
              setCount(1)
            } else {
              setCount(0)
            }
          }}
        />
        <div className="flex">
          <Button
            onClick={() => setCount((curr) => (curr === 0 ? curr : curr - 1))}
            className="rounded-e-none border-y-[1px] border-l-[1px] bg-white p-2 text-black hover:bg-white focus-visible:outline-transparent focus-visible:ring-transparent"
          >
            <ChevronLeft />
          </Button>
          <div
            // value={count}
            // onChange={(e) => setCount(e.target.valueAsNumber || 0)}
            className=" flex w-10 items-center justify-center rounded-none border-y-[1px] border-x-transparent focus-visible:outline-none focus-visible:ring-0"
          >
            {count}
          </div>
          <Button
            onClick={() => setCount((curr) => curr + 1)}
            className=" rounded-s-none border-y-[1px] border-r-[1px] bg-white p-2  text-black  hover:bg-white focus-visible:outline-transparent focus-visible:ring-transparent"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
