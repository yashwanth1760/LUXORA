"use client";

import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const imageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (imageRef.current) observer.observe(imageRef.current);
    return () => imageRef.current && observer.unobserve(imageRef.current);
  }, []);

  return (
    <div className="mx-4 py-4 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-br from-yellow-500 to-yellow-700 text-transparent bg-clip-text drop-shadow-md">
          Take Control of Your Finances <br /> with AI Precision
        </h1>

        <p className="text-gray-700 text-lg mt-6 mb-10 max-w-2xl mx-auto font-medium">
          Empower your business with intelligent tracking, predictive insights,
          and personalized strategies for smarter financial decisions.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="px-8 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            >
              Get Started
            </Button>
          </Link>
          <Link
            target="_blank"
            href="https://www.youtube.com/watch?v=LR1aOl7Z2wk"
          >
            <Button
              size="lg"
              variant="outline"
              className="px-8 border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-semibold"
            >
              Watch Demo
            </Button>
          </Link>
        </div>

        <div className="mt-6">
          <div
            ref={imageRef}
            className={`transition-opacity duration-1000 ease-out ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src="/bannneeerr.png"
              width={800}
              height={200}
              alt="AI-powered Finance Dashboard"
              className="rounded-xl shadow-2xl border mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
