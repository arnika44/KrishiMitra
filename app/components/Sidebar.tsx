"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/auth");
  };

  const menuItems = [
    {
      name: "Account",
      icon: "👤",
      action: () => router.push("/profile"),
    },
    {
      name: "User Selection",
      icon: "🔄",
      action: () => router.push("/role"),
    },
    {
      name: "My Crops",
      icon: "🌱",
      action: () => router.push("/crops"),
    },
    {
      name: "More Settings",
      icon: "⚙️",
      action: () => alert("More settings coming soon"),
    },
  ];

  return (
    <>
      {/* Menu Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 w-11 h-11 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-2xl hover:bg-gray-50 transition"
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-white shadow-2xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="px-5 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🌾</div>

            <div>
              <h2 className="text-xl font-bold text-green-800">
                KrishiMitra
              </h2>
              <p className="text-xs text-gray-500">
                Farmer Dashboard
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-2xl text-gray-500 hover:text-gray-800"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Menu */}
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => {
                setOpen(false);
                item.action();
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left font-semibold transition ${
                (item.name === "My Crops" && pathname.startsWith("/crops")) ||
                (item.name === "Account" && pathname === "/profile")
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 font-semibold hover:bg-red-50 transition"
          >
            <span className="text-xl">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}