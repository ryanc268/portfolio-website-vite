import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
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
      <h3 className="flex items-center justify-center pt-40 text-center text-4xl text-white">
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
