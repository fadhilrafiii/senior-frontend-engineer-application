import Loading from './loading.component';

const LoadingScreen = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-2">
      <Loading size={60} />
      <h2 className="text-primary text-lg font-medium">Loading...</h2>
    </div>
  );
};

export default LoadingScreen;
