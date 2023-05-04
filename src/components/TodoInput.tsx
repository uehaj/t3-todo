<<<<<<< HEAD
import type { FormEvent } from "react";

type Props = {
  addTodo: ({ text }: { text: string }) => void;
};

export default function TodoInput({ addTodo }: Props) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    form.reset();
    addTodo(formJson as { text: string });
  }

  return (
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
  );
}
||||||| c502b64
=======
import { MouseEventHandler } from "react";
import Card from "~/components/Card";
import { RouterOutputs } from "~/utils/api";

type Props = {
  addTodo: (id: string) => void;
};

export default function TodoInput({ addTodo }: Props) {
  return (
    <div>
      <form className="w-10rem flex" onSubmit={addTodo}>
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
  );
}
>>>>>>> main
