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
