import { motion, AnimatePresence } from "framer-motion";
import { pageAnimation, fade, photoAnim } from "../../utils/Animation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import Abyssmark from "../../assets/projects/valerianx/characters/Abyssmark.png";
import Crycio from "../../assets/projects/valerianx/characters/Crycio.png";
import Drakala from "../../assets/projects/valerianx/characters/Drakala.png";
import Faelie from "../../assets/projects/valerianx/characters/Faelie.png";
import Frocus from "../../assets/projects/valerianx/characters/Frocus.png";
import Lightnape from "../../assets/projects/valerianx/characters/Lightnape.png";
import Raingel from "../../assets/projects/valerianx/characters/Raingel.png";
import Valentyra from "../../assets/projects/valerianx/characters/Valentyra.png";

import Crocgeneral from "../../assets/projects/valerianx/monsters/Croc General.png";
import Foolfuse from "../../assets/projects/valerianx/monsters/Foolfuse.png";
import Gremlin from "../../assets/projects/valerianx/monsters/Gremlin.png";
import Kobold from "../../assets/projects/valerianx/monsters/Kobold.png";
import Mossgolem from "../../assets/projects/valerianx/monsters/Moss Golem.png";
import Mothilisk from "../../assets/projects/valerianx/monsters/Mothilisk.png";
import Mysticslime from "../../assets/projects/valerianx/monsters/Mystic Slime.png";
import OtterRider from "../../assets/projects/valerianx/monsters/Otter Rider.png";
import Rythbeast from "../../assets/projects/valerianx/monsters/Rythbeast.png";
import Snowdragon from "../../assets/projects/valerianx/monsters/Snow Dragon.png";
import Snowkobold from "../../assets/projects/valerianx/monsters/Snow Kobold.png";
import Snownecro from "../../assets/projects/valerianx/monsters/Snow Necro.png";
import Snowtroll from "../../assets/projects/valerianx/monsters/Snow Troll.png";
import Snowwolf from "../../assets/projects/valerianx/monsters/Snow Wolf.png";
import Snowyeti from "../../assets/projects/valerianx/monsters/Snow Yeti.png";
import Snowgolem from "../../assets/projects/valerianx/monsters/snow-golem.png";
import Templeeye from "../../assets/projects/valerianx/monsters/Temple Eye.png";
import Templegolem from "../../assets/projects/valerianx/monsters/Temple Golem.png";
import Templereaper from "../../assets/projects/valerianx/monsters/Temple Reaper.png";
import Templespider from "../../assets/projects/valerianx/monsters/Temple Spider.png";

import snowland1 from "../../assets/projects/valerianx/landscapes/Snowland1.jpg";
import snowland2 from "../../assets/projects/valerianx/landscapes/Snowland2.jpg";
import temple1 from "../../assets/projects/valerianx/landscapes/Temple1.png";
import temple2 from "../../assets/projects/valerianx/landscapes/Temple2.png";
import wetland1 from "../../assets/projects/valerianx/landscapes/Wetland1.jpg";
import wetland2 from "../../assets/projects/valerianx/landscapes/Wetland2.jpg";
import Forest from "../../assets/projects/valerianx/landscapes/Forest.png";
import Title from "../../assets/projects/valerianx/landscapes/Title.png";

import mainSplashAnimated from "../../assets/projects/valerianx/landscapes/animated/Main_Splash.mp4";
import snow1Animated from "../../assets/projects/valerianx/landscapes/animated/Snow1.mp4";
import snow2Animated from "../../assets/projects/valerianx/landscapes/animated/Snow2.mp4";
import wetland1Animated from "../../assets/projects/valerianx/landscapes/animated/Wetland1.mp4";
import wetland2Animated from "../../assets/projects/valerianx/landscapes/animated/Wetland2.mp4";
import temple1Animated from "../../assets/projects/valerianx/landscapes/animated/Temple1.mp4";
import temple2Animated from "../../assets/projects/valerianx/landscapes/animated/Temple2.mp4";

import { Helmet } from "react-helmet";

type CategoryId = "characters" | "monsters" | "landscapes" | "animated";

type GalleryAsset = {
  src: string;
  name: string;
  category: CategoryId;
  mediaType?: "image" | "video";
};

const characters: GalleryAsset[] = [
  { src: Abyssmark, name: "Abyssmark", category: "characters" },
  { src: Crycio, name: "Crycio", category: "characters" },
  { src: Drakala, name: "Drakala", category: "characters" },
  { src: Faelie, name: "Faelie", category: "characters" },
  { src: Frocus, name: "Frocus", category: "characters" },
  { src: Lightnape, name: "Lightnape", category: "characters" },
  { src: Raingel, name: "Raingel", category: "characters" },
  { src: Valentyra, name: "Valentyra", category: "characters" },
];

const monsters: GalleryAsset[] = [
  { src: Crocgeneral, name: "Croc General", category: "monsters" },
  { src: Foolfuse, name: "Foolfuse", category: "monsters" },
  { src: Gremlin, name: "Gremlin", category: "monsters" },
  { src: Kobold, name: "Kobold", category: "monsters" },
  { src: Mossgolem, name: "Moss Golem", category: "monsters" },
  { src: Mothilisk, name: "Mothilisk", category: "monsters" },
  { src: Mysticslime, name: "Mystic Slime", category: "monsters" },
  { src: OtterRider, name: "Otter Rider", category: "monsters" },
  { src: Rythbeast, name: "Rythbeast", category: "monsters" },
  { src: Snowdragon, name: "Snow Dragon", category: "monsters" },
  { src: Snowkobold, name: "Snow Kobold", category: "monsters" },
  { src: Snownecro, name: "Snow Necro", category: "monsters" },
  { src: Snowtroll, name: "Snow Troll", category: "monsters" },
  { src: Snowwolf, name: "Snow Wolf", category: "monsters" },
  { src: Snowyeti, name: "Snow Yeti", category: "monsters" },
  { src: Snowgolem, name: "Snow Golem", category: "monsters" },
  { src: Templeeye, name: "Temple Eye", category: "monsters" },
  { src: Templegolem, name: "Temple Golem", category: "monsters" },
  { src: Templereaper, name: "Temple Reaper", category: "monsters" },
  { src: Templespider, name: "Temple Spider", category: "monsters" },
];

const landscapes: GalleryAsset[] = [
  { src: Title, name: "Title Screen", category: "landscapes" },
  { src: Forest, name: "Forest", category: "landscapes" },
  { src: wetland1, name: "Wetlands I", category: "landscapes" },
  { src: wetland2, name: "Wetlands II", category: "landscapes" },
  { src: temple1, name: "Temple I", category: "landscapes" },
  { src: temple2, name: "Temple II", category: "landscapes" },
  { src: snowland1, name: "Snowlands I", category: "landscapes" },
  { src: snowland2, name: "Snowlands II", category: "landscapes" },
];

const animatedEnvironments: GalleryAsset[] = [
  {
    src: mainSplashAnimated,
    name: "Title Screen",
    category: "animated",
    mediaType: "video",
  },
  {
    src: wetland1Animated,
    name: "Wetlands I",
    category: "animated",
    mediaType: "video",
  },
  {
    src: wetland2Animated,
    name: "Wetlands II",
    category: "animated",
    mediaType: "video",
  },
  {
    src: temple1Animated,
    name: "Temple I",
    category: "animated",
    mediaType: "video",
  },
  {
    src: temple2Animated,
    name: "Temple II",
    category: "animated",
    mediaType: "video",
  },
  {
    src: snow1Animated,
    name: "Snowlands I",
    category: "animated",
    mediaType: "video",
  },
  {
    src: snow2Animated,
    name: "Snowlands II",
    category: "animated",
    mediaType: "video",
  },
];

const categories: { id: CategoryId; label: string; assets: GalleryAsset[] }[] = [
  { id: "characters", label: "Characters", assets: characters },
  { id: "monsters", label: "Monsters", assets: monsters },
  { id: "landscapes", label: "Environments", assets: landscapes },
  {
    id: "animated",
    label: "Animated Environments",
    assets: animatedEnvironments,
  },
];

const features = [
  {
    title: "Rogue-Like Adventure Mode",
    description:
      "Combine unique perks, discover randomized items, spend reward currency at checkpoint shops, and fight bosses across animated environments. Every run starts fresh — your strategy always changes.",
  },
  {
    title: "Unlockables & High Scores",
    description:
      "Unlock characters and battle-runes with in-game currency earned from any game mode. Compare Adventure Mode runs on an online leaderboard and push further on your next attempt.",
  },
  {
    title: "Built for Mobile with Unity 2D",
    description:
      "Cross-platform deployment delivers the same polished experience on iOS and Android. A beautifully animated 2D adventure designed to feel immersive — right in your pocket.",
  },
];

const gridItemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.02, duration: 0.3, ease: "easeOut" as const },
  }),
};

const PAGE_CONTAINER = "mx-auto w-full px-8 md:px-20 2xl:px-60";

const isVideoAsset = (asset: GalleryAsset) => asset.mediaType === "video";

const GalleryMedia = ({
  asset,
  className,
  preview = false,
}: {
  asset: GalleryAsset;
  className: string;
  preview?: boolean;
}) => {
  if (isVideoAsset(asset)) {
    return (
      <video
        src={asset.src}
        muted
        loop
        playsInline
        autoPlay
        preload={preview ? "metadata" : "auto"}
        controls={!preview}
        className={className}
      />
    );
  }

  return (
    <img
      src={asset.src}
      alt={asset.name}
      loading={preview ? "lazy" : undefined}
      className={className}
    />
  );
};

const ValerianX = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("characters");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeAssets = useMemo(
    () => categories.find((c) => c.id === activeCategory)?.assets ?? [],
    [activeCategory],
  );

  const isLandscape =
    activeCategory === "landscapes" || activeCategory === "animated";
  const isLightboxOpen = lightboxIndex !== null;

  const openLightbox = (index: number) => setLightboxIndex(index);

  const closeLightbox = () => setLightboxIndex(null);

  const goToPrevious = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null || activeAssets.length === 0) return current;
      return (current - 1 + activeAssets.length) % activeAssets.length;
    });
  }, [activeAssets.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null || activeAssets.length === 0) return current;
      return (current + 1) % activeAssets.length;
    });
  }, [activeAssets.length]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeCategory]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goToPrevious();
      if (event.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, goToPrevious, goToNext]);

  const currentAsset =
    lightboxIndex !== null ? activeAssets[lightboxIndex] : null;

  return (
    <motion.div
      className="overflow-x-hidden bg-[#1b1b1b]"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <CustomHelmet />

      <section className={`pb-3 pt-4 md:pt-6 ${PAGE_CONTAINER}`}>
          <motion.div variants={fade}>
            <Link
              to="/projects"
              className="mb-2 inline-flex items-center gap-1.5 text-sm text-white/60 transition hover:text-cyan-custom"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              Back to projects
            </Link>
          </motion.div>

          <motion.h1
            variants={photoAnim}
            className="font-montserrat text-3xl font-light tracking-tight text-white md:text-5xl"
          >
            Valerian{" "}
            <span className="bg-linear-to-r from-cyan-custom to-indigo-400 bg-clip-text text-transparent">
              X
            </span>
          </motion.h1>

          <motion.p
            variants={fade}
            className="mt-2 max-w-3xl text-sm text-white/65 md:text-base"
          >
            A rogue-like mobile adventure with handcrafted 2D art, diverse
            characters, and environments built to explore.
          </motion.p>
      </section>

      {/* Gallery */}
      <section className={`pb-6 pt-1 ${PAGE_CONTAINER}`}>
          <motion.div variants={fade} className="mb-3 flex flex-wrap gap-1.5">
              {categories.map(({ id, label, assets }) => {
                const isActive = activeCategory === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveCategory(id)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-cyan-custom text-[#0d0d0f]"
                        : "border border-white/10 bg-white/5 text-white/70 hover:border-cyan-custom/40 hover:text-white"
                    }`}
                  >
                    {label}
                    <span
                      className={`ml-1.5 text-xs ${isActive ? "text-[#0d0d0f]/70" : "text-white/40"}`}
                    >
                      {assets.length}
                    </span>
                  </button>
                );
              })}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={
                isLandscape
                  ? "grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4"
                  : "grid grid-cols-3 gap-1.5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
              }
            >
              {activeAssets.map((asset, index) => (
                  <motion.button
                    key={`${asset.name}-${asset.src}`}
                    type="button"
                    custom={index}
                    variants={gridItemVariants}
                    initial="hidden"
                    animate="show"
                    onClick={() => openLightbox(index)}
                    className={`group relative overflow-hidden rounded-lg border border-white/8 bg-white/3 text-left transition-colors hover:border-cyan-custom/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-custom ${
                      isLandscape ? "w-full" : "aspect-square"
                    }`}
                  >
                    <GalleryMedia
                      asset={asset}
                      preview
                      className={
                        isLandscape
                          ? "h-auto w-full object-contain p-0.5"
                          : "h-full w-full object-contain p-1.5"
                      }
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-1.5 pt-4 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <p className="truncate font-montserrat text-[11px] text-white sm:text-xs">
                        {asset.name}
                      </p>
                    </div>
                  </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
      </section>

      {/* Features */}
      <section className={`border-t border-white/6 py-5 ${PAGE_CONTAINER}`}>
          <div className="grid gap-3 md:grid-cols-3 md:gap-4">
            {features.map(({ title, description }, index) => (
              <motion.div
                key={title}
                custom={index}
                variants={gridItemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="rounded-lg border border-white/8 bg-white/4 p-4"
              >
                <h3 className="font-montserrat text-base text-white md:text-lg">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
      </section>

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onClose={closeLightbox} className="relative z-50">
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 md:p-8">
          <DialogPanel className="relative flex max-h-[92vh] w-full max-w-5xl flex-col items-center">
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute -top-2 right-0 z-10 rounded-full border border-white/15 bg-white/10 p-2 text-white transition hover:bg-white/20 md:-top-4 md:right-0"
              aria-label="Close gallery"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            {activeAssets.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-2 text-white transition hover:bg-white/20 md:-left-14"
                  aria-label="Previous asset"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-2 text-white transition hover:bg-white/20 md:-right-14"
                  aria-label="Next asset"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </>
            )}

            <AnimatePresence mode="wait">
              {currentAsset && (
                <motion.div
                  key={currentAsset.src}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="flex w-full flex-col items-center"
                >
                  <GalleryMedia
                    asset={currentAsset}
                    className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl shadow-black/50"
                  />
                  <div className="mt-4 text-center">
                    <p className="font-montserrat text-lg text-white md:text-xl">
                      {currentAsset.name}
                    </p>
                    <p className="mt-1 text-sm capitalize text-white/45">
                      {categories.find((c) => c.id === currentAsset.category)
                        ?.label ?? currentAsset.category}
                      {lightboxIndex !== null && activeAssets.length > 1 && (
                        <span>
                          {" "}
                          · {lightboxIndex + 1} / {activeAssets.length}
                        </span>
                      )}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogPanel>
        </div>
      </Dialog>

    </motion.div>
  );
};

const CustomHelmet = () => {
  const title = "Valerian X";
  return (
    <Helmet>
      <title>Project - {title}</title>
      <meta
        name="description"
        content="Explore the art and assets of Valerian X — a rogue-like Unity 2D mobile adventure game with characters, monsters, and environments."
      />
      <meta property="og:title" content={`Project - ${title}`} />
      <meta
        property="og:description"
        content="Explore the art and assets of Valerian X — a rogue-like Unity 2D mobile adventure game."
      />
      <meta
        property="og:url"
        content="https://www.ryancoppa.com/projects/valerianX"
      />
      <meta name="twitter:title" content={`Project - ${title}`} />
      <meta
        name="twitter:description"
        content="Explore the art and assets of Valerian X — a rogue-like Unity 2D mobile adventure game."
      />
    </Helmet>
  );
};

export default ValerianX;
