import { motion } from "framer-motion";
import { titleAnim, fade, photoAnim, pageAnimation } from "../utils/Animation";
import resume from "../assets/resume.pdf";
import { SocialIcon } from "react-social-icons";

export const ContactMe = () => {
  return (
    <motion.div
      className="h-screen flex-1 items-center justify-center text-center"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div>
        <div>
          <motion.h2 className="py-10 text-3xl md:text-7xl md:py-20" variants={titleAnim}>
            Contact <span className="text-cyan-custom">Me</span>
          </motion.h2>
        </div>
      </div>
      <div>
        <div>
          <motion.div className="py-12" variants={titleAnim}>
            <a
              className="rounded-md border-2 border-solid border-cyan-custom px-8 py-2 text-lg transition ease-in-out hover:bg-cyan-custom md:py-4 md:text-xl"
              href={resume}
              download="Ryan_Coppa_Resume_Public.pdf"
            >
              Download My Public Resume
            </a>
          </motion.div>
        </div>
        <div className="flex justify-center py-10 md:py-20">
          <motion.div className="px-5" variants={titleAnim}>
            <SocialIcon
              url="https://www.linkedin.com/in/ryan-coppa"
              style={{ height: 80, width: 80 }}
              target="_blank"
            />
          </motion.div>
          <motion.div className="px-5" variants={titleAnim}>
            <SocialIcon
              url="https://github.com/ryanc268"
              style={{ height: 80, width: 80 }}
              target="_blank"
            />
          </motion.div>
        </div>
        <div>
          <motion.div variants={titleAnim}>
            <p className="pt-28">🚧 Page Still Under Construction 🚧</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};