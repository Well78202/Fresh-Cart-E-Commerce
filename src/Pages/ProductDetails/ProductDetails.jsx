import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Slider from "react-slick";
import Loading from '../../Components/Loading/Loading';
import { CartContext } from '../../Contexts/CartContext';
import { WishlistContext } from '../../Contexts/WishlistContext';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ProductDetails() {
  const { addProductToCart, loading } = useContext(CartContext);
  const { addToWishlist, wishlistCheck, removeFromWishlist } = useContext(WishlistContext);
  const { id } = useParams();

  const settings = {
    autoplay: true,
    arrows: true,
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [productDetails, setProductDetails] = useState(null);
  const [products, setProducts] = useState([]);

  async function getDetails(productId) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
      setProductDetails(data.data);

      const api2 = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${data.data.category?._id}`);
      setProducts(api2.data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }

  function scrollUp() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    getDetails(id);
  }, [id]);

  return (
    <>
      <div className='container mx-auto my-6'>
        {productDetails ? (
          <>
            <div className="grid my-8 grid-cols-1 gap-8 md:grid-cols-3 md:items-center md:justify-items-center">
              <div className="md:w-2/3 md:justify-self-end">
                <Slider {...settings}>
                  {productDetails.images?.map((image, index) => (
                    <div key={index} className="flex justify-center">
                      <img
                        className="w-full h-auto object-contain mb-6"
                        src={image}
                        alt={productDetails.title}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="info relative md:w-3/4 md:ps-4 md:col-span-2 md:justify-self-start">
                <div>
                  <i
                    onClick={() => {
                      const isInWishlist = Array.isArray(wishlistCheck) && wishlistCheck.some((i) => i === productDetails.id);
                      isInWishlist
                        ? removeFromWishlist(productDetails.id)
                        : addToWishlist(productDetails.id);
                    }}
                    className={`fa-solid fa-heart ${Array.isArray(wishlistCheck) && wishlistCheck.some((i) => i == productDetails.id) ? "text-red-500" : "hover:text-red-500"} absolute top-2 right-2 duration-300 text-2xl cursor-pointer`}
                  ></i>
                  <h2>{productDetails.title}</h2>
                  <p className="my-3 text-gray-500">{productDetails.description}</p>
                  <h3>{productDetails.category?.name}</h3>
                  <div className="flex justify-between items-center my-3">
                    <h3>{productDetails.price}EGP</h3>
                    <span>
                      <i className="fa-solid fa-star rating-color"></i>
                      {productDetails.ratingsAverage}
                    </span>
                  </div>
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
                        onClick={() => addProductToCart(productDetails.id)}
                        className="bg-green-500 w-full p-2 rounded text-white btn"
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-3xl py-6">Related Projects</h2>
            {products.length > 0 && (
              <div className="products">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="product relative duration-500 cursor-pointer flex flex-col justify-between"
                    >
                      <i
                        onClick={() => {
                          const isInWishlist = Array.isArray(wishlistCheck) && wishlistCheck.some((i) => i === product.id);
                          isInWishlist
                            ? removeFromWishlist(product.id)
                            : addToWishlist(product.id);
                        }}
                        className={`fa-solid fa-heart ${Array.isArray(wishlistCheck) && wishlistCheck.some((i) => i == product.id) ? "text-red-500" : "hover:text-red-500"} absolute top-2 right-2 duration-300 text-2xl`}
                      ></i>
                      <Link to={`/productDetails/${product.id}`}>
                        <div onClick={() => scrollUp()}>
                          <div>
                            <img
                              src={product.imageCover}
                              className="w-full block"
                              alt={product.title}
                            />
                          </div>
                          <div className="p-2">
                            <h2 className="text-green-600">
                              {product.category.name}
                            </h2>
                            <p className="text-sm text-gray-500">
                              {product.description.split(" ").slice(0, 3).join(" ")}
                            </p>
                            <div className="rating flex justify-between items-center my-2">
                              <span>{product.price}EGP</span>
                              <span>
                                <i className="fa-solid fa-star rating-color"></i>
                                {product.ratingsAverage}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
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
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
