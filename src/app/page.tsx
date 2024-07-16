"use client";

import {TrashIcon} from "@/assets/trash.icon";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {useState} from "react";

type TTodo = {
  key: number;
  text: string;
  completed: boolean;
};

const todo = () => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo: TTodo = {
      key: todos.length + 1,
      text: inputValue,
      completed: false
    };

    setTodos([newTodo, ...todos]);
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
  };

  return (
    <div className="dark bg-[#1a1a2e] text-foreground min-h-screen flex flex-col">
      <header className="bg-[#2a2a4e] py-6 px-8 shadow-sm">
        <h1 className="text-3xl font-bold">Task Master</h1>
      </header>
      <main className="flex-1 py-8 px-8">
        <div className="max-w-md mx-auto grid gap-6">
          <div className="bg-[#2a2a4e] rounded-lg shadow-md p-6">
            <form className="grid gap-4" onSubmit={addTodo}>
              <Input
                type="text"
                placeholder="Add a new task..."
                className="bg-[#3a3a5e] text-foreground rounded-md px-4 py-2 focus:ring-2 focus:ring-[#6b5b95] focus:outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button type="submit">Add Task</Button>
            </form>
          </div>
          <div className="bg-[#2a2a4e] rounded-lg shadow-md p-6 grid gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Tasks</h2>
              <Button variant="outline" size="sm">
                Clear Completed
              </Button>
            </div>
            <div className="grid gap-3">
              {todos.map((todo) => {
                return (
                  <div className="flex items-center justify-between bg-[#3a3a5e] rounded-md px-4 py-3" key={todo.key}>
                    <div className="flex items-center gap-3">
                      <Checkbox checked={todo.completed} onClick={() => handleCompleted(todo.key)} />
                      <p className={`${todo.completed ? "line-through text-[#9a9a9e]" : "text-[#9a9aff]"}`}>
                        {todo.text}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* {!todo.completed && (
                        <Button variant="ghost" size="icon">
                          <FilePenIcon className="w-5 h-5 text-[#9a9aff]" />
                        </Button>
                      )} */}

                      <Button variant="ghost" size="icon" onClick={() => handleDelete(todo.key)}>
                        <TrashIcon className="w-5 h-5 text-[#9a9aff]" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default todo;
