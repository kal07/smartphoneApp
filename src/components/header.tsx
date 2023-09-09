import { Info } from "lucide-react"
import { FormattedMessage } from "react-intl"

import logo from "@/assets/logo.svg"
import { useLanguage } from "@/context/useLanguage"

import { Button } from "./ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export default function Header() {
  const { language, changeLanguage, langList } = useLanguage()

  return (
    <div className="flex w-screen items-center gap-2 bg-white px-6 py-2">
      <img src={logo} alt="logo" />
      <Button
        variant="outline"
        size="icon"
        className="ms-auto rounded-full border-none"
      >
        <Info className="h-4 w-4" />
      </Button>
      <Select
        onValueChange={(value) => {
          changeLanguage(value)
        }}
        value={language}
      >
        <SelectTrigger className=" w-[180px] shrink grow-0 border-none  focus:ring-transparent">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {langList.map((lang) => (
            <SelectItem className="hover:!text-primary" value={lang}>
              <FormattedMessage id={lang} />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
