import { InputHTMLAttributes } from 'react';

import { Color } from '@libs/types/color.type';

import { IconProps } from '../../icons/common';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  EndIcon?: React.FC<IconProps>;
  StartIcon?: React.FC<IconProps>;
}

const TextField = ({
  label,
  helperText,
  error,
  className = '',
  StartIcon,
  EndIcon,
  ...props
}: IProps) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-sm">{label}</label>}
      <div className="relative h-10">
        <input
          {...props}
          className={`peer border border-slate-500 text-sm w-full h-full outline-none rounded-md px-3 py-2 disabled:bg-slate-100 disabled:border-slate-200 disabled:text-slate-300 ${EndIcon ? 'pr-8' : ''} ${StartIcon ? 'pl-8' : ''}`}
        />
        {StartIcon && (
          <StartIcon
            size={16}
            color={Color.Primary}
            className="fill-slate-500 peer-disabled:fill-slate-300 absolute top-1/2 -translate-y-1/2 left-3"
          />
        )}
        {EndIcon && (
          <EndIcon
            size={16}
            color={Color.Primary}
            className="fill-slate-500 peer-disabled:fill-slate-300 absolute top-1/2 -translate-y-1/2 right-3"
          />
        )}
      </div>
      {error && <span className="text-red-700 text-sm">{error}</span>}
      {helperText && <span className="text-slate-600 text-sm">{helperText}</span>}
    </div>
  );
};

export default TextField;
