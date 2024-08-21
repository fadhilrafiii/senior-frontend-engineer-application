import CloseOutlineIcon from '@components/icons/close-outlined.icon';
import { Color } from '@libs/types/color.type';

import Button from '../button/button.component';

import QuestionMarkWebp from '@assets/question-mark.webp';

interface Props {
  title: string;
  danger?: boolean;
  description: string;
  maxWidth?: number;
  open: boolean;
  confirmText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmationModal = ({
  open,
  title,
  danger = false,
  description,
  maxWidth = 360,
  confirmText = 'Confirm',
  onClose,
  onConfirm,
}: Props) => {
  return (
    <div
      className={`${open ? 'fixed' : 'hidden'} inset-0 bg-slate-700 bg-opacity-30 flex items-center justify-center`}
    >
      <div className="flex flex-col w-1/2 bg-white rounded-md" style={{ maxWidth }}>
        <header className="p-4 border-b flex items-center justify-between">
          <h3 className="text-base font-medium">{title}</h3>
          <CloseOutlineIcon color={Color.Primary} role="button" onClick={onClose} />
        </header>
        <div className="p-4 flex flex-col items-center justify-center gap-2">
          <img src={QuestionMarkWebp} alt="Confirm" width={120} height={120} />
          <p className="text-sm text-center">{description}</p>
        </div>
        <footer className="p-4 flex gap-2 items-center justify-center border-t">
          <Button onClick={onClose} theme={Button.Theme.Secondary}>
            Cancel
          </Button>
          <Button onClick={onConfirm} theme={danger ? Button.Theme.Danger : Button.Theme.Primary}>
            {confirmText}
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default ConfirmationModal;
