import { ChangeEvent, HTMLAttributes, KeyboardEvent, useState } from 'react';

import DatePicker from '@components/common/input/date-picker.component';
import SelectDropdown from '@components/common/input/select-dropdown.component';
import TextArea from '@components/common/input/text-area.component';
import TextField from '@components/common/input/text-field.component';
import EditFilledIcon from '@components/icons/edit-filled.icon';
import TrashOutlinedIcon from '@components/icons/trash-filled.icon';
import { AnamnesisQuestionType, IAnamnesisFormQuestion } from '@libs/types/anamnesis.type';
import { Color } from '@libs/types/color.type';
import { FormError, FormFieldError } from '@libs/types/form.type';

const QUESTION_TYPE_OPTIONS = [
  {
    label: 'Short Text',
    value: AnamnesisQuestionType.ShortText,
  },
  {
    label: 'Long Text',
    value: AnamnesisQuestionType.LongText,
  },
  {
    label: 'Date Time',
    value: AnamnesisQuestionType.DateTime,
  },
  {
    label: 'Multiple Choice',
    value: AnamnesisQuestionType.MultipleChoice,
  },
];

interface IAnamnesisFormQuestionFieldProps extends HTMLAttributes<HTMLDivElement> {
  type: string;
  // onChangeChoice: string;
}

const AnamnesisFormQuestionField = ({ type, errors }: IAnamnesisFormQuestionFieldProps) => {
  switch (type) {
    case AnamnesisQuestionType.ShortText:
      return <TextField placeholder="This is the Answer Field" />;
    case AnamnesisQuestionType.LongText:
      return <TextArea placeholder="This is the Answer Field" />;
    case AnamnesisQuestionType.DateTime:
      return <DatePicker />;
    case AnamnesisQuestionType.MultipleChoice:
      return <div>Multiple Choice</div>;
    default:
      return <TextField />;
  }
};

interface IAnamnesisFormQuestionProps extends HTMLAttributes<HTMLDivElement> {
  question: IAnamnesisFormQuestion;
  errors: FormError;
  onChangeQuestion: (value: string) => void;
  onChangeQuestionType: (value: string) => void;
  onDeleteQuestion: () => void;
}

const AnamnesisFormQuestion = ({
  question,
  errors,
  onChangeQuestion,
  onChangeQuestionType,
  onDeleteQuestion,
  className = '',
}: IAnamnesisFormQuestionProps) => {
  const [isEditQuestion, setIsEditQuestion] = useState(true);

  const actionClickEnterOnQuestion = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditQuestion(false);
    }
  };

  return (
    <div className={`flex flex-grow gap-2 ${className}`}>
      <div className="flex flex-col flex-grow gap-2">
        <div className="flex items-start justify-between flex-grow gap-2 ">
          {isEditQuestion ? (
            <TextField
              className="flex-grow"
              placeholder="Input Question (Press Enter to Commit)"
              value={question.question}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeQuestion(e.target.value)}
              onKeyUp={actionClickEnterOnQuestion}
              error={(errors?.question as FormFieldError)?.required as string}
            />
          ) : (
            <div className="flex items-center gap-2">
              <label className="leading-[40px]">{question.question}</label>
              <EditFilledIcon
                role="button"
                color={Color.Primary}
                size={16}
                onClick={() => setIsEditQuestion(true)}
              />
            </div>
          )}
          <SelectDropdown<string>
            value={question.type}
            options={QUESTION_TYPE_OPTIONS}
            onChange={onChangeQuestionType}
          />
        </div>
        <AnamnesisFormQuestionField type={question.type} />
      </div>
      <TrashOutlinedIcon
        role="button"
        className="fill-red-700 h-10"
        size={16}
        onClick={onDeleteQuestion}
      />
    </div>
  );
};

export default AnamnesisFormQuestion;
