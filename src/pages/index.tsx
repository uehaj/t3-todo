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

  function handleAddTodo(formData: FormData) {
    const formJson = Object.fromEntries(formData.entries());
    void todoAddAsync(formJson as { text: string });
  }

  function handleDeleteTodo(id: string) {
    void todoDeleteAsync({ id });
  }

  function handleDoneTodo(id: string, done: boolean) {
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
        <TodoInput onSubmitTodo={handleAddTodo} />
        <TodoList
          todoList={[...(todos.data ?? [])]?.reverse()}
          onDeleteTodo={handleDeleteTodo}
          onDoneTodo={handleDoneTodo}
        />
      </div>
    </>
  );
};

export default TodoApp;
