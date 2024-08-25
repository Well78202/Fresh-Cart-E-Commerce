import axios from "axios";
import { validateYupSchema } from "formik";
import { createContext, useEffect, useState } from "react";
import {toast} from "react-toastify";

export let CartContext = createContext();
export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tokenStatus, setTokenStatus] = useState(false);
  const [totalPrise, setTotalPrise] = useState(0);
  const [cartId, setCartId] = useState(null);

  let headers = {
    token: localStorage.getItem("token"),
  };

  async function getCartItems() {
    try {
      setLoading(true);
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers }
      );
      setCartId(data.data._id);
      setTotalPrise(data.data.totalCartPrice);
      setCart(data.data.products);
      setCartCount(data.numOfCartItems);
    } catch (err) {
      setCart(0);
      setCartCount(0);
      console.log("Cart is empty");
    } finally {
      setLoading(false);
    }
  }

  async function addProductToCart(productId) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      );

      setTotalPrise(data.data.totalCartPrice);
      setCartId(data.data._id);
      setCart(data.data.products);
      setCartCount(data.numOfCartItems);
      toast.success("added to cart Succesfully");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateProductCount(productId, count) {
    if (count > 0) {
      try {
        setLoading(true);
        let { data } = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
          { count },
          {
            headers,
          }
        );

        setCartId(data.data._id);
        setTotalPrise(data.data.totalCartPrice);
        setCart(data.data.products);
        setCartCount(data.numOfCartItems);
        toast.success("Updated cart Succesfully");
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }

  async function removeProduct(productId) {
    try {
      setLoading(true);
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers }
      );
      setCartId(data.data._id);
      setTotalPrise(data.data.totalCartPrice);
      setCart(data.data.products);
      setCartCount(data.numOfCartItems);
      toast.error("Product removed");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function clearCart() {
    try {
      setLoading(true);
      let { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers }
      );

      setCart(null);
      setCartCount(0);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setTokenStatus(true);
    } else {
      setTokenStatus(false);
      setCartCount(0);
    }

    if (tokenStatus) {
      getCartItems();
    }
  }, [tokenStatus]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        setCartCount,
        getCartItems,
        addProductToCart,
        loading,
        tokenStatus,
        setTokenStatus,
        updateProductCount,
        removeProduct,
        clearCart,
        totalPrise,
        cartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
