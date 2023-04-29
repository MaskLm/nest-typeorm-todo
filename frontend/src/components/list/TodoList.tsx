import React, { useState, useEffect } from 'react';
import Paginate from 'react-paginate';
import { DoUserTodo } from "../../api/DoUserTodo";
import { useNavigate } from "react-router-dom";

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
  const [todos, setTodos] = useState<Todo[]| null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
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
          navigate('/login');
        }, 1000);
      });
  }, [currentPage]);


  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected+1);
  };

  if (todos === null) {
    return <p>Loading...</p>;
  }

  if (todos.length === 0) {
    return <p>Not found todo</p>;
  }

  return (
    <div>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id}>
            <div>Title: {todo.title}</div>
            <div>Description: {todo.description}</div>
            <div>Done: {todo.done ? 'Yes' : 'No'}</div>
            <div>Created At: {todo.createdAt}</div>
            <div>Updated At: {todo.updatedAt}</div>
            <div>Deadline: {todo.deadline}</div>
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
    </div>
  );
};

export default TodoList;
