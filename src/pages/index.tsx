import { type NextPage } from "next";
import Head from "next/head";
import TodoInput from "~/components/TodoInput";
import TodoList from "~/components/TodoList";
import { api } from "~/utils/api";

const TodoApp: NextPage = () => {
  const utils = api.useContext();
  const todos = api.todo.getAll.useQuery();
  const { mutateAsync: todoAddAsync } = api.todo.add.useMutation({
    onSuccess: () => {
      void utils.todo.invalidate();
    },
  });
  const { mutateAsync: todoDeleteAsync } = api.todo.delete.useMutation({
    onSuccess: () => {
      void utils.todo.invalidate();
    },
  });
  const { mutateAsync: todoDoneAsync } = api.todo.done.useMutation({
    onSuccess: () => {
      void utils.todo.invalidate();
    },
  });

  function handleAdd({ text }: { text: string }) {
    void todoAddAsync({ text });
  }

  function handleDelete(id: string) {
    void todoDeleteAsync({ id });
  }

  function handleDone(id: string, done: boolean) {
    void todoDoneAsync({ id, done });
  }

  return (
    <>
      <Head>
        <title>TodoApp</title>
        <meta name="description" content="TodoApp by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-4xl font-bold">Todoアプリ</h1>
        <TodoInput addTodo={handleAdd} />
        <TodoList
          todoList={[...(todos.data ?? [])]?.reverse()}
          deleteTodo={handleDelete}
          doneTodo={handleDone}
        />
      </div>
    </>
  );
};

export default TodoApp;
