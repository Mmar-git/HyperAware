"use client";
import styles from "./page.module.css";
import BackgroundPhoto from "@/components/BackgroundPhoto";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ItemLayout from "@/components/ItemLayout";
import Lenis from "@studio-freight/lenis";
import Loader from "@/components/Loader";

const phrase =
  "At HyperAware, we transform your moments into timeless masterpieces with exceptional photography and videography. Whether it's capturing raw emotions or creating cinematic visuals, our lens brings your story to life with precision and creativity. Let us showcase your unique essence through high-quality content that resonates and inspires.";

const Page = () => {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const container = useRef<HTMLDivElement | null>(null);
  const body = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Track page loading
  const [shouldRenderBackground, setShouldRenderBackground] = useState(true); // Control background rendering
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Detect small screens
  const [enableLenis, setEnableLenis] = useState(true); // Enable or disable Lenis

  // Initialize GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!isLoading) {
      createAnimation();
    }
  }, [isLoading]);

  // Manage Lenis scrolling
  useEffect(() => {
    let lenis: Lenis | null = null;

    if (enableLenis) {
      lenis = new Lenis();

      const raf = (time: number) => {
        if (lenis) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
      };

      requestAnimationFrame(raf); // Start Lenis animation loop
    } else {
      // Restore native scrolling for larger screens
      document.documentElement.style.scrollBehavior = "auto";
      document.body.style.overflow = "auto";
    }

    return () => {
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
      // Ensure native scrolling is restored
      document.documentElement.style.scrollBehavior = "auto";
      document.body.style.overflow = "auto";
    };
  }, [enableLenis]);

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

  // Detect device performance and screen size
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

  // Simulate loading process
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide loader after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
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
              <BackgroundPhoto /> // Render background animation only on high-end, larger devices
            ) : (
              <div className={styles.background} /> // Fallback static background for low-end or smaller devices
            )}
            <div className="flex flex-col h-screen w-screen justify-center items-center text-[#FFFFFF]">
              <h1
                className="text-[3rem] text-center lg:text-[5rem] cursor-default"
                style={{
                  fontFamily: "'Koulen', sans-serif",
                }}
              >
                Capturing moments, crafting stories
              </h1>

              <p
                className="text-md lg:text-2xl text-center w-1/2 cursor-default"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                YOUR VISION, OUR LENS
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
            <div className="w-full h-[130vh] p-8 sm:p-16 lg:px-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-3 grid-flow-row-dense">
              <div className="rounded-lg shadow-xl min-h-[200px] col-span-1 sm:col-span-2 row-span-2 relative">
                <video
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  autoPlay
                  muted
                  loop
                  style={{
                    objectFit: "cover", // Ensure the video covers the entire container
                  }}
                >
                  <source src="/content/sweetchery1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div
                className="rounded-lg shadow-xl min-h-[200px]"
                style={{
                  backgroundImage: "url('/content/kinderchoice3.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <div className="rounded-lg shadow-xl min-h-[200px] row-span-2 relative">
                <video
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  autoPlay
                  muted
                  loop
                  style={{
                    objectFit: "cover", // Ensure the video covers the entire container
                  }}
                >
                  <source src="/content/sweetchery2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div
                className="rounded-lg shadow-xl min-h-[200px]"
                style={{
                  backgroundImage: "url('/content/kinderchoice2.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <div
                className="rounded-lg shadow-xl min-h-[200px]"
                style={{
                  backgroundImage: "url('/content/dear2.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
            <section
              className="p-10 w-[450px] md:w-[1000px] lg:w-[1300px] gap-3 columns-1 sm:columns-2 lg:columns-3 xl:columns-3  space-y-3 text-[#ffffff]"
              style={{
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {/* First Item Layout */}
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Expert Team of Creatives
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  Our photographers and videographers are seasoned professionals
                  with years of experience in capturing compelling visuals
                  across industries.
                </p>
              </ItemLayout>
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Tailored Visual Storytelling
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  We focus on creating content that aligns with your brand's
                  voice, helping you connect with your audience in a meaningful
                  way.
                </p>
              </ItemLayout>
              {/* Second Item Layout without paragraph (to test auto width/height change) */}
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  State-of-the-Art Equipment
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  From 4K cameras to professional lighting setups, we use
                  cutting-edge tools to ensure every shot and frame is flawless.
                </p>
              </ItemLayout>
            </section>
            <div className="w-[24rem] lg:w-[76rem] h-[8rem] flex justify-center items-center px-10 lg:px-24 glass text-[#ffffff]">
              <h2
                className="text-2xl lg:text-3xl"
                style={{
                  fontFamily: "'Koulen', sans-serif",
                }}
              >
                Our Photography Services
              </h2>
            </div>
            <section
              className="p-10 w-[450px] md:w-[1000px] lg:w-[1300px] gap-3 columns-1 sm:columns-2 lg:columns-3 xl:columns-3  space-y-3 text-[#ffffff]"
              style={{
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {/* First Item Layout */}
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Product Photography
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  Showcase your products in the best light with clean,
                  professional shots designed to increase conversions.
                </p>
              </ItemLayout>
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Corporate Photography
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  Capture the essence of your business with professional
                  headshots, team photos, and office setups.
                </p>
              </ItemLayout>
              {/* Second Item Layout without paragraph (to test auto width/height change) */}
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Product Demos
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  Simplify complex concepts and showcase your products in action
                  with detailed demo videos.
                </p>
              </ItemLayout>
            </section>
            <div className="flex flex-wrap w-full">
              <div className="w-full lg:w-1/2 h-auto lg:h-[120vh] px-4 py-4 sm:px-8 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className="rounded-lg shadow-xl min-h-[200px] row-span-2"
                  style={{
                    backgroundImage: "url('/content/sweetcherry3.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div
                  className="rounded-lg shadow-xl min-h-[200px]"
                  style={{
                    backgroundImage: "url('/content/dear1.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div
                  className=" rounded-lg shadow-xl min-h-[200px] row-span-2"
                  style={{
                    backgroundImage: "url('/content/sweetcherry4.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="rounded-lg shadow-xl min-h-[200px] relative">
                  {" "}
                  <video
                    className="absolute inset-0 w-full h-full object-cover rounded-lg "
                    autoPlay
                    muted
                    loop
                    style={{
                      objectFit: "cover", // Ensure the video covers the entire container
                    }}
                  >
                    <source src="/content/dtd1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <div className="w-full lg:w-1/2 h-auto lg:h-[120vh] text-[#ffffff] flex flex-col py-4 gap-6 px-4 sm:px-8">
                <ItemLayout className="break-inside-avoid">
                  <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                    Why Visual Content Matters
                  </h2>
                  <p className="font-light text-xs sm:text-sm md:text-sm">
                    Boosts Engagement: High-quality visuals are proven to
                    increase likes, shares, and interactions on digital
                    platforms.
                    <br />
                    Improves Brand Recall: Memorable images and videos leave a
                    lasting impression, making your brand stand out.
                    <br />
                    Drives Conversions: Eye-catching product visuals and
                    promotional videos can significantly improve your ROI.
                    <br />
                    Enhances SEO Performance: Optimized visual content improves
                    your search engine rankings, driving more organic traffic to
                    your site.
                  </p>
                </ItemLayout>
                <ItemLayout className="break-inside-avoid">
                  <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                    Our Creative Process
                  </h2>
                  <p className="font-light text-xs sm:text-sm md:text-sm">
                    Consultation & Concept Development: We start by
                    understanding your goals and brainstorming creative concepts
                    that resonate with your audience.
                    <br />
                    Pre-Production Planning: From location scouting to
                    scriptwriting and storyboarding, we handle every detail to
                    ensure a seamless shoot.
                    <br />
                    Production Day: Our team captures stunning visuals using
                    top-tier equipment, ensuring the highest production quality.
                    <br />
                    Post-Production Excellence: We edit and enhance every photo
                    and video, delivering polished content that aligns with your
                    brand’s vision.
                  </p>
                </ItemLayout>
                <ItemLayout className="break-inside-avoid">
                  <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                    Elevate Your Brand with Stunning Visuals
                  </h2>
                  <p className="font-light text-xs sm:text-sm md:text-sm">
                    At HyperAware, we’re passionate about helping businesses
                    stand out with high-quality photography and videography. Let
                    us create visual content that drives engagement, boosts
                    brand awareness, and converts viewers into loyal customers.
                    📩 Contact us today to discuss how we can transform your
                    brand with professional photography and videography
                    services.
                  </p>
                </ItemLayout>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
