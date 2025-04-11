import { Link } from 'react-router-dom';

export default function Header({ cartCount, logout }) {
  return (
    <header className='bg-blue-600 text-white p-4 flex justify-between items-center'>
      <h1 className='text-xl font-bold'><Link to='/'>ShopEasy</Link></h1>
      <nav className='flex gap-4 items-center'>
        <Link to='/' className='hover:underline'>Home</Link>
        <Link to='/cart' className='hover:underline'>Cart ({cartCount})</Link>
        <button onClick={logout} className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded'>Logout</button>
      </nav>
    </header>
  );
}