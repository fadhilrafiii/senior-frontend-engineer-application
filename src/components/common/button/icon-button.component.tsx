import { ButtonHTMLAttributes } from 'react';

import { Color } from '@libs/types/color.type';

import { IconProps } from '../../icons/common';

enum ButtonTheme {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Danger = 'Danger',
}

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: React.FC<IconProps>;
  size?: number;
  theme?: ButtonTheme;
  iconClassName?: string;
}

const IconButton = ({
  Icon,
  size = 20,
  theme = ButtonTheme.Primary,
  className,
  iconClassName = '',
  type = 'button',
  ...props
}: IProps) => {
  const getThemeClass = () => {
    if (theme === ButtonTheme.Primary) return 'bg-primary text-white hover:bg-slate-600';
    if (theme === ButtonTheme.Secondary) return 'bg-white text-primary hover:drop-shadow-md';
    if (theme === ButtonTheme.Danger)
      return 'bg-white text-red-700 fill-red-700 hover:drop-shadow-md';
  };

  return (
    <button
      {...props}
      type={type}
      className={`${getThemeClass()} cursor-pointer rounded-full transition-all p-2 ${className}`}
    >
      <Icon
        size={size}
        color={theme === ButtonTheme.Primary ? '#fff' : Color.Primary}
        className={`${iconClassName} ${theme === ButtonTheme.Danger ? 'fill-red-700' : ''}`}
      />
    </button>
  );
};

IconButton.Theme = ButtonTheme;

export default IconButton;
