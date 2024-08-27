import { ChangeEvent, HTMLAttributes, KeyboardEvent, useState } from 'react';

import SelectDropdown from '@components/common/input/select-dropdown.component';
import TextField from '@components/common/input/text-field.component';
import EditFilledIcon from '@components/icons/edit-filled.icon';
import TrashOutlinedIcon from '@components/icons/trash-filled.icon';
import { AnamnesisQuestionType, IAnamnesisFormQuestion } from '@libs/types/anamnesis.type';
import { Color } from '@libs/types/color.type';
import { FormError, FormFieldError } from '@libs/types/form.type';

import AnamnesisFormQuestionField from './anamnesis-form-question-field.component';

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

interface IProps extends HTMLAttributes<HTMLDivElement> {
  question: IAnamnesisFormQuestion;
  errors: FormError;
  onChangeQuestion: (value: string) => void;
  onChangeQuestionType: (value: string) => void;
  onDeleteQuestion: () => void;
  onChangeChoice: (questionId: string, choiceIdx: number, value: string) => void;
  onAddChoice: (questionId: string) => void;
}

const AnamnesisFormQuestion = ({
  question,
  errors,
  onChangeQuestion,
  onChangeQuestionType,
  onDeleteQuestion,
  onChangeChoice,
  onAddChoice,
  className = '',
}: IProps) => {
  const [isEditQuestion, setIsEditQuestion] = useState(true);

  const actionClickEnterOnQuestion = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
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
              onKeyDown={actionClickEnterOnQuestion}
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
        <AnamnesisFormQuestionField
          id={question.id}
          type={question.type}
          choices={question.choices}
          onAddChoice={() => onAddChoice(question.id)}
          onChangeChoice={(choiceIdx: number, val: string) =>
            onChangeChoice(question.id, choiceIdx, val)
          }
        />
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
