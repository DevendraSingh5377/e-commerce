import {
  useEffect,
  useState,
} from "react";

import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../../services/userService";

const Users = () => {
  const [users, setUsers] =
    useState([]);

  const loadUsers =
    async () => {
      try {
        const data =
          await getAllUsers();

        setUsers(
          data.users || []
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange =
    async (
      id,
      role
    ) => {
      try {
        await updateUserRole(
          id,
          role
        );

        loadUsers();
      } catch (error) {
        console.log(error);
      }
    };

  const handleDelete =
    async (id) => {
      if (
        !window.confirm(
          "Delete user?"
        )
      )
        return;

      try {
        await deleteUser(id);

        loadUsers();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div
      style={{
        maxWidth:
          "1200px",
        margin:
          "40px auto",
      }}
    >
      <h1>
        Manage Users
      </h1>

      {users.map(
        (user) => (
          <div
            key={user._id}
            style={{
              border:
                "1px solid #ddd",
              padding:
                "15px",
              marginBottom:
                "15px",
              borderRadius:
                "10px",
            }}
          >
            <h3>
              {user.name}
            </h3>

            <p>
              {user.email}
            </p>

            <p>
              Role:
              {" "}
              {user.role}
            </p>

            <select
              value={
                user.role
              }
              onChange={(
                e
              ) =>
                handleRoleChange(
                  user._id,
                  e.target
                    .value
                )
              }
            >
              <option value="user">
                User
              </option>

              <option value="admin">
                Admin
              </option>
            </select>

            <button
              onClick={() =>
                handleDelete(
                  user._id
                )
              }
              style={{
                marginLeft:
                  "15px",
                background:
                  "red",
                color:
                  "white",
                border:
                  "none",
                padding:
                  "8px 12px",
              }}
            >
              Delete
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Users;