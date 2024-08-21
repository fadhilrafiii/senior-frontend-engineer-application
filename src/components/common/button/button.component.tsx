import { ButtonHTMLAttributes, ReactNode } from 'react';

enum ButtonTheme {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Danger = 'Danger',
  Link = 'Link',
}

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ButtonTheme;
  children: ReactNode | ReactNode[];
}

const Button = ({
  theme = ButtonTheme.Primary,
  children,
  className = '',
  type = 'button',
  ...props
}: IProps) => {
  const getThemeClass = () => {
    if (theme === ButtonTheme.Primary)
      return 'bg-primary text-white border-primary hover:bg-slate-600';
    if (theme === ButtonTheme.Secondary)
      return 'bg-white text-primary border-primary hover:bg-slate-100';
    if (theme === ButtonTheme.Danger)
      return 'bg-red-700 text-white border-red-700 hover:bg-red-600';
    if (theme === ButtonTheme.Link) return 'bg-transparent text-primary border-0 hover:underline';
  };

  return (
    <button
      {...props}
      type={type}
      className={`flex items-center justify-center gap-2 text-sm py-2 px-3 rounded-md bor border font-medium min-w-[100px] h-10 $ ${getThemeClass()} ${className}`}
    >
      {children}
    </button>
  );
};

Button.Theme = ButtonTheme;

export default Button;
