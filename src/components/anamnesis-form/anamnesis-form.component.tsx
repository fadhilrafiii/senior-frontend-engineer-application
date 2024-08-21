import { useCallback } from 'react';

import { v4 as uuid } from 'uuid';

import Button from '@components/common/button/button.component';
import TextField from '@components/common/input/text-field.component';
import PlusFilledIcon from '@components/icons/plus-filled.icon';
import useForm from '@libs/hooks/use-form.hook';
import { IAnamnesisFormData, IAnamnesisFormSection } from '@libs/types/anamnesis.type';
import { Color } from '@libs/types/color.type';

import AnamnesisFormSection from './anamnesis-form-section.component';

import NotFoundWebp from '@assets/not-found.webp';

interface IProps {
  initialData?: IAnamnesisFormData;
}

const AnamnesisForm = ({ initialData }: IProps) => {
  const { form, setForm } = useForm<IAnamnesisFormData>({
    initialData: initialData || {
      title: '',
      description: '',
      sections: [],
    },
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

  return (
    <form className="flex flex-col gap-3">
      <TextField
        label="Title"
        name="title"
        placeholder="Enter anamnesis form title"
        value={form.title}
        onChange={onTextChange}
      />
      <TextField
        label="Description"
        name="description"
        placeholder="Enter anamnesis form description"
        value={form.description}
        onChange={onTextChange}
      />
      <section className="pt-2 flex flex-col gap-3">
        <header className="flex items-center justify-between">
          <h4 className="text-lg font-medium">Sections</h4>
          <Button type="button" theme={Button.Theme.Secondary} onClick={handleAddSection}>
            <PlusFilledIcon color={Color.Primary} />
            Add Section
          </Button>
        </header>
        <div className="flex flex-col gap-6">
          {form.sections.length === 0 && (
            <div className="flex flex-col items-center gap-3 p-3">
              <img src={NotFoundWebp} alt="No Section" width={200} height={200} />
              <p>No section added yet!</p>
            </div>
          )}
          {form.sections.length > 0 &&
            form.sections.map((section: IAnamnesisFormSection) => (
              <AnamnesisFormSection
                key={section.id}
                section={section}
                onChangeSectionName={handleChangeSectionName}
              />
            ))}
        </div>
      </section>
    </form>
  );
};

export default AnamnesisForm;
