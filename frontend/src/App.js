import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Contact } from './pages/Contact';
import { ProductDetails } from './pages/ProductDetails';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { Checkout } from './pages/Checkout';
import { Policy } from './pages/Policy';
import { Pagenotfound } from './pages/Pagenotfound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CreateCategory } from './pages/admin/CreateCategory';
import { AdminOrders } from './pages/admin/AdminOrders';
import { CreateProduct } from './pages/admin/CreateProduct';
import { Products } from './pages/admin/Products';
import { UpdateProduct } from './pages/admin/UpdateProduct';
import { AdminRoute } from './components/routes/AdminRoute'
import { CartPage } from './pages/CartPage';
import { Home } from './pages/Home';
import { SearchComponent } from './pages/SearchComponent';

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
