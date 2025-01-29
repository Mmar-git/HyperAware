"use client";
import React, { useEffect, useState, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import ServicesShowcase from "@/components/StackingCards";
import styles from "./page.module.css";
import WhyChooseUs from "@/components/whyChooseUs";
import Background from "@/components/Background";
import Image from "next/image";
import { projects } from "@/data";
import Card from "@/components/Card";
import CardMobile from "@/components/CardMobile";
import { useScroll } from "framer-motion";
import Loader from "@/components/Loader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isGlowing, setIsGlowing] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [shouldRenderBackground, setShouldRenderBackground] = useState(true);
  const [enableLenis, setEnableLenis] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (enableLenis) {
      lenisRef.current = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: true,
      });

      // Connect Lenis to ScrollTrigger
      lenisRef.current.on("scroll", ScrollTrigger.update);

      // GSAP ticker integration
      gsap.ticker.add((time) => {
        lenisRef.current?.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        gsap.ticker.remove(ScrollTrigger.update);
      }
    };
  }, [enableLenis]);

  // Rest of your existing useEffect hooks
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGlowing(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkDevicePerformance = () => {
      const isHighPerformance =
        navigator.hardwareConcurrency > 4 && window.innerWidth > 768;
      setShouldRenderBackground(isHighPerformance);
      setIsSmallScreen(window.innerWidth <= 768);
      setEnableLenis(window.innerWidth <= 1920);
    };

    checkDevicePerformance();
    window.addEventListener("resize", checkDevicePerformance);
    return () => {
      window.removeEventListener("resize", checkDevicePerformance);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
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
              style={{ fontFamily: "'Koulen', sans-serif" }}
            >
              STAY AHEAD. <span className="mx-2">STAY</span>
              <span
                className={`${isGlowing ? "glow" : "flicker"} text-[#0e3742]`}
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
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Emphasize the agency’s expertise in anticipating trends Creating
              proactive marketing solutions
            </p>
          </div>

          <div className="flex flex-col items-center text-[#FFFFFF] px-2 mx-auto">
            <h1
              className="text-[2.5rem] lg:text-[6.5rem] text-center cursor-default"
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
              className="text-sm lg:text-xl text-center max-w-3xl cursor-default pb-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Drive measurable results with cutting-edge strategies tailored to
              your business. Unlock growth with innovative solutions designed to
              amplify your digital presence.
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
              className="text-sm lg:text-xl text-center max-w-3xl cursor-default"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Attract more clients, serve them better and keep them longer.
            </p>
            <WhyChooseUs />
          </div>

          <h1
            className="text-[2.5rem] lg:text-[6.5rem] text-[#FFFFFF] text-center cursor-default"
            style={{ fontFamily: "'Koulen', sans-serif" }}
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
