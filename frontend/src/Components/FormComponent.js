import React from 'react'

export const FormComponent = () => {
    return (
        <form className="w-1/2 h-full sm:w-full mx-5 sm:mx-0 grid grid-flow-row p-2 mt-2">
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-10">
                    <h2 className=" text-gray-900 text-2xl font-bold leading-tight tracking-tight ">Product Information</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help"> PNG, JPG (MAX. 5MB).</p>
                        </div>
                        <div className="sm:col-span-full">
                            <label htmlFor="product-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Product Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="product-name"
                                    id="product-name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required />
                            </div>
                        </div>
                        <div className="sm:col-span-full">
                            <label htmlFor="product-category" className="block text-sm font-medium leading-6 text-gray-900">
                                Product Category
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="product-category"
                                    id="product-category"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required />
                            </div>
                        </div>
                        <div className="sm:col-span-full">
                            <label htmlFor="product-description" className="block text-sm font-medium leading-6 text-gray-900">
                                Product Description
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="product-description"
                                    id="product-description"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-center mr-6 gap-x-6 ">
                <button
                    type="submit"
                    className=" bg-blue-600 hover:bg-blue-700 rounded-md text-white px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    )
}
