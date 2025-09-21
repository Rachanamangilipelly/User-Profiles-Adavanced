import React, { useState, useEffect } from "react";
import { Row, Col, Spin, message } from "antd";
import UserCard from "./UserCard";       
import EditUserModal from "./EditUserModal"; 

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch user data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        message.error("Error fetching users");
        setLoading(false);
      });
  }, []);

  // Toggle Like/Unlike
  const handleLikeToggle = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, liked: !user.liked } : user
      )
    );
  };

  // Delete user
  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    message.success("User deleted");
  };

  // Open edit modal
  const openEditModal = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

  // Save updated user
  const handleUpdateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    message.success("User updated successfully");
    closeEditModal();
  };

  return (
    <div style={{ padding: "20px", maxWidth: 1200, margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>
        User Profiles - Advanced
      </h1>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "80vh",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[24, 24]}>
          {users.map((user) => (
            <Col key={user.id} xs={24} sm={12} md={8} lg={6} xl={6}>
              <UserCard
                user={user}
                onLike={() => handleLikeToggle(user.id)}
                onEdit={() => openEditModal(user)}
                onDelete={() => handleDelete(user.id)}
              />
            </Col>
          ))}
        </Row>
      )}

      {isModalVisible && editingUser && (
        <EditUserModal
          visible={isModalVisible}
          user={editingUser}
          onCancel={closeEditModal}
          onSave={handleUpdateUser}
        />
      )}
    </div>
  );
}

export default App;
