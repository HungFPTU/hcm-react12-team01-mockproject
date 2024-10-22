import React, { useState } from 'react';
import { CourseStatusEnum } from './../../../../../model/Course'; // Đường dẫn tới enum của bạn

const CourseStatusSelect = ({ onChange }: { onChange: (status: CourseStatusEnum) => void }) => {
  const [selectedStatus, setSelectedStatus] = useState<CourseStatusEnum>(CourseStatusEnum.New);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value as CourseStatusEnum;
    setSelectedStatus(status);
    onChange(status);
  };

  return (
    <select value={selectedStatus} onChange={handleChange}>
      {Object.values(CourseStatusEnum).map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};

export default CourseStatusSelect;
