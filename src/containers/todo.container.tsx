import React, {useState} from "react";

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

    const start = (pagination.currentPage - 1) * pagination.perPage;
    const end = start + pagination.perPage;

    const displayedItems = todos.slice(start, end);

    setPagination({
      ...pagination,
      itemCount: todos.length - 1,
      currentPage: displayedItems.length === 1 ? pagination.currentPage - 1 : pagination.currentPage
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((event.target as any).value);
  };

  return (
    <>
      <TaskAddComponent handleAdd={handleAdd} inputValue={inputValue} handleInputChange={handleInputChange} />

      <TaskListComponent
        todos={todos}
        handleCompleted={handleCompleted}
        handleDelete={handleDelete}
        pagination={pagination}
      />

      {todos.length > 0 && <PaginationComponent pagination={pagination} setPagination={setPagination} />}
    </>
  );
};
