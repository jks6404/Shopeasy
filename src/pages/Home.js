import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(setProducts);

    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(['all', ...data]));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className='p-4'>
      {/* Filter UI */}
      <div className='mb-6 flex justify-end'>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className='border rounded px-3 py-2 shadow'
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {filteredProducts.map(p => (
          <div key={p.id} className='border p-4 rounded shadow hover:shadow-lg transition'>
            <img src={p.image} alt={p.title} className='h-40 mx-auto mb-2 object-contain' />
            <h3 className='text-lg font-semibold'>{p.title}</h3>
            <p className='text-sm text-gray-500'>{p.category}</p>
            <p className='font-bold mt-2'>${p.price}</p>
            <div className='flex gap-2 mt-3'>
              <Link to={`/product/${p.id}`} className='text-blue-500 hover:underline'>Details</Link>
              <button onClick={() => handleAddToCart(p)} className='ml-auto bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600'>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className='fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50'>
          Item added to cart!
        </div>
      )}
    </div>
  );
}