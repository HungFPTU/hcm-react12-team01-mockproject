import React, { useState } from "react";
import PayoutTabs from "../../../components/AdminComponents/PayoutManagement/PayoutTabs";

// Sample payout data for each tab
const initialPayouts = [
  {
    key: "1",
    payoutNo: "PAYOUT_-DCVB7202410004",
    instructorName: "Lưu Ka Ka",
    transaction: "View",
    balanceOrigin: "180,000",
    balancePaid: "54,000",
    balanceReceived: "126,000",
  },
  {
    key: "2",
    payoutNo: "PAYOUT_P1I0KQ20241002",
    instructorName: "Lưu Ka Ka",
    transaction: "View",
    balanceOrigin: "180,000",
    balancePaid: "54,000",
    balanceReceived: "126,000",
  },
  {
    key: "3",
    payoutNo: "PAYOUT_V4KPV220240801",
    instructorName: "Phan Hồng Yến Thảo",
    transaction: "View",
    balanceOrigin: "1,250,000",
    balancePaid: "375,000",
    balanceReceived: "875,000",
  },
];

const PayoutManagement: React.FC = () => {
  const [payouts] = useState(initialPayouts);
  const [filteredPayouts, setFilteredPayouts] = useState(payouts);

  // Handle search functionality
  const handleSearch = (value: string) => {
    const filtered = payouts.filter((payout) =>
      payout.payoutNo.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPayouts(filtered);
  };

  return (
    <div style={{ padding: "20px" }}>
      <PayoutTabs
        filteredPayouts={filteredPayouts}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default PayoutManagement;
