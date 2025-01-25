"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navicons from "./Navicons";
import Link from "next/link";

interface NavbarProps {
  className?: string; // Make sure className is accepted
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    // After flicker animation, set to permanent glow
    const timer = setTimeout(() => {
      setIsGlowing(true);
    }, 2000); // Matches the flicker animation duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Desktop Navbar */}
      <div className="hidden md:flex px-4 py-4 flex items-center justify-between w-full lg:px-6 lg:py-4 h-auto absolute">
        <div className="flex items-center space-x-4">
          <Link href={"/"}>
            <Image
              src="/Logo.png"
              alt="Logo"
              width={1200}
              height={1200}
              className="w-[3rem] h-[3rem]"
            />
          </Link>
        </div>
        <Navicons />
        <Link href="/contact">
          <button className="px-4 py-2 text-white font-bold glass purple">
            Start Your Project
          </button>
        </Link>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden px-4 py-6 flex items-center justify-between w-full h-auto absolute">
        <div className="flex items-center -mt-1 space-x-4">
          <Link href={"/"}>
            <Image
              src="/Logo.png"
              alt="Logo"
              width={1200}
              height={1200}
              className="w-[2rem] h-[2rem]"
            />
          </Link>
        </div>
        <h1
          className="text-[2rem] text-center lg:text-[7rem] animation-moveUp"
          style={{
            fontFamily: "'Koulen', sans-serif",
          }}
        >
          <span
            className={`text-[#0e3742] -ml-4 ${isGlowing ? "glow" : "flicker"}`}
            style={{
              fontFamily: "'Koulen', sans-serif",
            }}
          >
            HYPERAWARE
          </span>
        </h1>
        <button></button>
      </div>
    </div>
  );
};

export default Navbar;
