import React, { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

import AddModal from "../components/AddModal";
import AddBrandModal from "../components/AddBrandModal";
import OfferModal from "../components/AddOfferModal";

import BrandSlider from "../components/BrandSlider";
import OfferSlider from "../components/OfferSlider";

import Footer from "../components/Footer";
import AdminAnalytics from "../components/AdminAnalytics";
import OrderManagement from "../components/OrderManagement";
import UserManagement from "../components/UserManagement";
import ReviewManagement from "../components/ReviewManagement";
import InventoryManagement from "../components/InventoryManagement";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Home() {

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  /* ================= STATES ================= */

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [activeCategory, setActiveCategory] = useState("All");

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openBrandModal, setOpenBrandModal] = useState(false);
  const [openOfferModal, setOpenOfferModal] = useState(false);

  const [refreshSlider, setRefreshSlider] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  // For edit
  const [editData, setEditData] = useState(null);

  const fetched = useRef(false);

  const categories = [
    "All",
    "Men",
    "Women",
    "Kids",
    "Electronics",
    "Accessories",
  ];

  /* ================= AUTH ================= */

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  /* ================= LOAD ================= */

  useEffect(() => {
    if (!user?._id || fetched.current) return;

    fetched.current = true;
    loadProducts();

  }, [user]);

  const loadProducts = async () => {

    try {

      const res = await axios.get(
        `http://localhost:8000/product/getProducts/${user._id}`
      );

      if (res.data.success) {
        setProducts(res.data.products);
      }

    } catch {
      toast.error("Failed to load products ❌");
    }
  };

  /* ================= ADD ================= */

  const addProduct = async (data) => {

    try {

      await axios.post(
        `http://localhost:8000/product/create/${user._id}`,
        data
      );

      toast.success("Product added ✅");

      setOpenAddModal(false);

      loadProducts();

    } catch {
      toast.error("Add failed ❌");
    }
  };

  /* ================= EDIT ================= */

  const handleEdit = (product) => {

    setEditData(product);

    setOpenAddModal(true); // reuse modal

  };

  const updateProduct = async (data) => {

    try {

      await axios.put(
        `http://localhost:8000/product/update/${editData._id}`,
        data
      );

      toast.success("Updated ✅");

      setEditData(null);
      setOpenAddModal(false);

      loadProducts();

    } catch (err) {

      console.log(err.response?.data);

      toast.error("Update failed ❌");
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this product?")) return;

    try {

      await axios.delete(
        `http://localhost:8000/product/delete/${id}` // ✅ FIXED
      );

      toast.success("Deleted ✅");

      loadProducts();

    } catch (err) {

      console.log(err.response?.data);

      toast.error("Delete failed ❌");
    }
  };

  /* ================= BRAND ================= */

  const addBrand = async (data) => {

    try {

      await axios.post(
        `http://localhost:8000/brand/create/${user._id}`,
        data
      );

      toast.success("Brand added ✅");

      setOpenBrandModal(false);

      setRefreshSlider((p) => !p);

    } catch {
      toast.error("Brand failed ❌");
    }
  };

  /* ================= OFFER ================= */

  const addOffer = async (data) => {

    try {

      await axios.post(
        `http://localhost:8000/offer/create/${user._id}`,
        data
      );

      toast.success("Offer added ✅");

      setOpenOfferModal(false);

      setRefreshSlider((p) => !p);

    } catch {
      toast.error("Offer failed ❌");
    }
  };

  /* ================= FILTER ================= */

  const filteredProducts = products.filter((p) => {

    const matchSearch =
      p.title?.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      activeCategory === "All" ||
      p.category === activeCategory;

    return matchSearch && matchCategory;
  });

  /* ================= SCROLL ================= */

  const scrollTo = (id) => {

    setOpenSidebar(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  /* ================= TYPING ================= */

  const TypingText = () => {

    const texts = [
      "Create Products",
      "Manage Orders",
      "Handle Users",
      "Analyze Sales",
      "Grow Business",
    ];

    const [index, setIndex] = useState(0);
    const [text, setText] = useState("");
    const [del, setDel] = useState(false);

    useEffect(() => {

      const current = texts[index];

      const speed = del ? 60 : 120;

      const timer = setTimeout(() => {

        if (!del) {

          setText(current.slice(0, text.length + 1));

          if (text === current) {
            setTimeout(() => setDel(true), 1000);
          }

        } else {

          setText(current.slice(0, text.length - 1));

          if (text === "") {
            setDel(false);
            setIndex((i) => (i + 1) % texts.length);
          }
        }

      }, speed);

      return () => clearTimeout(timer);

    }, [text, del, index]);

    return <span className="text-gray-700">{text}</span>;
  };

  /* ================= UI ================= */

  return (
    <>

      {/* NAVBAR */}

      <Navbar
        onAddClick={() => {
          setEditData(null);
          setOpenAddModal(true);
        }}
        onBrandClick={() => setOpenBrandModal(true)}
        onOfferClick={() => setOpenOfferModal(true)}
        search={search}
        setSearch={setSearch}
        onMenuClick={() => setOpenSidebar(true)}
      />


      {/* SIDEBAR */}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50
        transition-transform ${openSidebar ? "translate-x-0" : "-translate-x-full"}`}
      >

        <div className="p-4 border-b flex justify-between">

          <h2 className="font-bold text-purple-600">
            Dashboard
          </h2>

          <button onClick={() => setOpenSidebar(false)}>
            ✖
          </button>

        </div>

        <div className="p-4 space-y-2">

          <SidebarBtn text="🎯 Offers" onClick={() => scrollTo("offers")} />
          <SidebarBtn text="📦 Products" onClick={() => scrollTo("products")} />
          <SidebarBtn text="📊 Analytics" onClick={() => scrollTo("analytics")} />
          <SidebarBtn text="🧾 Orders" onClick={() => scrollTo("orders")} />
          <SidebarBtn text="👥 Users" onClick={() => scrollTo("users")} />
          <SidebarBtn text="⭐ Reviews" onClick={() => scrollTo("reviews")} />
          <SidebarBtn text="🏬 Inventory" onClick={() => scrollTo("inventory")} />

        </div>

      </div>


      {/* MODALS */}

      <AddModal
        isOpen={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
          setEditData(null);
        }}
        onSubmit={editData ? updateProduct : addProduct}
        defaultData={editData}   // for edit
      />

      <AddBrandModal
        isOpen={openBrandModal}
        onClose={() => setOpenBrandModal(false)}
        onSubmit={addBrand}
      />

      <OfferModal
        isOpen={openOfferModal}
        onClose={() => setOpenOfferModal(false)}
        onSubmit={addOffer}
      />


      {/* MAIN */}

      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-purple-50 p-8">

        {/* HEADER */}

        <div className="text-center mb-16">

          <h1
            className="
              text-4xl md:text-5xl font-bold mb-3
              bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500
              bg-[length:200%_200%]
              bg-clip-text text-transparent
              animate-gradient
              hover:scale-105
              transition
            "
          >
            Welcome to E-Shop Admin Dashboard
          </h1>

          <p className="text-lg font-medium">

            <span className="text-purple-600">
              Admin can{" "}
            </span>

            <TypingText />

          </p>

        </div>


        {/* OFFERS */}

        <section id="offers">

          <div className="flex flex-wrap justify-center gap-3 mb-8">

            {categories.map((cat) => (

              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-4 py-2 rounded-full font-medium transition
                  ${
                    activeCategory === cat
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-purple-100"
                  }
                `}
              >
                {cat}
              </button>

            ))}

          </div>
          <div className="text-center mb-16">
           <h2 className="text-3xl font-bold text-purple-600">
          Manage Brands & Offers
        </h2>
          </div>


          <BrandSlider refresh={refreshSlider} />
          <OfferSlider refresh={refreshSlider} />

        </section>



       <div className="text-center mb-16">
           <h2 className="text-3xl font-bold text-purple-600">
          Manage Products
        </h2>
          </div>

        {/* PRODUCTS */}

        <section
          id="products"
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >

          {filteredProducts.length ? (

            filteredProducts.map((p) => (

              <Card
                key={p._id}
                items={p}
                handleEdit={() => handleEdit(p)}      // ✅ FIX
                handleDelete={() => handleDelete(p._id)} // ✅ FIX
              />

            ))

          ) : (

            <p className="col-span-full text-center text-gray-500">
              No products found 📦
            </p>

          )}

        </section>
<br></br>
<div className="text-center mb-16">
           <h2 className="text-3xl font-bold text-purple-600">
          Analytics
        </h2>
          </div>
        {/* OTHER */}

        <section id="analytics" className="mt-24">
          <AdminAnalytics />
        </section>

        <section id="orders" className="mt-24">
          <OrderManagement />
        </section>

        <section id="users" className="mt-24">
          <UserManagement />
        </section>

        <section id="reviews" className="mt-24">
          <ReviewManagement />
        </section>

        <section id="inventory" className="mt-24">
          <InventoryManagement />
        </section>

        <Footer />

      </div>


      {/* GRADIENT */}

      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animate-gradient {
            animation: gradientMove 3s ease infinite;
          }
        `}
      </style>

    </>
  );
}


/* SIDEBAR BTN */

function SidebarBtn({ text, onClick }) {

  return (

    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 rounded hover:bg-purple-100"
    >
      {text}
    </button>

  );
}
