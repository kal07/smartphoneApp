import ar from "@/translation/ar.json"
import de from "@/translation/de.json"
import en from "@/translation/en.json"
import es from "@/translation/es.json"
import fr from "@/translation/fr.json"
import it from "@/translation/it.json"
import lv from "@/translation/lv.json"
import nl from "@/translation/nl.json"
import pl from "@/translation/pl.json"
import ru from "@/translation/ru.json"
import tr from "@/translation/tr.json"

const formatter = (
  obj: Record<string, string | object>,
  prefix: string = ""
) => {
  let res: Record<string, string> = {}
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "string") {
      res = { ...res, [`${prefix}.${key}`]: obj[key] as string }
    } else {
      res = {
        ...res,
        ...formatter(
          obj[key] as Record<string, object>,
          `${prefix ? `${prefix}.` : ""}${key}`
        ),
      }
    }
  })
  return res
}

const formattedFR = formatter(fr)
const formattedAR = formatter(ar)
const formattedDE = formatter(de)
const formattedES = formatter(es)
const formattedIT = formatter(it)
const formattedLV = formatter(lv)
const formattedNL = formatter(nl)
const formattedPL = formatter(pl)
const formattedRU = formatter(ru)
const formattedTR = formatter(tr)
const formattedEN = formatter(en)

export const defaultLocal = () => {
  const local = localStorage.getItem("local") || navigator.language
  if (local.includes("-")) return local.split(/[-_]/)[0]
  return local
}

export const messages: Record<string, Record<string, string>> = {
  fr: formattedFR,
  en: formattedEN,
  ar: formattedAR,
  de: formattedDE,
  es: formattedES,
  it: formattedIT,
  lv: formattedLV,
  nl: formattedNL,
  pl: formattedPL,
  ru: formattedRU,
  tr: formattedTR,
}
