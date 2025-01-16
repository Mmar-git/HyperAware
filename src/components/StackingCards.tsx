"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Website Development and redesign",
    image: "/webcover.jpg",
    description:
      "Bring your brand to life with visually compelling designs tailored to your business needs. From logo creation to marketing collateral, our graphic design services deliver high-quality visuals that resonate with your audience and amplify your brand identity.",
  },
  {
    title: "Branding",
    image: "/brandingcover.jpg",
    description:
      "Capture stunning visuals that tell your brand’s story. Our professional photoshoot services include product photography, lifestyle shoots, and corporate portraits, ensuring high-quality images that enhance your marketing campaigns and online presence.",
  },
  {
    title: "Social Media Marketing and Management",
    image: "/image3.jpg",
    description:
      "Streamline your online store with our comprehensive e-commerce management services. We handle everything from product listing and inventory management to order fulfillment and customer support, helping you focus on growing your business while maximizing sales.",
  },
  {
    title: "Content Creation",
    image: "/contentcover.jpg",
    description:
      "Expand your reach and engage your audience with data-driven social media marketing. We create tailored strategies, run targeted ad campaigns, and craft engaging content to boost your brand visibility and drive conversions across platforms.",
  },
  {
    title: "Photography and Videography",
    image: "/photographycover.jpg",
    description:
      "Build a strong online presence with our social media management services. From content creation and scheduling to audience engagement and performance analysis, we manage your profiles to ensure consistent and impactful communication with your followers.",
  },
];

const ServicesShowcase = () => {
  useEffect(() => {
    services.forEach((_, index) => {
      if (index === services.length - 1) {
        // Skip adding the animation for the last card
        gsap.set(`.card-wrapper-${index}`, { opacity: 1, y: 0 });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger: `.card-wrapper-${index}`,
            start: "top", // Card starts animation when it reaches the center
            end: "+=200%", // Card stays visible for some time before disappearing
            scrub: 1, // Smooth transition on scroll
            pin: true,
            pinSpacing: false,
          },
        })
        .fromTo(
          `.card-wrapper-${index}`,
          { opacity: 1, scale: 1 }, // Fully visible at the start
          { opacity: 0, scale: 0.9, duration: 1 } // Gradually fades out and
        );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative w-full">
      {services.map((service, index) => (
        <div
          key={index}
          className={`card-wrapper-${index} flex justify-center items-center h-screen will-change-transform`} // Added will-change for smoother transitions
        >
          <div className="hidden md:flex glass p-10 shadow-lg w-[84rem] h-4/5 flex items-center justify-between">
            <div className="w-1/3 flex flex-col justify-around">
              <h2 className="text-3xl font-bold mb-4 text-left">
                {service.title}
              </h2>
              <p className="text-lg text-left">{service.description}</p>
              <a href="/" className="glass w-32 p-4">
                Know More
              </a>
            </div>
            <div className="w-1/2">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full h-auto mb-4 rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col md:hidden glass p-10 shadow-lg w-[84rem] h-4/5 flex items-center justify-between">
            <div className="w-1/2">
              <Image
                src={service.image}
                alt={service.title}
                height={1000}
                width={1000}
                className="w-full h-full"
              />
            </div>
            <div className="w-full flex flex-col justify-around">
              <h2 className="text-3xl font-bold mb-4 text-left">
                {service.title}
              </h2>
              <p className="text-lg text-left">{service.description}</p>
              <a href="/" className="glass w-32 p-4">
                Know More
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesShowcase;
