import { HTMLAttributes } from 'react';

import { Color } from '@libs/types/color.type';

import { IconProps } from '../../icons/common';

enum ButtonTheme {
  Primary = 'Primary',
  Secondary = 'Secondary',
}

interface Props extends HTMLAttributes<HTMLButtonElement> {
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
  ...props
}: Props) => {
  const getThemeClass = () => {
    if (theme === ButtonTheme.Primary) return 'bg-primary text-white hover:bg-slate-600';
    if (theme === ButtonTheme.Secondary) return 'bg-white text-primary hover:drop-shadow-md';
  };

  return (
    <button
      {...props}
      className={`${getThemeClass()} rounded-full transition-all p-2 ${className}`}
    >
      <Icon
        size={size}
        color={theme === ButtonTheme.Primary ? '#fff' : Color.Primary}
        className={iconClassName}
      />
    </button>
  );
};

IconButton.Theme = ButtonTheme;

export default IconButton;
