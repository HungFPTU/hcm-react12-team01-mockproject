// AvatarRenderer.tsx
import React from "react";
import { Avatar } from "antd";

interface AvatarRendererProps {
  avatar: string;
}

const AvatarRenderer: React.FC<AvatarRendererProps> = ({ avatar }) => {
  return avatar ? <Avatar src={avatar} /> : <Avatar>N</Avatar>;
};

export default AvatarRenderer;
