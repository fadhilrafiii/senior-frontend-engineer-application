import { HTMLAttributes, useRef, useState } from 'react';

import ChevronDownOutlinedIcon from '@components/icons/chevron-down-outlined.component';
import ChevronUpOutlinedIcon from '@components/icons/chevron-up-outlined.icon';

import TextField from './text-field.component';

interface IOption<T> {
  label: string;
  value: T;
}

interface IProps<T> extends HTMLAttributes<HTMLDivElement> {
  value?: T;
  options: IOption<T>[];
  onChange: (val: T) => void;
  position?: 'top' | 'bottom';
}

const SelectDropdown = <T,>({
  value,
  position = 'bottom',
  options = [],
  className = '',
  onChange,
}: IProps<T>) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const actionClickSelect = () => {
    containerRef.current?.focus();
  };

  const handleSelect = (value: T) => {
    onChange(value);
    setIsDropdownOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      tabIndex={-1}
      onClick={() => actionClickSelect()}
      onFocus={() => setIsDropdownOpen(true)}
      onBlur={() => setIsDropdownOpen(false)}
    >
      <TextField
        value={value as string}
        className="cursor-pointer"
        readOnly
        EndIcon={isDropdownOpen ? ChevronUpOutlinedIcon : ChevronDownOutlinedIcon}
      />
      {isDropdownOpen && (
        <ul
          className={`absolute ${position === 'top' ? 'bottom-full mb-1' : 'mt-1 top-full'}  z-50 bg-primary py-2 w-full rounded-md`}
        >
          {options.map((opt: IOption<T>) => (
            <li
              key={opt.label}
              role="button"
              className="text-white text-sm py-2 px-4 hover:bg-slate-700 transition-all"
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;
