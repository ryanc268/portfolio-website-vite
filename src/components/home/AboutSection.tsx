import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { titleAnim, fade, photoAnim } from "../../utils/Animation";
import Wave from "../Wave";
import portrait from "../../assets/portrait.png";

const AboutSection: React.FC = () => {
  return (
    <motion.div className="items-center justify-between text-white md:flex md:p-40">
      <motion.div className="flex-1 text-center text-3xl md:flex-1 md:text-left md:text-7xl">
        <motion.div>
          <div className="overflow-hidden">
            <motion.h2 variants={titleAnim}>Revolutionary solutions</motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2 variants={titleAnim}>
              where <span className="text-cyan-custom">Passion</span>
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2 variants={titleAnim}>comes first.</motion.h2>
          </div>
        </motion.div>
        <motion.p
          className="py-4 text-sm text-gray-300 md:whitespace-nowrap md:py-12 md:text-2xl"
          variants={fade}
        >
          Contact me for any inquiries or further interest in my projects.
        </motion.p>
        <Link to="/contact">
          <motion.button
            className="rounded-md border-2 border-solid border-cyan-custom px-8 py-2 text-lg transition ease-in-out hover:bg-cyan-custom md:py-4 md:text-xl"
            variants={fade}
          >
            Contact Me
          </motion.button>
        </Link>
      </motion.div>
      <div className="flex w-screen justify-center overflow-hidden">
        <motion.img
          className="w-11/12 md:w-3/4 2xl:w-1/2"
          variants={photoAnim}
          src={portrait}
          alt="Self Portrait"
        />
      </div>
      <Wave />
    </motion.div>
  );
};

export default AboutSection;
