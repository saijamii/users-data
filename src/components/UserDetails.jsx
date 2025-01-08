import React from "react";
import { Card, List, Tabs, Tag, Typography } from "antd";
import { BarLoader } from "react-spinners";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { TabPane } = Tabs;

const UserDetails = ({
  selectedUser,
  userTodos,
  userPosts,
  userAlbums,
  detailsLoading,
}) => {
  return detailsLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <BarLoader color="#1890ff" loading={detailsLoading} />
    </div>
  ) : (
    <div style={{ padding: "24px" }}>
      <Title level={3}>{selectedUser?.name} Details</Title>
      <Tabs defaultActiveKey="1">
        <TabPane tab={`Todos (${userTodos?.length})`} key="1">
          <Card>
            <List
              dataSource={userTodos}
              renderItem={(todo) => (
                <List.Item>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {todo.completed ? (
                      <Tag icon={<CheckCircleOutlined />} color="success">
                        Completed
                      </Tag>
                    ) : (
                      <Tag icon={<CloseCircleOutlined />} color="gold">
                        Pending
                      </Tag>
                    )}
                    <span>{todo.title}</span>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </TabPane>

        <TabPane tab={`Posts (${userPosts?.length})`} key="2">
          <Card>
            <List
              dataSource={userPosts}
              renderItem={(post) => (
                <List.Item>
                  <List.Item.Meta title={post.title} description={post.body} />
                </List.Item>
              )}
            />
          </Card>
        </TabPane>

        <TabPane tab={`Albums (${userAlbums?.length})`} key="3">
          <Card>
            <List
              dataSource={userAlbums}
              renderItem={(album) => (
                <List.Item>
                  <span>{album.title}</span>
                </List.Item>
              )}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserDetails;
