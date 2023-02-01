import { useInView } from "react-intersection-observer";
import { AnimationControls, useAnimation } from "framer-motion";

export const useScroll = (
  delay: number
): [React.Ref<HTMLDivElement>, AnimationControls] => {
  const controls = useAnimation();
  const [element, view] = useInView({ threshold: 0.3 });
  if (view) {
    setTimeout(() => controls.start("show"), delay);
  } else {
    controls.mount();
    controls.start("hidden");
  }
  return [element, controls];
};

export default useScroll;
