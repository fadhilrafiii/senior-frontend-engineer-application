import { useEffect, useState } from 'react';

import Button from '@components/common/button/button.component';
import IconButton from '@components/common/button/icon-button.component';
import TextField from '@components/common/input/text-field.component';
import EditFilledIcon from '@components/icons/edit-filled.icon';
import PlusFilledIcon from '@components/icons/plus-filled.icon';
import TrashOutlinedIcon from '@components/icons/trash-outlined.icon';
import { IAnamnesisFormSection } from '@libs/types/anamnesis.type';
import { Color } from '@libs/types/color.type';

interface IProps {
  section: IAnamnesisFormSection;
  onChangeSectionName: (id: string, value: string) => void;
}

const AnamnesisFormSection = ({ section, onChangeSectionName }: IProps) => {
  const [canEditSectionName, setCanEditSectionName] = useState(true);
  const [sectionName, setSectionName] = useState('');

  const handleEnterSectionName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setCanEditSectionName(false);
    }
  };

  useEffect(() => {
    onChangeSectionName(section.id, sectionName);
  }, [onChangeSectionName, section.id, sectionName]);

  return (
    <div className="flex flex-col gap-2">
      <header className="flex items-center justify-between">
        {canEditSectionName ? (
          <TextField
            placeholder="Enter section name"
            value={sectionName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSectionName(e.target.value)}
            onKeyDown={handleEnterSectionName}
          />
        ) : (
          <div className="flex gap-2 items-center">
            <h4 className="font-medium">{section.name}</h4>
            <EditFilledIcon
              role="button"
              color={Color.Primary}
              size={16}
              onClick={() => setCanEditSectionName(true)}
            />
          </div>
        )}
        <IconButton Icon={TrashOutlinedIcon} size={20} theme={IconButton.Theme.Danger} />
      </header>
      <div className="p-4 rounded-md bg-slate-100 drop-shadow-md">
        <Button type="button" theme={Button.Theme.Link}>
          <PlusFilledIcon size={16} color={Color.Primary} className="stroke-white" />
          <p>Add Question</p>
        </Button>
      </div>
    </div>
  );
};

export default AnamnesisFormSection;
