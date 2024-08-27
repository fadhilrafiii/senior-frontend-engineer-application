import { HTMLAttributes } from 'react';

import DatePicker from '@components/common/input/date-picker.component';
import TextArea from '@components/common/input/text-area.component';
import TextField from '@components/common/input/text-field.component';
import { AnamnesisQuestionType } from '@libs/types/anamnesis.type';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  type: string;
  // onChangeChoice: string;
}

const AnamnesisFormQuestionField = ({ type }: IProps) => {
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

export default AnamnesisFormQuestionField;
