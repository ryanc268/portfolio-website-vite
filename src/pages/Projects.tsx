//Images
import shadeStriderBanner from "../assets/ShadeStriderCoverArt.png";
import card from "../assets/valerianX-card.jpg";
import goonIcon from "../assets/goonbot-small.png";
import visualizationBanner from "../assets/visualizer-banner.png";
import obsidian7kdbBanner from "../assets/seven knights banner.jpg";
import cubegame from "../assets/cube-game.png";
import aiVoiceBanner from "../assets/ai-voice-convos-banner.png";
import aiImageRecogBanner from "../assets/ai-image-recognition-banner.png";
import twitterArchiveBanner from "../assets/reckful-twitter.png";
import ryansDevToolsBanner from "../assets/ryans-dev-tools.png";
//Animations
import { motion } from "framer-motion";
import { pageAnimation, slider, sliderContainer } from "../utils/Animation";
//Components
import { Helmet } from "react-helmet";
import {
  ExternalProjectCard,
  InternalProjectCard,
} from "../components/ProjectCard";

export const MyWork: React.FC = () => {
  return (
    <motion.div
      className="relative flex flex-col items-center gap-4 px-4 py-4 text-center md:flex-row md:flex-wrap md:justify-center md:gap-0"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
      style={{ background: "#1b1b1b" }}
    >
      <CustomHelmet />
      <motion.div
        variants={sliderContainer}
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <motion.div
          className="fixed left-0 top-0 h-screen w-screen bg-indigo-900"
          variants={slider}
        />
        <motion.div
          className="fixed left-0 top-0 h-screen w-screen bg-cyan-600"
          variants={slider}
        />
        <motion.div
          className="fixed left-0 top-0 h-screen w-screen bg-violet-900"
          variants={slider}
        />
        <motion.div
          className="fixed left-0 top-0 h-screen w-screen bg-cyan-300"
          variants={slider}
        />
      </motion.div>
      <div className="relative z-[1] flex w-full flex-col items-center gap-4 md:flex-row md:flex-wrap md:justify-center md:gap-x-8 md:gap-y-8">
      <ExternalProjectCard
        title="Shade Strider"
        header="2D Sidescrolling runner / platformer game made using C# in Godot 4. The base (demo) was made in 2 weeks for the Pirate Software Game Jame 14! The full game is currently in development."
        image={shadeStriderBanner}
        link="https://www.shadestridergame.com/"
      />
      <ExternalProjectCard
        title="Reckful Twitter Archival Project"
        header="Main contributor to the Twitter archival project for Reckful the streamer. Done with Typescript / Nextjs / React leveraging a Kotlin restful api backend"
        image={twitterArchiveBanner}
        link="https://twitter.reckful-archive.org/"
      />
      <ExternalProjectCard
        title="Ryan's Dev Tools"
        header="A collection of tools I've made to help myself and anyone else on common development tasks during work or hobby projects"
        image={ryansDevToolsBanner}
        link="https://ryans-dev-tools.netlify.app/"
      />
      <InternalProjectCard
        title="Valerian X"
        header="C# Mobile Game Made With Unity 2D"
        image={card}
        link="/work/valerianX"
      />
      <ExternalProjectCard
        title="Obsidian Seven Knights: Rebirth Fan-Site"
        header="Collaborator on a fan site for the mobile game Seven Knights: Rebirth, built almost entirely using AI to test its limits and capabilities"
        image={obsidian7kdbBanner}
        link="https://obsidian7kdb.info/"
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
      </div>
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
