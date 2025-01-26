"use client";
import Image from "next/image";
import Link from "next/link";
import DropdownMenu from "./DropdownMenu";
import React, { useState } from "react";
import emailjs from "emailjs-com";
const link1 = [
  { id: 1, label: "Website Development", url: "/Website" },
  { id: 1, label: "Branding", url: "/Branding" },
  { id: 1, label: "Social Media", url: "/Social" },
  { id: 1, label: "Content Creation", url: "/Content" },
  { id: 1, label: "Photography and Videography", url: "/Photo" },
];
const link2 = [{ id: 1, label: "Our Story", url: "/about" }];
const link3 = [{ id: 1, label: "Contact Form", url: "/contact" }];

const Footer = () => {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    query: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  // Explicitly type 'e' as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Type 'e' as React.FormEvent<HTMLFormElement> for the form submission event
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Replace with your EmailJS service ID, template ID, and user ID
    emailjs
      .send(
        "service_ftyb7rg", // e.g., "service_xyz"
        "template_0cf2mfa", // Template ID
        {
          title: formData.title,
          firstName: "Newsletter",
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          query: formData.query,
        },
        "8IrSdKjIYTRKJlNIW" // e.g., "user_ABC123"
      )
      .then(() => {
        setShowPopup(true);
        setFormData({
          title: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          query: "",
        });
      })
      .catch((error) => console.error("Failed to send email:", error));
  };
  return (
    <div
      className="py-12 px-4 md:px-8 md:py-16 lg:px-16 xl:16 2xl:px-24 text-xl text-[#FFFFFF] glass relative bottom-0 left-0 right-0"
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* DESKTOP */}
      <div className="hidden lg:flex gap-24">
        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            <Image
              src="/Logofull.png"
              alt=""
              width={1200}
              height={1200}
              className="mt-2 ml-8 h-[12rem] w-[16rem]"
            />
          </Link>
        </div>
        {/* CENTER */}
        <div className="hidden lg:flex justify-between w-2/3">
          <div className="flex flex-col">
            <h1 className="font-medium text-lg cursor-default">Services</h1>
            <div className="flex flex-col gap-3 mt-4 text-sm text-gray-500">
              <Link href="/Branding">Branding</Link>
              <Link href="/Website">Website Development</Link>

              <Link href="/Social">Social Media Marketing</Link>
              <Link href="/Content">Content Creation</Link>
              <Link href="/Photo">Photoshoot and Videoshoot</Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="font-medium text-lg cursor-default">About us</h1>
            <div className="flex flex-col gap-3 mt-4 text-sm text-gray-500">
              <Link href="/about">Our Story</Link>
            </div>
          </div>
          <div className="flex flex-col">
            <Link href="/contact">
              <h1 className="font-medium text-lg ">Contact Us</h1>
            </Link>
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div className="flex lg:hidden flex-col">
        {/* LEFT */}
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/Logofull.png"
            alt=""
            width={1200}
            height={1200}
            className="mt-2 ml-8 h-[8rem] w-[10rem]"
          />
        </Link>
        {/* CENTER */}
        <div className="px-5 justify-between text-2xl">
          <DropdownMenu links={link1} label="Services" />
          <DropdownMenu links={link2} label="About" />
          <DropdownMenu links={link3} label="Contact" />
        </div>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col items-center gap-2 mt-16">
        <Link href="/" className="flex flex-start">
          <Image
            src="/Logo.png"
            alt=""
            width={1200}
            height={1200}
            className="mt-2 ml-8 h-10 w-10"
          />
        </Link>
        <div className="text-sm md:text-lg text-center">
          ©2024 HyperAware. All rights reserved. Powered By HyperAware
        </div>
      </div>
    </div>
  );
};

export default Footer;
