import { useCallback } from 'react';

import { v4 as uuid } from 'uuid';

import Button from '@components/common/button/button.component';
import TextField from '@components/common/input/text-field.component';
import { Sortable } from '@components/common/sortable/sortable.component';
import PlusFilledIcon from '@components/icons/plus-filled.icon';
import SaveFilledIcon from '@components/icons/save-filled.component';
import useForm from '@libs/hooks/use-form.hook';
import useLocalStorage from '@libs/hooks/use-local-storage.hook';
import {
  AnamnesisQuestionType,
  IAnamnesisFormData,
  IAnamnesisFormQuestion,
  IAnamnesisFormSection,
} from '@libs/types/anamnesis.type';
import { Color } from '@libs/types/color.type';
import { FormArrayElError, FormFieldError } from '@libs/types/form.type';

import { ANAMNESIS_STORAGE_KEY } from '@constants/key.constant';

import { anamnesisFormValidator } from './anamnesis-form.util';
import AnamnesisFormSection from './anamnesis-form-section.component';

import NotFoundWebp from '@assets/not-found.webp';

interface IProps {
  initialData?: IAnamnesisFormData;
}

const AnamnesisForm = ({ initialData }: IProps) => {
  const { form, errors, setForm, handleSubmit } = useForm<IAnamnesisFormData>({
    initialData: initialData || {
      title: '',
      description: '',
      sections: [],
    },
    validator: anamnesisFormValidator,
  });

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm: IAnamnesisFormData) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeSectionName = useCallback(
    (sectionId: string, value: string) => {
      setForm((prev: IAnamnesisFormData) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.id === sectionId ? { ...section, name: value } : section,
        ),
      }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleAddSection = () => {
    setForm((prev: IAnamnesisFormData) => ({
      ...prev,
      sections: [...prev.sections, { id: uuid(), name: '', questions: [] }],
    }));
  };

  const handleSwapSection = (sections: IAnamnesisFormSection[]) => {
    setForm((prev: IAnamnesisFormData) => ({
      ...prev,
      sections,
    }));
  };

  const handleAddQuestion = (sectionId: string) => {
    setForm((prev: IAnamnesisFormData) => ({
      ...prev,
      sections: prev.sections.map((section: IAnamnesisFormSection) =>
        section.id === sectionId
          ? {
              ...section,
              questions: [
                ...section.questions,
                { id: uuid(), type: AnamnesisQuestionType.ShortText, question: '' },
              ],
            }
          : section,
      ),
    }));
  };

  const handleChangeQuestion = (sectionId: string, questionId: string, value: string) => {
    setForm((prev: IAnamnesisFormData) => ({
      ...prev,
      sections: prev.sections.map((section: IAnamnesisFormSection) => {
        if (section.id !== sectionId) return section;

        return {
          ...section,
          questions: section.questions.map((question: IAnamnesisFormQuestion) => {
            if (question.id !== questionId) return question;

            return {
              ...question,
              question: value,
            };
          }),
        };
      }),
    }));
  };

  const handleChangeQuestionType = (sectionId: string, questionId: string, value: string) => {
    setForm((prev: IAnamnesisFormData) => ({
      ...prev,
      sections: prev.sections.map((section: IAnamnesisFormSection) => {
        if (section.id !== sectionId) return section;

        return {
          ...section,
          questions: section.questions.map((question: IAnamnesisFormQuestion) => {
            if (question.id !== questionId) return question;

            return {
              ...question,
              type: value as AnamnesisQuestionType,
            };
          }),
        };
      }),
    }));
  };

  const handleSwapQuestion = (sectionId: string, questions: IAnamnesisFormQuestion[]) => {
    setForm((prev: IAnamnesisFormData) => ({
      ...prev,
      sections: prev.sections.map((section: IAnamnesisFormSection) => {
        if (section.id !== sectionId) return section;

        return {
          ...section,
          questions,
        };
      }),
    }));
  };

  const handleDeleteSection = (sectionId: string) => {
    setForm((prev: IAnamnesisFormData) => ({
      ...prev,
      sections: prev.sections.filter((section: IAnamnesisFormSection) => section.id !== sectionId),
    }));
  };

  const handleDeleteQuestion = (sectionId: string, questionId: string) => {
    setForm((prev: IAnamnesisFormData) => ({
      ...prev,
      sections: prev.sections.map((section: IAnamnesisFormSection) => {
        if (section.id !== sectionId) return section;

        const questions = section.questions.filter(({ id }) => id !== questionId);
        return { ...section, questions };
      }),
    }));
  };

  const [currentAnamnesisForms = [], storeAnamnesisForms] =
    useLocalStorage<IAnamnesisFormData[]>(ANAMNESIS_STORAGE_KEY);
  const onSubmit = async (payload: IAnamnesisFormData) => {
    storeAnamnesisForms([...currentAnamnesisForms, payload]);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Title"
        name="title"
        placeholder="Enter anamnesis form title"
        value={form.title}
        onChange={onTextChange}
        error={(errors.title as FormFieldError)?.required as string}
      />
      <TextField
        label="Description"
        name="description"
        placeholder="Enter anamnesis form description"
        value={form.description}
        onChange={onTextChange}
        error={(errors.description as FormFieldError)?.required as string}
      />
      <section className="pt-2 flex flex-col gap-3">
        <header className="flex items-center justify-between">
          <h4 className="text-lg font-medium">Sections</h4>
        </header>
        <div className="flex flex-col">
          {form.sections.length === 0 && (
            <div className="flex flex-col items-center gap-3 p-3">
              <img src={NotFoundWebp} alt="No Section" width={200} height={200} />
              <p>No section added yet!</p>
            </div>
          )}
          {form.sections.length > 0 && (
            <Sortable<IAnamnesisFormSection>
              id="anamnesis"
              items={form.sections}
              onChange={handleSwapSection}
              renderItem={(section: IAnamnesisFormSection, idx: number) => (
                <Sortable.Item key={section.id} id={section.id}>
                  <Sortable.DragHandle />
                  <AnamnesisFormSection
                    section={section}
                    className="mb-8"
                    errors={(errors?.sections as FormArrayElError)?.[idx]}
                    onChangeSectionName={handleChangeSectionName}
                    onAddQuestion={() => handleAddQuestion(section.id)}
                    onChangeQuestion={(questionId: string, value: string) =>
                      handleChangeQuestion(section.id, questionId, value)
                    }
                    onChangeQuestionType={(questionId: string, type: string) =>
                      handleChangeQuestionType(section.id, questionId, type)
                    }
                    onSwapQuestion={(questions: IAnamnesisFormQuestion[]) =>
                      handleSwapQuestion(section.id, questions)
                    }
                    onDeleteQuestion={(questionId: string) =>
                      handleDeleteQuestion(section.id, questionId)
                    }
                    onDeleteSection={() => handleDeleteSection(section.id)}
                  />
                </Sortable.Item>
              )}
            />
          )}
        </div>
      </section>
      <div className="flex items-center justify-end gap-4">
        <Button type="button" theme={Button.Theme.Secondary} onClick={handleAddSection}>
          <PlusFilledIcon color={Color.Primary} />
          Add Section
        </Button>
        <Button type="submit" theme={Button.Theme.Primary}>
          <SaveFilledIcon className="fill-white" />
          Save
        </Button>
      </div>
    </form>
  );
};

export default AnamnesisForm;
