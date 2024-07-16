import React, {memo} from "react";

import {ButtonUi} from "@ui/button.ui";
import {InputUi} from "@ui/input.ui";

interface IProps {
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAdd: (event: React.FormEvent<HTMLFormElement>) => void;
}

const TaskAdd = (props: IProps) => {
  return (
    <div className="bg-[#2a2a4e] rounded-lg shadow-md p-6">
      <form className="grid gap-4" onSubmit={props.handleAdd}>
        <InputUi
          type="text"
          placeholder="Add a new task..."
          className="bg-[#3a3a5e] text-foreground rounded-md px-4 py-2 focus:ring-2 focus:ring-[#6b5b95] focus:outline-none"
          value={props.inputValue}
          onChange={props.handleInputChange}
        />
        <ButtonUi type="submit">Add Task</ButtonUi>
      </form>
    </div>
  );
};

export const TaskAddComponent = memo(TaskAdd);
