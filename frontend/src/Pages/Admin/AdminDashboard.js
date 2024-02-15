import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {

    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div ref={sidebarRef}>
                <button
                    onClick={toggleSidebar}
                    aria-controls="sidebar-multi-level-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        ></path>
                    </svg>
                </button>

                <aside
                    id="sidebar-multi-level-sidebar"
                    className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                        } md:translate-x-0`}
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 mt-[77px] md:mt-[74px] py-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link
                                    to={"/dashboard/admin"}
                                    className="flex items-center cursor-not-allowed p-2 text-gray-900 rounded-lg dark:text-white group"
                                >
                                    <span className="ms-3 text-2xl"> Admin Dashboard</span>

                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/dashboard/admin/create-category"}
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="flex-1 ms-3 whitespace-nowrap">Create Category</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/dashboard/admin/create-product"}
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="flex-1 ms-3 whitespace-nowrap">Create Products</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/dashboard/admin/products"}
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </>
    );
};
