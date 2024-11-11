// ActionsRenderer.tsx
import React from "react";
import { Button } from "antd";

interface ActionsRendererProps {
  requestKey: string;
  onApprove: () => void;
  onReject: () => void;
}

const ActionsRenderer: React.FC<ActionsRendererProps> = ({
  onApprove,
  onReject,
}) => {
  return (
    <>
      <Button
        type="primary"
        onClick={onApprove}
        style={{ marginRight: 8 }}
      >
        Approve
      </Button>
      <Button type="primary" danger onClick={onReject}>
        Reject
      </Button>
    </>
  );
};

export default ActionsRenderer;
