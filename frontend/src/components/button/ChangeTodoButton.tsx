import { Link } from "react-router-dom";

export const ChangeTodoButton = (todoId: number) => {
  return (
    <div>
      <Link to={`/todo/${todoId}`}>
        <button>Add Todo</button>
      </Link>
    </div>
  );
};