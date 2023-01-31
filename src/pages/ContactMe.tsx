import { motion } from "framer-motion";
import {
  titleAnim,
  fade,
  photoAnim,
  pageAnimation,
} from "../components/Animation";
import resume from "../assets/resume.pdf";
import { SocialIcon } from "react-social-icons";

export const ContactMe = () => {
  return (
    <motion.div
      className="flex h-screen items-center justify-center"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div>
        <div>
          <motion.h2 variants={titleAnim}>
            Contact <span>Me</span>
          </motion.h2>
        </div>
      </div>
      <div>
        <div>
          <motion.div variants={titleAnim}>
            <a
              className="rounded-md border-2 border-solid border-cyan-400 px-8 py-2 text-lg transition ease-in-out hover:bg-cyan-400 md:py-4 md:text-xl"
              href={resume}
              download="Ryan_Coppa_Resume_Public.pdf"
            >
              Download My Public Resume
            </a>
          </motion.div>
        </div>
        <div>
          <motion.div variants={titleAnim}>
            <SocialIcon
              url="https://www.linkedin.com/in/ryan-coppa"
              style={{ height: 80, width: 80 }}
              target="_blank"
            />
          </motion.div>
          <motion.div>
            <SocialIcon
              url="https://github.com/ryanc268"
              style={{ height: 80, width: 80 }}
              target="_blank"
            />
          </motion.div>
        </div>
        <div>
          <motion.div variants={titleAnim}>
            <p>🚧 Page Still Under Construction 🚧</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
