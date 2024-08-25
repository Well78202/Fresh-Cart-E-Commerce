import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import toast from "react-hot-toast";

export let WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  let { setTokenStatus, tokenStatus } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [wishlistCheck, setWishlistCheck] = useState([]);
  let headers = {
    token: localStorage.getItem("token"),
  };

  async function getWishlist() {
    try {
      setLoading(true);
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers,
        }
      );
      setWishlistCount(data.count);
      setWishlist(data.data);
      setWishlistCheck(data.data.map((item) => item.id));
    } catch (error) {
      setWishlistCount(0);
      setWishlist(0);
    } finally {
      setLoading(false);
    }
  }
  async function addToWishlist(productId) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        {
          headers,
        }
      );

      setWishlistCount(data.data.length);
      setWishlistCheck(data.data);
      toast.success(data.message);
    } catch (error) {
      setWishlistCount(0);
      setWishlistCheck(0);
    } finally {
      setLoading(false);
    }
  }
  async function removeFromWishlist(productId) {
    try {
      setLoading(true);
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,

        {
          headers,
        }
      );

      setWishlistCount(data.data.length);
      setWishlistCheck(data.data);
      toast.error(data.message);
    } catch (error) {
      setWishlistCount(0);
      setWishlistCheck(0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setTokenStatus(true);
    } else {
      setTokenStatus(false);
      setWishlistCount(0);
    }

    if (tokenStatus) {
      getWishlist();
    }
  }, [tokenStatus]);
  return (
    <WishlistContext.Provider
      value={{
        loading,
        getWishlist,
        wishlist,
        wishlistCount,
        addToWishlist,
        wishlistCheck,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
