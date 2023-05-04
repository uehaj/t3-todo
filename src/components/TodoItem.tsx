import { MouseEventHandler } from "react";
import Card from "~/components/Card";
import { RouterOutputs } from "~/utils/api";

type Props = {
  todo: RouterOutputs["todo"]["add"];
  deleteTodo: (id: string) => void;
  doneTodo: (id: string, status: boolean) => void;
};

export default function TodoItem({ todo, deleteTodo, doneTodo }: Props) {
  return (
      <Card
        className="flex"
        key={todo.id}
        actionArea={
          <button
            className="ml-auto rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700"
            onClick={() => deleteTodo(todo.id)}
          >
            ×
          </button>
        }
      >
        <input
          type="checkbox"
          className="mr-2"
          checked={todo.done}
          onChange={() => doneTodo(todo.id, !todo.done)}
        />
        <span className={todo.done ? "line-through" : ""}>{todo.text}</span>
      </Card>
    </li>
  );
}
