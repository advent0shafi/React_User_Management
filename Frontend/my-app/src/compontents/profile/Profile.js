import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../items/navbar/Navbar";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState("");
  const userId = localStorage.getItem("id");

  useEffect(() => {
    console.log("user id" + userId);
    // Fetch user data based on the retrieved user ID
    const fetchUserData = async () => {
      try {
        const access = localStorage.getItem("access_token");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/user/${userId}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access}`,
            },
          }
        );

        setUserData(response.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      formData.append("profile_img", image);
      await axios.put(`http://127.0.0.1:8000/api/image/${userId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to send FormData
        },
      });
      notify();
    } catch (error) {
      alert("Error: " + error);
    }
  };
  const notify = () => toast.success("image has been updated.");
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-xl">
          <div className="flex justify-end px-4 pt-4">
            <button
              id="dropdownButton"
              className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
              type="button"
            >
              <span className="sr-only">Open dropdown</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 3"
              >
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
            </button>
            {/* Dropdown menu */}
            <div
              id="dropdown"
              className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul className="py-2" aria-labelledby="dropdownButton">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover-bg-gray-100 dark:hover-bg-gray-600 dark:text-gray-200 dark:hover-text-white"
                  >
                    Export Data
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover-bg-gray-600 dark:text-gray-200 dark:hover-text-white"
                  >
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center pb-10">
            {userData && (
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : `http://127.0.0.1:8000${userData.profile_img}`
                } // Access the image URL from the userData object
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                alt="profile picture"
                onError={() => {
                  console.log("Error loading image");
                  console.log("Image URL:", userData.profile_img);
                }}
              />
            )}

            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-dark">
              {userData ? userData.username : ""}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {userData ? userData.email : ""}
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="imageInput"
                style={{ display: "none" }}
              />

              <label
                htmlFor="imageInput"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Change Image
              </label>

              <a
                onClick={handleSubmit}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              >
                Submit Image
              </a>
            </div>
          </div>
        </div>
        <div>
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default Profile;
