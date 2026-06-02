import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { ContactMe } from "./pages/ContactMe";
import { MusicLibrary } from "./pages/MusicLibrary";
import Nav from "./components/Nav";
import { AnimatePresence } from "framer-motion";
import ValerianX from "./pages/projects/ValerianX";
import GoonBot from "./pages/projects/GoonBot";
import { Helmet } from "react-helmet";
import { MusicPlayerProvider } from "./context/MusicPlayerContext";
import PageBottomPad from "./components/PageBottomPad";

import logo192 from "/src/assets/logo192.png";
import icon from "/src/assets/favicon.ico";
import ImageRecognitionAI from "./pages/projects/ImageRecognitionAI";
import { NotFound } from "./pages/NotFound";

const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
};

export const Router = () => {
  const location = useLocation();

  return (
    <MusicPlayerProvider>
      <CustomHelmet />
      <Nav />
      <PageBottomPad>
        <AnimatePresence mode="wait" onExitComplete={scrollToTop}>
          <Routes location={location} key={location.pathname}>
            <Route index element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/valerianX" element={<ValerianX />} />
            <Route
              path="/projects/image-recognition-ai"
              element={<ImageRecognitionAI />}
            />
            <Route path="/projects/goon-bot" element={<GoonBot />} />
            <Route path="/work" element={<Navigate to="/projects" replace />} />
            <Route
              path="/work/valerianX"
              element={<Navigate to="/projects/valerianX" replace />}
            />
            <Route
              path="/work/image-recognition-ai"
              element={<Navigate to="/projects/image-recognition-ai" replace />}
            />
            <Route
              path="/work/goon-bot"
              element={<Navigate to="/projects/goon-bot" replace />}
            />
            <Route path="/contact" element={<ContactMe />} />
            <Route path="/music" element={<MusicLibrary />} />
            <Route path="/music/:id" element={<MusicLibrary />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </PageBottomPad>
    </MusicPlayerProvider>
  );
};

const CustomHelmet = () => {
  return (
    <Helmet>
      <title>Ryan Coppa&apos;s Portfolio</title>
      <meta
        name="description"
        content="Home of all his personal programming projects and music production. Ryan Coppa is a 27 year old passionate Software Engineer who excels at finding modern solutions to any problem!"
      />
      <meta property="og:type" content="article" />
      <meta property="og:title" content="Home Page" />
      <meta
        property="og:description"
        content="Landing Page for Ryan's Portfolio. Find out what he's been up to by visiting today!"
      />
      <meta property="og:image" content="https://i.imgur.com/xfS8kP2.png" />
      <meta property="og:url" content="https://www.ryancoppa.com/" />
      <meta property="og:site_name" content="Ryan Coppa's Portfolio" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Home Page" />
      <meta
        name="twitter:description"
        content="Home of all his personal programming projects and music production. Ryan Coppa is a 27 year old passionate Software Engineer who excels at finding modern solutions to any problem!"
      />
      <meta name="twitter:image" content="https://i.imgur.com/xfS8kP2.png" />
      <meta name="twitter:site" content="@Ryanc268" />
      <meta name="twitter:creator" content="@Ryanc268" />

      <link rel="apple-touch-icon" href={window.location.origin + logo192} />
      <link rel="icon" href={window.location.origin + icon} />
    </Helmet>
  );
};
