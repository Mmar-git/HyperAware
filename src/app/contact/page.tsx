"use client";
import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import Background from "@/components/Background";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import Loader from "@/components/Loader"; // Import the loader component

const Page: React.FC = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isHighEndDevice, setIsHighEndDevice] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false); // To detect small screens
  const [shouldRenderBackground, setShouldRenderBackground] = useState(true); // Control background rendering
  const [isLoading, setIsLoading] = useState(true); // Track if the page is still loading
  const [enableLenis, setEnableLenis] = useState(true); // Enable or disable Lenis
  const [popupMessage, setPopupMessage] = useState<string>(""); // Popup message content
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Control popup visibility

  const interests: string[] = [
    "Web Development",
    "Branding",
    "Social Media",
    "Content Creation",
    "Photo and videoshoot",
  ];

  const handleInterestClick = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  // Device and screen detection for background rendering
  useEffect(() => {
    const checkDevicePerformance = () => {
      const isHighPerformance = navigator.hardwareConcurrency > 4;
      setIsHighEndDevice(isHighPerformance);
    };

    checkDevicePerformance();
    window.addEventListener("resize", checkDevicePerformance);
    return () => {
      window.removeEventListener("resize", checkDevicePerformance);
    };
  }, []);

  // Handle background rendering based on performance
  useEffect(() => {
    const checkDevicePerformance = () => {
      const isHighPerformance =
        navigator.hardwareConcurrency > 4 && window.innerWidth > 768;

      setShouldRenderBackground(isHighPerformance); // Set background rendering condition
      setIsSmallScreen(window.innerWidth <= 768); // Detect small screens

      // Enable Lenis only for devices with width ≤1920px
      setEnableLenis(window.innerWidth <= 1920);
    };

    checkDevicePerformance();

    window.addEventListener("resize", checkDevicePerformance);
    return () => {
      window.removeEventListener("resize", checkDevicePerformance);
    };
  }, []);

  // Handle form data submission
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    interests: "",
    projectBudget: "",
    query: "",
  });

  const [showPopup, setShowPopup] = useState(false);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .send(
        "service_eek0dx9", // Your EmailJS service ID
        "template_mjv16ju", // Your EmailJS template ID
        {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          query: formData.query,
          interests: selectedInterests.join(", "),
          projectBudget: formData.projectBudget || "Not specified", // Joining selected interests into a comma-separated string
        },
        "t1va5CBC6itxfu0KX" // Your EmailJS user ID (Public Key)
      )
      .then(() => {
        setPopupMessage("Your message has been sent successfully!");
        setIsPopupVisible(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          projectBudget: "",
          interests: "",
          query: "",
        });
        setSelectedInterests([]); // Clear selected interests after submission
      })
      .catch(() => {
        setPopupMessage("Failed to send your message. Please try again later.");
        setIsPopupVisible(true);
      });
  };

  // Close popup after 3 seconds
  useEffect(() => {
    if (isPopupVisible) {
      const timer = setTimeout(() => {
        setIsPopupVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isPopupVisible]);
  // Simulate loading process (replace with actual loading logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide loader after 3 seconds (replace with your actual loading logic)
    }, 3000);

    return () => clearTimeout(timer); // Clean up timer
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader /> // Show the loader while loading
      ) : (
        <div className="min-h-screen flex flex-col">
          {shouldRenderBackground ? (
            <Background /> // Render background animation only on high-end, larger devices
          ) : (
            <div className={styles.background} /> // Fallback static background for low-end or smaller devices
          )}

          {/* Content Section */}
          <div className="flex flex-col md:flex-row w-full mt-20 md:mt-0 justify-center px-4 py-8 md:py-16 gap-16 md:gap-24">
            <div className="w-full md:w-1/2 flex flex-col justify-center text-[#ffffff] gap-24 px-4">
              <div>
                {" "}
                <h2 className="text-4xl md:text-6xl font-medium">
                  Have a great idea?
                </h2>
                <p className="text-xl md:text-2xl">Tell us about it.</p>
              </div>
              <div className="hidden md:flex flex-col">
                <p className="text-2xl text-[#ffffff]">Message Us:</p>
                <div className="flex space-x-6 flex-start py-4">
                  <Link
                    href="https://www.instagram.com/hyperaware_creative_agency/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/Instagram.png"
                      alt=""
                      width={1200}
                      height={1200}
                      className="h-[2rem] w-[2rem] md:h-[3rem] md:w-[3rem]"
                    />
                  </Link>
                  <Link
                    href="https://wa.me/918584948902?text=Hello%2C%20I%20want%20to%20know%20more%20about%20your%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/Whatsapp.png"
                      alt=""
                      width={1200}
                      height={1200}
                      className="h-[2rem] w-[2rem] md:h-[3rem] md:w-[3rem]"
                    />
                  </Link>
                  <Link
                    href="https://www.facebook.com/people/HyperAware/61569192098398/?mibextid=wwXIfr&rdid=ad29Or5UZppVHkpb&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BGHvGPEso%2F%3Fmibextid%3DwwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/facebook.png"
                      alt=""
                      width={1200}
                      height={1200}
                      className="h-[5rem] w-[5rem] md:h-[5rem] md:w-[5rem] -mt-[14px]"
                    />
                  </Link>
                  <Link
                    href="mailto:info@hyperaware.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/email.png"
                      alt=""
                      width={1200}
                      height={1200}
                      className="h-[2rem] w-[2rem] md:h-[3rem] md:w-[3rem]"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center p-4 mt-8 md:mt-0">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Form Inputs */}
                <div className="flex flex-col md:flex-row md:gap-4">
                  <div className="flex flex-col w-full md:w-1/2">
                    <label className="text-gray-400 mb-2">Full Name</label>
                    <input
                      name="fullName"
                      className="p-2 bg-transparent border-b text-gray-400 placeholder-gray-400 focus:outline-none focus:text-[#03bcf4] transition-all duration-300"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col w-full md:w-1/2">
                    <label className="text-gray-400 mb-2">Email</label>
                    <input
                      name="email"
                      className="p-2 bg-transparent border-b text-gray-400 placeholder-gray-400 focus:outline-none focus:text-[#03bcf4] transition-all duration-300"
                      placeholder="youremail@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full md:w-1/2">
                  <label className="text-gray-400 mb-2">Phone</label>
                  <input
                    name="phone"
                    className="p-2 bg-transparent border-b text-gray-400 placeholder-gray-400 focus:outline-none focus:text-[#03bcf4] transition-all duration-300"
                    placeholder="+XX-XXXXXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-gray-400 mb-2">
                    Project Budget (Optional)
                  </label>
                  <input
                    name="projectBudget"
                    className="p-2 bg-transparent border-b text-gray-400 placeholder-gray-400 focus:outline-none focus:text-[#03bcf4] transition-all duration-300"
                    placeholder="Enter your budget"
                    value={formData.projectBudget || ""} // Ensure it's optional
                    onChange={handleChange}
                  />
                </div>
                {/* Interests Section */}
                <div className="w-full flex flex-wrap mt-4 gap-4">
                  <label className="block text-gray-400 mb-2 w-full">
                    I&apos;m interested in...
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {interests.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        className={`px-6 py-2 text-sm rounded-lg transition-transform duration-300 ${
                          selectedInterests.includes(interest)
                            ? "bg-[#03bcf4] text-black"
                            : "bg-gray-800 text-gray-400"
                        } hover:-translate-y-1 hover:opacity-80`}
                        onClick={() => handleInterestClick(interest)}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Query Section */}
                <div className="flex flex-col w-full mt-4">
                  <label className="block text-gray-400 mb-2">Query</label>
                  <textarea
                    name="query"
                    className="w-full p-2 bg-transparent text-[#03bcf4] focus:outline-none"
                    placeholder="Your message"
                    rows={4}
                    value={formData.query}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="w-full mt-6 flex justify-center">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#03bcf4] text-black font-medium rounded-lg hover:bg-[#029dc7] transition-all"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Popup Message */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#03bcf4] text-white p-6 rounded-lg shadow-lg">
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
