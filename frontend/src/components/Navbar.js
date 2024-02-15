import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { toast } from "react-toastify";
import { useCart } from "../context/Cart";
import { useSearch } from "../context/search";
import { Search } from "../pages/SearchComponent";
import { Home } from "../pages/Home";
import axios from "axios";

export const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [values, setValues] = useSearch();
  const [show, setShow] = useState(false)

  const navigate = useNavigate();

  const handleLogout = async () => {

    await setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    localStorage.removeItem("cart");

    navigate("/login");
    toast.success("Logout Successfully");
    window.location.reload()
  };

  const SearchProduct = async (keyword) => {
    try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/product/search/${keyword}`
        );
        await setValues(data.products)
        setValues({ ...values, keyword, results: data })
        console.log("Navbar values" + JSON.stringify(values));
  
      } catch (error) {
        console.log(error);
      }
}

  return (
    <>
    <div className="bg-white dark:bg-gray-900 sticky w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-start justify-between mx-auto p-4">
        <Link
          to={"/"}
          className="flex items-center space-x-3 mt-2 rtl:space-x-reverse"
        >
          <img
            className="w-[48px] h-[48px] sm:h-6 sm:w-6 md:h-8 md:w-8"
            src="https://img.icons8.com/external-beshi-glyph-kerismaker/48/external-E-Commerce-e-commerce-beshi-glyph-kerismaker.png"
            alt="external-E-Commerce-e-commerce-beshi-glyph-kerismaker"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap hover:underline dark:text-white sm:text-sm md:text-base">
            Click-N-Buy
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 sm:mx-1 mt-1 rtl:space-x-reverse">
          {!auth?.user ? (
            <Link to={"/login"}>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 hover:underline focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-xs sm:py-1 sm:px-3 sm:mt-2 sm:mx-1"
              >
                Login
              </button>
            </Link>
          ) : (
            <Link to={"/login"}>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  handleLogout()
                }}
                className="text-white bg-blue-700 hover:bg-blue-800 hover:underline focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-xs sm:py-1 sm:px-3 sm:mt-2 sm:mx-1"
              >
                Logout
              </button>
            </Link>
          )}
          <Link to={"/cart"} className="relative inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 fill-white mt-2 mx-2"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
          </svg>
             { cart.length > 0 ?
            (<div className="absolute inline-flex items-center justify-center w-4 h-4 p-3 text-xs font-semibold text-white bg-red-500 border-1 rounded-full -top-2 -end-2">{cart.length}</div>)
              : null}
        </Link>
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-4 h-4 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-sticky"
      >
        <div className="relative mt-1 mx-2 md:-order-first md:space-x-0 rtl:space-x-reverse">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            onChange={(e) => {
              
              if(e.target.value.length < 1)
              {
                navigate('/')
              }
              else{
                navigate('/search')
                // setValues({ ...values, keyword: e.target.value })
                SearchProduct(e.target.value)
              }
            }}
          />
        </div>
        <ul className="flex flex-col p-4 mx-3 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <Link
              to={"/"}
              className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-400 hover:underline md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              aria-current="page"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/contact"}
              className="block py-2 px-3 text-gray-900 rounded  hover:bg-blue-400 hover:underline md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              Contact
            </Link>
          </li>
         { auth?.user?.role === 1 ? (<li>
            <Link
              to={`/dashboard/${auth?.user?.role === 1 ? "admin": null
                }`}
            >
              <button
                id="dropdownHoverButton"
                data-dropdown-toggle="dropdownHover"
                data-dropdown-trigger="hover"
                className=" text-gray-900 focus:outline-none font-medium py-2 px-3 text-center inline-flex items-center 
             hover:bg-blue-400 hover:underline md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700
            "
                type="button"

              >
                Dashboard
               
              </button>
            </Link>
          </li>) : null }
        </ul>
      </div>
    </div>
    </div>
    </>
  );
};
