import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../../items/Modal/Modal";
import Editmodal from "../../items/Modal/Editmodal";
import Navbar from "../../items/navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";

const Admin = () => {
  const [userdata, setuserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isSuper = localStorage.getItem("is_super");
    if (isSuper !== "true") {
      navigate("/");
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/userlist");
        console.log(response.data);
        setuserData(response.data.userlist);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const filteredUsers = userdata.filter(
    (user) =>
      user.id.toString().includes(searchTerm) || // Search by ID
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) || // Search by Email
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) // Search by Username
  );
  const deleteUser = async (id) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/popuser/${id}/`);
      // Filter out the deleted user from the user list
      const updatedUserList = userdata.filter((user) => user.id !== id);
      setuserData(updatedUserList);
    } catch (error) {
      errorToast(error);
    }
  };

  const updateUserInList = (updatedUser) => {
    // Find the index of the updated user in the list
    const index = userdata.findIndex((user) => user.id === updatedUser.id);

    // Update the user in the list with the updated data
    if (index !== -1) {
      const updatedUsers = [...userdata];
      updatedUsers[index] = updatedUser;
      setuserData(updatedUsers);
    }
  };
  const errorToast = (er) => {
    toast.error("!", er);
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <div className="py-3 px-4">
                <div className="flex items-center">
                  <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    <Modal
                      addUserToList={(user) => {
                        // Ensure user object is defined before adding to the list
                        if (user) {
                          setuserData((prevData) => [...prevData, user]);
                        }
                      }}
                    />
                  </button>
                </div>
                <Toaster />
                <div className="relative max-w-xs">
                  <label
                    htmlFor="hs-table-with-pagination-search"
                    className="sr-only"
                  >
                    Search
                  </label>
                  <input
                    type="text"
                    name="hs-table-with-pagination-search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    id="hs-table-with-pagination-search"
                    className="p-3 pl-10 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    placeholder="Search for items"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                    <svg
                      className="h-3.5 w-3.5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 px-4 pr-0 text-left text-xs font-medium text-white uppercase"
                      >
                        User Id
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        Username
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-white uppercase"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredUsers.map((user) => (
                      <tr>
                        <td className="py-3 pl-4 px-6 py-4 whitespace-nowrap text-sm font-medium  text-black">
                          {user.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                          {user.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded mr-2"
                          >
                            Delete
                          </button>
                          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            <Editmodal
                              userid={user.id}
                              usernames={user.username}
                              emails={user.email}
                              pass={user.password}
                              editUserToList={updateUserInList}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                    ;
                  </tbody>
                </table>
              </div>
              <div className="py-1 px-4">
                <nav className="flex items-center space-x-2">
                  <a
                    className="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
                    href="#"
                  >
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="w-10 h-10 bg-blue-500 text-white p-4 inline-flex items-center text-sm font-medium rounded-full"
                    href="#"
                    aria-current="page"
                  >
                    1
                  </a>
                  <a
                    className="w-10 h-10 text-gray-400 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
                    href="#"
                  >
                    2
                  </a>
                  <a
                    className="w-10 h-10 text-gray-400 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
                    href="#"
                  >
                    3
                  </a>
                  <a
                    className="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
                    href="#"
                  >
                    <span className="sr-only">Next</span>
                    <span aria-hidden="true">»</span>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
