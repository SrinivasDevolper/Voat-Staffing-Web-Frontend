import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("left");
  const navigate = useNavigate();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <nav className="navbar">
      <div className="flex items-center gap-3">
        {/* Hamburger - Mobile Only */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(true)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Search input - Desktop Only */}
        <div className="flex-1 relative hidden md:block">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-3 top-3 text-gray-400"
            size={20}
          >
            <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="navbar-search hidden md:block px-4 py-2 rounded-lg"
            style={{ paddingRight: "2rem" }}
          />
        </div>
      </div>
      <div className="navbar-center">
        <div className="navbar-logo">
          {/* <img src="/logo.svg" alt="Logo" className="navbar-logo-icon" /> */}
          <span>ASK FINANCE</span>
        </div>
      </div>
      <div className="hidden items-center gap-2 sm:flex">
        <div className="switch-wrapper">
          <div className="switch-background">
            <div
              className={`switch-indicator ${
                activeTab === "right" ? "move-right" : ""
              }`}
            ></div>
            <div
              className={`switch-option ${
                activeTab === "left" ? "active-text" : ""
              }`}
              onClick={() => {
                handleTabClick("left");
              }}
            >
              <a href="https://studentdashboard00.netlify.app" target="_blank">
                User
              </a>
            </div>
            <div
              className={`switch-option ${
                activeTab === "right" ? "active-text" : ""
              }`}
              onClick={() => handleTabClick("right")}
            >
              HR
            </div>
          </div>
        </div>
        <div className="bg-[#0D47A1] rounded-full w-10 h-10 flex items-center justify-center">
          <svg
            stroke="#ffffff"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="1.5em"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0  h-full  w-40 bg-[#0b52c0] p-6 transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ padding: "0.8rem" }}
      >
        <button
          className="text-white text-3xl mb-8"
          onClick={() => setMenuOpen(false)}
        >
          ×
        </button>

        <ul
          className="flex flex-col justify-center gap-6 text-white text-lg"
          style={{ height: "80vh" }}
        >
          <li className="hover:text-gray-300 cursor-pointer w-full border border-white text-center rounded-full">
            Home
          </li>
          <li className="hover:text-gray-300 cursor-pointer w-full border border-white text-center rounded-full">
            Updates
          </li>
          <li className="hover:text-gray-300 cursor-pointer w-full border border-white text-center rounded-full">
            FAQs
          </li>
          <li className="hover:text-gray-300 cursor-pointer w-full border border-white text-center rounded-full">
            Support
          </li>
          <li className="hover:text-gray-300 cursor-pointer w-full border border-white text-center rounded-full">
            Logout
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
