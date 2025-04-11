import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id]);

  if (!product) return <div className='p-4'>Loading...</div>;

  return (
    <div className='p-6 max-w-3xl mx-auto bg-white shadow rounded'>
      <div className='flex flex-col md:flex-row gap-6'>
        <img src={product.image} alt={product.title} className='w-60 h-60 object-contain mx-auto' />
        <div>
          <h2 className='text-2xl font-bold mb-2'>{product.title}</h2>
          <p className='text-gray-700 mb-4'>{product.description}</p>
          <p className='text-xl font-semibold mb-2'>${product.price}</p>
          <button onClick={() => addToCart(product)} className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
