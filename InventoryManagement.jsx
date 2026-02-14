import React, { useState } from "react";
import { AlertTriangle, Package, Warehouse } from "lucide-react";


export default function InventoryManagement() {

  /* ================= DUMMY DATA ================= */

  const [inventory, setInventory] = useState([

    {
      id: "P101",
      name: "Blue Jeans",
      category: "Clothing",
      stock: 5,
      minStock: 10,
      warehouse: "Mumbai",
      lastRefill: "2026-01-20",
      status: "Low Stock",
    },

    {
      id: "P102",
      name: "Smart Watch",
      category: "Electronics",
      stock: 42,
      minStock: 15,
      warehouse: "Delhi",
      lastRefill: "2026-01-15",
      status: "In Stock",
    },

    {
      id: "P103",
      name: "Sports Shoes",
      category: "Footwear",
      stock: 0,
      minStock: 12,
      warehouse: "Pune",
      lastRefill: "2026-01-05",
      status: "Out of Stock",
    },

    {
      id: "P104",
      name: "Leather Wallet",
      category: "Accessories",
      stock: 18,
      minStock: 8,
      warehouse: "Bangalore",
      lastRefill: "2026-01-22",
      status: "In Stock",
    },

  ]);


  /* ================= UPDATE STATUS ================= */

  const handleStatusChange = (id, newStatus) => {

    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: newStatus }
          : item
      )
    );

  };



  /* ================= UI ================= */

  return (
    <div className="mt-16 space-y-12">


      {/* ================= HEADER ================= */}

      <div className="text-center">

        <h2 className="text-3xl font-bold text-purple-600">
          Inventory & Stock Management
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Monitor and control product stock
        </p>

      </div>



      {/* ================= SUMMARY CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex items-center gap-4">

          <Package className="text-purple-600" size={36} />

          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <h3 className="text-2xl font-bold">{inventory.length}</h3>
          </div>

        </div>


        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex items-center gap-4">

          <AlertTriangle className="text-yellow-500" size={36} />

          <div>
            <p className="text-gray-500 text-sm">Low / Out Stock</p>
            <h3 className="text-2xl font-bold">
              {inventory.filter(
                i => i.status !== "In Stock"
              ).length}
            </h3>
          </div>

        </div>


        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex items-center gap-4">

          <Warehouse className="text-green-600" size={36} />

          <div>
            <p className="text-gray-500 text-sm">Warehouses</p>
            <h3 className="text-2xl font-bold">
              {[...new Set(inventory.map(i => i.warehouse))].length}
            </h3>
          </div>

        </div>

      </div>



      {/* ================= INVENTORY TABLE ================= */}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg overflow-x-auto">

        <table className="w-full text-sm text-center border">

          <thead className="bg-purple-600 text-white">

            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Min</th>
              <th className="p-3">Warehouse</th>
              <th className="p-3">Refill</th>
              <th className="p-3">Status</th>
              <th className="p-3">Update</th>
            </tr>

          </thead>


          <tbody>

            {inventory.map((item) => (

              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 dark:hover:bg-gray-700"
              >

                <td className="p-3 font-medium">{item.id}</td>

                <td className="p-3">{item.name}</td>

                <td className="p-3">{item.category}</td>

                <td className="p-3 font-bold">{item.stock}</td>

                <td className="p-3">{item.minStock}</td>

                <td className="p-3">{item.warehouse}</td>

                <td className="p-3">{item.lastRefill}</td>


                {/* STATUS BADGE */}

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold

                      ${
                        item.status === "Out of Stock"
                          ? "bg-red-100 text-red-600"
                          : item.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }

                    `}
                  >

                    {item.status}

                  </span>

                </td>



                {/* STATUS DROPDOWN */}

                <td className="p-3">

                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange(
                        item.id,
                        e.target.value
                      )
                    }
                    className="px-3 py-1 border rounded-md
                               dark:bg-gray-700 dark:border-gray-600
                               focus:outline-none focus:ring-2
                               focus:ring-purple-500"
                  >

                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>



      {/* ================= ALERT ================= */}

      <div
        className="bg-yellow-50 dark:bg-yellow-900/30
                   border border-yellow-300 dark:border-yellow-700
                   p-5 rounded-xl flex gap-4"
      >

        <AlertTriangle className="text-yellow-500 mt-1" />

        <div>

          <h4 className="font-bold text-yellow-700 dark:text-yellow-400">
            Admin Attention Required
          </h4>

          <p className="text-sm text-yellow-600 dark:text-yellow-300">

            {inventory
              .filter(i => i.status !== "In Stock")
              .map(i => i.name)
              .join(", ") || "All stocks are healthy."}

          </p>

        </div>

      </div>

    </div>
  );
}
