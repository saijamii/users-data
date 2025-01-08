import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Layout, Alert, Row, Col } from "antd";
import { BarLoader } from "react-spinners";
import { store } from "./store";
import { fetchUsers } from "./store/slices/usersSlice";
import UserCard from "./components/UserCard";
import UserDetails from "./components/UserDetails";
import { fetchUserDetails } from "./store/slices/userDetailsSlice";

const { Content } = Layout;

function AppContent() {
  const dispatch = useDispatch();
  const {
    users,
    loading: usersLoading,
    error,
  } = useSelector((state) => state.users);

  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedUserId]);

  const {
    selectedUser,
    userTodos,
    userPosts,
    userAlbums,
    loading: detailsLoading,
  } = useSelector((state) => state.userDetails);

  const handleUserClick = (userId) => {
    dispatch(fetchUserDetails(userId));
    setSelectedUserId(userId);
  };

  if (usersLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <BarLoader color="#1890ff" loading={usersLoading} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "24px" }}>
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <Layout>
      <Content
        style={{
          padding: "24px",
          minHeight: "10vh",
          background: "#f0f2f5",
          overflow: "auto",
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "24px" }}>Users</h1>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onClick={() => handleUserClick(user.id)}
                />
              ))}
            </div>
          </Col>

          <Col xs={24} md={16}>
            {selectedUserId ? (
              <UserDetails
                selectedUser={selectedUser}
                userTodos={userTodos}
                userPosts={userPosts}
                userAlbums={userAlbums}
                detailsLoading={detailsLoading}
              />
            ) : (
              <Alert
                message="Click User to Fetch User Details"
                type="info"
                showIcon
                style={{ height: "2rem", width: "auto" }}
              />
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
