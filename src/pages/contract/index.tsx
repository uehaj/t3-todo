import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { ScrollArea, Table, Pagination, Group } from "@mantine/core";
import {
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  DateField,
} from "@refinedev/mantine";

export const ContractList: React.FC<IResourceComponentsProps> = () => {
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "Id",
      },
      {
        id: "userRepresentativeName",
        accessorKey: "userRepresentativeName",
        header: "User Representative Name",
      },
      {
        id: "userRepresentativeEmail",
        accessorKey: "userRepresentativeEmail",
        header: "User Representative Email",
      },
      {
        id: "openAIAccountEmail",
        accessorKey: "openAIAccountEmail",
        header: "Open AIAccount Email",
      },
      {
        id: "openAIAccountBillingURL",
        accessorKey: "openAIAccountBillingURL",
        header: "Open AIAccount Billing URL",
      },
      {
        id: "openAIAccountPassword",
        accessorKey: "openAIAccountPassword",
        header: "Open AIAccount Password",
      },
      {
        id: "openAIApiKey",
        accessorKey: "openAIApiKey",
        header: "Open AIApi Key",
      },
      {
        id: "monthlyBillingLimit",
        accessorKey: "monthlyBillingLimit",
        header: "Monthly Billing Limit",
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created At",
        cell: function render({ getValue }) {
          return <DateField value={getValue<string>()} />;
        },
      },
      {
        id: "updatedAt",
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: function render({ getValue }) {
          return <DateField value={getValue<string>()} />;
        },
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: function render({ getValue }) {
          return (
            <Group spacing="xs" noWrap>
              <ShowButton hideText recordItemId={getValue() as string} />
              <EditButton hideText recordItemId={getValue() as string} />
              <DeleteButton hideText recordItemId={getValue() as string} />
            </Group>
          );
        },
      },
    ],
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQueryResult: { data: tableData },
    },
  } = useTable({
    columns,
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  return (
    <List>
      <ScrollArea>
        <Table highlightOnHover>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </ScrollArea>
      <br />
      <Pagination
        position="right"
        total={pageCount}
        page={current}
        onChange={setCurrent}
      />
    </List>
  );
};

export default ContractList;
