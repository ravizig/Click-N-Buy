import React, { useState } from "react";

export default function EditCategory({ handleSubmit, value, setValue, visible, setVisible }) {

    return (
        <>       
            {visible ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >

                            <div className="border-0 rounded-lg shadow-lg flex flex-col w-auto bg-white outline-none focus:outline-none relative my-6 mx-auto max-w-3xl">

                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-md text-gray-900 font-semibold">
                                        Edit Category
                                    </h3>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <input type="text"
                                                placeholder="Enter New Category"
                                                value={value}
                                                onChange={(e) => setValue(e.target.value)} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-3 py-2 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Save Changes
                                    </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}