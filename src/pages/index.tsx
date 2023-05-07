import { type NextPage } from "next";
import Head from "next/head";
import TodoInput from "~/components/TodoInput";
import TodoList from "~/components/TodoList";
import { api } from "~/utils/api";

const TodoApp: NextPage = () => {
  const utils = api.useContext();
  const todos = api.todo.getAll.useQuery();
  const { mutateAsync: todoAddAsync } = api.todo.add.useMutation({
<<<<<<< HEAD
    async onMutate(newTodoText) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.todo.getAll.cancel();

      // Get the data from the queryCache
      const prevData = utils.todo.getAll.getData();

      // Optimistically update the data with our new post
      utils.todo.getAll.setData(undefined, (old) => {
        const newTodo = {
          id: "",
          done: false,
          text: newTodoText.text,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        if (old !== undefined) {
          return [newTodo, ...old];
        } else {
          return [newTodo];
        }
      });

      // Return the previous data so we can revert if something goes wrong
      return { prevData };
    },
    onSettled: () => {
||||||| beead8c
    onSuccess: () => {
=======
    onSettled: () => {
>>>>>>> main
      void utils.todo.invalidate();
    },
  });
  const { mutateAsync: todoDeleteAsync } = api.todo.delete.useMutation({
<<<<<<< HEAD
    async onMutate({ id }: { id: string }) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.todo.getAll.cancel();

      // Get the data from the queryCache
      const prevData = utils.todo.getAll.getData();

      // Optimistically update the data with our new post
      utils.todo.getAll.setData(undefined, (old) => {
        if (old !== undefined) {
          return prevData?.filter((elem) => elem.id !== id);
        } else {
          return old;
        }
      });
      // Return the previous data so we can revert if something goes wrong
      return { prevData };
    },
    onSettled: () => {
||||||| beead8c
    onSuccess: () => {
=======
    onSettled: () => {
>>>>>>> main
      void utils.todo.invalidate();
    },
  });
  const { mutateAsync: todoDoneAsync } = api.todo.done.useMutation({
<<<<<<< HEAD
    async onMutate({ id, done }: { id: string; done: boolean }) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.todo.getAll.cancel();

      // Get the data from the queryCache
      const prevData = utils.todo.getAll.getData();

      // Optimistically update the data with our new post
      utils.todo.getAll.setData(undefined, (old) => {
        if (old !== undefined) {
          return prevData?.map((elem) =>
            elem.id === id ? { ...elem, done } : elem
          );
        } else {
          return old;
        }
      });
      // Return the previous data so we can revert if something goes wrong
      return { prevData };
    },

    onSettled: () => {
||||||| beead8c
    onSuccess: () => {
=======
    onSettled: () => {
>>>>>>> main
      void utils.todo.invalidate();
    },
  });

<<<<<<< HEAD
  function handleAddTodo(formData: FormData) {
||||||| beead8c
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
=======
  function handleAddTodo(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
>>>>>>> main
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
<<<<<<< HEAD
        <TodoInput onSubmitTodo={handleAddTodo} />
        <TodoList
          todoList={[...(todos.data ?? [])]}
          onDeleteTodo={handleDeleteTodo}
          onDoneTodo={handleDoneTodo}
        />
||||||| beead8c
        <div>
          <form className="flex" onSubmit={handleSubmit}>
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
        <ul id="taskList" className="list-inside list-disc">
          <ul>
            {[...(todos.data ?? [])]?.reverse().map((todo) => (
              <li
                className="mb-2 flex items-center rounded bg-white p-2"
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
                  className="ml-auto rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700"
                  onClick={handleDelete.bind(null, todo.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </ul>
=======
        <div>
          <form className="flex" onSubmit={handleAddTodo}>
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
>>>>>>> main
      </div>
    </>
  );
};

export default TodoApp;
