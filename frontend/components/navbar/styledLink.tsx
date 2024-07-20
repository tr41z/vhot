"use client"

import React from "react";
import Link from "next/link";
import { Rajdhani } from "next/font/google";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface StyledLinkProps {
  href: string;
  text: string;
}

const font = Rajdhani({
  weight: "300",
  subsets: ["latin"],
});

const underlineVariants = {
  hidden: {
    borderBottomWidth: "0px",
  },
  visible: {
    borderBottomWidth: "2px", 
    borderBottomColor: "#B9B4C7", 
    transition: {
      duration: 0.1,
    },
  },
};

const StyledLink: React.FC<StyledLinkProps> = ({ href, text }) => {
  const pathname = usePathname();

  return (
    <Link href={href}>
      <motion.a
        className={cn(
          "mx-4 hover:opacity-40 transition duration-300 ease-in-out cursor-pointer font-extralight",
          font.className
        )}
        variants={underlineVariants}
        initial="hidden"
        animate={pathname === href ? "visible" : "hidden"}
      >
        {text}
      </motion.a>
    </Link>
  );
};

export default StyledLink;
