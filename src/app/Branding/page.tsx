"use client";
import styles from "./page.module.css";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ItemLayout from "@/components/ItemLayout";
import Background from "@/components/Background";
import Loader from "@/components/Loader"; // Import the loader component

const phrase =
  "At HyperAware, we believe in creating powerful brands that resonate with your audience and stand out in a competitive market. Our branding services are designed to bring your unique vision to life through compelling storytelling, captivating visuals, and consistent messaging.";

const Page = () => {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const body = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [isHighEndDevice, setIsHighEndDevice] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false); // To detect small screens
  const [shouldRenderBackground, setShouldRenderBackground] = useState(true); // Control background rendering
  const [isLoading, setIsLoading] = useState(true); // Track if the page is still loading
  const [enableLenis, setEnableLenis] = useState(true); // Enable or disable Lenis

  // Register GSAP and ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!isLoading) {
      createAnimation();
    }
  }, [isLoading]);

  // Animation function
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

  // Device performance check and background rendering control
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

  // Simulate loading process (replace with actual loading logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide loader after 3 seconds (replace with your actual loading logic)
    }, 3000);

    return () => clearTimeout(timer); // Clean up timer
  }, []);

  const splitWords = (phrase: string): JSX.Element[] => {
    let body: JSX.Element[] = [];
    phrase.split(" ").forEach((word, i) => {
      const letters = splitLetters(word);
      body.push(
        <p key={word + "_" + i} className="word">
          {letters}
        </p>
      );
    });
    return body;
  };

  const splitLetters = (word: string): JSX.Element[] => {
    let letters: JSX.Element[] = [];
    word.split("").forEach((letter, i) => {
      letters.push(
        <span
          key={letter + "_" + i}
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
                Crafting Brands that Resonate
              </h1>

              <p
                className="text-md lg:text-2xl text-center w-1/2 cursor-default"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Creating unforgettable brands that drive success.
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
              className="py-10 w-[90vw] gap-3 columns-1 sm:columns-1 lg:columns-3 xl:columns-3  space-y-3 text-[#ffffff]"
              style={{
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {/* First Item Layout */}
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Brand Discovery & Research
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  We start by understanding your business, your audience, and
                  your goals. This in-depth research forms the foundation of a
                  brand strategy that will set you apart.
                </p>
              </ItemLayout>
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Logo Design & Identity
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  We create a memorable logo and visual identity that
                  encapsulates your brand&apos;s personality. Whether it&apos;s
                  minimalist or bold, your logo will resonate with your target
                  market and leave a lasting impression.
                </p>
              </ItemLayout>
              {/* Second Item Layout without paragraph (to test auto width/height change) */}
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Brand Strategy & Positioning
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  We help define your brand’s positioning in the market and
                  ensure it communicates your unique value proposition. This
                  strategy acts as the roadmap for all future brand decisions.
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
                Our Branding Services
              </h2>
            </div>
            <section
              className="py-10 w-[90vw] gap-3 columns-1 sm:columns-1 lg:columns-3 xl:columns-3  space-y-3 text-[#ffffff]"
              style={{
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {/* First Item Layout */}
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Logo Design
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  A powerful logo that reflects your brand’s personality and
                  resonates with your audience.
                </p>
              </ItemLayout>
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Complete Visual Identity
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  Consistent colors, typography, and graphic elements that
                  reflect your brand’s unique characteristics.
                </p>
              </ItemLayout>
              {/* Second Item Layout without paragraph (to test auto width/height change) */}
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Brand Strategy & Positioning
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  Defining your market position and brand values to ensure
                  success.
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
