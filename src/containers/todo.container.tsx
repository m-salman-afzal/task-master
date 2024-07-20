import React, {useState} from "react";

import {ButtonUi} from "@ui/button.ui";

import {PaginationComponent} from "@components/pagination.component";
import {TaskAddComponent} from "@components/taskAdd.component";
import {TaskListComponent} from "@components/taskList.component";

type TTodo = {
  key: number;
  text: string;
  completed: boolean;
};

export type TPagination = {
  currentPage: number;
  perPage: number;
  itemCount: number;
};

export const TodoContainer = () => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [pagination, setPagination] = useState<TPagination>({
    currentPage: 1,
    perPage: 2,
    itemCount: 0
  });

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo: TTodo = {
      key: todos.length + 1,
      text: inputValue,
      completed: false
    };

    setTodos([newTodo, ...todos]);
    setPagination({
      ...pagination,
      itemCount: todos.length + 1
    });
    setInputValue("");
  };

  const displayedItems = () => {
    const start = (pagination.currentPage - 1) * pagination.perPage;
    const end = start + pagination.perPage;

    return todos.slice(start, end);
  };

  const handleCompleted = (key: number) => {
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
  };

  const handleDelete = (key: number) => {
    const newTodos = todos.filter((todo) => todo.key !== key);
    setTodos(newTodos);
  };

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
            <ButtonUi variant="destructive" size="sm">
              Clear Completed
            </ButtonUi>
          </div>
          <TaskListComponent todos={displayedItems()} handleCompleted={handleCompleted} handleDelete={handleDelete} />
        </div>
        <PaginationComponent pagination={pagination} setPagination={setPagination} />
      </div>
    </main>
  );
};
