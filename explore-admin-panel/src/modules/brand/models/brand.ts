import { model } from "@medusajs/framework/utils"

export const Brand = model.define("brand", {
  id: model.id().primaryKey(),
  name: model.text().searchable(),
  logo_url: model.text().nullable(),
  description: model.text().nullable(),
  website: model.text().nullable(),
  founded_year: model.number().nullable(),
})