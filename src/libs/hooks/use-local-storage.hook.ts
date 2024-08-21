import { useState } from 'react';

import { parse } from '@libs/utils/object.util';

const useLocalStorage = <T>(key: string, defaultInitial?: T): [T, (newData: T) => void] => {
  const [state, setState] = useState<T>(parse(localStorage.getItem(key)) || defaultInitial);

  const setData = (newData: T) => {
    localStorage.setItem(key, JSON.stringify(newData));
    setState(newData);
  };

  return [state, setData];
};

export default useLocalStorage;
