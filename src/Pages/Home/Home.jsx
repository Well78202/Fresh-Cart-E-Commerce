import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Products from '../Products/Products';
import Loading from '../../Components/Loading/Loading';
import PopularCategories from '../../Components/PopularCategories/PopularCategories';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  return (
    <div className='container mx-auto'>
      <PopularCategories/>
      {loading ? <Loading /> : <Products products={products} />}
    </div>
  );
}
