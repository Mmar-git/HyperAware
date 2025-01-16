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
import Lenis from "@studio-freight/lenis";
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
      const isHighPerformance =
        navigator.hardwareConcurrency > 4 && window.innerWidth > 768; // High-end devices with larger screens
      setShouldRenderBackground(isHighPerformance); // Set the background rendering condition
      setIsSmallScreen(window.innerWidth <= 768); // Detect small screens

      // Enable Lenis for screen widths <= 1920px (14-inch devices) and disable for larger screens
      setEnableLenis(window.innerWidth <= 1920);
    };

    checkDevicePerformance(); // Initial check on mount

    window.addEventListener("resize", checkDevicePerformance); // Re-check on window resize
    return () => {
      window.removeEventListener("resize", checkDevicePerformance);
    };
  }, []);

  // Initialize or destroy Lenis based on screen size
  useEffect(() => {
    let lenis: Lenis | null = null;

    if (enableLenis) {
      lenis = new Lenis();

      // Define the animation frame function
      const raf = (time: number) => {
        if (lenis) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
      };

      requestAnimationFrame(raf); // Start the animation frame loop
    } else {
      // Restore native scrolling for larger screens
      document.documentElement.style.scrollBehavior = "auto";
      document.body.style.overflow = "auto";
    }

    return () => {
      if (lenis) {
        lenis.destroy(); // Destroy Lenis instance when disabling
        lenis = null;
      }
      // Always ensure native scrolling is restored
      document.documentElement.style.scrollBehavior = "auto";
      document.body.style.overflow = "auto";
    };
  }, [enableLenis]); // Re-run effect when `enableLenis` changes

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
        <Loader /> // Show loader while loading
      ) : (
        <div
          className={`${isSmallScreen ? "overflow-hidden" : ""}`}
          style={{ overflow: isSmallScreen ? "hidden" : "visible" }} // Apply overflow conditionally
        >
          {shouldRenderBackground ? (
            <Background /> // Render background animation only on high-end, larger devices
          ) : (
            <div className={styles.background} /> // Fallback static background for low-end or smaller devices
          )}

          <div className="flex flex-col h-screen justify-center items-center text-[#FFFFFF] px-4">
            <h1
              className="hidden md:flex text-[3rem] lg:text-[7rem] text-center cursor-default"
              style={{ fontFamily: "'Koulen', sans-serif" }}
            >
              STAY AHEAD. <span className="mx-4">STAY</span>
              <span
                className={`${isGlowing ? "glow" : "flicker"} text-[#0e3742]`}
              >
                HYPERAWARE
              </span>
            </h1>
            <h1
              className="flex md:hidden text-[3rem] lg:text-[7rem] text-center cursor-default"
              style={{ fontFamily: "'Koulen', sans-serif" }}
            >
              STAY AHEAD. STAY HYPERAWARE
            </h1>
            <p
              className="text-md lg:text-2xl text-center max-w-2xl cursor-default"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Emphasize the agency’s expertise in anticipating trends Creating
              proactive marketing solutions
            </p>
          </div>

          <div className="flex flex-col items-center text-[#FFFFFF] px-4">
            <h1
              className="text-[3rem] lg:text-[7rem] text-center cursor-default"
              style={{ fontFamily: "'Koulen', sans-serif" }}
            >
              WHAT WE{" "}
              <span
                className={`${isGlowing ? "glow" : "flicker"} text-[#0e3742]`}
              >
                OFFER
              </span>
            </h1>
            <p
              className="text-md lg:text-2xl text-center max-w-4xl cursor-default"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Drive measurable results with cutting-edge strategies tailored to
              your business. Unlock growth with innovative solutions designed to
              amplify your digital presence.
            </p>

            <main ref={container} className={`${styles.main} w-full max-w-5xl`}>
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

          <div className="flex flex-col items-center text-[#FFFFFF] px-4">
            <h1
              className="text-[3rem] lg:text-[7rem] text-center cursor-default"
              style={{ fontFamily: "'Koulen', sans-serif" }}
            >
              LEVEL UP YOUR{" "}
              <span
                className={`${isGlowing ? "glow" : "flicker"} text-[#0e3742]`}
              >
                BUSINESS!
              </span>
            </h1>
            <p
              className="text-md lg:text-2xl text-center max-w-4xl cursor-default"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Attract more clients, serve them better and keep them longer.
            </p>
            <WhyChooseUs />
          </div>

          <h1
            className="text-[3rem] lg:text-[7rem] text-[#FFFFFF] text-center cursor-default"
            style={{ fontFamily: "'Koulen', sans-serif" }}
          >
            MEET OUR CUSTOMERS
          </h1>
          <div className="flex flex-wrap gap-4 justify-center items-center px-6 py-4">
            {[
              "/clients/dtd.jpg",
              "/clients/luvlap.jpg",
              "/clients/tripti.jpg",
              "/clients/kinderchoice.jpg",
              "/clients/sweetcherry.jpg",
              "/clients/youmaa.jpg",
              "/clients/heroto.jpg",
              "/clients/fiori.jpg",
              "/clients/twistbaby.jpg",
              "/clients/maple.jpg",
            ].map((src, index) => (
              <div className="w-[6rem] md:w-[12rem] h-[6rem] rounded-lg overflow-hidden glass">
                <Image
                  key={index}
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
