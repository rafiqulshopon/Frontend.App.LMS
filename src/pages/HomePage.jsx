import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <button
      type='button'
      className='text-3xl p-2 font-bold underline text-primary'
    >
      <Link to='/login'>Login</Link>
    </button>
  );
};

export default HomePage;
