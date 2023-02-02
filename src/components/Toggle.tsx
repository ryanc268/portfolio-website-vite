import { useState } from "react";
import { motion } from "framer-motion";

interface ToggleProps {
  children: React.ReactNode;
  title: string;
}

const Toggle: React.FC<ToggleProps> = ({ children, title }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <motion.div
      layout
      className="cursor-pointer items-center justify-between py-8 px-4 text-white md:block md:p-40 md:py-6"
      onClick={() => setToggle(!toggle)}
    >
      <motion.h4 layout className="text-lg md:py-6 md:text-4xl">
        {title}
      </motion.h4>
      {toggle ? children : ""}
      <div className="h-0.5 w-full bg-cyan-custom md:h-1"></div>
    </motion.div>
  );
};

export default Toggle;
