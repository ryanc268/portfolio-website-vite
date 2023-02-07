import { motion } from "framer-motion";
import { pageAnimation } from "../utils/Animation";
import AboutSection from "../components/home/AboutSection";
import ServicesSection from "../components/home/ServicesSection";
import FaqSection from "../components/home/FaqSection";
import ScrollTop from "../utils/ScrollTop";

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
      <FaqSection />
      <ScrollTop />
    </motion.div>
  );
};
