import React from "react";
import { Card, Button, Tooltip } from "antd";
import {
  LikeOutlined,
  LikeFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const UserCard = ({ user, onLike, onEdit, onDelete }) => {
  const avatarUrl = `https://avatars.dicebear.com/v2/avataaars/${encodeURIComponent(
    user.username
  )}.svg?options[mood][]=happy`;

  return (
    <Card
      hoverable
      cover={
        <img
          alt={`${user.username} avatar`}
          src={avatarUrl}
          style={{ height: 200, objectFit: "contain", background: "#f0f0f0" }}
        />
      }
      actions={[
        <Tooltip key="like" title={user.liked ? "Unlike" : "Like"}>
          <Button
            type="text"
            icon={user.liked ? <LikeFilled style={{ color: "#1890ff" }} /> : <LikeOutlined />}
            onClick={onLike}
          />
        </Tooltip>,
        <Tooltip key="edit" title="Edit">
          <Button type="text" icon={<EditOutlined />} onClick={onEdit} />
        </Tooltip>,
        <Tooltip key="delete" title="Delete">
          <Button type="text" danger icon={<DeleteOutlined />} onClick={onDelete} />
        </Tooltip>,
      ]}
    >
      <Card.Meta
        title={user.name}
        description={
          <>
            <p><b>Username:</b> {user.username}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Phone:</b> {user.phone}</p>
            <p>
              <b>Website:</b>{" "}
              <a href={`http://${user.website}`} target="_blank" rel="noreferrer">
                {user.website}
              </a>
            </p>
            <p><b>Company:</b> {user.company?.name}</p>
            <p>
              <b>Address:</b> {user.address?.suite}, {user.address?.street},{" "}
              {user.address?.city} - {user.address?.zipcode}
            </p>
          </>
        }
      />
    </Card>
  );
};

export default UserCard;