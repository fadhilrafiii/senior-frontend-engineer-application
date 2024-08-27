import { useLocation } from 'react-router-dom';

import AnamnesisForm from '@components/anamnesis-form/anamnesis-form.component';
import NotFound from '@components/common/not-found/not-found.component';
import useLocalStorage from '@libs/hooks/use-local-storage.hook';
import { IAnamnesisForm } from '@libs/types/anamnesis.type';

import { ANAMNESIS_STORAGE_KEY } from '@constants/key.constant';

const AnamnesisEditPage = () => {
  const { pathname } = useLocation();
  const anamnesisId = pathname.split('/')?.[2];

  const [anamnesisForms] = useLocalStorage<IAnamnesisForm[]>(ANAMNESIS_STORAGE_KEY);
  const initialData = anamnesisForms.find(
    (anamnesisForm: IAnamnesisForm) => anamnesisForm.id === anamnesisId,
  );

  if (!anamnesisId || !initialData) {
    return <NotFound />;
  }

  return <AnamnesisForm initialData={initialData} />;
};

export default AnamnesisEditPage;
