import React from "react";
import { Card } from "antd";

interface StatisticCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  borderColor: string;
  iconColor: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  icon,
  title,
  value,
  borderColor,
  iconColor,
}) => {
  return (
    <Card
      title={title}
      bordered={false}
      style={{
        textAlign: "center",
        border: `3px solid ${borderColor}`,
      }}
    >
      <div style={{ fontSize: "40px", color: iconColor }}>{icon}</div>
      <h3>{value}</h3>
    </Card>
  );
};

export default StatisticCard;
