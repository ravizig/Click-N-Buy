import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/Auth';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../Context/Cart';


export const CartPage = () => {

  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const navigate = useNavigate();


  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getToken();
  // }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-4 mx-5 flex flex-col h-full p-8">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">

            {cart.map((product) => (
             
              <li key={product._id} className="flex py-6">
                <div className="h-auto w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={`uploads/${product.photo}`}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        {product.name}
                      </h3>
                      <p className="ml-4">${product.price}</p>
                    </div>
                    <h4 className='text-gray-700'>
                        {product.description}
                    </h4>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Quantity Avilable : {product.quantity}</p>
                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium rounded-md border-2 px-2 py-1 bg-red-500 text-black hover:text-indigo-500"   
                        onClick={(e) => {
                          e.preventDefault()
                          removeCartItem(product._id)
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 p-8 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total</p>
          <p>{totalPrice()}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6">
          <button
            className="flex items-center justify-center cursor-not-allowed bg-gray-500 rounded-md text-white border border-transparent px-6 py-3 text-base font-medium shadow-sm"
           disabled>
            Pay and Order
          </button>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{' '}
            <Link to={"/"}>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
