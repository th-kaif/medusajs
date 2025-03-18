import { z } from "zod"
import { EditProductMediaSchema, ProductCreateSchema } from "./constants"

export const AdditionalData = z.object({
    additional_data: z.object({
        name: z.string().optional().default("Brand Name"),
        brand_name: z.string().optional()
    })
})

export type ProductCreateSchemaType = z.infer<typeof ProductCreateSchema>

export type EditProductMediaSchemaType = z.infer<typeof EditProductMediaSchema>
