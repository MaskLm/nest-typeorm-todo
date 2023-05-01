import React from "react";
import { Link } from "react-router-dom";

export const AdminPanelButton: React.FC = () => {
  return (
    <div>
      <Link to={"/admin"}>
        <button>Admin Panel</button>
      </Link>
    </div>
  );
};
