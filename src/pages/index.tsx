import { type NextPage } from "next";
import Head from "next/head";
import TodoInput from "~/components/TodoInput";
import TodoList from "~/components/TodoList";
import { api } from "~/utils/api";

const TodoApp: NextPage = () => {
  const utils = api.useContext();
  const todos = api.todo.getAll.useQuery();
  const { mutateAsync: todoAddAsync } = api.todo.add.useMutation({
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
      void utils.todo.invalidate();
    },
  });
  const { mutateAsync: todoAddWithAIAnswer } =
    api.todo.addWithAIAnswer.useMutation({
      onSettled: () => {
        void utils.todo.invalidate();
      },
    });

  const { mutateAsync: todoDeleteAsync } = api.todo.delete.useMutation({
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
      void utils.todo.invalidate();
    },
  });
  const { mutateAsync: todoDoneAsync } = api.todo.done.useMutation({
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
      void utils.todo.invalidate();
    },
  });

  function handleAddTodo(formData: FormData) {
    const formJson = Object.fromEntries(formData.entries());
    if (formJson.text?.startsWith("?")) {
      void todoAddWithAIAnswer({ ...formJson, apiKey: "aa" } as {
        text: string;
        apiKey: string;
      });
    } else {
      void todoAddAsync(formJson as { text: string });
    }
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
          todoList={todos.data ?? []}
          onDeleteTodo={handleDeleteTodo}
          onDoneTodo={handleDoneTodo}
        />
      </div>
    </>
  );
};

export default TodoApp;
