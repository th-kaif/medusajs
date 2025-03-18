


const BRANDS_QUERY_KEY = "brands" as const
export const brandsQueryKeys = queryKeysFactory(BRANDS_QUERY_KEY)

export const useBrands = (query?: HttpTypes.AdminBrandListParams) => {
  return useQuery({
    queryKey: brandsQueryKeys.list(query),
    queryFn: () => sdk.admin.brand.list(query),
  })
}





