import type { FormEvent } from "react";

type Props = {
  onSubmitTodo: (formData: FormData) => void;
};

export default function TodoInput({ onSubmitTodo }: Props) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    form.reset();
    onSubmitTodo(formData);
  }

  return (
    <div>
      <form className="w-10rem flex" onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="新しいタスクを入力"
          className="mb-xl input mr-2 w-full bg-white"
        />
        <button className="btn">タスクを追加</button>
      </form>
    </div>
  );
}
