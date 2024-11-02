// ActionsRenderer.tsx
import React from "react";
import { Button } from "antd";

interface ActionsRendererProps {
  requestKey: string;
  onApprove: (key: string) => void;
  onReject: (key: string) => void;
}

const ActionsRenderer: React.FC<ActionsRendererProps> = ({
  requestKey,
  onApprove,
  onReject,
}) => {
  return (
    <>
      <Button
        type="primary"
        onClick={() => onApprove(requestKey)}
        style={{ marginRight: 8 }}
      >
        Approve
      </Button>
      <Button type="primary" danger onClick={() => onReject(requestKey)}>
        Reject
      </Button>
    </>
  );
};

export default ActionsRenderer;
