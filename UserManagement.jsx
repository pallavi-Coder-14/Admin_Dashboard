import React, { useState } from "react";


export default function UserManagement() {

  /* ================= DUMMY USERS ================= */

  const [users, setUsers] = useState([
    {
      id: "U101",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      status: "Active",
      joined: "2025-06-15",

      address: {
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
      },

      orders: [
        { id: "ORD1023", amount: 2499, status: "Delivered" },
        { id: "ORD1031", amount: 1599, status: "Shipped" },
      ],
    },

    {
      id: "U102",
      name: "Priya Verma",
      email: "priya@gmail.com",
      phone: "9123456780",
      status: "Blocked",
      joined: "2025-09-10",

      address: {
        city: "Delhi",
        state: "Delhi",
        pincode: "110001",
      },

      orders: [
        { id: "ORD1040", amount: 3999, status: "Delivered" },
      ],
    },

    {
      id: "U103",
      name: "Amit Singh",
      email: "amit@gmail.com",
      phone: "9988776655",
      status: "Active",
      joined: "2026-01-02",

      address: {
        city: "Pune",
        state: "Maharashtra",
        pincode: "411001",
      },

      orders: [],
    },
  ]);


  /* ================= STATES ================= */

  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);


  /* ================= BLOCK / UNBLOCK ================= */

  const toggleStatus = (id) => {

    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: u.status === "Active" ? "Blocked" : "Active",
            }
          : u
      )
    );

  };


  /* ================= EDIT USER ================= */

  const saveEdit = () => {

    setUsers((prev) =>
      prev.map((u) =>
        u.id === editUser.id ? editUser : u
      )
    );

    setEditUser(null);

  };


  /* ================= STATUS COLOR ================= */

  const getStatusColor = (status) => {

    return status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  };


  /* ================= UI ================= */

  return (
    <div className="mt-16 space-y-10">

      {/* TITLE */}

      <h2 className="text-3xl font-bold text-purple-600 text-center">
        User Management
      </h2>


      {/* ================= USER TABLE ================= */}

      <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">

        <table className="w-full text-center border text-sm">

          <thead className="bg-purple-600 text-white">

            <tr>
              <th className="p-3">User ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
              <th className="p-3">Joined</th>
              <th className="p-3">Actions</th>
            </tr>

          </thead>


          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="p-3 font-medium">
                  {user.id}
                </td>

                <td className="p-3">
                  {user.name}
                </td>

                <td className="p-3">
                  {user.email}
                </td>

                <td className="p-3">
                  {user.phone}
                </td>


                {/* STATUS */}

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${getStatusColor(user.status)}`}
                  >
                    {user.status}
                  </span>

                </td>


                <td className="p-3">
                  {user.joined}
                </td>


                {/* ACTIONS */}

                <td className="p-3 space-x-2">

                  <button
                    onClick={() => setSelectedUser(user)}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-xs
                               hover:bg-blue-600"
                  >
                    View
                  </button>

                  <button
                    onClick={() => setEditUser({ ...user })}
                    className="px-3 py-1 bg-purple-500 text-white rounded text-xs
                               hover:bg-purple-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => toggleStatus(user.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-xs
                               hover:bg-red-600"
                  >
                    {user.status === "Active" ? "Block" : "Unblock"}
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* ================= USER DETAILS PANEL ================= */}

      {selectedUser && (

        <div className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* PROFILE */}

          <div>

            <h3 className="text-xl font-bold mb-3 text-purple-600">
              User Profile
            </h3>

            <p><b>Name:</b> {selectedUser.name}</p>
            <p><b>Email:</b> {selectedUser.email}</p>
            <p><b>Phone:</b> {selectedUser.phone}</p>
            <p><b>Status:</b> {selectedUser.status}</p>
            <p><b>Joined:</b> {selectedUser.joined}</p>

          </div>


          {/* ADDRESS */}

          <div>

            <h3 className="text-xl font-bold mb-3 text-purple-600">
              Address
            </h3>

            <p>{selectedUser.address.city}</p>
            <p>{selectedUser.address.state}</p>
            <p>{selectedUser.address.pincode}</p>

          </div>


          {/* ORDERS */}

          <div className="md:col-span-2">

            <h3 className="text-xl font-bold mb-3 text-purple-600">
              Order History
            </h3>


            {selectedUser.orders.length ? (

              <table className="w-full border text-center text-sm">

                <thead className="bg-gray-100">

                  <tr>
                    <th className="p-2">Order ID</th>
                    <th className="p-2">Amount</th>
                    <th className="p-2">Status</th>
                  </tr>

                </thead>


                <tbody>

                  {selectedUser.orders.map((o, i) => (

                    <tr key={i} className="border-t">

                      <td className="p-2">{o.id}</td>
                      <td className="p-2">₹{o.amount}</td>
                      <td className="p-2">{o.status}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            ) : (

              <p className="text-gray-500">
                No orders found 📦
              </p>

            )}

          </div>


          {/* CLOSE */}

          <div className="md:col-span-2 text-right">

            <button
              onClick={() => setSelectedUser(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded
                         hover:bg-gray-700"
            >
              Close
            </button>

          </div>

        </div>

      )}


      {/* ================= EDIT MODAL ================= */}

      {editUser && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-96">

            <h3 className="text-xl font-bold mb-4 text-purple-600">
              Edit User
            </h3>


            <input
              className="w-full border p-2 mb-3 rounded"
              value={editUser.name}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              className="w-full border p-2 mb-3 rounded"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
              placeholder="Email"
            />

            <input
              className="w-full border p-2 mb-3 rounded"
              value={editUser.phone}
              onChange={(e) =>
                setEditUser({ ...editUser, phone: e.target.value })
              }
              placeholder="Phone"
            />


            <div className="flex justify-end gap-3 mt-4">

              <button
                onClick={() => setEditUser(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-purple-600 text-white rounded"
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
