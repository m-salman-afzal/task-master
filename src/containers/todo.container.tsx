import React, {useCallback, useMemo, useState} from "react";

import {ButtonUi} from "@ui/button.ui";

import {TaskAddComponent} from "@components/taskAdd.component";
import {TaskListComponent} from "@components/taskList.component";

type TTodo = {
  key: number;
  text: string;
  completed: boolean;
};

export const TodoContainer = () => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAdd = useMemo(
    () => (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!inputValue.trim()) return;

      const newTodo: TTodo = {
        key: todos.length + 1,
        text: inputValue,
        completed: false
      };

      setTodos([newTodo, ...todos]);
      setInputValue("");
    },
    [todos, inputValue]
  );

  const handleCompleted = useCallback(
    (key: number) => {
      const newTodos = todos.map((todo) => {
        if (todo.key === key) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      });

      setTodos(newTodos);
    },
    [todos]
  );

  const handleDelete = useCallback(
    (key: number) => {
      const newTodos = todos.filter((todo) => todo.key !== key);
      setTodos(newTodos);
    },
    [todos]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((event.target as any).value);
  };

  return (
    <main className="flex-1 py-8 px-8">
      <div className="max-w-md mx-auto grid gap-6">
        <TaskAddComponent handleAdd={handleAdd} inputValue={inputValue} handleInputChange={handleInputChange} />
        <div className="bg-[#2a2a4e] rounded-lg shadow-md p-6 grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Tasks</h2>
            <ButtonUi variant="outline" size="sm">
              Clear Completed
            </ButtonUi>
          </div>
          <TaskListComponent todos={todos} handleCompleted={handleCompleted} handleDelete={handleDelete} />
        </div>
      </div>
    </main>
  );
};
