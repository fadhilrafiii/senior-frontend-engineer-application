import { ChangeEvent } from 'react';

import { IOption } from '@libs/types/common.type';

interface IProps {
  id: string;
  name: string;
  options: IOption[];
  onChange?: (val: string) => void;
}

const RadioGroup = ({ id, name, options, onChange }: IProps) => {
  return (
    <fieldset id={id} className="flex flex-col gap-1">
      {options.map((option: IOption) => {
        return (
          <div key={option.value} className="flex items-center gap-2">
            <input
              key={option.value}
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
            />
            <label htmlFor={option.value} className="text-sm">
              {option.render ?? option.label}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
};

export default RadioGroup;
