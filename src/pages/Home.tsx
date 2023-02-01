import { motion } from "framer-motion";
import { pageAnimation } from "../utils/Animation";
import AboutSection from "../components/home/AboutSection";
import ServicesSection from "../components/home/ServicesSection";

export const Home = () => {
  return (
    <motion.div
      className="overflow-hidden"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <AboutSection />
      <ServicesSection />
    </motion.div>
  );
};
