import React from "react";
import { Card } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  BankOutlined,
} from "@ant-design/icons";

const UserCard = ({ user, onClick }) => {
  return (
    <Card hoverable onClick={onClick} style={{ width: "100%" }}>
      <h3 style={{ fontSize: "18px", marginBottom: "16px" }}>{user.name}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div>
          <MailOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
          <span>{user.email}</span>
        </div>
        <div>
          <PhoneOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
          <span>{user.phone}</span>
        </div>
        <div>
          <GlobalOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
          <span>{user.website}</span>
        </div>
        <div>
          <BankOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
          <span>{user.company.name}</span>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
