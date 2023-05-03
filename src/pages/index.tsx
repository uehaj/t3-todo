import { type NextPage } from "next";
import Head from "next/head";
import type { FormEvent } from "react";
import TodoList from "~/components/TodoList";
import { api } from "~/utils/api";

const TodoApp: NextPage = () => {
  const utils = api.useContext();
  const todos = api.todo.getAll.useQuery();
  const { mutateAsync: todoUpdateAsync } = api.todo.add.useMutation({
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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    form.reset();
    void todoUpdateAsync(formJson as { text: string });
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
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-start border-4 bg-slate-50">
        <h1 className="mb-4 text-4xl font-bold">Todoアプリ</h1>
        <div>
          <form className="w-10rem flex" onSubmit={handleSubmit}>
            <input
              className="mb-4 mr-4 flex-grow rounded border p-2"
              type="text"
              name="text"
              placeholder="新しいタスクを入力"
            />
            <button className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
              タスクを追加
            </button>
          </form>
        </div>
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
