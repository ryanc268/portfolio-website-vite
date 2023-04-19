//Images
import card from "../assets/valerianX-card.jpg";
import goonIcon from "../assets/goonbot-small.png";
import visualizationBanner from "../assets/visualizer-banner.png";
import cubegame from "../assets/cube-game.png";
import aiVoiceBanner from "../assets/ai-voice-convos-banner.png";
//Router
import { Link } from "react-router-dom";
//Animations
import { motion } from "framer-motion";
import {
  pageAnimation,
  fade,
  lineAnim,
  slider,
  sliderContainer,
  hoverShake,
} from "../utils/Animation";
//Components
import { useScroll } from "../hooks/useScroll";
import ScrollTop from "../utils/ScrollTop";
import { Helmet } from "react-helmet";

export const MyWork: React.FC = () => {
  const [element, controls] = useScroll(0);
  const [element2, controls2] = useScroll(0);
  const [element3, controls3] = useScroll(0);
  const [element4, controls4] = useScroll(0);
  const [element5, controls5] = useScroll(0);

  return (
    <motion.div
      className="flex-1 flex-wrap justify-center py-4 text-center md:flex"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
      style={{ background: "#1b1b1b" }}
    >
      <CustomHelmet />
      <motion.div variants={sliderContainer}>
        <motion.div
          className="fixed left-0 top-0 z-20 h-screen w-screen bg-indigo-900"
          variants={slider}
        />
        <motion.div
          className="fixed left-0 top-0 z-20 h-screen w-screen bg-cyan-600"
          variants={slider}
        />
        <motion.div
          className="fixed left-0 top-0 z-20 h-screen w-screen bg-violet-900"
          variants={slider}
        />
        <motion.div
          className="fixed left-0 top-0 z-20 h-screen w-screen bg-cyan-300"
          variants={slider}
        />
      </motion.div>
      <motion.div
        className="px-10 py-4 md:w-2/5"
        variants={fade}
        animate={controls}
        initial="hidden"
        ref={element}
      >
        <motion.h2 className="py-4 text-2xl md:text-4xl">
          <span className="text-cyan-custom">Valerian X</span> C# Mobile Game
          Made With Unity 2D
        </motion.h2>
        <motion.div className="h-0.5 bg-cyan-custom" variants={lineAnim} />
        <Link to="/work/valerianX">
          <div className="flex justify-center overflow-hidden">
            <motion.img
              className="pt-4"
              src={card}
              alt="ValerianX Card"
              variants={hoverShake}
              initial="start"
              whileHover="hover"
            />
          </div>
        </Link>
      </motion.div>
      <motion.div
        className="px-10 py-4 md:w-2/5"
        variants={fade}
        animate={controls2}
        initial="hidden"
        ref={element2}
      >
        <motion.h2 className="py-4 text-2xl md:text-4xl">
          <span className="text-cyan-custom">Cube Game</span> Multiplayer
          Typescript Party-Game using Websockets
        </motion.h2>
        <motion.div className="h-0.5 bg-cyan-custom" variants={lineAnim} />
        <a
          className=" flex justify-center"
          href="https://ryanc268-typescript-websocket-game.up.railway.app/"
          rel="noreferrer"
          target="_blank"
        >
          <motion.img
            className="pt-4"
            src={cubegame}
            alt="Cube Game Banner"
            variants={hoverShake}
            initial="start"
            whileHover="hover"
          />
        </a>
      </motion.div>
      <motion.div
        className="px-10 py-4 md:w-2/5"
        variants={fade}
        animate={controls3}
        initial="hidden"
        ref={element3}
      >
        <motion.h2 className="py-4 text-2xl md:text-4xl">
          React <span className="text-cyan-custom">Audio Library</span> w/
          Visualization (Featured in Music Prod Tab)
        </motion.h2>
        <motion.div className="h-0.5 bg-cyan-custom" variants={lineAnim} />
        <Link className="flex justify-center" to="/music">
          <motion.img
            className="pt-4 md:w-full"
            src={visualizationBanner}
            alt="React Icon"
            variants={hoverShake}
            initial="start"
            whileHover="hover"
          />
        </Link>
      </motion.div>
      <motion.div
        className="px-10 py-4 md:w-2/5"
        variants={fade}
        animate={controls4}
        initial="hidden"
        ref={element4}
      >
        <motion.h2 className="py-4 text-2xl md:text-4xl">
          <span className="text-cyan-custom">Voice Chat With AI </span>
          Typescript full-stack project using the T3 stack
        </motion.h2>
        <motion.div className="h-0.5 bg-cyan-custom" variants={lineAnim} />
        <a
          className=" flex justify-center"
          href="https://ryans-ai-voice-conversations-production.up.railway.app/"
          rel="noreferrer"
          target="_blank"
        >
          <motion.img
            className="pt-4 md:w-full"
            src={aiVoiceBanner}
            alt="Goon Bot Icon"
            variants={hoverShake}
            initial="start"
            whileHover="hover"
          />
        </a>
      </motion.div>
      <motion.div
        className="px-10 py-4 md:w-2/5"
        variants={fade}
        animate={controls5}
        initial="hidden"
        ref={element5}
      >
        <motion.h2 className="py-4 text-2xl md:text-4xl">
          <span className="text-cyan-custom">Goon Bot</span> NodeJS Discord Bot
          (Page Under Contruction)
        </motion.h2>
        <motion.div className="h-0.5 bg-cyan-custom" variants={lineAnim} />
        <Link className="flex justify-center" to="/work/goon-bot">
          <motion.img
            className="pt-4 md:w-full"
            src={goonIcon}
            alt="Goon Bot Icon"
            variants={hoverShake}
            initial="start"
            whileHover="hover"
          />
        </Link>
      </motion.div>
      <ScrollTop />
    </motion.div>
  );
};

const CustomHelmet = () => {
  return (
    <Helmet>
      <title>My Projects</title>
      <meta
        name="description"
        content="Find out what projects I've been creating lately, stay up-to-date!"
      />
      <meta property="og:title" content="My Projects" />
      <meta
        property="og:description"
        content="See what projects I've been up to!"
      />
      <meta property="og:url" content="https://www.ryancoppa.com/work" />
      <meta name="twitter:title" content="My Projects" />
      <meta
        name="twitter:description"
        content="See what projects I've been up to!"
      />
    </Helmet>
  );
};
