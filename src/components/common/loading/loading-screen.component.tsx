import { HTMLAttributes } from 'react';

import Loading from './loading.component';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LoadingScreen = ({ size = 60, ...props }: IProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-2" {...props}>
      <Loading size={size} />
      <h2 className="text-primary text-lg font-medium">Loading...</h2>
    </div>
  );
};

export default LoadingScreen;
