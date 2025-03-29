import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users/${id}`)
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        alert("Failed to fetch user details.");
      });
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);

      // Updated local storage users
      let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      storedUsers = storedUsers.map((u) =>
        u.id === parseInt(id) ? { ...u, ...user } : u
      );
      localStorage.setItem("users", JSON.stringify(storedUsers));

      alert("User updated successfully!");
      navigate("/users", { state: { updated: true } }); // Send update state
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>

      <label className="block">First Name:</label>
      <input
        type="text"
        value={user.first_name || ""}
        onChange={(e) => setUser({ ...user, first_name: e.target.value })}
        className="border p-2 w-full mb-2"
      />

      <label className="block">Last Name:</label>
      <input
        type="text"
        value={user.last_name || ""}
        onChange={(e) => setUser({ ...user, last_name: e.target.value })}
        className="border p-2 w-full mb-2"
      />

      <label className="block">Email:</label>
      <input
        type="email"
        value={user.email || ""}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="border p-2 w-full mb-2"
      />

      <button
        onClick={handleUpdate}
        className="bg-green-500 text-white p-2 rounded w-full"
      >
        Update
      </button>
    </div>
  );
};

export default EditUserPage;
