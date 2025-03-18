import { defineRouteConfig } from "@medusajs/admin-sdk";
import { TagSolid } from "@medusajs/icons";
import { useQuery } from "@tanstack/react-query";
import { sdk } from "../../lib/sdk";
import { useMemo, useState } from "react";
import {
  Container,
  Heading,
  createDataTableColumnHelper,
  DataTable,
  DataTablePaginationState,
  useDataTable,
  Button,
  useToggleState,
  FocusModal,
  Label,
  Input
} from "@medusajs/ui";

type Brand = {
  id: string;
  name: string;
};
type BrandsResponse = {
  brands: Brand[];
  count: number;
  limit: number;
  offset: number;
};

const columnHelper = createDataTableColumnHelper<Brand>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
];

const BrandsPage = () => {
  const [createOpen, showCreate, closeClear] = useToggleState()
  const limit = 15;
  const [pagination, setPagination] = useState<DataTablePaginationState>({
    pageSize: limit,
    pageIndex: 0,
  });
  const offset = useMemo(() => {
    return pagination.pageIndex * limit;
  }, [pagination]);

  const { data, isLoading } = useQuery<BrandsResponse>({
    queryFn: () =>
      sdk.client.fetch(`/admin/brands`, {
        query: {
          limit,
          offset,
        },
      }),
    queryKey: [["brands", limit, offset]],
  });

  const table = useDataTable({
    columns,
    data: data?.brands || [],
    getRowId: (row) => row.id,
    rowCount: data?.count || 0,
    isLoading,
    pagination: {
      state: pagination,
      onPaginationChange: setPagination,
    },
  });

  const handleCreateBrand = () => {
    closeClear();
  }

  return (
    <>
      <Container className="divide-y p-0">
        <DataTable instance={table}>
          <DataTable.Toolbar className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
            <Heading>Brands</Heading>
            <Button variant="secondary" onClick={() => showCreate()}>create</Button>
          </DataTable.Toolbar>
          <DataTable.Table />
          <DataTable.Pagination />
        </DataTable>
      </Container>
      <FocusModal open={createOpen} onOpenChange={(modalOpened) => {
        if(!modalOpened){
          closeClear()
        }
      }}>
      <FocusModal.Content>
          <FocusModal.Header>
            <Button onClick={() => handleCreateBrand}>create</Button>
          </FocusModal.Header>
          <FocusModal.Body>
            <div className="p-10 flex flex-col gap-[20px]">
              <Heading>Create Brand</Heading>
              <div className="w-[250px]">
                <Input placeholder="Brand Name" id="sales-channel-name" />
              </div>
            </div>
          </FocusModal.Body>
        </FocusModal.Content>
      </FocusModal>
    </>
  );
};

export const config = defineRouteConfig({
  label: "Brands",
  icon: TagSolid,
});

export default BrandsPage;
