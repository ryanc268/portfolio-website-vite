import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { pageAnimation } from "../../utils/Animation";

export const GoonBot = () => {
  return (
    <motion.div
      className="overflow-x-hidden"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <CustomHelmet />
      <div className="mx-auto w-full px-8 pb-3 pt-4 md:px-20 md:pt-6 2xl:px-60">
        <Link
          to="/projects"
          className="mb-2 inline-flex items-center gap-1.5 text-sm text-white/60 transition hover:text-cyan-custom"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back to projects
        </Link>
      </div>
      <h3 className="flex items-center justify-center pt-8 text-center text-4xl text-white md:pt-12">
        🚧 Page Still Under Construction 🚧
      </h3>
    </motion.div>
  );
};

const CustomHelmet = () => {
  const title = "Goon Bot";
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
        content={`https://www.ryancoppa.com/projects/goon-bot`}
      />
      <meta name="twitter:title" content={`Project - ${title}`} />
      <meta
        name="twitter:description"
        content={`Find information on my project ${title} here!`}
      />
    </Helmet>
  );
};

export default GoonBot;
