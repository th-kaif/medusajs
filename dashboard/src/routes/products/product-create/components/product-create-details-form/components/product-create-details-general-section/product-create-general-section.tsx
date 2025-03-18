import { Input, Textarea } from "@medusajs/ui"
import { UseFormReturn } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { Form } from "../../../../../../../components/common/form"
import { HandleInput } from "../../../../../../../components/inputs/handle-input"
import { ProductCreateSchemaType } from "../../../../types"

import { Select, Container, Heading, Button } from "@medusajs/ui";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { sdk } from "../../../../../../../lib/client"

type Brand = {
  id: string;
  name: string;
};

type BrandsResponse = {
  brands: Brand[];
};

type ProductCreateGeneralSectionProps = {
  form: UseFormReturn<ProductCreateSchemaType>
}

export const ProductCreateGeneralSection = ({
  form,
}: ProductCreateGeneralSectionProps) => {
  const { t } = useTranslation()

  const { data, isLoading } = useQuery<BrandsResponse>({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await sdk.client.fetch<BrandsResponse>("/admin/brands");
      return response;
    },
  });

  return (
    <div id="general" className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Form.Field
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <Form.Item>
                  <Form.Label>{t("products.fields.title.label")}</Form.Label>
                  <Form.Control>
                    <Input {...field} placeholder="Winter jacket" />
                  </Form.Control>
                </Form.Item>
              )
            }}
          />
          <Form.Field
            control={form.control}
            name="subtitle"
            render={({ field }) => {
              return (
                <Form.Item>
                  <Form.Label optional>
                    {t("products.fields.subtitle.label")}
                  </Form.Label>
                  <Form.Control>
                    <Input {...field} placeholder="Warm and cosy" />
                  </Form.Control>
                </Form.Item>
              )
            }}
          />
          <Form.Field
            control={form.control}
            name="handle"
            render={({ field }) => {
              return (
                <Form.Item>
                  <Form.Label
                    tooltip={t("products.fields.handle.tooltip")}
                    optional
                  >
                    {t("fields.handle")}
                  </Form.Label>
                  <Form.Control>
                    <HandleInput {...field} placeholder="winter-jacket" />
                  </Form.Control>
                </Form.Item>
              )
            }}
          />
          <Form.Field
            control={form.control}
            name="brand"
            render={({ field: { onChange, value, ...field } }) => {
              return (
                <Form.Item>
                  <Form.Label
                    tooltip={null}
                    optional
                    >
                      Brand Name
                    </Form.Label>
                    <Form.Control>
                      <Select {...field} value={value?.name || ""}  onValueChange={(selectedValue) => {
                        onChange({
                          name: selectedValue,
                          id: data?.brands.find((brand: Brand) => brand.name === selectedValue)?.id || ""
                        });
                        // setSelectedBrand(selectedValue);
                      }}>
                        <Select.Trigger>
                          <Select.Value placeholder="Select the Brand" >
                            {value?.name || "Select the Brand"}
                          </Select.Value>
                        </Select.Trigger>
                        <Select.Content>
                          {data?.brands.map((brand: Brand) => (
                            <Select.Item key={brand.id} value={brand.name}>
                              {brand.name}
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select>
                    </Form.Control>
                </Form.Item>
              )
            }}
          />
        </div>
      </div>
      <Form.Field
        control={form.control}
        name="description"
        render={({ field }) => {
          return (
            <Form.Item>
              <Form.Label optional>
                {t("products.fields.description.label")}
              </Form.Label>
              <Form.Control>
                <Textarea {...field} placeholder="A warm and cozy jacket" />
              </Form.Control>
            </Form.Item>
          )
        }}
      />
    </div>
  )
}
