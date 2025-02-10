"use client";
import React, { useEffect, useState, useRef } from "react";
import ServicesShowcase from "@/components/StackingCards";
import styles from "./page.module.css";
import WhyChooseUs from "@/components/whyChooseUs";
import Background from "@/components/Background";
import Image from "next/image";
import { projects } from "@/data";
import Card from "@/components/Card"; // This is your Card component with the parallax effect
import CardMobile from "@/components/CardMobile"; // New CardMobile component for small screens
import { useScroll } from "framer-motion";
import Loader from "@/components/Loader"; // Import the loader

const Page = () => {
  const [isLoading, setIsLoading] = useState(true); // Track if the page is still loading
  const [isGlowing, setIsGlowing] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false); // To detect small screens
  const [shouldRenderBackground, setShouldRenderBackground] = useState(true); // Control background rendering
  const [enableLenis, setEnableLenis] = useState(true); // Enable or disable Lenis scroll based on screen size

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGlowing(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Check for device performance and screen size
  useEffect(() => {
    const checkDevicePerformance = () => {
      try {
        const isHighPerformance =
          navigator.hardwareConcurrency > 4 && window.innerWidth > 768; // High-end devices with larger screens
        setShouldRenderBackground(isHighPerformance); // Render dynamic background if high performance
        setIsSmallScreen(window.innerWidth <= 768); // Detect small screens

        // Enable Lenis for screen widths <= 1920px (14-inch devices) and disable for larger screens
        setEnableLenis(window.innerWidth <= 1920);
      } catch (error) {
        console.error("Error checking device performance:", error);
        // Fallback: Render the static background
        setShouldRenderBackground(false);
        // Optionally, set defaults for other states if necessary:
        setIsSmallScreen(window.innerWidth <= 768);
        setEnableLenis(window.innerWidth <= 1920);
      }
    };

    checkDevicePerformance(); // Initial check on mount
    window.addEventListener("resize", checkDevicePerformance); // Re-check on window resize

    return () => {
      window.removeEventListener("resize", checkDevicePerformance);
    };
  }, []);

  // Initialize or destroy Lenis based on screen size

  // Simulate loading time for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide loader after 3 seconds (replace with your actual loading logic)
    }, 3000);

    return () => clearTimeout(timer); // Clean up timer
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-screen mx-auto overflow-hidden md:overflow-visible">
          {shouldRenderBackground ? (
            <Background />
          ) : (
            <div className={styles.background} />
          )}

          <div className="flex flex-col h-screen justify-center items-center text-[#FFFFFF] px-2 mx-auto">
            <h1
              className="hidden md:flex text-[2.5rem] lg:text-[6.5rem] text-center cursor-default"
              style={{
                fontFamily: "'Koulen', sans-serif",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              STAY AHEAD. <span className="mx-2">STAY</span>
              <span
                className={`${
                  isGlowing ? "glow" : "flicker"
                } text-[#0e3742] mx-2`}
                style={{ userSelect: "none", pointerEvents: "none" }}
              >
                HYPERAWARE
              </span>
            </h1>
            <h1
              className="flex md:hidden text-[2.5rem] lg:text-[6.5rem] text-center cursor-default"
              style={{ fontFamily: "'Koulen', sans-serif" }}
            >
              STAY AHEAD. STAY HYPERAWARE
            </h1>
            <p
              className="text-sm lg:text-xl text-center max-w-xl cursor-default"
              style={{
                fontFamily: "'Poppins', sans-serif",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              We connect, engage, and convert with psychology-driven strategies.
            </p>
          </div>

          <div className="flex flex-col items-center text-[#FFFFFF] px-2 mx-auto">
            <h1
              className="text-[2.5rem] lg:text-[6.5rem] text-center cursor-default"
              style={{
                fontFamily: "'Koulen', sans-serif",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              WHAT WE{" "}
              <span
                className={`${isGlowing ? "glow" : "flicker"} text-[#0e3742]`}
                style={{ userSelect: "none", pointerEvents: "none" }}
              >
                OFFER
              </span>
            </h1>
            <p
              className="text-sm lg:text-xl text-center max-w-3xl cursor-default pb-4"
              style={{
                fontFamily: "'Poppins', sans-serif",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              Don’t just stand out - become unforgettable.
            </p>

            <main
              ref={container}
              className={`${styles.main} w-full max-w-screen mx-auto`}
            >
              {projects.map((project, i) => {
                const targetScale = 1 - (projects.length - i) * 0.05;
                return (
                  <Card
                    key={`p_${i}`}
                    i={i}
                    {...project}
                    progress={scrollYProgress}
                    range={[i * 0.25, 1]}
                    targetScale={targetScale}
                  />
                );
              })}
            </main>
          </div>

          {isSmallScreen && <CardMobile />}

          <div className="flex flex-col items-center text-[#FFFFFF] px-2 mx-auto">
            <h1
              className="text-[2.5rem] lg:text-[6.5rem] text-center cursor-default"
              style={{
                fontFamily: "'Koulen', sans-serif",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              LEVEL UP YOUR{" "}
              <span
                className={`${isGlowing ? "glow" : "flicker"} text-[#0e3742]`}
                style={{ userSelect: "none", pointerEvents: "none" }}
              >
                BUSINESS!
              </span>
            </h1>
            <p
              className="text-sm lg:text-xl text-center max-w-3xl cursor-default"
              style={{
                fontFamily: "'Poppins', sans-serif",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              Attract more clients, serve them better and keep them longer.
            </p>
            <WhyChooseUs />
          </div>

          <h1
            className="text-[2.5rem] lg:text-[6.5rem] text-[#FFFFFF] text-center cursor-default"
            style={{
              fontFamily: "'Koulen', sans-serif",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            MEET OUR CLIENTS
          </h1>
          <div className="flex flex-wrap gap-2 justify-center items-center px-4 py-2 mx-auto">
            {[
              "/clients/dtd.jpg",
              "/clients/luvlap.jpg",
              "/clients/tripti.jpg",
              "/clients/kinderchoice.jpg",
              "/clients/youmaa.jpg",
              "/clients/heroto.jpg",
            ].map((src, index) => (
              <div
                key={index}
                className="w-[5rem] md:w-[10rem] h-[5rem] rounded-lg overflow-hidden glass"
              >
                <Image
                  className="w-full h-full object-contain"
                  src={src}
                  alt={`logo-${index}`}
                  width={500}
                  height={500}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
