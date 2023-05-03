import React, { useState, useEffect } from "react";
import Paginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { DoUser } from "../../api/DoUser";
import { DoDeleteUser } from "../../api/DoDeleteUser";
import UserForm from "../form/UserForm";

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  admin: boolean;
}

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const itemsPerPage = 3;

  useEffect(() => {
    DoUser(currentPage, itemsPerPage)
      .then((ResUsers) => {
        if (ResUsers) {
          setUsers(ResUsers.data.users);
          setTotalPages(ResUsers.data.totalPages);
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

  if (users === null) {
    return <p>Loading...</p>;
  }

  if (!users || users.length === 0) {
    return <p>Not found User</p>;
  }

  function handleEditClick(user: User) {
    setEditingUser(user);
  }

  async function handleDeleteClick(user: User) {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      try {
        await DoDeleteUser(user.id);
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
        {users.map((user: User) => (
          <li key={user.id}>
            <div>Username: {user.username}</div>
            <div>Email: {user.email}</div>
            <div>Admin: {user.admin ? "Yes" : "No"}</div>
            <div>
              <button onClick={() => handleDeleteClick(user)}>Delete</button>
              <button onClick={() => handleEditClick(user)}>Edit</button>
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
        {editingUser ? <UserForm initialValues={editingUser} /> : <></>}
      </div>
    </div>
  );
};

export default UserList;
