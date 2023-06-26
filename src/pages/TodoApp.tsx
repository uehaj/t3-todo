import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const FormSchema = z
  .object({
    text: z.string().min(1, { message: "送信メッセージを入力して下さい" }),
  })
  .transform((x) => {
    return {
      ...x,
      textLen: x.text.length,
    };
  });
type FormSchemaType = z.infer<typeof FormSchema>;

const TodoApp: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });
  const utils = api.useContext();
  const todos = api.todo.getList.useQuery();

  const { mutateAsync: todoAddAsync } = api.todo.create.useMutation({
    onSettled: () => {
      void utils.todo.invalidate();
    },
  });
  const { mutateAsync: todoDeleteAsync } = api.todo.deleteOne.useMutation({
    onSettled: () => {
      void utils.todo.invalidate();
    },
  });
  const { mutateAsync: todoDoneAsync } = api.todo.update.useMutation({
    onSettled: () => {
      void utils.todo.invalidate();
    },
  });
  function handleAddTodo(formData: FormSchemaType) {
    void todoAddAsync({ text: formData.text, done: false });
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
          <form className="flex" onSubmit={void handleSubmit(handleAddTodo)}>
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
          {errors.text?.message && (
            <p className="mt-2 text-xs text-red-600" id="email-error">
              {typeof errors.text?.message === "string"
                ? errors.text?.message
                : ""}
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
