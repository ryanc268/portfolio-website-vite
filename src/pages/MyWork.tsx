//Images
import card from "../assets/valerianX-card.jpg";
import goonIcon from "../assets/goonbot-small.png";
import visualizationBanner from "../assets/visualizer-banner.png";
import cubegame from "../assets/cube-game.png";
import aiVoiceBanner from "../assets/ai-voice-convos-banner.png";
import aiImageRecogBanner from "../assets/ai-image-recognition-banner.png";
import twitterArchiveBanner from "../assets/reckful-twitter.png";
//Animations
import { motion } from "framer-motion";
import { pageAnimation, slider, sliderContainer } from "../utils/Animation";
//Components
import ScrollTop from "../utils/ScrollTop";
import { Helmet } from "react-helmet";
import {
  ExternalProjectCard,
  InternalProjectCard,
} from "../components/ProjectCard";

export const MyWork: React.FC = () => {
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
      <InternalProjectCard
        title="Valerian X"
        header="C# Mobile Game Made With Unity 2D"
        image={card}
        link="/work/valerianX"
      />
      <ExternalProjectCard
        title="Reckful Twitter Archival Project"
        header="Main contributor to the Twitter archival project for Reckful the streamer. Done with Typescript / Nextjs / React leveraging a Kotlin restful api backend"
        image={twitterArchiveBanner}
        link="https://twitter.reckful-archive.org/"
      />
      <ExternalProjectCard
        title="Cube Game"
        header="Multiplayer Typescript Browser Party-Game using Websockets"
        image={cubegame}
        link="https://ryanc268-typescript-websocket-game.up.railway.app/"
      />
      <InternalProjectCard
        title="React Audio Library"
        header="Audio Frequency Vizualizations (Featured in Music Prod Tab)"
        image={visualizationBanner}
        link="/music"
      />
      <ExternalProjectCard
        title="Voice Chat With AI"
        header="Typescript full-stack project using the T3 stack with ChatGPT3.5, Microsoft Neural Voices Sdk, NextAuth, and Postgres hosted on Supabase"
        image={aiVoiceBanner}
        link="https://ryans-ai-voice-conversations-production.up.railway.app/"
      />
      <InternalProjectCard
        title="AI Image Recognition"
        header="Python Machine Learning model using Tensorflow. This project contains multiple different trained models used to explore Tensorflow's capability. My first Python / ML project!"
        image={aiImageRecogBanner}
        link="/work/image-recognition-ai"
      />
      <InternalProjectCard
        title="Goon Bot"
        header="NodeJS Discord Bot aggregating game api data for player progress tracking (Page Under Contruction)"
        image={goonIcon}
        link="/work/goon-bot"
      />
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
