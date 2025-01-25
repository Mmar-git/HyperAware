"use client";
import styles from "./page.module.css";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ItemLayout from "@/components/ItemLayout";
import Background from "@/components/Background";
import Image from "next/image";
import Loader from "@/components/Loader"; // Import the loader component

const phrase =
  "At HyperAware, we specialize in creating and redesigning websites that not only look great but also perform seamlessly. Whether you're building a new online presence or refreshing an existing one, our team of skilled developers and designers work closely with you to bring your vision to life.";

const Page = () => {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const body = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false); // To detect small screens
  const [shouldRenderBackground, setShouldRenderBackground] = useState(true); // Control background rendering
  const [isLoading, setIsLoading] = useState(true); // Track if the page is still loading
  const [enableLenis, setEnableLenis] = useState(true); // Enable Lenis for smaller screens

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Run the animation only after loader disappears
    if (!isLoading) {
      createAnimation();
    }
  }, [isLoading]);

  const createAnimation = () => {
    if (container.current && refs.current.length) {
      gsap.to(refs.current, {
        scrollTrigger: {
          trigger: container.current,
          scrub: true,
          start: "top center",
          end: `+=${window.innerHeight / 1.5}`,
        },
        opacity: 1,
        ease: "none",
        stagger: 0.1,
      });
    }
  };

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

  // Simulate loading process (replace with actual loading logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide loader after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Clean up timer
  }, []);

  const splitWords = (phrase: string): JSX.Element[] => {
    const body: JSX.Element[] = [];
    phrase.split(" ").forEach((word, i) => {
      const letters = splitLetters(word);
      body.push(
        <p key={`${word}_${i}`} className="word">
          {letters}
        </p>
      );
    });
    return body;
  };

  const splitLetters = (word: string): JSX.Element[] => {
    const letters: JSX.Element[] = [];
    word.split("").forEach((letter, i) => {
      letters.push(
        <span
          key={`${letter}_${i}`}
          ref={(el) => {
            if (el) refs.current.push(el);
          }}
          className="letter"
        >
          {letter}
        </span>
      );
    });
    return letters;
  };

  return (
    <>
      {isLoading ? (
        <Loader /> // Show the loader while the page is loading
      ) : (
        <div>
          <div className="overflow-hidden flex flex-col items-center">
            {shouldRenderBackground ? (
              <Background /> // Render background animation only on high-end, larger devices
            ) : (
              <div className={styles.background} /> // Fallback static background for low-end or smaller devices
            )}
            <div className="flex flex-col h-screen w-screen justify-center items-center text-[#FFFFFF]">
              <h1
                className="text-[2rem] text-center sm:text-[3rem] md:text-[4rem] lg:text-[5rem] cursor-default"
                style={{
                  fontFamily: "'Koulen', sans-serif",
                }}
              >
                YOUR PATH TO THRIVING ONLINE SUCCESS
              </h1>

              <p
                className="text-md lg:text-2xl text-center w-1/2 cursor-default"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Endless opportunities await—share your vision, and HyperAware
                will bring it to life.
              </p>
            </div>
            <main ref={container} className={styles.main}>
              <div ref={body} className={styles.body}>
                <p className="text-[12rem] s:text-[80px] font-bold text-left text-[#03BCF4] leading-[0.5em]">
                  “
                </p>
                {splitWords(phrase)}
                <p className="text-[12rem] s:text-[80px] font-bold text-left text-[#03BCF4]">
                  “
                </p>
              </div>
            </main>
            <section
              className="py-10 w-[90vw] gap-3 columns-1 sm:columns-2 lg:columns-3 xl:columns-3  space-y-3 text-[#ffffff]"
              style={{
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {/* First Item Layout */}
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Custom Solutions
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  We offer tailor-made websites designed to fit your unique
                  business needs.
                </p>
              </ItemLayout>
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  User-Centered Design
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  Our designs focus on creating intuitive, easy-to-navigate
                  websites that enhance user experience.
                </p>
              </ItemLayout>
              {/* Second Item Layout without paragraph (to test auto width/height change) */}
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Responsive & Mobile-Friendly
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  We ensure your website is fully optimized for any device,
                  offering a smooth experience for all visitors.
                </p>
              </ItemLayout>
            </section>
            <div className="w-[90vw] h-[8rem] flex justify-center items-center glass text-[#ffffff]">
              <h2
                className="text-2xl lg:text-3xl"
                style={{
                  fontFamily: "'Koulen', sans-serif",
                }}
              >
                Our Web Development Services
              </h2>
            </div>
            <section
              className="py-10 w-[90vw] gap-3 columns-1 sm:columns-2 lg:columns-3 xl:columns-3  space-y-3 text-[#ffffff]"
              style={{
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {/* First Item Layout */}
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Consultation & Strategy
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  We begin by understanding your goals and target audience. This
                  helps us develop a roadmap for your website that aligns with
                  your business objectives.
                </p>
              </ItemLayout>
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Design & Development
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  Our team of designers crafts an attractive and user-friendly
                  layout, while our developers build a robust website that meets
                  technical requirements.
                </p>
              </ItemLayout>
              {/* Second Item Layout without paragraph (to test auto width/height change) */}
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Testing & Launch
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  Before going live, we test the website on various devices and
                  browsers to ensure it’s bug-free and optimized for
                  performance.
                </p>
              </ItemLayout>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
