import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";

export const useScroll = (delay: number) => {
  const controls = useAnimation();
  const [element, view] = useInView({ threshold: 0.3 });
  if (view) {
    setTimeout(() => controls.start("show"), delay);
  } else {
    controls.mount();
    controls.start("hidden");
  }
  return [element, controls] as const;
};

export default useScroll;
