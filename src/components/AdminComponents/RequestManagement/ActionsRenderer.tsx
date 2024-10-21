// ActionsRenderer.tsx
import React from "react";
import { Button } from "antd";

interface ActionsRendererProps {
  key: string;
  onApprove: (key: string) => void;
  onReject: (key: string) => void;
}

const ActionsRenderer: React.FC<ActionsRendererProps> = ({
  key,
  onApprove,
  onReject,
}) => {
  return (
    <>
      <Button
        type="primary"
        onClick={() => onApprove(key)}
        style={{ marginRight: 8 }}
      >
        Approve
      </Button>
      <Button type="primary" danger onClick={() => onReject(key)}>
        Reject
      </Button>
    </>
  );
};

export default ActionsRenderer;
