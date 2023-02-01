import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Nav = () => {
  const location = useLocation();
  const url = location.pathname;

  const decideNavUnderline = () => (window.innerWidth <= 768 ? "16%" : "5%");

  return (
    <nav className="absolute top-0 z-10 w-screen justify-between whitespace-nowrap bg-zinc-800 py-4 text-center md:flex md:px-40 2xl:py-8">
      <h1>
        <Link
          className="inline-block text-xl font-bold italic underline decoration-cyan-400 decoration-solid md:flex md:text-4xl"
          to="/"
        >
          Ryan Coppa
        </Link>
      </h1>
      <ul className="flex list-none justify-between px-8 pt-2 md:px-4 2xl:px-12">
        <li className="md:px-12 2xl:pl-20">
          <Link className="text-sm md:text-lg 2xl:text-xl" to="/">
            About Me
          </Link>
          <motion.div
            className="absolute left-auto h-0.5 rounded-sm bg-cyan-400 md:h-1"
            transition={{ duration: 0.5 }}
            initial={{ width: "0%" }}
            animate={{ width: url === "/" ? decideNavUnderline() : "0%" }}
          />
        </li>
        <li className="md:px-12 2xl:pl-20">
          <Link className="text-sm md:text-lg 2xl:text-xl" to="/work">
            My Work
          </Link>
          <motion.div
            className="absolute left-auto h-0.5 rounded-sm bg-cyan-400 md:h-1"
            transition={{ duration: 0.5 }}
            initial={{ width: "0%" }}
            animate={{
              width: url.includes("/work") ? decideNavUnderline() : "0%",
            }}
          />
        </li>
        <li className="md:px-12 2xl:pl-20">
          <Link className="text-sm md:text-lg 2xl:text-xl" to="/contact">
            Contact Me
          </Link>
          <motion.div
            className="absolute left-auto h-0.5 rounded-sm bg-cyan-400 md:h-1"
            transition={{ duration: 0.5 }}
            initial={{ width: "0%" }}
            animate={{
              width: url === "/contact" ? decideNavUnderline() : "0%",
            }}
          />
        </li>
        <li className="md:px-12 2xl:pl-20">
          <Link className="text-sm md:text-lg 2xl:text-xl" to="/music">
            Music Prod
          </Link>
          <motion.div
            className="absolute left-auto h-0.5 rounded-sm bg-cyan-400 md:h-1"
            transition={{ duration: 0.5 }}
            initial={{ width: "0%" }}
            animate={{ width: url === "/music" ? decideNavUnderline() : "0%" }}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
