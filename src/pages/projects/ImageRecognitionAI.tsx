import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { pageAnimation } from "../../utils/Animation";

export const ImageRecognitionAI = () => {
  return (
    <motion.div
      className="overflow-x-hidden"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <CustomHelmet />
      <div className="mx-auto w-full px-8 pb-3 pt-14 md:px-20 md:pt-16 2xl:px-60">
        <Link
          to="/work"
          className="mb-2 inline-flex items-center gap-1.5 text-sm text-white/60 transition hover:text-cyan-custom"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back to projects
        </Link>
      </div>
      <h3 className="flex items-center justify-center pt-24 text-center text-4xl text-white md:pt-32">
        🚧 Page Still Under Construction 🚧
      </h3>
    </motion.div>
  );
};

const CustomHelmet = () => {
  const title = "Image Recognition AI";
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
        content={`https://www.ryancoppa.com/work/image-recognition-ai`}
      />
      <meta name="twitter:title" content={`Project - ${title}`} />
      <meta
        name="twitter:description"
        content={`Find information on my project ${title} here!`}
      />
    </Helmet>
  );
};

export default ImageRecognitionAI;
