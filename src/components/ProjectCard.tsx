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
      className="relative z-10 mx-auto mb-4 w-full max-w-lg md:mb-0 md:mx-4 md:w-2/5 md:max-w-none"
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
        <div className="relative aspect-video overflow-hidden rounded-3xl text-center">
          {!isHovering && (
            <>
              <div className="absolute inset-0 z-10 bg-black/30"></div>
              <h3 className="absolute inset-0 z-20 flex items-center justify-center px-4 font-montserrat text-2xl md:text-5xl 2xl:text-6xl">
                {title}
              </h3>
            </>
          )}
          <img
            className={`absolute inset-0 h-full w-full object-cover ${
              isHovering ? "blur-md" : ""
            }`}
            src={image}
            alt={`${title} card`}
          />
          {isHovering && (
            <h3 className="absolute inset-0 z-20 flex items-center justify-center px-4 text-base md:text-2xl">
              {header}
            </h3>
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
      className="relative z-10 mx-auto mb-4 w-full max-w-lg md:mb-0 md:mx-4 md:w-2/5 md:max-w-none"
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
        <div className="relative aspect-video overflow-hidden rounded-3xl text-center">
          {!isHovering && (
            <>
              <div className="absolute inset-0 z-10 bg-black/30"></div>
              <h3 className="absolute inset-0 z-20 flex items-center justify-center px-4 font-montserrat text-2xl md:text-5xl 2xl:text-6xl">
                {title}
              </h3>
            </>
          )}
          <img
            className={`absolute inset-0 h-full w-full object-cover ${
              isHovering ? "blur-md" : ""
            }`}
            src={image}
            alt={`${title} card`}
          />
          {isHovering && (
            <h3 className="absolute inset-0 z-20 flex items-center justify-center px-4 text-base md:text-2xl">
              {header}
            </h3>
          )}
        </div>
      </a>
    </motion.div>
  );
};
