import type { DashboardPlugin } from "../dashboard-app/types"
import ProductBrandWidget from "../widgets/product-brand"
import { z } from "zod"

export const productBrandPlugin: DashboardPlugin = {
  widgetModule: {
    widgets: [
      {
        Component: ProductBrandWidget,
        zone: ["product.details.before"]
      }
    ]
  },
  formModule: {
    customFields: {
      product: {
        forms: [
          {
            zone: "create",
            fields: {
              brand_name: {
                label: "Brand Name",
                description: "Enter the brand name for this product",
                validation: z.string().min(1, "Brand name is required"),
                placeholder: "Enter brand name..."
              }
            }
          }
        ],
        configs: []
      }
    }
  },
  displayModule: {
    displays: {
      product: []
    }
  },
  menuItemModule: {
    menuItems: []
  },
  routeModule: {
    routes: []
  }
}

export default productBrandPlugin