import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

// ----- Input Field Component -----
function InputField({ label, value, onChange, type = "text" }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
        required
      />
    </div>
  );
}

// ----- Edit Modal Component -----
function EditModal({ user, formData, setFormData, onClose, onUpdate }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <form onSubmit={onUpdate} className="space-y-4">
          <InputField
            label="Full Name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, fullName: e.target.value }))
            }
          />
          <InputField
            label="Mobile Number"
            value={formData.mobileNumber}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, mobileNumber: e.target.value }))
            }
          />
          <InputField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ----- User Row Component -----
function UserRow({ profile, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="py-2 px-4">{profile.fullName}</td>
      <td className="py-2 px-4">{profile.mobileNumber}</td>
      <td className="py-2 px-4">{profile.email}</td>
      <td className="py-2 px-4 flex gap-3">
        <FaEdit
          className="text-blue-500 cursor-pointer"
          onClick={() => onEdit(profile)}
        />
        <FaTrash
          className="text-red-500 cursor-pointer"
          onClick={() => onDelete(profile._id)}
        />
      </td>
    </tr>
  );
}

// ----- Main Users Component -----
export default function Users() {
  const [profiles, setProfiles] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ fullName: "", mobileNumber: "", email: "" });

  // Fetch users
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch("https://mernass-1.onrender.com/api/profiles");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setProfiles(data);
      } catch (err) {
        console.error("Error fetching profiles:", err);
        alert(`Error fetching users: ${err.message}`);
      }
    };
    fetchProfiles();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/profiles/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setProfiles(profiles.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting user");
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setEditUser(user);
    setFormData({ fullName: user.fullName, mobileNumber: user.mobileNumber, email: user.email });
  };

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editUser) return;
    try {
      const res = await fetch(`http://localhost:5000/api/profiles/${editUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update user");
      const updatedUser = await res.json();
      setProfiles(profiles.map((p) => (p._id === updatedUser._id ? updatedUser : p)));
      setEditUser(null);
    } catch (err) {
      console.error(err);
      alert("Error updating user");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Mobile</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <UserRow
                  key={profile._id}
                  profile={profile}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editUser && (
        <EditModal
          user={editUser}
          formData={formData}
          setFormData={setFormData}
          onClose={() => setEditUser(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
