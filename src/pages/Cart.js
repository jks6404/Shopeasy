import { useState } from 'react';

export default function Cart({ cart, updateQuantity, removeFromCart, clearCart }) {
  const [showMsg, setShowMsg] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    setShowMsg(true);
    clearCart();
    setTimeout(() => setShowMsg(false), 4000);
  };

  return (
    <div className='p-4 max-w-4xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map(item => (
          <div key={item.id} className='flex items-center border-b py-4 gap-4'>
            <img src={item.image} alt={item.title} className='w-16 h-16 object-contain' />
            <div className='flex-1'>
              <h3 className='font-semibold'>{item.title}</h3>
              <p>${item.price}</p>
            </div>
            <input type='number' value={item.quantity} onChange={(e) => updateQuantity(item.id, +e.target.value)} className='w-16 border p-1 rounded' />
            <button onClick={() => removeFromCart(item.id)} className='text-red-500 ml-4'>Remove</button>
          </div>
        ))
      )}
      <div className='text-right mt-4'>
        <p className='text-xl font-bold'>Total: ${total}</p>
        <button onClick={handleCheckout} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-2 rounded'>Checkout</button>
        {showMsg && (
          <div className='mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded'>
            Order placed successfully!
          </div>
        )}
      </div>
    </div>
  );
}