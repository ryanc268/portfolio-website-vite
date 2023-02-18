import { motion } from "framer-motion";
import { pageAnimation } from "../../utils/Animation";

import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

//characters
import Abyssmark from "../../assets/work/valerianx/characters/Abyssmark.png";
import Crycio from "../../assets/work/valerianx/characters/Crycio.png";
import Drakala from "../../assets/work/valerianx/characters/Drakala.png";
import Faelie from "../../assets/work/valerianx/characters/Faelie.png";
import Frocus from "../../assets/work/valerianx/characters/Frocus.png";
import Lightnape from "../../assets/work/valerianx/characters/Lightnape.png";
import Raingel from "../../assets/work/valerianx/characters/Raingel.png";
import Valentyra from "../../assets/work/valerianx/characters/Valentyra.png";

//monsters
import Crocgeneral from "../../assets/work/valerianx/monsters/Croc General.png";
import Foolfuse from "../../assets/work/valerianx/monsters/Foolfuse.png";
import Gremlin from "../../assets/work/valerianx/monsters/Gremlin.png";
import Kobold from "../../assets/work/valerianx/monsters/Kobold.png";
import Mossgolem from "../../assets/work/valerianx/monsters/Moss Golem.png";
import Mothilisk from "../../assets/work/valerianx/monsters/Mothilisk.png";
import Mysticslime from "../../assets/work/valerianx/monsters/Mystic Slime.png";
import OtterRider from "../../assets/work/valerianx/monsters/Otter Rider.png";
import Rythbeast from "../../assets/work/valerianx/monsters/Rythbeast.png";
import Snowdragon from "../../assets/work/valerianx/monsters/Snow Dragon.png";
import Snowkobold from "../../assets/work/valerianx/monsters/Snow Kobold.png";
import Snownecro from "../../assets/work/valerianx/monsters/Snow Necro.png";
import Snowtroll from "../../assets/work/valerianx/monsters/Snow Troll.png";
import Snowwolf from "../../assets/work/valerianx/monsters/Snow Wolf.png";
import Snowyeti from "../../assets/work/valerianx/monsters/Snow Yeti.png";
import Snowgolem from "../../assets/work/valerianx/monsters/snow-golem.png";
import Templeeye from "../../assets/work/valerianx/monsters/Temple Eye.png";
import Templegolem from "../../assets/work/valerianx/monsters/Temple Golem.png";
import Templereaper from "../../assets/work/valerianx/monsters/Temple Reaper.png";
import Templespider from "../../assets/work/valerianx/monsters/Temple Spider.png";

//landscapes
import snowland1 from "../../assets/work/valerianx/landscapes/Snowland1.jpg";
import snowland2 from "../../assets/work/valerianx/landscapes/Snowland2.jpg";
import temple1 from "../../assets/work/valerianx/landscapes/Temple1.png";
import temple2 from "../../assets/work/valerianx/landscapes/Temple2.png";
import wetland1 from "../../assets/work/valerianx/landscapes/Wetland1.jpg";
import wetland2 from "../../assets/work/valerianx/landscapes/Wetland2.jpg";
import Forest from "../../assets/work/valerianx/landscapes/Forest.png";
import Title from "../../assets/work/valerianx/landscapes/Title.png";

import ScrollTop from "../../utils/ScrollTop";
import { Helmet } from "react-helmet";

const characters: string[] = [
  Abyssmark,
  Crycio,
  Drakala,
  Faelie,
  Frocus,
  Lightnape,
  Raingel,
  Valentyra,
];

const monsters: string[] = [
  Crocgeneral,
  Foolfuse,
  Gremlin,
  Kobold,
  Mossgolem,
  Mothilisk,
  Mysticslime,
  OtterRider,
  Rythbeast,
  Snowdragon,
  Snowkobold,
  Snownecro,
  Snowtroll,
  Snowwolf,
  Snowyeti,
  Snowgolem,
  Templeeye,
  Templegolem,
  Templereaper,
  Templespider,
];

const landscapes: string[] = [
  wetland1,
  wetland2,
  temple1,
  temple2,
  snowland1,
  snowland2,
  Forest,
  Title,
];

const artLibraries = [
  { name: "Characters", assets: characters },
  { name: "Monsters", assets: monsters },
  { name: "Landscapes", assets: landscapes },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ValerianX = () => {
  const [library, setLibrary] = useState(artLibraries[0]);
  return (
    <motion.div
      className="overflow-x-hidden"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <CustomHelmet />
      <div className="flex flex-col py-2 px-8 text-white md:px-20 2xl:px-60">
        <h2 className="py-2 text-center font-montserrat text-4xl font-light md:py-4 md:text-6xl">
          Valerian X
        </h2>
        <div>
          <RadioGroup value={library} onChange={setLibrary} className="mt-2">
            <RadioGroup.Label className="sr-only">
              Choose a memory option
            </RadioGroup.Label>
            <div className="flex flex-row justify-center gap-2 md:gap-8 md:px-40">
              {artLibraries.map((option) => (
                <RadioGroup.Option
                  key={option.name}
                  value={option}
                  className={({ active, checked }) =>
                    classNames(
                      active ? "ring-2 ring-indigo-500 ring-offset-2" : "",
                      checked
                        ? "border-transparent bg-indigo-600  hover:bg-indigo-700"
                        : "bg-tr border-gray-200 hover:bg-indigo-700",
                      "flex items-center justify-center rounded-md border p-2 text-sm font-medium uppercase sm:flex-1"
                    )
                  }
                >
                  <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div className="pt-4">
          <div className="flex h-60 flex-row flex-wrap items-center justify-center overflow-y-scroll md:h-96">
            {library.assets.map((c, i) => (
              <img key={i} className="w-1/4 p-0.5 md:w-1/5" src={c}></img>
            ))}
          </div>
          <div className="py-4 md:flex md:flex-row md:justify-between">
            <div className="md:px-8">
              <h3 className="text-lg md:text-2xl">
                Rogue-Like Adventure Mode!
              </h3>
              <div className="h-0.5 bg-cyan-custom"></div>
              <p className="py-4 text-xs md:text-lg">
                Keep the progression feeling fresh with a full featured
                Adventure Mode that lets you combine unique perks, find
                randomized items, spend reward currency at checkpoint shops,
                fight bosses, different monster types / encounter orders and
                finally progress through many different animated environments to
                see how far you can go! Every run starts fresh and the strategy
                you choose will always change!
              </p>
            </div>
            <div className="md:px-8">
              <h3 className="text-lg md:text-2xl">
                Unlockables and High-Scores!
              </h3>
              <div className="h-0.5 bg-cyan-custom"></div>
              <p className="py-4 text-xs md:text-lg">
                Many different characters and battle-runes to unlock using an
                in-game currency gained from playing any of the game modes!
                Compare your Adventure Mode high-scores with an online
                leaderboard to see how your runs compare to everyone else!
                ...And maybe use it as inspiration to push a little bit further
                on your next run!
              </p>
            </div>
            <div className="md:px-8">
              <h3 className="text-lg md:text-2xl">
                Made For Mobile Using Unity 2D!
              </h3>
              <div className="h-0.5 bg-cyan-custom"></div>
              <p className="py-4 text-xs md:text-lg">
                Unity game engine offers cross-platform deployment so both ios
                and android can be delivered the same amazing game with minimal
                development time! Engross yourself in a beautifully 2D animated
                experience that keeps the charm and immersion that any other
                platform would deliver, except in your pocket!
              </p>
            </div>
          </div>
        </div>
      </div>
      <ScrollTop />
    </motion.div>
  );
};

const CustomHelmet = () => {
  const title = "ValerianX";
  return (
    <Helmet>
      <title>Project - {title}</title>
      <meta
        name="description"
        content={`Find information on my project ${title} here!`}
      />
      <meta property="og:title" content={`Project - ${title}`} />
      <meta
        property="og:description"
        content={`Find information on my project ${title} here!`}
      />
      <meta
        property="og:url"
        content={`https://www.ryancoppa.com/work/valerianX`}
      />
      <meta name="twitter:title" content={`Project - ${title}`} />
      <meta
        name="twitter:description"
        content={`Find information on my project ${title} here!`}
      />
    </Helmet>
  );
};

export default ValerianX;
