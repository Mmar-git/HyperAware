"use client"; // Ensure this is at the top

import React, { useState } from "react";
import Image from "next/image";
const DropdownMenu = ({ links, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // Toggle dropdown visibility
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close the dropdown when a link is clicked
  };

  return (
    <div className="relative mb-2">
      <button
        onClick={toggleDropdown}
        className={`w-full flex justify-between items-center h-[5rem] bg-transparent focus:outline-none transition-transform duration-500 ${
          isOpen ? "translate-y-[-10px]" : ""
        }`}
        style={{ borderBottom: "0.5px solid #FFFFF0" }}
      >
        {label}
        <Image
          src="/arrow.png"
          alt="arrow"
         width={1200}
         height={1200}
          className={`h-5 w-5 transition-transform duration-500 ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-50 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="p-2 text-[#FFFFF0]">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.url}
                onClick={handleLinkClick} // Close dropdown on link click
                className="block px-4 py-2 hover:bg-gray-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
