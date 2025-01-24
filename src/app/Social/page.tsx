"use client";
import styles from "./page.module.css";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ItemLayout from "@/components/ItemLayout";
import Background from "@/components/Background";
import Loader from "@/components/Loader"; // Import the loader component

const phrase =
  "At HyperAware, we turn likes into leads and followers into loyal customers. With strategic social media marketing, we help your brand grow, engage, and thrive in the digital space. Our expert team creates tailored strategies to ensure your social media presence drives real results.";

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
                className="text-[3rem] text-center lg:text-[5rem] cursor-default"
                style={{
                  fontFamily: "'Koulen', sans-serif",
                }}
              >
                Amplifying Brands, Driving Engagement
              </h1>

              <p
                className="text-md lg:text-2xl text-center w-1/2 cursor-default"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Boost your brand with targeted social strategies
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
                  Customized Strategies for Every Platform
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  Every social media platform is unique, and so is your
                  audience. We craft personalized strategies for platforms like
                  Facebook, Instagram, LinkedIn, Twitter, and TikTok to maximize
                  your reach.
                </p>
              </ItemLayout>
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Engaging Content Creation
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  From scroll-stopping graphics to viral videos, we create
                  high-quality content that resonates with your audience and
                  amplifies your brand message.
                </p>
              </ItemLayout>
              {/* Second Item Layout without paragraph (to test auto width/height change) */}
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Data-Driven Campaigns
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  Our team leverages analytics and insights to design campaigns
                  that deliver measurable ROI and boost your online visibility.
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
                Our Social Media Services
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
                  Social Media Strategy Development
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  We analyze your brand, industry, and competitors to craft a
                  winning social media strategy tailored to your business goals.
                </p>
              </ItemLayout>
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Content Planning & Creation
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  Our team designs and creates posts, videos, and stories that
                  captivate your audience and drive engagement.
                </p>
              </ItemLayout>
              {/* Second Item Layout without paragraph (to test auto width/height change) */}
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Social Media Management
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  Stay consistent with our end-to-end social media management,
                  including posting schedules, community engagement, and
                  analytics reporting.
                </p>
              </ItemLayout>
            </section>
            <div className="flex flex-wrap w-full">
              {/* Left Section */}
              <div className="w-full lg:w-1/2 h-auto lg:h-[120vh] px-4 py-4 sm:px-8 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <source src="/content/dtd1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div
                  className="rounded-lg shadow-xl min-h-[200px]"
                  style={{
                    backgroundImage: "url('/content/kinderchoice1.jpg')",
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
                    <source src="/content/heroto1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div
                  className="rounded-lg shadow-xl min-h-[200px]"
                  style={{
                    backgroundImage: "url('/content/dear4.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>

              {/* Right Section */}
              <div className="w-full lg:w-1/2 h-auto lg:h-[120vh] text-[#ffffff] flex flex-col py-4 gap-6 px-4 sm:px-8">
                <ItemLayout className="break-inside-avoid">
                  <h2 className="text-xl font-bold md:text-lg text-left capitalize">
                    Benefits of Social Media Marketing
                  </h2>
                  <p className="font-light text-sm">
                    Increases Brand Awareness: Build a strong online presence
                    and reach a larger audience through strategic campaigns.
                    <br />
                    Enhances Customer Engagement: Foster authentic connections
                    with your audience through interactive posts, stories, and
                    live sessions.
                    <br />
                    Generates Leads & Conversions: Turn followers into customers
                    with targeted social ads and promotions.
                    <br />
                    Provides Valuable Insights: Understand your audience better
                    with analytics that guide future strategies.
                  </p>
                </ItemLayout>
                <ItemLayout className="break-inside-avoid">
                  <h2 className="text-xl font-bold md:text-lg text-left capitalize">
                    Our Proven Process
                  </h2>
                  <p className="font-light text-sm">
                    Audit & Analysis: We start with a comprehensive audit of
                    your current social media performance to identify
                    opportunities for improvement.
                    <br />
                    Strategy Development: Our team designs a custom strategy
                    aligned with your business objectives and audience
                    preferences.
                    <br />
                    Content Creation & Scheduling: We create visually appealing,
                    engaging content and schedule it for maximum impact.
                    <br />
                    Monitoring & Optimization: We continuously monitor
                    performance metrics to refine strategies and ensure optimal
                    results.
                  </p>
                </ItemLayout>
                <ItemLayout className="break-inside-avoid">
                  <h2 className="text-xl font-bold md:text-lg text-left capitalize">
                    Transform Your Social Media Presence
                  </h2>
                  <p className="font-light text-sm">
                    At HyperAware, we don’t just manage social media—we create
                    meaningful connections between your brand and your audience.
                    Let us help you grow your online presence, build trust, and
                    achieve your business goals with cutting-edge social media
                    strategies. 📩 Contact us today to learn how we can take
                    your social media to the next level.
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
