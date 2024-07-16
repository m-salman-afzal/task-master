import {TrashIcon} from "lucide-react";
import {memo} from "react";

import {ButtonUi} from "@ui/button.ui";
import {CheckboxUi} from "@ui/checkbox.ui";

interface IProps {
  todos: {key: number; text: string; completed: boolean}[];
  handleCompleted: (key: number) => void;
  handleDelete: (key: number) => void;
}

const TaskList = (props: IProps) => {
  return (
    <div className="grid gap-3">
      {props.todos.map((todo) => {
        return (
          <div className="flex items-center justify-between bg-[#3a3a5e] rounded-md px-4 py-3" key={todo.key}>
            <div className="flex items-center gap-3">
              <CheckboxUi checked={todo.completed} onClick={() => props.handleCompleted(todo.key)} />
              <p className={`${todo.completed ? "line-through text-[#9a9a9e]" : "text-[#9a9aff]"}`}>{todo.text}</p>
            </div>
            <div className="flex items-center gap-2">
              {/* {!todo.completed && (
                        <Button variant="ghost" size="icon">
                          <FilePenIcon className="w-5 h-5 text-[#9a9aff]" />
                        </Button>
                      )} */}

              <ButtonUi variant="ghost" size="icon" onClick={() => props.handleDelete(todo.key)}>
                <TrashIcon className="w-5 h-5 text-[#9a9aff]" />
              </ButtonUi>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const TaskListComponent = memo(TaskList);
