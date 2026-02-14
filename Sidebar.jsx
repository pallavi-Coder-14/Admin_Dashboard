import React from "react";

export default function Sidebar() {

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const menu = [
    { name: "Dashboard", icon: "📊", id: "dashboard" },
    { name: "Products", icon: "🛒", id: "products" },
    { name: "Orders", icon: "📦", id: "orders" },
    { name: "Users", icon: "👥", id: "users" },
    { name: "Reviews", icon: "⭐", id: "reviews" },
    { name: "Inventory", icon: "🏬", id: "inventory" },
    { name: "Analytics", icon: "📈", id: "analytics" },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-xl border-r z-50">

      {/* Logo */}
      <div className="p-6 text-2xl font-bold text-purple-600 text-center border-b">
        🛍️ E-Shop Admin
      </div>

      {/* Menu */}
      <div className="p-4 space-y-2">

        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="
              w-full flex items-center gap-3 px-4 py-3 rounded-lg
              text-gray-700 hover:bg-purple-100
              transition font-medium
            "
          >
            <span>{item.icon}</span>
            {item.name}
          </button>
        ))}

      </div>

    </div>
  );
}
