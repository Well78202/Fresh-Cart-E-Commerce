import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Rating from '../../Components/Rating/Rating';
import { Link } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import { CartContext } from '../../Contexts/CartContext';
import { WishlistContext } from '../../Contexts/WishlistContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);
  const { addToWishlist, wishlistCheck, removeFromWishlist } = useContext(WishlistContext);

  let { addProductToCart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getProducts();
  }, [wishlistCheck]);

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

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full my-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <h2 className="text-4xl text-main text-center my-4">Our Products</h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-5">
          {filteredProducts.map((product) => (
            <div key={product._id} className="relative bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
              <i
                onClick={() => {
                  wishlistCheck.some((i) => i === product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product.id);
                }}
                className={`fa-solid fa-heart ${wishlistCheck.some((i) => i == product.id)
                    ? "text-red-500 "
                    : "hover:text-red-500"
                  } absolute top-2 right-2 duration-300 text-2xl`}
              ></i>
              <Link to={`productDetails/${product._id}`}>
                <img className="rounded-t-lg p-8" src={product.imageCover} alt={product.title} />
              </Link>
              <div className="px-5 pb-5">
                <Link to={`productDetails/${product._id}`}>
                  <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white line-clamp-1">
                    {product.title}
                  </h3>
                </Link>
                <p className="text-gray-600 line-clamp-2">{product.description}</p>
                <Rating rating={product.ratingsAverage} />
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  <div className="p-2 pt-0">
                    {loading ? (
                      <button
                        type="button"
                        className="bg-green-500 w-full p-2 rounded text-white btn"
                      >
                        <i className="fas fa-spinner fa-spin-pulse"></i>
                      </button>
                    ) : (
                      <button
                        onClick={() => addProductToCart(product.id)}
                        className="bg-green-500 w-full p-2 rounded text-white btn"
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
