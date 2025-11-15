import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  IoChatbubble,
  IoHome,
  IoSearch,
  IoNotifications,
  IoPerson,
  IoPeople,
  IoMenu,
  IoClose,
} from "react-icons/io5";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: <IoHome />, to: "/" },
    { name: "Friends", icon: <IoPeople />, to: "/friends" },
    { name: "Search", icon: <IoSearch />, to: "/search" },
    { name: "Notifications", icon: <IoNotifications />, to: "/notifications" },
    { name: "Account", icon: <IoPerson />, to: "/account" },
  ];

  return (
    <nav className="bg-background text-text border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-around px-4 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl text-primary select-none">
          <IoChatbubble className="text-3xl" />
          <span>Socilify</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 
                ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-gray-600 hover:text-primary hover:bg-primary/10"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-primary transition-transform hover:scale-110"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
          <div className="flex flex-col gap-2 py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:text-primary hover:bg-primary/10 transition-all"
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
