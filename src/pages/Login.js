// For the Fake Store API, the only valid credentials for login are:

// Username: mor_2314

// Password: 83r5^_

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <form onSubmit={handleLogin} className='bg-white p-6 rounded shadow-md w-80'>
        <h2 className='text-xl font-bold mb-4'>Login</h2>
        <input type='text' placeholder='Username' className='w-full p-2 border mb-3 rounded' value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type='password' placeholder='Password' className='w-full p-2 border mb-3 rounded' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>Login</button>
      </form>
    </div>
  );
}
