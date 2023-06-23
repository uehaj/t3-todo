import { useShow } from "@refinedev/core";

import type { Todo } from "~/server/api/routers/todo";

export default function TodoShow() {
  // `posts` resource and the `id` will be inferred from the route.
  // Because we've defined `/posts/show/:id` as the `show` action of the `posts` resource.
  const {
    queryResult: { data, isLoading },
  } = useShow<Todo>();

  const todoData = data?.data;

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <>
          <h1>{todoData?.text}</h1>
          <p>{JSON.stringify(todoData?.createdAt)}</p>
        </>
      )}
    </div>
  );
}
