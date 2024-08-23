import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getAll, toggleBlock } from "../../services/userService";
import classes from "./usersPage.module.css";
import Title from "../../components/Title/Title";
import Search from "../../components/Search/Search";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchTerm } = useParams();
  const auth = useAuth();

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const users = await getAll(searchTerm);
      setUsers(users);
    } catch (err) {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBlock = async (userId) => {
    try {
      const isBlocked = await toggleBlock(userId);
      setUsers((oldUsers) =>
        oldUsers.map((user) =>
          user.id === userId ? { ...user, isBlocked } : user
        )
      );
    } catch (err) {
      setError("Failed to toggle block status.");
    }
  };

  // Function to render a table for a given user ID
  const renderTableForUser = (userId) => {
    const userTableData = users.filter((user) => user.id === userId);

    if (userTableData.length === 0) return null;

    return (
      <table className={classes.table} key={userId}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userTableData.map((user) => (
            <tr key={user.id}>
              <td data-label="Name">{user.name}</td>
              <td data-label="Email">{user.email}</td>
              <td data-label="Address">{user.address}</td>
              <td data-label="Admin">{user.isAdmin ? "✅" : "❌"}</td>
              <td data-label="Actions" className={classes.actions}>
                <Link to={`/admin/editUser/${user.id}`}>Edit</Link>
                {auth.user.id !== user.id && (
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggleBlock(user.id);
                    }}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Group users by ID
  const userGroups = Array.from(new Set(users.map((user) => user.id)));

  return (
    <div className={classes.container}>
      <Title title="Manage Users" />
      <Search
        searchRoute="/admin/users/"
        defaultRoute="/admin/users"
        placeholder="Search Users"
        margin="1rem 0"
        imgSrc={require("../../components/Search/image.png")}
      />

      {loading && <p>Loading...</p>}
      {error && <p className={classes.error}>{error}</p>}

      {!loading && !error && (
        <>{userGroups.map((userId) => renderTableForUser(userId))}</>
      )}
    </div>
  );
}
