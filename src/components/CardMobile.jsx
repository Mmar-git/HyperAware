"use client";
import React from "react";
import { projects } from "@/data"; // Import the data from data.js

const CardMobile = () => {
  return (
    <div className="flex flex-col gap-8 px-4 py-8">
      {/* Loop through the projects array to render each card */}
      {projects.map((project, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6"
          style={{ background: "rgba(255, 255, 255, 0.1)", // Transparent background
            backdropFilter: "blur(5px)", // Reduced blur intensity
            WebkitBackdropFilter: "blur(5px)", // For Webkit browsers
            borderRadius: "15px", // Slightly smaller radius
            border: "1px solid rgba(255, 255, 255, 0.1)", // Lighter border
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
            }}
        >
          {/* Card Title */}
          <h2 className="text-2xl font-semibold text-center text-white mb-4">
            {project.title}
          </h2>

          {/* Card Image */}
          <div className="w-full h-64 overflow-hidden rounded-lg mb-4">
            <img
              src={`/images/${project.src}`} // Image path, ensure the images are stored in the public folder
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card Description */}
          <p className="text-lg text-center text-white">{project.description}</p>

          {/* See More Link */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-[#03bcf4]"
          >
            See More
          </a>
        </div>
      ))}
    </div>
  );
};

export default CardMobile;
