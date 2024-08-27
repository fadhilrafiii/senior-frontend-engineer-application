import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <h1 className="text-8xl font-extrabold">404</h1>
      <h2 className="text-2xl font-semibold">Not Found</h2>
      <p>
        Page you&#39;re looking is not found.{' '}
        <Link to="/" className="hover:text-slate-600 font-medium">
          Go to Home
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
