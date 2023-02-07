//Images
import card from "../assets/valerianX-card.jpg";
import goonIcon from "../assets/goonbot-small.png";
import reactbig from "../assets/react-icon-big.png";
import cubegame from "../assets/cube-game.png";
//Router
import { Link } from "react-router-dom";
//Animations
import { motion } from "framer-motion";
import {
  pageAnimation,
  fade,
  photoAnim,
  lineAnim,
  slider,
  sliderContainer,
} from "../utils/Animation";
//Components
import { useScroll } from "../hooks/useScroll";
import ScrollTop from "../utils/ScrollTop";

export const MyWork: React.FC = () => {
  const isMobile = () => {
    return window.innerWidth < 768;
  };

  const [element, controls] = useScroll(isMobile() ? 700 : 0);
  const [element2, controls2] = useScroll(isMobile() ? 900 : 0);
  const [element3, controls3] = useScroll(0);

  return (
    <motion.div
      className="flex-1 text-center"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
      style={{ background: "#1b1b1b" }}
    >
      <motion.div variants={sliderContainer}>
        <motion.div
          className="fixed left-0 z-20 h-screen w-screen bg-indigo-900"
          variants={slider}
        ></motion.div>
        <motion.div
          className="fixed left-0 z-20 h-screen w-screen bg-cyan-600"
          variants={slider}
        ></motion.div>
        <motion.div
          className="fixed left-0 z-20 h-screen w-screen bg-violet-900"
          variants={slider}
        ></motion.div>
        <motion.div
          className="fixed left-0 z-20 h-screen w-screen bg-cyan-300"
          variants={slider}
        ></motion.div>
      </motion.div>
      <motion.div className="px-10 py-4">
        <motion.h2 className="text-2xl" variants={fade}>
          <span className="text-cyan-custom">Valerian X</span> C# Mobile Game
        </motion.h2>
        <motion.div
          className="h-0.5 bg-cyan-custom"
          variants={lineAnim}
        ></motion.div>
        <Link to="/work/valerianX">
          <div className="overflow-hidden">
            <motion.img
              className="pt-4"
              variants={photoAnim}
              src={card}
              alt="ValerianX Card"
            />
          </div>
        </Link>
      </motion.div>
      <motion.div
        className="px-10 py-4"
        variants={fade}
        animate={controls}
        initial="hidden"
        ref={element}
      >
        <motion.h2 className="text-2xl">
          <span className="text-cyan-custom">Cube Game</span> Multiplayer
          Typescript Party-Game using Websockets
        </motion.h2>
        <motion.div
          className="h-0.5 bg-cyan-custom"
          variants={lineAnim}
        ></motion.div>
        <a href="https://ryanc268-typescript-websocket-game.up.railway.app/">
          <img className="pt-4" src={cubegame} alt="Cube Game Banner" />
        </a>
      </motion.div>
      <motion.div
        className="px-10 py-4"
        variants={fade}
        animate={controls2}
        initial="hidden"
        ref={element2}
      >
        <motion.h2 className="text-2xl">
          React <span className="text-cyan-custom">Audio Library</span> w/
          Visualization (Featured in Music Prod Tab)
        </motion.h2>
        <motion.div
          className="h-0.5 bg-cyan-custom"
          variants={lineAnim}
        ></motion.div>
        <Link to="/work/react-music-player">
          <img className="pt-4" src={reactbig} alt="React Icon" />
        </Link>
      </motion.div>
      <motion.div
        className="px-10 py-4"
        variants={fade}
        animate={controls3}
        initial="hidden"
        ref={element3}
      >
        <motion.h2 className="text-2xl">
          <span className="text-cyan-custom">Goon Bot</span> NodeJS Discord Bot
          (Page Under Contruction)
        </motion.h2>
        <motion.div
          className="h-0.5 bg-cyan-custom"
          variants={lineAnim}
        ></motion.div>
        <Link className="flex justify-center" to="/work/goon-bot">
          <img className="pt-4" src={goonIcon} alt="Goon Bot Icon" />
        </Link>
      </motion.div>
      <ScrollTop />
    </motion.div>
  );
};
