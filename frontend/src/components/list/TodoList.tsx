import { DoUserTodo } from "../../api/DoUserTodo";
import { useNavigate } from "react-router-dom";
import { DoDeleteTodo } from "../../api/DoDeleteTodo";
import { DoDeleteMultipleTodo } from "../../api/DoDeleteMultipleTodo";
import Pagination from "../../tools/containers/Pagination";
import TodoItem from "../item/TodoItem";
import { useEffect, useState } from "react";
import SelectAll from "../action/SelectAll";
import TodoForm from "../form/TodoForm";
import { Todo } from "../../tools/interfaces/Todo";
import { DoSearchTodo } from "../../api/DoSearchTodo";

const TodoList: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [todoSearch, setTodoSearch] = useState<Todo | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [searching, setSearching] = useState<boolean>(false);
  const itemsPerPage = 3;

  useEffect(() => {
    if(!searching)
    {
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
    }else{
      DoSearchTodo(currentPage,itemsPerPage,todoSearch)
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
  }
  }, [currentPage]);

  const handlePageClick = (selected: number) => {
    setCurrentPage(selected + 1);
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

  async function handleDeleteSelected() {
    if (
      selectedIds.length > 0 &&
      confirm("Are you sure you want to delete the selected items?")
    ) {
      try {
        await DoDeleteMultipleTodo(selectedIds);
        alert("Selected items deleted successfully.");
        // 更新列表
      } catch (error) {
        alert(error);
      }
    }
  }

  return (
    <div>
      <ul>
        {todos.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            selected={selectedIds.includes(todo.id)}
            onToggleSelect={(id, selected) => {
              if (selected) {
                setSelectedIds([...selectedIds, id]);
              } else {
                setSelectedIds(selectedIds.filter((id) => id !== todo.id));
              }
            }}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
          />
        ))}
      </ul>
      <Pagination pageCount={totalPages} onPageChange={handlePageClick} />
      <SelectAll
        allSelected={selectedIds.length === todos.length}
        onToggleSelectAll={(selected) => {
          if (selected) {
            setSelectedIds(todos.map((todo) => todo.id));
          } else {
            setSelectedIds([]);
          }
        }}
        onDeleteSelected={handleDeleteSelected}
      />
      <div>
        {editingTodo ? <TodoForm initialValues={editingTodo} /> : <></>}
      </div>
    </div>
  );
};

export default TodoList;
