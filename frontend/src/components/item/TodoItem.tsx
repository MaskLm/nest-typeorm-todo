import React from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
  deadline: string;
  user: number;
}

interface TodoItemProps {
  todo: Todo;
  selected: boolean;
  onToggleSelect: (id: number, selected: boolean) => void;
  onDeleteClick: (todo: Todo) => void;
  onEditClick: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, selected, onToggleSelect, onDeleteClick, onEditClick }) => {
  return (
    <li>
      <div>
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => {
            onToggleSelect(todo.id, e.target.checked);
          }}
        />
        Title: {todo.title}
      </div>
      <div>Description: {todo.description}</div>
      <div>Done: {todo.done ? "Yes" : "No"}</div>
      <div>Created At: {todo.createdAt}</div>
      <div>Updated At: {todo.updatedAt}</div>
      <div>Deadline: {todo.deadline}</div>
      <div>
        <button onClick={() => onDeleteClick(todo)}>Delete</button>
        <button onClick={() => onEditClick(todo)}>Edit</button>
      </div>
    </li>
  );
};

export default TodoItem;
