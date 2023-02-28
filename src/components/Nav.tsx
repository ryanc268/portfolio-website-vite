import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { hoverExpand } from "../utils/Animation";

const Nav = () => {
  const location = useLocation();
  const url = location.pathname;

  const decideNavUnderline = () => (window.innerWidth <= 768 ? "16%" : "5%");

  return (
    <nav className="sticky top-0 z-10 w-screen justify-between whitespace-nowrap bg-zinc-800 py-4 text-center md:flex md:px-40 md:py-8">
      <h1>
        <Link
          className="inline-block text-xl font-bold italic underline decoration-cyan-custom decoration-solid md:flex md:text-4xl"
          to="/"
        >
          <span className="hover:shadow-2xl hover:shadow-slate-400">Ryan Coppa</span>
        </Link>
      </h1>
      <ul className="flex list-none justify-between px-8 pt-2 md:px-4 2xl:px-12">
        <li className="md:px-12 2xl:pl-20">
          <Link className="text-sm md:text-lg 2xl:text-xl" to="/">
            <motion.p
              variants={hoverExpand}
              whileHover="hover"
              whileTap="click"
            >
              About Me
            </motion.p>
          </Link>
          <motion.div
            className="absolute left-auto h-0.5 rounded-sm bg-cyan-custom md:h-1"
            transition={{ duration: 0.5 }}
            initial={{ width: "0%" }}
            animate={{ width: url === "/" ? decideNavUnderline() : "0%" }}
          />
        </li>
        <li className="md:px-12 2xl:pl-20">
          <Link className="text-sm md:text-lg 2xl:text-xl" to="/work">
            <motion.p
              variants={hoverExpand}
              whileHover="hover"
              whileTap="click"
            >
              My Work
            </motion.p>
          </Link>
          <motion.div
            className="absolute left-auto h-0.5 rounded-sm bg-cyan-custom md:h-1"
            transition={{ duration: 0.5 }}
            initial={{ width: "0%" }}
            animate={{
              width: url.includes("/work") ? decideNavUnderline() : "0%",
            }}
          />
        </li>
        <li className="md:px-12 2xl:pl-20">
          <Link className="text-sm md:text-lg 2xl:text-xl" to="/contact">
            <motion.p
              variants={hoverExpand}
              whileHover="hover"
              whileTap="click"
            >
              Contact Me
            </motion.p>
          </Link>
          <motion.div
            className="absolute left-auto h-0.5 rounded-sm bg-cyan-custom md:h-1"
            transition={{ duration: 0.5 }}
            initial={{ width: "0%" }}
            animate={{
              width: url === "/contact" ? decideNavUnderline() : "0%",
            }}
          />
        </li>
        <li className="md:px-12 2xl:pl-20">
          <Link className="text-sm md:text-lg 2xl:text-xl" to="/music">
            <motion.p
              variants={hoverExpand}
              whileHover="hover"
              whileTap="click"
            >
              Music Prod
            </motion.p>
          </Link>
          <motion.div
            className="absolute left-auto h-0.5 rounded-sm bg-cyan-custom md:h-1"
            transition={{ duration: 0.5 }}
            initial={{ width: "0%" }}
            animate={{
              width: url.includes("/music") ? decideNavUnderline() : "0%",
            }}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
