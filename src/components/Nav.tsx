import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const nameContainerVariants = {
  initial: {},
  hover: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const letterVariants = {
  initial: {
    y: 0,
    color: "#FFFFFF",
  },
  hover: {
    y: -3,
    color: "#01c4fa",
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

const underlineFlowVariants = {
  initial: { scaleX: 0 },
  hover: { scaleX: 1 },
};

const Nav = () => {
  const location = useLocation();
  const url = location.pathname;

  return (
    <nav className="sticky top-0 z-10 w-screen justify-between whitespace-nowrap bg-zinc-800 py-4 text-center md:flex md:px-40 md:py-4">
      <h1>
        <motion.div
          className="relative inline-block cursor-pointer text-xl font-semibold italic md:text-4xl"
          variants={nameContainerVariants}
          whileHover="hover"
          initial="initial"
        >
          <Link
            to="/"
            className="block px-2 py-1"
            aria-label="Ryan Coppa - Home"
          >
            {Array.from("Ryan Coppa").map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                variants={letterVariants}
                className="relative inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </Link>
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] w-full origin-left bg-cyan-custom md:h-[2px]"
            variants={underlineFlowVariants}
            transition={{ duration: 0.3, ease: "linear" }}
          />
        </motion.div>
      </h1>
      <ul className="flex list-none justify-between px-8 pt-2 md:px-4 2xl:px-12">
        <li className="md:px-12 2xl:pl-20">
          <Link
            className="relative inline-block rounded-md px-2 py-1 text-sm transition-colors duration-200 hover:bg-white/10 hover:text-cyan-custom md:text-lg 2xl:text-xl"
            to="/"
          >
            <p>About Me</p>
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 rounded-sm bg-cyan-custom md:h-1"
              transition={{ duration: 0.5 }}
              initial={{ width: "0%" }}
              animate={{ width: url === "/" ? "100%" : "0%" }}
            />
          </Link>
        </li>
        <li className="md:px-12 2xl:pl-20">
          <Link
            className="relative inline-block rounded-md px-2 py-1 text-sm transition-colors duration-200 hover:bg-white/10 hover:text-cyan-custom md:text-lg 2xl:text-xl"
            to="/work"
          >
            <p>My Work</p>
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 rounded-sm bg-cyan-custom md:h-1"
              transition={{ duration: 0.5 }}
              initial={{ width: "0%" }}
              animate={{
                width: url.includes("/work") ? "100%" : "0%",
              }}
            />
          </Link>
        </li>
        <li className="md:px-12 2xl:pl-20">
          <Link
            className="relative inline-block rounded-md px-2 py-1 text-sm transition-colors duration-200 hover:bg-white/10 hover:text-cyan-custom md:text-lg 2xl:text-xl"
            to="/contact"
          >
            <p>Contact Me</p>
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 rounded-sm bg-cyan-custom md:h-1"
              transition={{ duration: 0.5 }}
              initial={{ width: "0%" }}
              animate={{
                width: url === "/contact" ? "100%" : "0%",
              }}
            />
          </Link>
        </li>
        <li className="md:px-12 2xl:pl-20">
          <Link
            className="relative inline-block rounded-md px-2 py-1 text-sm transition-colors duration-200 hover:bg-white/10 hover:text-cyan-custom md:text-lg 2xl:text-xl"
            to="/music"
          >
            <p>Music Prod</p>
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 rounded-sm bg-cyan-custom md:h-1"
              transition={{ duration: 0.5 }}
              initial={{ width: "0%" }}
              animate={{
                width: url.includes("/music") ? "100%" : "0%",
              }}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
