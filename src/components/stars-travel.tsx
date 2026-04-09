"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export type StarsTravelProps = {
  /** Children nodes to render within the StarsTravel component. */
  children?: React.ReactNode;
  /** Optional CSS class names for the container. */
  className?: string;
  /** SVG animation options. */
  svgOptions?: {
    /** Duration of the SVG animation in milliseconds. */
    duration?: number;
  };
};

export function StarsTravel({
  children,
  className,
  svgOptions,
}: StarsTravelProps) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <SVG svgOptions={svgOptions} />
      {children}
    </div>
  );
}

const pathVariants = {
  initial: { strokeDashoffset: 500, strokeDasharray: "0 800" },
  animate: {
    strokeDashoffset: 0,
    strokeDasharray: "20 800",
    opacity: [0, 2, 2, 0],
  },
};

export type SVGProps = {
  /** SVG animation options. */
  svgOptions?: {
    /** Duration of the SVG animation in milliseconds. */
    duration?: number;
  };
};

const SVG = ({ svgOptions }: SVGProps) => {
  const paths = [
    "M720 450 L1431.52 -15.0078",
    "M720 450 L1250.42 -214.196",
    "M720 450 L258.602 -263.871",
    "M720 450 L1567.23 381.48",
    "M720 450 L-16.396 874.524",
    "M720 450 L243.151 1153.64",
    "M720 450 L1527.54 715.212",
    "M720 450 L925.531 -374.777",
    "M720 450 L822.905 1293.75",
    "M720 450 L1125.77 1196.89",
    "M720 450 L-77.4307 744.286",
    "M720 450 L1307.21 1064.56",
    "M720 450 L626.514 -394.844",
    "M720 450 L1029.67 1241.58",
    "M720 450 L-121.821 332.369",
    "M720 450 L524.129 -377.124",
    "M720 450 L472.792 -363.258",
    "M720 450 L906.742 1279.23",
    "M720 450 L-46.165 81.9082",
    "M720 450 L512.156 1274.2",
    "M720 450 L1368.98 -98.9326",
    "M720 450 L1892.34 567.89",
    "M720 450 L-234.56 -145.23",
    "M720 450 L1654.78 -287.45",
    "M720 450 L345.89 1087.34",
    "M720 450 L-389.12 456.78",
    "M720 450 L1745.23 123.56",
    "M720 450 L189.45 -298.67",
    "M720 450 L1123.67 -156.89",
    "M720 450 L-178.34 1045.23",
    "M720 450 L1456.78 892.34",
    "M720 450 L567.89 -423.12",
  ];

  return (
    <motion.svg
      viewBox="0 0 1440 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{
        once: false,
        amount: 0.15,
      }}
      transition={{ duration: 1, delay: 0.1 }}
      className="absolute inset-0 h-full w-full text-foreground"
    >
      {paths.map((path, idx) => (
        <motion.path
          d={path}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          variants={pathVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: svgOptions?.duration || 2,
            ease: "easeIn",
            repeat: Infinity,
            repeatType: "loop",
            delay: (idx * 0.15) % 3,
            repeatDelay: 0,
          }}
          key={`path-first-${idx}`}
        />
      ))}
    </motion.svg>
  );
};
