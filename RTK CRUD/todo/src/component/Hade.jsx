import React from 'react'
import { Link } from 'react-router-dom'

const Hade = () => {
  return (
    <div>
    <header className="  py-4">
      <div className="container mx-auto flex justify-between items-center">
       

        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-md bg-gray-200 text-black outline-none focus:ring  focus:ring-blue-400"
          />
        </div>

        {/* Register Button */}
        <Link to="/insert">
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium">
          Register
        </button>
        </Link >
      </div>
    </header>
    </div>
  )
}

export default Hade
