export const needSignature = (price) => {
  return Boolean(price?.purpose?.signature_needed)
}

export const getPremiumOffer = (price) => {
  const offers = (price?.optional_offers as Array<any>)?.filter(
    (v) => v?.product?.product_type === "option"
  )
  return offers
}
export const getShipmentOffer = (price) => {
  const offers = (price?.optional_offers as Array<any>)?.filter(
    (v) => v?.product?.product_type === "shipment"
  )
  return offers
}

export const getBasePrice = (price) => {
  const amount = price?.amount_in_local_currency
  const currency = price?.local_currency_symbol
  return `${amount} ${currency}`
}

export const resizePhoto = async ({ photo, purpose_id, country_code }) => {
  const formData = new FormData()
  const blob = await fetch(photo).then((res) => res.blob())

  formData.append("file", blob)
  formData.append("type", "photo")
  formData.append("do_apply_detouring", "1")
  formData.append("do_add_watermark", "1")
  formData.append("purpose_id", purpose_id)
  formData.append("country_code", country_code)
  formData.append("app_version", "3")

  return await fetch(
    `${import.meta.env.VITE_SERVER_URL}/file/resize-with-watermark`,
    {
      method: "post",
      body: formData,
    }
  )
}

export const uploadPhoto = async ({ photo, type = "photo" }) => {
  const formData = new FormData()
  const blob = await fetch(photo).then((res) => res.blob())

  formData.append("file", blob)
  formData.append("type", type)
  return await fetch(`${import.meta.env.VITE_SERVER_URL}/file/upload`, {
    method: "post",
    body: formData,
  })
}
