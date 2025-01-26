import React from "react";
import ItemLayout from "@/components/ItemLayout";
import Image from "next/image";
const WhyChooseUs = () => {
  return (
    <div>
      <section
        className="py-10 w-[90vw] gap-3 columns-1 sm:columns-2 lg:columns-3 xl:columns-3  space-y-3 text-[#ffffff]"
        style={{
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* First Item Layout */}
        <ItemLayout className="break-inside-avoid">
          <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
            Tailored Solutions
          </h2>
          <p className="font-light text-xs sm:text-sm md:text-sm">
            We understand that every business is unique. Our team takes the time
            to understand your specific goals and challenges, offering
            customized strategies that fit your brand, industry, and target
            audience.
          </p>
          <Image
            src="/assessibility.png"
            alt="image"
            width={1200}
            height={1200}
            className=""
          />
        </ItemLayout>
        <ItemLayout className="break-inside-avoid">
          <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
            Proven Results
          </h2>
          <p className="font-light text-xs sm:text-sm md:text-sm">
            Our data-driven approach ensures that every decision is backed by
            research and analytics. We focus on measurable outcomes — whether
            it’s increasing traffic, generating leads, or boosting conversions —
            we deliver results that matter.
          </p>
        </ItemLayout>
        {/* Second Item Layout without paragraph (to test auto width/height change) */}
        <ItemLayout className="break-inside-avoid">
          <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
            Expertise Across Multiple Channels
          </h2>
          <p className="font-light text-xs sm:text-sm md:text-sm">
            With years of experience in website development, branding, social
            media, SEO, content creation, and more, our team has the expertise
            to execute comprehensive campaigns across various digital platforms
            to maximize your online presence.
          </p>
        </ItemLayout>
        <ItemLayout className="break-inside-avoid">
          <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
            Creative and Innovative Thinking
          </h2>
          <p className="font-light text-xs sm:text-sm md:text-sm">
            We believe in thinking outside the box. Our creative strategies are
            designed to set you apart from your competition and leave a lasting
            impression on your audience. We stay on top of the latest trends and
            technologies to keep your brand ahead of the curve.
          </p>
          <Image
            src="/effectivemarketing.png"
            alt="image"
            width={1200}
            height={1200}
            className=""
          />
        </ItemLayout>
        {/* Third Item Layout */}

        {/* Third Item Layout */}
        <ItemLayout className="break-inside-avoid">
          <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
            Transparent Communication
          </h2>
          <p className="font-light text-xs sm:text-sm md:text-sm">
            We value clear, honest, and open communication. From the initial
            consultation to project completion, we keep you informed every step
            of the way, ensuring you understand the strategies and results we’re
            delivering.
          </p>
          <Image
            src="/DCanalysis.png"
            alt="image"
            width={1200}
            height={1200}
            className=""
          />
        </ItemLayout>
        <ItemLayout className="break-inside-avoid">
          <h2 className="text-xl font-bold md:text-lg text-left w-full capitalize">
            Dedicated Support
          </h2>
          <p className="font-light text-xs sm:text-sm md:text-sm">
            We are committed to your success. Our team is always available to
            provide ongoing support, optimize strategies, and ensure your
            business continues to thrive in the digital landscape.
          </p>
        </ItemLayout>
      </section>
    </div>
  );
};

export default WhyChooseUs;
