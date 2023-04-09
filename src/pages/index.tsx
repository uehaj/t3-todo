import { type NextPage } from "next";
import Head from "next/head";
import { FormEvent } from "react";
import { api } from "~/utils/api";

const TodoApp: NextPage = () => {
  const utils = api.useContext();
  const todos = api.todo.getAll.useQuery();
  const { mutateAsync: todoUpdateAsync } = api.todo.add.useMutation({
    onSuccess: () => {
      utils.todo.invalidate();
    },
  });
  const { mutateAsync: todoDeleteAsync } = api.todo.delete.useMutation({
    onSuccess: () => {
      utils.todo.invalidate();
    },
  });
  const { mutateAsync: todoDoneAsync } = api.todo.done.useMutation({
    onSuccess: () => {
      utils.todo.invalidate();
    },
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    await todoUpdateAsync(formJson as any);
    form.reset();
  }

  async function handleDelete(id: string) {
    todoDeleteAsync({ id });
  }

  async function handleDone(id: string, done: boolean) {
    todoDoneAsync({ id, done });
  }

  return (
    <>
      <Head>
        <title>TodoApp</title>
        <meta name="description" content="TodoApp by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Todoアプリ</h1>
        <div className="flex-row">
          <form onSubmit={handleSubmit}>
            <input
              className="border p-2 rounded w-[70%] mb-4 mr-4"
              type="text"
              name="text"
              placeholder="新しいタスクを入力"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 w-[20%]">
              タスクを追加
            </button>
          </form>
        </div>
        <ul id="taskList" className="list-disc list-inside">
          <ul>
            {todos.data?.map((todo) => (
              <li
                className="bg-white p-2 rounded mb-2 flex items-center"
                key={todo.id}
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={todo.done}
                  onChange={handleDone.bind(null, todo.id, !todo.done)}
                />
                <span className={todo.done ? "line-through" : ""}>
                  {todo.text}
                </span>
                <button
                  className="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={handleDelete.bind(null, todo.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </ul>
      </div>
    </>
  );
};

export default TodoApp;
