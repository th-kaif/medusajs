import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Label } from "@medusajs/ui"
import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types"
import { sdk } from "../lib/sdk"
import { useQuery } from "@tanstack/react-query"
import { useDebugValue } from "react"

type AdminProductBrand = AdminProduct & {
  brand?: {
    id: string
    name: string
  }
}

const ProductBrandWidget = ({ data: product } : DetailWidgetProps<AdminProduct>) => {
  const { data: queryResult } = useQuery({
    queryFn: () => sdk.admin.product.retrieve(product.id, {
      fields: "+brand.*",
    }),
    queryKey: [["product", product.id]],
  })
  const brandName = (queryResult?.product as AdminProductBrand)?.brand?.name
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