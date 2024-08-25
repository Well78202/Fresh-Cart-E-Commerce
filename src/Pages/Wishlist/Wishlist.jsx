import React, { useContext, useEffect } from "react";
import { WishlistContext } from "../../Contexts/WishlistContext";
import Loading from "../../Components/Loading/Loading";
import { CartContext } from "../../Contexts/CartContext";

export default function Wishlist() {
  let { wishlist, loading, removeFromWishlist, getWishlist, wishlistCount } =
    useContext(WishlistContext);

  let { addProductToCart } = useContext(CartContext);
  useEffect(() => {
    getWishlist();
  }, [wishlistCount]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : wishlist != 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-5/6 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlist?.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt="Apple Watch"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.title}
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4 ">
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="font-medium block mx-auto mb-2 text-red-600 dark:text-red-500 hover:underline"
                    >
                      <i className="fa fa-trash me-2"></i>
                      Remove
                    </button>
                    <button
                      onClick={() => addProductToCart(product.id)}
                      className="font-medium block mx-auto text-green-600 dark:text-green-500 hover:underline"
                    >
                      <i className="fa-solid fa-cart-shopping text-green-600 me-2"></i>
                      Add To Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3 className="text-3xl text-center my-36">Your Wishlist Is Empty</h3>
      )}
    </>
  );
}
