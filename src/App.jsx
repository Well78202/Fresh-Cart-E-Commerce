import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Layout from './Components/Layout/Layout'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import Brands from './Pages/Brands/Brands'
import Products from './Pages/Products/Products'
import Notfound from './Pages/Notfound/Notfound'
import Categories from './Pages/Categories/Categories'
import AuthContextProvider from './Contexts/AuthContext'
import ProtectedRoutes from './Routes/Protected Routes/ProtectedRoutes'
import ProtectAuthRoutes from './Routes/Protect Auth Routes/ProtectAuthRoutes'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import CartContextProvider from './Contexts/CartContext'
import WishlistContextProvider, { WishlistContext } from './Contexts/WishlistContext'
import { ToastContainer } from 'react-toastify'
import CheckOut from './Pages/CheckOut/CheckOut'
import AllOrders from './Components/AllOrders/AllOrders'
import Wishlist from './Pages/Wishlist/Wishlist'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import EnterNewPassword from './Components/EnterNewPassword/EnterNewPassword'
import NameContextProvider from './Contexts/NameContext'
function App() {
  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: 'login', element: <ProtectAuthRoutes><Login /></ProtectAuthRoutes> },
        { path: 'register', element: <ProtectAuthRoutes><Register /></ProtectAuthRoutes> },
        { path: 'forgot-password', element: <ProtectAuthRoutes><ForgotPassword /></ProtectAuthRoutes> },
        { path: 'resetpassword', element: <ProtectAuthRoutes><ResetPassword /></ProtectAuthRoutes> },
        { path: 'enternewpassword', element: <ProtectAuthRoutes><EnterNewPassword /></ProtectAuthRoutes> },
        { path: 'cart', element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        { path: 'brands', element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
        { path: 'checkout/:id', element: <ProtectedRoutes><CheckOut /></ProtectedRoutes> },
        { path: 'categories', element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
        { path: 'allorders', element: <ProtectedRoutes><AllOrders/></ProtectedRoutes> },
        { path: 'products', element: <ProtectedRoutes><Products /></ProtectedRoutes> },
        { path: 'productDetails/:id', element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
        { path: 'products/productDetails/:id', element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
        { path: 'wishlist', element: <ProtectedRoutes><Wishlist /></ProtectedRoutes> },

        { path: '*', element: <Notfound /> },

      ]
    }
  ])
  return (
    <>
      <AuthContextProvider>
        <NameContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <RouterProvider router={router} />
            <ToastContainer />
          </WishlistContextProvider>
        </CartContextProvider>
        </NameContextProvider>
      </AuthContextProvider>

    </>
  )
}

export default App
