import TodoListItem from "./TodoItem";
import type { RouterOutputs } from "~/utils/api";
type Props = {
  todoList: RouterOutputs["todo"]["add"][];
  deleteTodo: (id: string) => void;
  doneTodo: (id: string, status: boolean) => void;
};

export default function TodoList({ todoList, deleteTodo, doneTodo }: Props) {
  return (
    <ul id="taskList" className="list-inside list-disc">
      {todoList.map((todo) => (
        <TodoListItem todo={todo} deleteTodo={deleteTodo} doneTodo={doneTodo} />
      ))}
    </ul>
  );
}
