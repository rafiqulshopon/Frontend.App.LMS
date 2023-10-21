const NotFoundPage = () => {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center bg-gray-200'>
      <div className='text-6xl text-red-500 font-bold mb-4'>404</div>
      <h1 className='text-2xl font-semibold mb-4'>Oops! Page not found.</h1>
      <p className='text-gray-600 mb-6'>
        The page youre looking for doesnt exist or has been moved.
      </p>
      <a href='/' className='text-indigo-500 hover:underline'>
        Go back home
      </a>
    </div>
  );
};

export default NotFoundPage;
