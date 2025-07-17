"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface BannerProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

export default function Banner({ imageUrl, title, subtitle }: BannerProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Parallax effect
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={ref} className="relative h-[60vh] overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: yImage }}
      >
        <Image
          src={imageUrl}
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
        {/* Diagonal mask at bottom */}
        <div className="absolute bottom-0 w-full h-24 bg-white -skew-y-3 origin-top-left z-10"></div>
      </motion.div>

      {/* Text Content */}
      <motion.div
        className="relative z-20 h-full flex flex-col items-center justify-center text-white text-center px-4"
        style={{ y: yText }}
      >
        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        <p className="text-lg md:text-xl mt-2">{subtitle}</p>
      </motion.div>
    </section>
  );
}
