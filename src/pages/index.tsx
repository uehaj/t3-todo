import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";

const TodoApp: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const utils = api.useContext();
  const todos = api.todo.getAll.useQuery();
  const { mutateAsync: todoAddAsync } = api.todo.add.useMutation({
    onSettled: () => {
      void utils.todo.invalidate();
    },
  });
  const { mutateAsync: todoDeleteAsync } = api.todo.delete.useMutation({
    onSettled: () => {
      void utils.todo.invalidate();
    },
  });
  const { mutateAsync: todoDoneAsync } = api.todo.done.useMutation({
    onSettled: () => {
      void utils.todo.invalidate();
    },
  });
  function handleAddTodo(formData: { text: string | undefined }) {
    void todoAddAsync(formData as { text: string });
    reset();
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
        <div>
          <form className="flex" onSubmit={handleSubmit(handleAddTodo)}>
            <input
              {...register("text", { required: true })}
              className="mb-4 mr-4 flex-grow rounded border p-2"
              type="text"
              name="text"
              placeholder="新しいタスクを入力"
            />
            <button className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
              タスクを追加
            </button>
          </form>
          {errors.text && (
            <p className="mt-2 text-xs text-red-600" id="email-error">
              入力が必須の項目です
            </p>
          )}
        </div>
        <ul id="taskList" className="list-inside list-disc">
          <ul>
            {todos.data?.map((todo) => (
              <li
                className="mb-2 flex items-center rounded bg-white p-2"
                key={todo.id}
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={todo.done}
                  onChange={() => handleDoneTodo(todo.id, !todo.done)}
                />
                <span className={todo.done ? "line-through" : ""}>
                  {todo.text}
                </span>
                <button
                  className="ml-auto rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700"
                  onClick={() => handleDeleteTodo(todo.id)}
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
