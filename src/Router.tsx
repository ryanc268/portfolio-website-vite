import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { MyWork } from "./pages/MyWork";
import { ContactMe } from "./pages/ContactMe";
import { MusicLibrary } from "./pages/MusicLibrary";
import Nav from "./components/Nav";
import { AnimatePresence } from "framer-motion";
import ValerianX from "./pages/work/ValerianX";
import GoonBot from "./pages/work/GoonBot";
import { Helmet } from "react-helmet";

import logo192 from "/src/assets/logo192.png";
import icon from "/src/assets/favicon.ico";

export const Router = () => {
  return (
    <>
      <CustomHelmet />
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/work" element={<MyWork />} />
          <Route path="/work/valerianX" element={<ValerianX />} />
          <Route path="/work/goon-bot" element={<GoonBot />} />
          <Route path="/contact" element={<ContactMe />} />
          <Route path="/music" element={<MusicLibrary />}>
            <Route path=":id" element={<MusicLibrary />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
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
