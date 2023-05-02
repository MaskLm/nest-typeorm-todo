import React, { useState, useEffect } from "react";
import Paginate from "react-paginate";
import { DoUserTodo } from "../../api/DoUserTodo";
import { useNavigate } from "react-router-dom";
import TodoForm from "../form/TodoForm";
import { DoDeleteTodo } from "../../api/DoDeleteTodo";

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

const TodoList: React.FC = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const itemsPerPage = 3;

  useEffect(() => {
    DoUserTodo(currentPage, itemsPerPage)
      .then((ResTodos) => {
        if (ResTodos) {
          setTodos(ResTodos.data.todos);
          setTotalPages(ResTodos.data.totalPages);
        }
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        alert(error);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      });
  }, [currentPage]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  if (todos === null) {
    return <p>Loading...</p>;
  }

  if (todos.length === 0) {
    return <p>Not found todo</p>;
  }

  function handleEditClick(todo: Todo) {
    const fixedTodo: Todo = {
      ...todo,
      deadline: todo.deadline.slice(0, -1),
    };
    setEditingTodo(fixedTodo);
  }

  async function handleDeleteClick(todo: Todo) {
    const confirmed = confirm("Are you sure you want to delete this todo?");
    if (confirmed) {
      try {
        await DoDeleteTodo(todo.id);
        alert("Delete Todo Success");
        window.location.reload();
      } catch (error) {
        alert(error);
      }
    }
  }

  return (
    <div>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id}>
            <div>Title: {todo.title}</div>
            <div>Description: {todo.description}</div>
            <div>Done: {todo.done ? "Yes" : "No"}</div>
            <div>Created At: {todo.createdAt}</div>
            <div>Updated At: {todo.updatedAt}</div>
            <div>Deadline: {todo.deadline}</div>
            <div>
              <button onClick={() => handleDeleteClick(todo)}>Delete</button>
              <button onClick={() => handleEditClick(todo)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
      <Paginate
        pageCount={totalPages}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
        previousLabel="上一页"
        nextLabel="下一页"
      />
      <div>
        {editingTodo ? <TodoForm initialValues={editingTodo} /> : <></>}
      </div>
    </div>
  );
};

export default TodoList;
