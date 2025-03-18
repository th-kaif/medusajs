import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Label } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import { sdk } from "../lib/client"
import { useQuery } from "@tanstack/react-query"
import { useDebugValue } from "react"

type AdminProductBrand = HttpTypes.AdminProduct & {
  brand?: {
    id: string
    name: string
  }
}

const ProductBrandWidget = () => {
  const { data: queryResult } = useQuery({
    queryFn: () => sdk.admin.product.list({
      fields: "+brand.*",
    }),
    queryKey: ["products"],
  })
  
  if (!queryResult?.products?.length) {
    return null
  }

  const brandName = (queryResult.products[0] as AdminProductBrand)?.brand?.name
  useDebugValue(brandName)
  
  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Brand Name</Heading>
      </div>
      <div className="text-center">
        <Label>{brandName}</Label>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.before"
})

export default ProductBrandWidget