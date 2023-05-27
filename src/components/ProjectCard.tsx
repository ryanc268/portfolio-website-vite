import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fade } from "../utils/Animation";
import useScroll from "../hooks/useScroll";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  header: string;
  image: string;
  link: string;
}

export const InternalProjectCard: React.FC<ProjectCardProps> = ({
  title,
  header,
  image,
  link,
}: ProjectCardProps) => {
  const [element, controls] = useScroll(0);
  const [isHovering, setIsHovering] = useState(false);
  return (
    <motion.div
      className="h-100 m-4 rounded-2xl md:w-2/5"
      variants={fade}
      animate={controls}
      initial="hidden"
      ref={element}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={() => setIsHovering(true)}
      onTouchEnd={() => setIsHovering(false)}
      onTouchCancel={() => setIsHovering(false)}
    >
      <Link to={link}>
        <div className="relative flex h-full items-center justify-center rounded-2xl  text-center">
          {!isHovering && (
            <>
              <div className="absolute h-full w-full rounded-3xl bg-black opacity-30"></div>
              <h3 className="absolute pt-4 font-montserrat text-3xl md:text-5xl 2xl:text-6xl">
                {title}
              </h3>
            </>
          )}
          <img
            className={`h-full w-full rounded-3xl ${
              isHovering ? "blur-md" : ""
            }`}
            src={image}
            alt={`${title} card`}
          />
          {isHovering && (
            <h3 className="absolute px-4 text-lg md:text-2xl">{header}</h3>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export const ExternalProjectCard: React.FC<ProjectCardProps> = ({
  title,
  header,
  image,
  link,
}: ProjectCardProps) => {
  const [element, controls] = useScroll(0);
  const [isHovering, setIsHovering] = useState(false);
  return (
    <motion.div
      className="h-100 m-4 md:w-2/5"
      variants={fade}
      animate={controls}
      initial="hidden"
      ref={element}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={() => setIsHovering(true)}
      onTouchEnd={() => setIsHovering(false)}
      onTouchCancel={() => setIsHovering(false)}
    >
      <a href={link} rel="noreferrer" target="_blank">
        <div className="relative flex h-full items-center justify-center text-center">
          {!isHovering && (
            <>
              <div className="absolute h-full w-full rounded-3xl bg-black opacity-30"></div>
              <h3 className="absolute pt-4 font-montserrat text-3xl md:text-5xl 2xl:text-6xl">
                {title}
              </h3>
            </>
          )}
          <img
            className={`h-full w-full rounded-3xl ${
              isHovering ? "blur-md" : ""
            }`}
            src={image}
            alt={`${title} card`}
          />

          {isHovering && (
            <h3 className="absolute px-4 text-lg md:text-2xl">{header}</h3>
          )}
        </div>
      </a>
    </motion.div>
  );
};
