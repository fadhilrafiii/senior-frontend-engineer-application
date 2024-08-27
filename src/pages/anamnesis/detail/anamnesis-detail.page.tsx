import { useLocation } from 'react-router-dom';

import AnamnesisFormQuestionField from '@components/anamnesis-form/anamnesis-form-question-field.component';
import NotFound from '@components/common/not-found/not-found.component';
import useLocalStorage from '@libs/hooks/use-local-storage.hook';
import {
  IAnamnesisForm,
  IAnamnesisFormQuestion,
  IAnamnesisFormSection,
} from '@libs/types/anamnesis.type';

import { ANAMNESIS_STORAGE_KEY } from '@constants/key.constant';

const AnamnesisDetailPage = () => {
  const { pathname } = useLocation();
  const anamnesisId = pathname.split('/')?.[2];

  const [anamnesisForms] = useLocalStorage<IAnamnesisForm[]>(ANAMNESIS_STORAGE_KEY);
  const anamnesisForm = anamnesisForms.find(
    (anamnesisForm: IAnamnesisForm) => anamnesisForm.id === anamnesisId,
  );

  if (!anamnesisId || !anamnesisForm) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">{anamnesisForm.title}</h2>
        <h4 className="text-sm">{anamnesisForm.description}</h4>
      </section>
      <section className="flex flex-col gap-4">
        {anamnesisForm.sections.map((section: IAnamnesisFormSection) => (
          <div key={section.id} className="flex flex-col gap-2">
            <div className="font-medium">{section.name}</div>
            <div className="flex flex-col gap-6 p-6 rounded-md drop-shadow-md bg-white">
              {section.questions.map((question: IAnamnesisFormQuestion) => (
                <div key={question.id}>
                  <label className="text-sm">{question.question}</label>
                  <AnamnesisFormQuestionField type={question.type} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AnamnesisDetailPage;
