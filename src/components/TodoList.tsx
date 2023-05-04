import { Todo } from "@prisma/client";
import TodoListItem from "./TodoItem";

type Props = {
  todoList: Todo[];
  onDeleteTodo: (id: string) => void;
  onDoneTodo: (id: string, status: boolean) => void;
};

export default function TodoList({
  todoList,
  onDeleteTodo,
  onDoneTodo,
}: Props) {
  return (
    <div className="flex flex-col">
      {todoList.map((todo) => (
        <TodoListItem
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          onDoneTodo={onDoneTodo}
        />
      ))}
    </div>
  );
}
