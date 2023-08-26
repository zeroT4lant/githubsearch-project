import React from 'react'
import {Link} from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className='flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white'>
        <h2 className='font-bold'>Git Search</h2>

        <span>
            <Link to="/" className='mr-2'>Home</Link>
            <Link to="/favPages" className=''>favPages</Link>
        </span>
    </nav>
  )
}

export default Navigation