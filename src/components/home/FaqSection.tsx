import Toggle from "../Toggle";
import useScroll from "../../hooks/useScroll";
import { scrollReveal } from "../../utils/Animation";
import { LayoutGroup, motion } from "framer-motion";
import React from "react";

export const FaqSection: React.FC = () => {
  const [element, controls] = useScroll(0);
  return (
    <motion.div
      className="pt-8 pb-36 text-center md:text-left"
      variants={scrollReveal}
      animate={controls}
      initial="hidden"
      ref={element}
    >
      <h2 className="py-2 text-3xl md:px-40 md:py-0 md:text-7xl">
        Have questions? <span className="block text-cyan-custom">FAQ</span>
      </h2>
      <LayoutGroup>
        <Toggle title="What Languages / Frameworks Do You Know?">
          <div className="text-gray-300 md:pb-8">
            <p className="text-sm underline md:text-2xl">
              In order of experience:
            </p>
            <p className="text-sm md:text-2xl">
              Java, Javascript/Typescript (front and back-end), NextJS, React,
              C#, SQL, CSS, TailwindCSS, Kotlin, HTML5, Python (Mainly
              Tensorflow)
            </p>
            <br />
            <p className="text-sm underline md:text-2xl">Future Interests: </p>
            <p className="text-sm md:text-2xl">
              Rust, Leptos, Sveltekit and more Tensorflow ML Models
            </p>
          </div>
        </Toggle>
        <Toggle title="What Did You Use to Make This Website?">
          <div className="text-gray-300 md:pb-8">
            <p className="text-sm md:text-2xl">
              This website is made entirely using React + Vite + Typescript as a
              SPA
            </p>
            <br />
            <p className="text-sm underline md:text-2xl">
              Additional libraries / tools include:
            </p>
            <p className="text-sm md:text-2xl">
              Pnpm, &apos;create vite react-ts&apos;, TailwindCSS,
              Framer-Motion, React-Intersection-Observer, React-Helmet and
              React-Router-Dom
            </p>
          </div>
        </Toggle>
        <Toggle title="What Technologies Have You Used For Your Games?">
          <div className="text-gray-300 md:pb-8">
            <p className="text-sm md:text-2xl">
              Right now the only game I&apos;ve made officially is Valerian X
              which is a mobile game made in Unity with C# but I plan on
              eventually exploring Rust as a language and making games built
              directly into my websites. I could write Typescript games but Rust
              seems to be the latest and greatest for web-based games (picture a
              Javascript & C++ hybrid).
            </p>
            <p className="text-sm font-bold md:text-2xl">
              Edit: I made a browser Typescript game :)
            </p>
          </div>
        </Toggle>
        <Toggle title="What Are Your Favourite Dev. Tools?">
          <div className="text-gray-300 md:pb-8">
            <p className="text-sm md:text-2xl">
              VSCode for everything Javascript/Typescript (front and back-end)
            </p>
            <p className="text-sm md:text-2xl">IntelliJ for Java/Kotlin</p>
            <p className="text-sm md:text-2xl">
              Unity with Visual Studio for C#
            </p>
            <p className="text-sm md:text-2xl">PyCharm for Python</p>
          </div>
        </Toggle>
        <Toggle title="What Type of Freelance Work Are You Open to Take?">
          <div className="text-gray-300 md:pb-8">
            <p className="text-sm md:text-2xl">
              Right now I&apos;m mainly focused on my regular 9-5 job while
              learning Typescript in my free time HOWEVER I will always take
              freelance requests both front and back-end and we can discuss from
              there
            </p>
          </div>
        </Toggle>
      </LayoutGroup>
    </motion.div>
  );
};

export default FaqSection;
