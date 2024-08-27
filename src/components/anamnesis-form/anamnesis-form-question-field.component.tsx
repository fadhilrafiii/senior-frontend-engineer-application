import { ChangeEvent, HTMLAttributes, useMemo } from 'react';

import DatePicker from '@components/common/input/date-picker.component';
import TextArea from '@components/common/input/text-area.component';
import TextField from '@components/common/input/text-field.component';
import RadioGroup from '@components/common/radio-group/radio-group.component';
import PlusFilledIcon from '@components/icons/plus-filled.icon';
import { AnamnesisQuestionType } from '@libs/types/anamnesis.type';
import { Color } from '@libs/types/color.type';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  type: string;
  disableEdit?: boolean;
  choices?: string[];
  onAddChoice?: () => void;
  onChangeChoice?: (choiceIdx: number, value: string) => void;
}

const AnamnesisFormQuestionField = ({
  id,
  type,
  disableEdit = false,
  choices = [],
  onAddChoice,
  onChangeChoice,
}: IProps) => {
  const multipleChoices = useMemo(() => {
    return choices?.map((choice: string, idx: number) => ({
      label: choice,
      value: choice,
      render: disableEdit ? null : (
        <TextField
          defaultValue={choice}
          onBlur={(e: ChangeEvent<HTMLInputElement>) => onChangeChoice?.(idx, e.target.value)}
        />
      ),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choices, id]);

  switch (type) {
    case AnamnesisQuestionType.ShortText:
      return <TextField placeholder="This is the Answer Field" />;
    case AnamnesisQuestionType.LongText:
      return <TextArea placeholder="This is the Answer Field" />;
    case AnamnesisQuestionType.DateTime:
      return <DatePicker />;
    case AnamnesisQuestionType.MultipleChoice:
      return (
        <div className="flex flex-col gap-2 pt-2">
          <RadioGroup id={id} name={id} options={multipleChoices} />
          {!disableEdit && (
            <span
              role="button"
              className="flex items-center gap-1 text-sm hover:underline"
              onClick={onAddChoice}
            >
              <PlusFilledIcon size={14} color={Color.Primary} />
              Add Choices
            </span>
          )}
        </div>
      );
    default:
      return <TextField />;
  }
};

export default AnamnesisFormQuestionField;
