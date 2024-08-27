import { useState } from 'react';

import RTDDatepicker, { DateValueType } from 'react-tailwindcss-datepicker';

const DatePicker = () => {
  const [value, setValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  return (
    <RTDDatepicker
      asSingle
      value={value}
      inputClassName="bg-white rounded-md w-full !border-primary outline-none"
      onChange={(newValue: DateValueType) => setValue(newValue)}
    />
  );
};

export default DatePicker;
