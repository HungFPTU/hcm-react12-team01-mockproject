import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface AddCategoryButtonProps {
  onAdd: () => void;
}

const AddCategoryButton: React.FC<AddCategoryButtonProps> = ({ onAdd }) => {
  return (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={onAdd}
      style={{ backgroundColor: "green" }}
    >
      New Category
    </Button>
  );
};

export default AddCategoryButton;
