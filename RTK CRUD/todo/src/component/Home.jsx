import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  useGetAllPostQuery,
  useDeleteDataMutation,
  useUpdateDataMutation,
} from "../services/post";
import Hade from "./Hade";

const Home = () => {
  const { data, isLoading, error, refetch } = useGetAllPostQuery();
  const [deleteData] = useDeleteDataMutation();
  const [updateData] = useUpdateDataMutation();

  const [updateItem, setUpdateItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items to display per page
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    refetch(); // Fetch data whenever the component re-renders or the URL changes
  }, []);

  const DeleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteData(id);
        // Refetch data after deletion
        refetch();
      } catch (error) {
        console.error("Failed to delete data:", error);
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data ? data.slice(indexOfFirstItem, indexOfLastItem) : []; 

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = currentItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleModalClose = () => {
    setShowModal(false);
  };

  const UpdateItemopen = (item) => {
    setUpdateItem({ ...item }); // Ensure updateItem is properly initialized
    setShowModal(true);
  };

  const handleUpdate = async (id, newData) => {
    try {
      await updateData({ id, ...newData }).unwrap();
      setShowModal(false);
      refetch();
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <header className="py-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Search Bar */}
          <div className="flex-grow mx-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 rounded-md bg-gray-200 text-black outline-none focus:ring focus:ring-blue-400"
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

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner"></div>
        </div>
      ) : (
        <table className="border-collapse border bg-r bg-gradient-to-t from-black to-green-500 text-white md:w-3/4 w-full mx-auto">
          <thead>
            <tr>
              <th className=" border-gray-500">sr.no</th>
              <th className="px-4 py-2  border-gray-500">
                name
              </th>
              <th className="px-4 py-2  border-gray-500">
                email
              </th>
              <th className="px-4 py-2  border-gray-500">
                password
              </th>
              <th className="px-2 w-1 py-1  border-gray-500">
                Delete
              </th>
              <th className="px-1 py-1 w-1  border-gray-500">
                Update
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr className="bg-gradient-to-r border-none from-yellow-200 text-black to-green-300" key={index.id}>
                <td className=" text-center ">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-4 py-2 border ">
                  {item.name}
                </td>
                <td className="px-4 py-2 border ">
                  {item.email}
                </td>
                <td className="px-4 py-2 border ">
                  {item.pass}
                </td>
                <td>
                  <MdDeleteForever className="w-full text-red-600 text-3xl text-center" onClick={() => DeleteItem(item.id)}/>
                </td>
                <td className="text-center">
                  <FaEdit className="w-full text-red-600 text-2xl text-center" onClick={() => UpdateItemopen(item)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ul className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(data ? data.length / itemsPerPage : 0) }, (_, i) => (
          <li key={i+1} onClick={() =>setCurrentPage(i+1)} className="cursor-pointer mx-1 px-3 py-1 bg-gray-200">{i + 1}</li>
        ))}
      </ul>

      {/* Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {/* Your modal content here */}
              <form onSubmit={(e) => {e.preventDefault(); handleUpdate(updateItem.id, updateItem); }}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <label
                       
                      htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Your name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={updateItem?.name || ""}
                        onChange={(e) =>
                          setUpdateItem({ ...updateItem, name: e.target.value })
                        }
                        className="w-full bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        placeholder="XYZ"
                        required
                      />
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={updateItem?.email || ""}
                        onChange={(e) =>
                          setUpdateItem({
                            ...updateItem,
                            email: e.target.value,
                          })
                        }
                        className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="name@gmail.com"
                        required
                      />
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Your password
                      </label>
                      <input
                        type="password"
                        name="pass"
                        id="pass"
                        value={updateItem?.pass || ""}
                        onChange={(e) =>
                          setUpdateItem({ ...updateItem, pass: e.target.value })
                        }
                        className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        required
                      />
                      <input
                        id="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 mb-4 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                        required
                      />
                      <label
                        htmlFor="terms"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        I agree with the{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          terms and conditions
                        </a>
                      </label>
                      <br />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 flex sm:flex-row-reverse justify-content-start">
                  <button
                    type="submit"
                    className="px-4 w-1/2  py-2 bg-blue-600 hover:bg-blue-400 text-white rounded-md"
                  >
                    {data ? "Update.." : "Update."}
                  </button>
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="rounded-md w-1/2 text-center border border-transparent hover:bg-blue-400 shadow-sm px-4 py-2 text-white mr-2  bg-blue-600"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
