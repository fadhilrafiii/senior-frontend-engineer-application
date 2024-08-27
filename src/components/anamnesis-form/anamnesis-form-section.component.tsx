import { HTMLAttributes, useEffect, useState } from 'react';

import Button from '@components/common/button/button.component';
import TextField from '@components/common/input/text-field.component';
import { Sortable } from '@components/common/sortable/sortable.component';
import EditFilledIcon from '@components/icons/edit-filled.icon';
import PlusFilledIcon from '@components/icons/plus-filled.icon';
import TrashOutlinedIcon from '@components/icons/trash-filled.icon';
import { IAnamnesisFormQuestion, IAnamnesisFormSection } from '@libs/types/anamnesis.type';
import { Color } from '@libs/types/color.type';
import { FormArrayElError, FormError, FormFieldError } from '@libs/types/form.type';

import AnamnesisFormQuestion from './anamnesis-form-question.component';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  section: IAnamnesisFormSection;
  errors: FormError;
  onChangeSectionName: (id: string, value: string) => void;
  onAddQuestion: () => void;
  onChangeQuestion: (questionId: string, value: string) => void;
  onChangeQuestionType: (questionId: string, value: string) => void;
  onSwapQuestion: (questions: IAnamnesisFormQuestion[]) => void;
  onDeleteQuestion: (questionId: string) => void;
  onDeleteSection: () => void;
}

const AnamnesisFormSection = ({
  section,
  errors,
  onChangeSectionName,
  onAddQuestion,
  onChangeQuestion,
  onChangeQuestionType,
  onSwapQuestion,
  onDeleteQuestion,
  onDeleteSection,
  className = '',
}: IProps) => {
  const [canEditSectionName, setCanEditSectionName] = useState(true);
  const [sectionName, setSectionName] = useState(section.name || '');

  const handleEnterSectionName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setCanEditSectionName(false);
    }
  };

  useEffect(() => {
    onChangeSectionName(section.id, sectionName);
  }, [onChangeSectionName, section.id, sectionName]);

  return (
    <div className={`flex flex-col gap-2 flex-grow ${className}`}>
      <header className="flex items-center justify-between">
        {canEditSectionName ? (
          <TextField
            className="min-w-[300px] leading-[40px]"
            placeholder="Enter section name (Enter to Commit)"
            value={sectionName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSectionName(e.target.value)}
            onKeyDown={handleEnterSectionName}
            error={(errors?.name as FormFieldError)?.required as string}
          />
        ) : (
          <div className="flex gap-2 items-center">
            <h4 className="font-medium leading-[40px]">{section.name}</h4>
            <EditFilledIcon
              role="button"
              color={Color.Primary}
              size={16}
              onClick={() => setCanEditSectionName(true)}
            />
          </div>
        )}
        <TrashOutlinedIcon
          role="button"
          size={20}
          className="fill-red-700"
          onClick={() => onDeleteSection()}
        />
      </header>
      <div className="p-6 rounded-md bg-white drop-shadow-md flex flex-col">
        <Sortable<IAnamnesisFormQuestion>
          id={section.id}
          items={section.questions}
          onChange={onSwapQuestion}
          renderItem={(question: IAnamnesisFormQuestion, idx: number) => (
            <Sortable.Item key={question.id} id={question.id}>
              <Sortable.DragHandle />
              <AnamnesisFormQuestion
                className="mb-6 pb-6 border-b"
                errors={(errors?.questions as FormArrayElError)?.[idx] || {}}
                question={question}
                onChangeQuestion={(value: string) => onChangeQuestion(question.id, value)}
                onChangeQuestionType={(type: string) => onChangeQuestionType(question.id, type)}
                onDeleteQuestion={() => onDeleteQuestion(question.id)}
              />
            </Sortable.Item>
          )}
        />
        <Button
          type="button"
          theme={Button.Theme.Link}
          onClick={() => onAddQuestion()}
          className="h-4 p-0"
        >
          <PlusFilledIcon size={16} color={Color.Primary} className="stroke-white" />
          <p>Add Question</p>
        </Button>
      </div>
    </div>
  );
};

export default AnamnesisFormSection;
