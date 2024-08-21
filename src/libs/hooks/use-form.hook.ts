import { useState } from 'react';

interface IParams<T> {
  initialData: T;
}

const useForm = <T>({ initialData }: IParams<T>) => {
  const [form, setForm] = useState<T>(initialData);

  return {
    form,
    setForm,
  };
};

export default useForm;
