import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { useQuery } from "@tanstack/react-query";
import { Select, Container, Heading, Button } from "@medusajs/ui";
import { useState } from "react";
import { sdk } from "../lib/sdk";
// import { logger } from "@medusajs/framework";
import { AdminProduct, DetailWidgetProps } from "@medusajs/types";

type Brand = {
  id: string;
  name: string;
};

type BrandsResponse = {
  brands: Brand[];
};

const ProductBrandSelector = ({data: product} : DetailWidgetProps<AdminProduct>) => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const { data, isLoading } = useQuery<BrandsResponse>({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await sdk.client.fetch<BrandsResponse>("/admin/brands");
      return response;
    },
  });

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
  };

  const handleUpdateBrand = () => {
    console.log(`${product.title} is updated with brand ${selectedBrand}`)
  }

  return (
    <Container className="p-4">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Brand</Heading>
      </div>
      <div className="px-6 py-4">
        <Select onValueChange={handleBrandChange}>
          <Select.Trigger>
            <Select.Value placeholder="Select a current" />
          </Select.Trigger>
          <Select.Content>
            {data?.brands.map((brand: Brand) => (
              <Select.Item key={brand.id} value={brand.name}>
                {brand.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      <div className="pt-5">
        <Button onClick={handleUpdateBrand}>Update</Button>
      </div>
      </div>
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.before",
});

export default ProductBrandSelector;
