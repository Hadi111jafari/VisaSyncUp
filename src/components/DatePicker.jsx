import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomLabel from './CustomLabel';

const CustomDatePicker = ({ value, name, label, required, onDateChange }) => {
  const [error, setError] = useState(null);

  const errorMessage = useMemo(() => {
    switch (error) {
      case 'invalidDate': {
        return 'Your date is not valid';
      }

      default: {
        return '';
      }
    }
  }, [error]);

  const handleDateChange = (date) => {
    if (date === null || date === undefined) {
      onDateChange(name, null);
      setError(null);
      return;
    }
  
    if (dayjs(date).isValid()) {
      onDateChange(name, date);
      setError(null);
    } else {
      setError('invalidDate');
    }
  };
  
  return (
    <div className="grid sm:grid-cols-10 grid-cols-12 sm:mb-2 mb-2">
      <div className="sm:col-start-1 sm:col-span-7 col-start-1 col-span-8 sm:mt-1">
        <DatePicker
          label={label}
          views={['year', 'month', 'day']}
          format="YYYY-MM-DD"
          openTo="year"
          onError={(newError) => setError(newError)}
          value={value ? value : null}
          onChange={handleDateChange}
          name={name}
          slotProps={{
            textField: {
              size: 'small',
              helperText: errorMessage,
            },
          }}
          sx={{
            width: '100%',
            '& .MuiInputLabel-root.Mui-focused': { color: 'purple' },
            '& .MuiOutlinedInput-root': {
              '&:hover > fieldset': { borderColor: 'purple' },
              height: '38px',
              borderBottomLeftRadius: '200px',
              borderBottomRightRadius: '200px',
              borderTopLeftRadius: '200px',
              borderTopRightRadius: '200px',
              backgroundColor: '#fff',
            },
          }}
        />
      </div>
      <CustomLabel label={label} required={required} className="ml-4" />
    </div>
  );
};

export default CustomDatePicker;
