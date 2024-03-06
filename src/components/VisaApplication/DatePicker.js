import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

const CustomDatePicker = ({ label, required }) => {
  const [value, setValue] = useState(null);
  const formattedDate = dayjs(value).format('YYYY-MM-DD');
  console.log("🚀 ~ CustomDatePicker ~ formattedDate:", formattedDate)

  return (
    <div>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          slotProps={{ textField: { size: 'small' } }}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          required={required}
        />
      </DemoContainer>
      <label className="text-gray-500 text-sm font-semibold mb-2">
        <span className="text-red-500">* </span>
        {label}
      </label>
    </div>
  );
};

export default CustomDatePicker;
