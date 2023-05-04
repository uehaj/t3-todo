import { Todo } from "@prisma/client";
import Card from "~/components/Card";

type Props = {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onDoneTodo: (id: string, status: boolean) => void;
};

export default function TodoItem({ todo, onDeleteTodo, onDoneTodo }: Props) {
  return (
    <Card key={todo.id}>
      <input
        type="checkbox"
        className="checkbox-secondary checkbox mr-2"
        checked={todo.done}
        onChange={() => onDoneTodo(todo.id, !todo.done)}
      />
      <span className={todo.done ? "line-through" : ""}>{todo.text}</span>
      <button
        className="btn-sm btn ml-auto bg-warning"
        onClick={() => onDeleteTodo(todo.id)}
      >
        ×
      </button>
    </Card>
  );
}
