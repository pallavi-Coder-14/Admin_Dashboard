import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function OfferSlider({ refresh }) {
  const { user } = useSelector((state) => state.auth);

  const [offers, setOffers] = useState([]);

  /* ================= LOAD ================= */

  const getOffers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/offer/get/${user._id}`
      );

      if (res.data.success) {
        setOffers(res.data.offers);
      }
    } catch {
      toast.error("Failed to load offers ❌");
    }
  };

  useEffect(() => {
    if (user?._id) getOffers();
  }, [user, refresh]);

  if (!offers.length) return null;

  /* Duplicate for smooth loop */
  const loopOffers = [...offers, ...offers];

  /* ================= UI ================= */

  return (
    <div className="relative my-10 overflow-hidden">

      {/* SLIDER TRACK */}
      <div className="offer-track">

        {loopOffers.map((item, i) => (
          <div
            key={i}
            className="
              offer-card
              relative w-72 h-40
              rounded-xl overflow-hidden
              shadow-lg bg-white
              group
            "
          >

            {/* DELETE */}
            <button
              onClick={() => deleteOffer(item._id)}
              className="
                absolute top-2 right-2 z-20
                hidden group-hover:block
                bg-red-500 text-white
                w-6 h-6 rounded-full
                text-xs
              "
            >
              ✕
            </button>

            {/* IMAGE */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="
                w-full h-full object-cover
                group-hover:scale-110
                transition duration-500
              "
            />

            {/* TITLE */}
            <div
              className="
                absolute bottom-0 w-full
                bg-black/60 text-white
                text-sm text-center py-2
              "
            >
              {item.title}
            </div>

          </div>
        ))}

      </div>


      {/* ================= STYLE ================= */}
      <style>
        {`

          .offer-track {
            display: flex;
            gap: 24px;
            width: max-content;
            animation: slide 30s linear infinite;
          }

          .offer-card {
            flex-shrink: 0;
          }

          @keyframes slide {
            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(-50%);
            }
          }

          /* Pause on hover */
          .offer-track:hover {
            animation-play-state: paused;
          }

        `}
      </style>

    </div>
  );
}
