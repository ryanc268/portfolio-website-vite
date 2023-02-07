import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { MyWork } from "./pages/MyWork";
import { ContactMe } from "./pages/ContactMe";
import { MusicLibrary } from "./pages/MusicLibrary";
import Nav from "./components/Nav";
import { AnimatePresence } from "framer-motion";

export const Router = () => {
  return (
    <>
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/work" element={<MyWork />} />
          <Route path="/contact" element={<ContactMe />} />
          <Route path="/music" element={<MusicLibrary />}>
            <Route path=":id" element={<MusicLibrary />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
};
