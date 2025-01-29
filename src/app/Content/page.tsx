"use client";
import styles from "./page.module.css";
import Background from "@/components/Background";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ItemLayout from "@/components/ItemLayout";
import Loader from "@/components/Loader";

const phrase =
  "At HyperAware, we craft content that captivates, converts, and drives results. In today’s digital age, engaging content isn’t just an option—it’s a necessity. Our expert content creation services ensure your brand’s story resonates with the right audience at the right time.";

const Page = () => {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const container = useRef<HTMLDivElement | null>(null);
  const body = useRef<HTMLDivElement | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Detect small screens
  const [shouldRenderBackground, setShouldRenderBackground] = useState(true); // Background rendering
  const [isLoading, setIsLoading] = useState(true); // Page loading state
  const [enableLenis, setEnableLenis] = useState(true); // Enable or disable Lenis scrolling

  // Initialize GSAP animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!isLoading) {
      createAnimation();
    }
  }, [isLoading]);

  // Initialize or destroy Lenis based on screen size

  // Create GSAP animations
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

      setShouldRenderBackground(isHighPerformance); // Background rendering condition
      setIsSmallScreen(window.innerWidth <= 768); // Detect small screens

      // Enable Lenis for screens ≤1920px
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
    return phrase.split(" ").map((word, i) => (
      <p key={`${word}_${i}`} className="word">
        {splitLetters(word)}
      </p>
    ));
  };

  const splitLetters = (word: string): JSX.Element[] => {
    return word.split("").map((letter, i) => (
      <span
        key={`${letter}_${i}`}
        ref={(el) => {
          if (el) refs.current.push(el);
        }}
        className="letter"
      >
        {letter}
      </span>
    ));
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
                Crafting impactful content
              </h1>

              <p
                className="text-md lg:text-2xl text-center w-1/2 cursor-default"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Let your brand tell a story
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
            <div className="w-full h-auto p-8 sm:p-16 lg:px-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-3 grid-flow-row-dense relative">
              <div className="rounded-lg shadow-xl min-h-[85vh] lg:min-h-[400px] col-span-1 sm:col-span-2 row-span-2 relative">
                <video
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  autoPlay
                  muted
                  loop
                  style={{
                    objectFit: "cover", // Ensure the video covers the entire container
                  }}
                >
                  <source src="/Video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div
                className="rounded-lg shadow-xl min-h-[45vh] lg:min-h-[300px] lg:min-h-[300px]"
                style={{
                  backgroundImage: "url('/content/jewel3.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <div className="rounded-lg shadow-xl min-h-[85vh] lg:min-h-[300px] row-span-2 relative">
                <video
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  autoPlay
                  muted
                  loop
                  style={{
                    objectFit: "cover", // Ensure the video covers the entire container
                  }}
                >
                  <source src="/content/sweetchery.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div
                className="rounded-lg shadow-xl min-h-[45vh] lg:min-h-[300px]"
                style={{
                  backgroundImage: "url('/content/jewel4.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <div
                className="rounded-lg shadow-xl min-h-[85vh] lg:min-h-[300px]"
                style={{
                  backgroundImage: "url('/content/dear2.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
            <section
              className="py-10 w-[90vw] gap-3 columns-1 sm:columns-1 lg:columns-3 xl:columns-3  space-y-3 text-[#ffffff] relative"
              style={{
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {/* First Item Layout */}
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Customized Content Strategies
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  We don’t believe in one-size-fits-all. Every piece of content
                  we create is tailored to align with your brand’s goals,
                  audience preferences, and industry trends.
                </p>
              </ItemLayout>
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  SEO-Optimized Content
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  Our content is designed to improve your search engine
                  rankings. From keyword research to strategic placement, we
                  ensure your website attracts organic traffic and stands out in
                  search results.
                </p>
              </ItemLayout>
              {/* Second Item Layout without paragraph (to test auto width/height change) */}
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Diverse Content Formats
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  Whether it’s blogs, videos, infographics, social media posts,
                  or eBooks, we create diverse content that speaks to your
                  audience across all platforms.
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
                Our Content Creation Process
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
                  Understanding Your Brand
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  We start by getting to know your brand, industry, and
                  audience. This helps us create content that’s not only
                  relevant but also impactful.
                </p>
              </ItemLayout>
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  In-Depth Research
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  Our team conducts thorough research on trending topics,
                  audience interests, and competitors to develop a winning
                  content strategy.
                </p>
              </ItemLayout>
              {/* Second Item Layout without paragraph (to test auto width/height change) */}
              <ItemLayout className="break-inside-avoid">
                <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                  Performance Analysis
                </h2>
                <p className="font-light text-xs sm:text-sm md:text-sm">
                  We track the performance of your content to measure success
                  and refine strategies for continuous improvement.
                </p>
              </ItemLayout>
            </section>
            <div className="flex flex-wrap w-full">
              <div className="w-full lg:w-1/2 h-auto lg:h-[150vh] px-4 py-4 sm:px-8 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className="rounded-lg shadow-xl min-h-[85vh] lg:min-h-[300px] row-span-2"
                  style={{
                    backgroundImage: "url('/content/sweetcherry1.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div
                  className="rounded-lg shadow-xl min-h-[85vh] lg:min-h-[300px]"
                  style={{
                    backgroundImage: "url('/content/kinderchoice1.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div
                  className=" rounded-lg shadow-xl min-h-[85vh] lg:min-h-[200px] row-span-2"
                  style={{
                    backgroundImage: "url('/content/sweetcherry2.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div
                  className="rounded-lg shadow-xl min-h-[85vh] lg:min-h-[300px]"
                  style={{
                    backgroundImage: "url('/content/dear3.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
              <div className="w-full lg:w-1/2 h-auto text-[#ffffff] flex flex-col py-4 gap-6 px-4 sm:px-8">
                <ItemLayout className="break-inside-avoid">
                  <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                    Why Great Content Matters
                  </h2>
                  <p className="font-light text-xs sm:text-sm md:text-sm">
                    Boosts Online Visibility: Quality content improves your
                    search rankings, making it easier for potential customers to
                    find you. <br />
                    Enhances Brand Authority: Sharing valuable insights
                    positions your brand as an industry leader. <br />
                    Increases Engagement: Compelling content encourages likes,
                    shares, and conversations, driving brand loyalty. <br />
                    Drives Conversions: Persuasive content influences buying
                    decisions, turning visitors into loyal customers.
                  </p>
                </ItemLayout>
                <ItemLayout className="break-inside-avoid">
                  <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                    Our Key Content Creation Offerings
                  </h2>
                  <p className="font-light text-xs sm:text-sm md:text-sm">
                    Blog Writing: Increase website traffic with informative,
                    engaging blog posts tailored to your niche.
                    <br />
                    Social Media Content: Build a strong social media presence
                    with visually striking and shareable posts.
                    <br />
                    Video Production: Tell your brand story with high-quality,
                    captivating videos.
                    <br />
                    Graphic Design: Boost engagement with stunning visuals that
                    complement your message.
                  </p>
                </ItemLayout>
                <ItemLayout className="break-inside-avoid">
                  <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
                    Partner With Us for Your Content Needs
                  </h2>
                  <p className="font-light text-xs sm:text-sm md:text-sm">
                    Let us take your brand’s content to the next level. Our team
                    of creative professionals is dedicated to delivering
                    impactful content that not only engages but also delivers
                    measurable results. 📩 Contact us today to discuss how our
                    content creation services can help you achieve your digital
                    marketing goals.
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
