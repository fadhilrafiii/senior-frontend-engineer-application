import { ReactNode } from 'react';

import CloseOutlineIcon from '@components/icons/close-outlined.icon';
import { Color } from '@libs/types/color.type';

interface IProps {
  title: string;
  maxWidth?: number;
  open: boolean;
  children: ReactNode | ReactNode[];
  footer: ReactNode | ReactNode[];
  onClose: () => void;
}

const ConfirmationModal = ({ open, title, maxWidth = 540, children, footer, onClose }: IProps) => {
  return (
    <div
      className={`${open ? 'fixed' : 'hidden'} inset-0 bg-slate-700 bg-opacity-30 flex items-center justify-center`}
    >
      <div className="flex flex-col w-1/2 bg-white rounded-md" style={{ maxWidth }}>
        <header className="p-4 border-b flex items-center justify-between">
          <h3 className="text-base font-medium">{title}</h3>
          <CloseOutlineIcon color={Color.Primary} role="button" onClick={onClose} />
        </header>
        <div>{children}</div>
        <footer className="p-4 flex gap-2 items-center justify-center border-t">{footer}</footer>
      </div>
    </div>
  );
};

export default ConfirmationModal;
