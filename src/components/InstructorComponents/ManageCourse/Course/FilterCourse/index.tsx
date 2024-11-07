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
    <div className="w-48">
      <select
        value={selectedStatus}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm
         text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {Object.values(CourseStatusEnum).map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CourseStatusSelect;
