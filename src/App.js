import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Header from './pages/Header';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  const updateQuantity = (id, qty) => {
    setCart((prev) => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      {token && <Header cartCount={cart.length} logout={logout} />}
      <Routes>
        <Route path='/' element={token ? <Home addToCart={addToCart} /> : <Navigate to='/login' />} />
        <Route path='/login' element={<Login setToken={setToken} />} />
        <Route path='/product/:id' element={<ProductDetail addToCart={addToCart} />} />
        <Route path='/cart' element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
