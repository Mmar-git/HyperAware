"use client";
import styles from "./page.module.css";
import BackgroundAbout from "@/components/BackgroundAbout";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ItemLayout from "@/components/ItemLayout";
import Modal from "@/components/modal";
import Project from "@/components/project";
import Lenis from "@studio-freight/lenis";
import Link from "next/link";
import Loader from "@/components/Loader"; // Importing the loader component

const phrase =
  "At Hyperaware, we exist to keep brands ahead of the curve in an ever-evolving digital landscape. We are passionate about crafting human-centric and datadriven marketing strategies that don’t just capture attention—they inspire action. We exist to help brands not only stay ahead of the curve but also resonate on a personal, emotional level with their audiences. Hyperaware ensures your brand is seen, remembered, and trusted";

const projects = [
  { title: "SweetCherry", src: "clients/sweetcherry.jpg" },
  { title: "DeartoDad", src: "clients/dtd.jpg" },
  { title: "Fiori", src: "clients/fiori.jpg" },
  { title: "HeroTo", src: "clients/heroto.jpg" },
  { title: "Maple", src: "clients/maple.jpg" },
  { title: "Twist Baby", src: "clients/twistbaby.jpg" },
  { title: "Youma", src: "clients/youmaa.jpg" },
];

const Page = () => {
  let refs = useRef<(HTMLSpanElement | null)[]>([]);
  const body = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [isLoading, setIsLoading] = useState(true); // Track if the page is still loading
  const [shouldRenderBackground, setShouldRenderBackground] = useState(true); // Control background rendering
  const [isSmallScreen, setIsSmallScreen] = useState(false); // To detect small screens
  const [enableLenis, setEnableLenis] = useState(true); // Enable or disable Lenis

  // Initialize GSAP and ScrollTrigger only after loading is complete
  useEffect(() => {
    if (!isLoading) {
      gsap.registerPlugin(ScrollTrigger);
      createAnimation(); // Run the animation logic when loading is complete
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

  // Initialize Lenis for smooth scrolling on small screens
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
      // Ensure native scrolling is restored
      document.documentElement.style.scrollBehavior = "auto";
      document.body.style.overflow = "auto";
    };
  }, [enableLenis]); // Re-run effect when `enableLenis` changes

  // Device performance check for background rendering
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
              <BackgroundAbout /> // Render background animation only on high-end, larger devices
            ) : (
              <div className={styles.background} /> // Fallback static background for low-end or smaller devices
            )}
            <div className="flex flex-col h-screen w-screen justify-center items-center text-[#FFFFFF]">
              <h1
                className="text-[3rem] text-center lg:text-[7rem] cursor-default"
                style={{
                  fontFamily: "'Koulen', sans-serif",
                }}
              >
                YOU ARE IN GOOD HANDS!
              </h1>

              <p
                className="text-md lg:text-2xl text-center w-1/2 cursor-default"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Driving success with trend-focused insights and proactive
                marketing solutions.
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
              className="p-10 w-[450px] md:w-[1000px] lg:w-[1300px] gap-3 columns-1 sm:columns-2 lg:columns-3 xl:columns-3  space-y-3 text-[#ffffff]"
              style={{
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {/* First Item Layout */}
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Who We Are
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  Hyperaware is more than a digital marketing agency—we’re a
                  team of creatives, strategists, and analysts who specialize in
                  helping brands thrive by staying hyperattuned to industry
                  trends, consumer behaviors, and technological advancements.
                </p>
              </ItemLayout>
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Why HyperAware
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  We do not believe in generic marketing strategies focused only
                  on numbers. We help your brand connect with the actual human
                  beings who will buy your products or services.In a world
                  dominated by algorithms and automation, we believe that the
                  human touch is essential to successful digital marketing.
                </p>
              </ItemLayout>
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Our Mission
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  At HyperAware, our mission is simple yet powerful: to empower
                  businesses with innovative digital strategies that drive
                  growth, enhance visibility, and build lasting relationships
                  with their audiences. We are passionate about transforming
                  ideas into reality and making brands hyper-relevant in a
                  competitive digital landscape.
                </p>
              </ItemLayout>
            </section>

            <div className="glass p-10 lg:p-24 text-[#ffffff] w-[24rem] lg:w-[64rem] flex flex-col items-center">
              <h2 className="text-4xl font-semibold pb-10">Our Clients</h2>
              {projects.map((project, index) => {
                return (
                  <Project
                    index={index}
                    title={project.title}
                    setModal={setModal}
                    key={index}
                  />
                );
              })}
            </div>
            <Modal modal={modal} projects={projects} />
            <div className="text-[#ffffff] p-10 flex flex-col justify-center items-center gap-3">
              <h2 className="text-4xl font-semibold">Get started Now!</h2>
              <p className="text-md">
                Don’t get left behind in this digital revolution
              </p>
              <Link href="/contact">
                <button className="px-4 py-2 text-white font-bold glass">
                  Start Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
