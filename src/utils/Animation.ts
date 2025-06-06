import { Variants } from "framer-motion";

export const pageAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 300,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.25,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const titleAnim: Variants = {
  hidden: {
    y: 200,
  },
  show: {
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { ease: "easeOut", duration: 0.75 },
  },
};

export const photoAnim: Variants = {
  hidden: { scale: 1.5, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.75,
    },
  },
};

export const lineAnim: Variants = {
  hidden: { width: "0%" },
  show: {
    width: "100%",
    transition: {
      duration: 1,
    },
  },
};

export const slider: Variants = {
  hidden: { x: "-130%", skew: "45deg" },
  show: {
    x: "100%",
    skew: "0deg",
    transition: { ease: "easeOut", duration: 0.75 },
  },
};

export const sliderContainer: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, ease: "easeOut" } },
};

export const scrollReveal: Variants = {
  hidden: { opacity: 0, scale: 1.2, transition: { duration: 0.5 } },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export const spinEntryRight: Variants = {
  hidden: {
    x: 500,
    opacity: 0,
    scale: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 360,
    transition: {
      duration: 0.5,
    },
  },
};

export const cardAnim: Variants = {
  hidden: {
    y: 500,
    x: -500,
    opacity: 0,
    scale: 0,
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 360,
    transition: {
      type: "spring",
      mass: 2,
    },
  },
};

export const hoverExpand: Variants = {
  hover: {
    scale: 1.025,
  },
  click: {
    scale: 0.95,
  },
};

export const hoverShake: Variants = {
  start: {
    rotate: 0,
  },
  hover: (i) => ({
    rotate: i % 2 === 0 ? [-1, 1.3, 0] : [1, -1.4, 0],
    transition: {
      repeat: Infinity,
      duration: Math.random() * 0.1 + 0.5,
    },
  }),
};
