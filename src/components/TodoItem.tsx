import { MouseEventHandler } from "react";
import Card from "~/components/Card";
import { RouterOutputs } from "~/utils/api";

type Props = {
  todoItem: RouterOutputs["todo"]["add"];
  deleteTodo: (id: string) => void;
  doneTodo: (id: string, status: boolean) => void;
};

export default function Task({ todoItem, deleteTodo, doneTodo }: Props) {
  return (
    <li className="mb-2 flex items-center rounded  p-2" key={todoItem.id}>
      <Card
        actionArea={
          <button
            className="ml-auto rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700"
            onClick={() => deleteTodo(todoItem.id)}
          >
            ×
          </button>
        }
      >
        <input
          type="checkbox"
          className="mr-2"
          checked={todoItem.done}
          onChange={() => doneTodo(todoItem.id, !todoItem.done)}
        />
        <span className={todoItem.done ? "line-through" : ""}>
          {todoItem.text}
        </span>
      </Card>
    </li>
  );
}
