import { ChangeEvent, HTMLAttributes, KeyboardEvent, useState } from 'react';

import DatePicker from '@components/common/input/date-picker.component';
import TextArea from '@components/common/input/text-area.component';
import TextField from '@components/common/input/text-field.component';
import EditFilledIcon from '@components/icons/edit-filled.icon';
import TrashOutlinedIcon from '@components/icons/trash-filled.icon';
import { AnamnesisQuestionType, IAnamnesisFormQuestion } from '@libs/types/anamnesis.type';
import { Color } from '@libs/types/color.type';

interface IAnamnesisFormQuestionFieldProps extends HTMLAttributes<HTMLDivElement> {
  type: string;
  // onChangeChoice: string;
}

const AnamnesisFormQuestionField = ({ type }: IAnamnesisFormQuestionFieldProps) => {
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
  onChangeQuestion: (value: string) => void;
}

const AnamnesisFormQuestion = ({
  question,
  onChangeQuestion,
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
        <div className="flex items-center flex-grow ">
          {isEditQuestion ? (
            <TextField
              className="flex-grow"
              placeholder="Input Question (Press Enter to Commit)"
              value={question.question}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeQuestion(e.target.value)}
              onKeyUp={actionClickEnterOnQuestion}
            />
          ) : (
            <div className="flex items-center gap-2">
              <label className="leading-[40px]">{question.question}</label>
              <EditFilledIcon role="button" color={Color.Primary} size={16} />
            </div>
          )}
        </div>
        <AnamnesisFormQuestionField type={question.type} />
      </div>
      <TrashOutlinedIcon role="button" className="fill-red-700 h-10" size={16} />
    </div>
  );
};

export default AnamnesisFormQuestion;
