import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


export default function ReviewManagement() {

  /* ================= DUMMY REVIEWS ================= */

  const [reviews, setReviews] = useState([

    {
      id: "R101",
      user: "Rahul Sharma",
      product: "Blue Jeans",
      rating: 5,
      comment: "Excellent quality and fast delivery!",
      date: "2026-01-10",
      reply: "",
    },

    {
      id: "R102",
      user: "Priya Verma",
      product: "Smart Watch",
      rating: 2,
      comment: "Not satisfied with battery life.",
      date: "2026-01-12",
      reply: "",
    },

    {
      id: "R103",
      user: "Amit Singh",
      product: "Sports Shoes",
      rating: 4,
      comment: "Comfortable and stylish.",
      date: "2026-01-15",
      reply: "Thank you for your feedback!",
    },

    {
      id: "R104",
      user: "Neha Patel",
      product: "Hand Bag",
      rating: 1,
      comment: "Fake product received 😡",
      date: "2026-01-18",
      reply: "",
    },

  ]);


  /* ================= STATES ================= */

  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [filter, setFilter] = useState("All");


  /* ================= DELETE REVIEW ================= */

  const deleteReview = (id) => {

    if (!window.confirm("Delete this review?")) return;

    setReviews((prev) =>
      prev.filter((r) => r.id !== id)
    );

  };


  /* ================= SAVE REPLY ================= */

  const saveReply = () => {

    setReviews((prev) =>
      prev.map((r) =>
        r.id === selectedReview.id
          ? { ...r, reply: replyText }
          : r
      )
    );

    setSelectedReview(null);
    setReplyText("");

  };


  /* ================= FILTER ================= */

  const filteredReviews = reviews.filter((r) =>
    filter === "All" ? true : r.rating === Number(filter)
  );


  /* ================= RATING ANALYTICS ================= */

  const ratingData = [1, 2, 3, 4, 5].map((star) => ({
    rating: `${star} ⭐`,
    count: reviews.filter((r) => r.rating === star).length,
  }));



  /* ================= UI ================= */

  return (
    <div className="mt-16 space-y-12">

      {/* TITLE */}

      <h2 className="text-3xl font-bold text-purple-600 text-center">
        Review & Feedback Management
      </h2>


      {/* ================= FILTER ================= */}

      <div className="flex justify-center gap-3 flex-wrap">

        {["All", "5", "4", "3", "2", "1"].map((r) => (

          <button
            key={r}
            onClick={() => setFilter(r)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition

              ${
                filter === r
                  ? "bg-purple-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700"
              }

            `}
          >
            {r === "All" ? "All Reviews" : `${r} ⭐`}
          </button>

        ))}

      </div>


      {/* ================= REVIEWS TABLE ================= */}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg overflow-x-auto">

        <table className="w-full text-center text-sm border">

          <thead className="bg-purple-600 text-white">

            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Product</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Review</th>
              <th className="p-3">Date</th>
              <th className="p-3">Reply</th>
              <th className="p-3">Actions</th>
            </tr>

          </thead>


          <tbody>

            {filteredReviews.map((r) => (

              <tr
                key={r.id}
                className="border-t hover:bg-gray-50 dark:hover:bg-gray-700"
              >

                <td className="p-3">{r.user}</td>

                <td className="p-3">{r.product}</td>

                <td className="p-3 font-semibold text-yellow-500">
                  {"⭐".repeat(r.rating)}
                </td>

                <td className="p-3 max-w-xs truncate">
                  {r.comment}
                </td>

                <td className="p-3">{r.date}</td>

                <td className="p-3 text-green-600">

                  {r.reply || "-"}

                </td>


                {/* ACTIONS */}

                <td className="p-3 space-x-2">

                  <button
                    onClick={() => {
                      setSelectedReview(r);
                      setReplyText(r.reply || "");
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                  >
                    Reply
                  </button>

                  <button
                    onClick={() => deleteReview(r.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* ================= RATING ANALYTICS ================= */}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">

        <h3 className="text-xl font-bold mb-6 text-center text-purple-600">
          Rating Analytics
        </h3>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={ratingData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="rating" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} />

          </BarChart>

        </ResponsiveContainer>

      </div>


      {/* ================= REPLY MODAL ================= */}

      {selectedReview && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96">

            <h3 className="text-xl font-bold mb-4 text-purple-600">
              Reply to Review
            </h3>

            <p className="text-sm mb-2 text-gray-500">
              {selectedReview.comment}
            </p>

            <textarea
              rows="4"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full border dark:border-gray-600 p-2 rounded mb-4
                         bg-white dark:bg-gray-800"
              placeholder="Write reply..."
            />


            <div className="flex justify-end gap-3">

              <button
                onClick={() => setSelectedReview(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={saveReply}
                className="px-4 py-2 bg-purple-600 text-white rounded"
              >
                Send
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
