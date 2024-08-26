import { useRef, useState } from 'react';

import ChevronDownOutlinedIcon from '@components/icons/chevron-down-outlined.component';
import ChevronUpOutlinedIcon from '@components/icons/chevron-up-outlined.icon';

import TextField from './text-field.component';

interface IOption<T> {
  label: string;
  value: T;
}

interface IProps<T> {
  value?: T;
  options: IOption<T>[];
  onChange: (val: T) => void;
}

const SelectDropdown = <T,>({ value, options = [], onChange }: IProps<T>) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const actionClickSelect = () => {
    containerRef.current?.focus();
  };

  const handleSelect = (value: T) => {
    onChange(value);
    containerRef.current?.blur();
  };

  return (
    <div
      ref={containerRef}
      className="relative"
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
        <ul className="absolute top-full z-10 bg-primary py-2 w-full mt-1 rounded-md">
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
