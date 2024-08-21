import { HTMLAttributes, ReactNode } from 'react';

enum ButtonTheme {
  Primary = 'Primary',
  Secondary = 'Secondary',
}

interface Props extends HTMLAttributes<HTMLButtonElement> {
  theme?: ButtonTheme;
  children: ReactNode | ReactNode[];
}

const Button = ({ theme = ButtonTheme.Primary, children, className = '', ...props }: Props) => {
  const getThemeClass = () => {
    if (theme === ButtonTheme.Primary)
      return 'bg-primary text-white border-primary hover:bg-slate-600';
    if (theme === ButtonTheme.Secondary)
      return 'bg-white text-primary border-primary hover:bg-slate-100';
  };

  return (
    <button
      {...props}
      className={`${getThemeClass()} flex items-center justify-center gap-2 text-sm py-2 px-3 rounded-md border font-medium min-w-[100px] h-10 ${className}`}
    >
      {children}
    </button>
  );
};

Button.Theme = ButtonTheme;

export default Button;
