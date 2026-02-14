import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

export default function AdminAnalytics() {

  /* ================= STATE ================= */
  const [view, setView] = useState("monthly");

  /* ================= DASHBOARD STATS ================= */

  const stats = [
    { title: "Total Sales (₹)", value: "3,45,000", growth: "+12%" },
    { title: "Total Orders", value: 420, growth: "+8%" },
    { title: "Total Users", value: 110, growth: "+15%" },
    { title: "Net Profit (₹)", value: "78,000", growth: "+10%" },
  ];

  /* ================= SALES DATA ================= */

  const monthlySales = [
    { name: "Jan", revenue: 40000, cost: 28000 },
    { name: "Feb", revenue: 35000, cost: 24000 },
    { name: "Mar", revenue: 50000, cost: 33000 },
    { name: "Apr", revenue: 47000, cost: 30000 },
    { name: "May", revenue: 60000, cost: 38000 },
    { name: "Jun", revenue: 72000, cost: 45000 },
  ];

  const weeklySales = [
    { name: "Mon", revenue: 8000, cost: 5000 },
    { name: "Tue", revenue: 7000, cost: 4200 },
    { name: "Wed", revenue: 9000, cost: 6000 },
    { name: "Thu", revenue: 8500, cost: 5200 },
    { name: "Fri", revenue: 11000, cost: 7000 },
    { name: "Sat", revenue: 13000, cost: 8200 },
    { name: "Sun", revenue: 10000, cost: 6500 },
  ];

  const salesData = view === "monthly" ? monthlySales : weeklySales;

  /* ================= CATEGORY DATA ================= */

  const categoryData = [
    { name: "Men", value: 40 },
    { name: "Women", value: 30 },
    { name: "Kids", value: 15 },
    { name: "Electronics", value: 10 },
    { name: "Accessories", value: 5 },
  ];

  /* ================= TOP PRODUCTS ================= */

  const topProducts = [
    { name: "Blue Jeans", sold: 120, revenue: 24000 },
    { name: "Sports Shoes", sold: 95, revenue: 19000 },
    { name: "Smart Watch", sold: 70, revenue: 35000 },
    { name: "Hand Bag", sold: 60, revenue: 12000 },
    { name: "Headphones", sold: 55, revenue: 18000 },
  ];

  const COLORS = ["#8b5cf6", "#ec4899", "#06b6d4", "#10b981", "#f59e0b"];

  /* ================= UI ================= */

  return (
    <div className="mt-16 space-y-14">

      {/* ================= OVERVIEW STATS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-lg text-center
                       hover:scale-105 transition-all"
          >
            <h3 className="text-gray-500 font-medium">
              {item.title}
            </h3>

            <p className="text-3xl font-bold text-purple-600 mt-2">
              {item.value}
            </p>

            <p className="text-green-500 text-sm mt-1">
              {item.growth} this month
            </p>
          </div>
        ))}

      </div>


      {/* ================= SALES + PROFIT ================= */}

      <div className="bg-white p-6 rounded-xl shadow-lg">

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-purple-600">
            Revenue & Profit Analysis
          </h2>

          {/* Toggle */}

          <div className="flex gap-3 mt-3 sm:mt-0">

            <button
              onClick={() => setView("weekly")}
              className={`px-4 py-1 rounded-full text-sm
                ${view === "weekly"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200"}`}
            >
              Weekly
            </button>

            <button
              onClick={() => setView("monthly")}
              className={`px-4 py-1 rounded-full text-sm
                ${view === "monthly"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200"}`}
            >
              Monthly
            </button>

          </div>

        </div>


        <ResponsiveContainer width="100%" height={350}>

          <LineChart data={salesData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8b5cf6"
              strokeWidth={3}
              name="Revenue"
            />

            <Line
              type="monotone"
              dataKey="cost"
              stroke="#ec4899"
              strokeWidth={3}
              name="Cost"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>


      {/* ================= PROFIT BAR CHART ================= */}

      <div className="bg-white p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
          Profit / Loss Chart
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={salesData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar
              dataKey={(d) => d.revenue - d.cost}
              fill="#10b981"
              name="Profit"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>


      {/* ================= CATEGORY + TOP PRODUCTS ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* ===== CATEGORY PIE ===== */}

        <div className="bg-white p-6 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">
            Category Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>


        {/* ===== TOP SELLING PRODUCTS ===== */}

        <div className="bg-white p-6 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">
            Best Selling Products
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full text-center border rounded-lg overflow-hidden">

              <thead className="bg-purple-600 text-white">

                <tr>
                  <th className="p-2">Rank</th>
                  <th className="p-2">Product</th>
                  <th className="p-2">Sold</th>
                  <th className="p-2">Revenue (₹)</th>
                </tr>

              </thead>

              <tbody>

                {topProducts.map((p, i) => (

                  <tr
                    key={i}
                    className="border-t hover:bg-purple-50 transition"
                  >

                    <td className="p-2 font-bold">#{i + 1}</td>
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">{p.sold}</td>
                    <td className="p-2 font-medium">
                      ₹{p.revenue}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}
