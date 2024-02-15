import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './Components/Navbar';
import { About } from './Pages/About';
import { Contact } from './Pages/Contact';
import { Home } from './Pages/Home';
import { ProductDetails } from './Pages/ProductDetails';
import { Login } from './Pages/Auth/Login';
import { Signup } from './Pages/Auth/Signup';
import { Checkout } from './Pages/Checkout';
import { Policy } from './Pages/Policy';
import { Pagenotfound } from './Pages/Pagenotfound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserDashboard } from './Pages/User/UserDashboard';
import { PrivateRoute } from './Components/Routes/PrivateRoute';
import { ForgotPassword } from './Pages/Auth/ForgotPassword';
import { AdminDashboard } from './Pages/Admin/AdminDashboard';
import { CreateCategory } from './Pages/Admin/CreateCategory';
import { AdminOrders } from './Pages/Admin/AdminOrders';
import { CreateProduct } from './Pages/Admin/CreateProduct';
import { Products } from './Pages/Admin/Products';
import { UpdateProduct } from './Pages/Admin/UpdateProduct';
import { AdminRoute } from './Components/Routes/AdminRoute'
import { CartPage } from './Pages/CartPage';
import { SearchComponent } from './Pages/SearchComponent';

function App() {
  return (
    <div>
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<SearchComponent />} />
        {/* <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
        </Route> */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />

      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App;
