import { useLocation } from 'react-router-dom';

import NotFound from '@components/common/not-found/not-found.component';
import useLocalStorage from '@libs/hooks/use-local-storage.hook';
import { IAnamnesisForm } from '@libs/types/anamnesis.type';

import { ANAMNESIS_STORAGE_KEY } from '@constants/key.constant';

const AnamnesisDetailPage = () => {
  const { pathname } = useLocation();
  const anamnesisId = pathname.split('/')?.[2];

  const [anamnesisForms] = useLocalStorage<IAnamnesisForm[]>(ANAMNESIS_STORAGE_KEY);
  const initialData = anamnesisForms.find(
    (anamnesisForm: IAnamnesisForm) => anamnesisForm.id === anamnesisId,
  );

  if (!anamnesisId || !initialData) {
    return <NotFound />;
  }

  return <div>Anamnesis Detail Page</div>;
};

export default AnamnesisDetailPage;
