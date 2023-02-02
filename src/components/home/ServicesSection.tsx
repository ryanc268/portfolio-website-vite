import { motion } from "framer-motion";
import useScroll from "../../hooks/useScroll";
import { scrollReveal } from "../../utils/Animation";

import clock from "../../assets/clock.svg";
import random from "../../assets/random.svg";
import money from "../../assets/money.svg";
import teamwork from "../..//assets/teamwork.svg";
import dragon from "../../assets/Snow-Dragon.png";

const ServicesSection: React.FC = () => {
  const [element, controls] = useScroll(0);
  return (
    <motion.div
      className="flex-1"
      variants={scrollReveal}
      animate={controls}
      initial="hidden"
      ref={element}
    >
      <div className="flex-1">
        <h2 className="py-8 text-center text-4xl md:text-7xl">
          High <span className="text-cyan-custom">Quality</span> experience
        </h2>
        <div className="flex flex-wrap justify-center">
          <div className="flex basis-80 gap-4 py-2 md:basis-96 md:py-4">
            <div className="w-12 text-center md:h-20 md:w-auto">
              <img className="w-full md:h-full" src={clock} alt="clock icon" />
              <h3 className="text-sm md:text-xl">Efficient</h3>
            </div>
            <p className="px-2 text-sm md:text-lg">
              Always motivated to find the most effective ways to solve
              problems.
            </p>
          </div>
          <div className="flex basis-80 gap-4 py-2 md:basis-96 md:py-4">
            <div className="w-12 text-center md:h-20 md:w-auto">
              <img
                className="w-full md:h-full"
                src={teamwork}
                alt="teamwork icon"
              />
              <h3 className="text-sm md:text-xl">Teamwork</h3>
            </div>
            <p className="px-2 text-sm md:text-lg">
              Well versed in team development and Agile practices.
            </p>
          </div>
          <div className="flex basis-80 gap-4 py-2 md:basis-96 md:py-4">
            <div className="w-12 text-center md:h-20 md:w-auto">
              <img
                className="w-full md:h-full"
                src={random}
                alt="random icon"
              />
              <h3 className="text-sm md:text-xl">Motivated</h3>
            </div>
            <p className="px-2 text-sm md:text-lg">
              Always motivated to keep up to date with the industry and the best
              ways of doing things
            </p>
          </div>
          <div className="flex basis-80 gap-4 py-2 md:basis-96 md:py-4">
            <div className="w-12 text-center md:h-20 md:w-auto">
              <img className="w-full md:h-full" src={money} alt="money icon" />
              <h3 className="text-sm md:text-xl">Freelance</h3>
            </div>
            <p className="px-2 text-sm md:text-lg">
              Open to any and every freelance project whether its in my current
              skillset or not
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-screen justify-center md:py-8">
        <img className="px-8" src={dragon} alt="Dragon Icon" />
      </div>
    </motion.div>
  );
};

export default ServicesSection;
