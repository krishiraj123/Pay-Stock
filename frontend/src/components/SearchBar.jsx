import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [filterUser, setFilterUser] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilterUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/v1/user/filter-user?filter=${search}`
        );
        setFilterUser(res.data);
      } catch (error) {
        console.error("Error fetching filtered users", error);
      }
    };

    fetchFilterUser();
  }, [search]);

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/v1/user/get-user",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLoggedUser(res.data);
      } catch (error) {
        console.error("Error fetching logged user data", error);
      }
    };

    fetchLoggedUser();
  }, []);

  useEffect(() => {
    if (loggedUser && filterUser.length > 0) {
      const filtered = filterUser.filter((user) => user._id !== loggedUser._id);
      setFilteredUsers(filtered);
    }
  }, [loggedUser, filterUser]);

  return (
    <>
      <div>
        <input
          type="text"
          className="mt-12 border-black border-2 w-full h-12 p-5"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search user by firstname or lastname..."
        />
      </div>
      <div className="mt-10">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div
              key={user._id}
              className="flex flex-row justify-between items-center mt-2 hover:border-2 p-4"
            >
              <div className="flex gap-x-2 text-lg font-mono font-extrabold">
                <p>{index + 1}.</p>
                <p>{user.firstName}</p>
                <p>{user.lastName}</p>
              </div>
              <div>
                <button
                  className="bg-black text-white rounded-xl p-3 hover:bg-gray-700"
                  onClick={() =>
                    navigate(
                      `/transfer?receiverId=${user._id}&firstname=${user.firstName}&lastname=${user.lastName}`
                    )
                  }
                >
                  Send Money
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-full text-xl font-mono font-bold">
            No users found
          </p>
        )}
      </div>
    </>
  );
};

export default SearchBar;
