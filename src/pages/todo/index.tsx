import { useTable } from "@refinedev/core";
import { MantineInferencer } from "@refinedev/inferencer/mantine";
import Link from "next/link";

import type { Todo } from "~/server/api/routers/todo";

export default function TodoList() {
  // `posts` resource will be inferred from the route.
  // Because we've defined `/posts` as the `list` action of the `posts` resource.
  const {
    tableQueryResult: { data, isLoading },
  } = useTable<Todo>();

  console.log(typeof data);
  console.log(JSON.stringify(data));
  const tableData = data?.data;

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <>
          <MantineInferencer />
        </>
      )}
    </div>
  );
}
