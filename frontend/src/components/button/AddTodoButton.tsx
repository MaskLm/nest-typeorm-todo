import { Link } from "react-router-dom";

export const AddTodoButton = () => {
  return (
    <div>
      <Link to={"/todo/add"}>
        <button>Add Todo</button>
      </Link>
    </div>
  );
};