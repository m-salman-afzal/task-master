import {TrashIcon} from "lucide-react";
import {memo} from "react";

import {ButtonUi} from "@ui/button.ui";
import {CheckboxUi} from "@ui/checkbox.ui";

import {TPagination} from "@containers/todo.container";

interface IProps {
  todos: {key: number; text: string; completed: boolean}[];
  pagination: TPagination;
  handleCompleted: (key: number) => void;
  handleDelete: (key: number) => void;
  handleClearCompleted: () => void;
}

export const TaskListComponent = memo((props: IProps) => {
  const displayedItems = () => {
    const start = (props.pagination.currentPage - 1) * props.pagination.perPage;
    const end = start + props.pagination.perPage;

    return props.todos.slice(start, end);
  };

  return (
    <div className="bg-[#2a2a4e] rounded-lg shadow-md p-6 grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <ButtonUi variant="destructive" size="sm" onClick={props.handleClearCompleted}>
          Clear Completed
        </ButtonUi>
      </div>
      <div className="grid gap-3">
        {displayedItems().map((todo) => {
          return (
            <div className="flex items-center justify-between bg-[#3a3a5e] rounded-md px-4 py-3" key={todo.key}>
              <div className="flex items-center gap-3">
                <CheckboxUi checked={todo.completed} onClick={() => props.handleCompleted(todo.key)} />
                <p className={`${todo.completed ? "line-through text-[#9a9a9e]" : "text-[#9a9aff]"}`}>{todo.text}</p>
              </div>
              <div className="flex items-center gap-2">
                <ButtonUi variant="ghost" size="icon" onClick={() => props.handleDelete(todo.key)}>
                  <TrashIcon className="w-5 h-5 text-[#9a9aff]" />
                </ButtonUi>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
