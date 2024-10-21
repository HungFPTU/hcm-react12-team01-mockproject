import React from "react";
import { Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface ActionButtonsProps {
  recordKey: string;
  onEdit: (key: string) => void;
  onDelete: (key: string) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  recordKey,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <Button
        icon={<EditOutlined />}
        type="primary"
        onClick={() => onEdit(recordKey)}
        style={{ marginRight: 8 }}
      />
      <Button
        icon={<DeleteOutlined />}
        type="primary"
        danger
        onClick={() => onDelete(recordKey)}
      />
    </>
  );
};

export default ActionButtons;
