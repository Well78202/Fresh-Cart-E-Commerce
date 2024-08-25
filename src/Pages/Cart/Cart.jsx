import React, { useContext, useEffect } from "react";
import Loading from '../../Components/Loading/Loading';
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Contexts/CartContext";

export default function Cart() {
  let {
    cart,
    getCartItems,
    loading,
    updateProductCount,
    removeProduct,
    totalPrise,
    cartId,
    clearCart,
  } = useContext(CartContext);
  let navigate = useNavigate();

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : cart ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
          {cart.length > 0 ? (
            <>
              <table className="w-5/6 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3 text-main font-big">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-main font-big">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3 text-main font-big">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-main font-big">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product) => (
                    <tr
                      key={product._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <img
                          src={product.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={product.product.title}
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateProductCount(
                                updateProductCount(
                                  product.product.id,
                                  product.count - 1
                                )
                              )
                            }
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <span
                              id="first_product"
                              className="bg-gray-50  border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              {product.count}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              updateProductCount(
                                updateProductCount(
                                  product.product.id,
                                  product.count + 1
                                )
                              )
                            }
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.price} EGP
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => removeProduct(product.product.id)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-4 text-2xl text-center">Total Prise</td>
                    <td
                      colSpan={3}
                      className="py-4 text-2xl text-end text-mainColor"
                    >
                      {totalPrise} EGP
                    </td>
                    <td>
                      <button
                        onClick={() => navigate(`/checkout/${cartId}`)}
                        type="submit"
                        className="text-white mx-9 w-40 my-4 duration-300 bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Check Out
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="w-72 mx-auto">
                <button
                  onClick={() => clearCart()}
                  type="submit"
                  className="text-white  border-2 w-full my-4 duration-300 bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Clear Cart
                </button>
              </div>

            </>
          ) : (
            <h3 className="text-3xl text-center my-36">Your Cart Is Empty</h3>
          )}
        </div>
      ) : (
        <h3 className="text-3xl text-center my-36">Your Cart Is Empty</h3>
      )}
    </>
  );
}
