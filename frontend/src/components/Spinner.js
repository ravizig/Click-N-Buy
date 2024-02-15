import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Spinner = ({ path = "login" }) => {

  const [count, setCount] = useState(2);
  const navigate = useNavigate()
  const location = useLocation();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue)
    }, 1000)

    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);

  }, [count, navigate, location, path])

  return (
    <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
  </div>
  );
}
