import React, { useState } from "react";

export default function OrderManagement() {

  /* ================= DUMMY ORDER DATA ================= */

  const [orders, setOrders] = useState([
    {
      id: "ORD1023",
      customer: "Rahul Sharma",
      date: "2026-01-20",
      amount: 2499,
      status: "Pending",
      payment: "Paid",
      tracking: "TRK558923",
    },
    {
      id: "ORD1024",
      customer: "Priya Verma",
      date: "2026-01-21",
      amount: 3999,
      status: "Processing",
      payment: "Paid",
      tracking: "TRK889221",
    },
    {
      id: "ORD1025",
      customer: "Amit Singh",
      date: "2026-01-22",
      amount: 1599,
      status: "Shipped",
      payment: "Paid",
      tracking: "TRK663210",
    },
    {
      id: "ORD1026",
      customer: "Neha Patel",
      date: "2026-01-23",
      amount: 1999,
      status: "Delivered",
      payment: "Paid",
      tracking: "TRK221190",
    },
    {
      id: "ORD1027",
      customer: "Vikas Yadav",
      date: "2026-01-24",
      amount: 999,
      status: "Cancelled",
      payment: "Refunded",
      tracking: "-",
    },
  ]);


  /* ================= UPDATE STATUS ================= */

  const updateStatus = (id, newStatus) => {

    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status: newStatus }
          : order
      )
    );

  };


  /* ================= CANCEL ORDER ================= */

  const cancelOrder = (id) => {

    if (!window.confirm("Cancel this order?")) return;

    updateStatus(id, "Cancelled");

  };


  /* ================= REFUND ================= */

  const refundOrder = (id) => {

    if (!window.confirm("Process refund?")) return;

    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status: "Returned",
              payment: "Refunded",
            }
          : order
      )
    );

  };


  /* ================= STATUS COLOR ================= */

  const getStatusColor = (status) => {

    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "Returned":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-gray-100 text-gray-700";
    }

  };


  /* ================= UI ================= */

  return (
    <div className="mt-16 bg-white p-6 rounded-xl shadow-lg">

      {/* TITLE */}

      <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        Order Management
      </h2>


      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full border text-sm text-center">

          <thead className="bg-purple-600 text-white">

            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Date</th>
              <th className="p-3">Amount (₹)</th>
              <th className="p-3">Status</th>
              <th className="p-3">Tracking</th>
              <th className="p-3">Actions</th>
            </tr>

          </thead>


          <tbody>

            {orders.map((order) => (

              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="p-3 font-medium">
                  {order.id}
                </td>

                <td className="p-3">
                  {order.customer}
                </td>

                <td className="p-3">
                  {order.date}
                </td>

                <td className="p-3 font-semibold">
                  ₹{order.amount}
                </td>


                {/* STATUS */}

                <td className="p-3">

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order.id, e.target.value)
                    }
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${getStatusColor(order.status)}`}
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                    <option>Returned</option>
                  </select>

                </td>


                {/* TRACKING */}

                <td className="p-3 font-mono text-xs">
                  {order.tracking}
                </td>


                {/* ACTIONS */}

                <td className="p-3 space-x-2">


                  {/* INVOICE */}

                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded text-xs
                               hover:bg-green-600 transition"
                  >
                    Invoice
                  </button>


                  {/* CANCEL */}

                  {order.status !== "Cancelled" &&
                    order.status !== "Delivered" && (

                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-xs
                                   hover:bg-red-600 transition"
                      >
                        Cancel
                      </button>

                    )}


                  {/* REFUND */}

                  {order.status === "Delivered" && (

                    <button
                      onClick={() => refundOrder(order.id)}
                      className="px-3 py-1 bg-orange-500 text-white rounded text-xs
                                 hover:bg-orange-600 transition"
                    >
                      Refund
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
