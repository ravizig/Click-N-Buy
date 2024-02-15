import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Contact = () => {

  const navigate = useNavigate()

  return (
    <form className="text-gray-700 body-font relative mt-3" onSubmit={(e) => {
      e.preventDefault()
      navigate('/')
    }}>
      <div className="container px-5 py-12 mx-auto shadow-slate-500 rounded-lg border border-gray-200 shadow-2xl">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className=" text-3xl font-medium underline title-font mb-4 text-gray-900">
            Contact Us
          </h1>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label for="name" className="leading-7 text-sm text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-gray-100 rounded-md border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  for="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  for="message"
                  className="leading-7 text-sm text-gray-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  required></textarea>
              </div>
            </div>
            <div className="p-2 w-full">
              <button type="submit" className="flex mx-auto hover:underline text-whit border-0 py-2 px-8 focus:outline-none bg-blue-600 hover:bg-blue-700 rounded-md text-white text-lg">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
