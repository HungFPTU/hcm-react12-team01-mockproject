import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import React from "react";

interface SubscriptionItemProps {
  name: string;
  phone: string;
  email: string;
  avatarUrl: string;
  onUnsubscribe: () => void;
}

const SubscribedItem: React.FC<SubscriptionItemProps> = ({
  name,
  phone,
  email,
  avatarUrl,
  onUnsubscribe,
}) => {
  return (
    <Card
      className="shadow-md hover:shadow-lg transition-transform"
      bordered={false}
      style={{ width: 300, textAlign: "center" }}
    >
      <img
        src={avatarUrl}
        alt="Instructor Avatar"
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: 16,
        }}
      />
      <h3 className="text-lg font-bold">{name}</h3>
      <p>
        <PhoneOutlined /> {phone}
      </p>
      <p>
        <MailOutlined /> {email}
      </p>
      <Button type="primary" danger onClick={onUnsubscribe}>
        Unsubscribe
      </Button>
    </Card>
  );
};

export default SubscribedItem;
