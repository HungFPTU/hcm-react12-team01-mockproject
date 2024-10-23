import React, { useState } from 'react';
import { PurchaseStatusEnum } from '../../../../model/Purchase'; // Đường dẫn tới enum của bạn

const PurchaseStatusSelect = ({ onChange }: { onChange: (status: PurchaseStatusEnum) => void }) => {
  const [selectedStatus, setSelectedStatus] = useState<PurchaseStatusEnum>(PurchaseStatusEnum.New);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value as PurchaseStatusEnum;
    setSelectedStatus(status);
    onChange(status);
  };

  return (
    <div>
      <select 
        value={selectedStatus} 
        onChange={handleChange} 
        style={{ width: '15%', padding: '8px', fontSize: '16px', border: '2px solid #a1a1a1', borderRadius: '6px' }} 
        onFocus={(e) => e.currentTarget.style.borderColor = 'blue'} 
        onBlur={(e) => e.currentTarget.style.borderColor = '#a1a1a1'}
      >
        {Object.values(PurchaseStatusEnum).map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PurchaseStatusSelect;
