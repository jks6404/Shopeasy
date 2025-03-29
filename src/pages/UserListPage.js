import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const UserListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [page, location.state]); // Detect navigation state update

  const fetchUsers = () => {
    axios
      .get(`https://reqres.in/api/users?page=${page}`)
      .then((response) => {
        const apiUsers = response.data.data;
        setTotalPages(response.data.total_pages);

        let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Merge stored users with API users
        const mergedUsers = mergeUsers(apiUsers, storedUsers);
        setUsers(mergedUsers);
        localStorage.setItem("users", JSON.stringify(mergedUsers));
      })
      .catch(() => {
        console.error("Failed to fetch users.");
      });
  };

  // Merge API users and stored users (preserve edits)
  const mergeUsers = (apiUsers, storedUsers) => {
    const userMap = new Map(apiUsers.map((user) => [user.id, user]));
    storedUsers.forEach((user) => userMap.set(user.id, user)); // Override API data with stored data
    return Array.from(userMap.values());
  };

  // Handle user deletion
  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Filter users based on search input
  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl font-bold">Hey ReqRes User!</h2>
        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
          Logout
        </button>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {/* User List */}
      <div className="grid grid-cols-2 gap-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="p-4 border rounded flex items-center">
            <img src={user.avatar} alt={user.first_name} className="w-12 h-12 rounded-full mr-3" />
            <div>
              <p>{user.first_name} {user.last_name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <button onClick={() => navigate(`/edit-user/${user.id}`)} className="text-blue-500 mr-2">
                Edit
              </button>
              <button onClick={() => handleDelete(user.id)} className="text-red-500">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between">
        <button 
          onClick={() => setPage(page - 1)} 
          disabled={page === 1} 
          className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">{page} / {totalPages}</span>
        <button 
          onClick={() => setPage(page + 1)} 
          disabled={page >= totalPages} 
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserListPage;
