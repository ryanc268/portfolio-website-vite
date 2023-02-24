import { motion } from "framer-motion";
import { pageAnimation, cardAnim, spinEntryRight } from "../utils/Animation";
import resume from "../assets/resume.pdf";
import ScrollTop from "../utils/ScrollTop";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import linkedinlogo from "/src/assets/linkedinlogo.png";
import githublogo from "/src/assets/githublogo.png";
import githublogo2 from "/src/assets/githublogo2.png";
import logo from "/src/assets/logo192.png";

export const ContactMe = () => {
  return (
    <motion.div
      className="h-screen flex-1 items-center justify-center text-center"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
    >
      <CustomHelmet />
      <div>
        <div>
          <motion.h2
            className="py-2 text-4xl md:py-10 md:text-7xl"
            variants={spinEntryRight}
          >
            Contact <span className="text-cyan-custom">Me</span>
          </motion.h2>
        </div>
      </div>
      <div>
        <div>
          <motion.div
            className="flex justify-center py-4 md:py-10"
            variants={spinEntryRight}
          >
            <a
              className="rounded-md border-2 border-solid border-cyan-custom px-4 py-1 font-montserrat text-xs transition ease-in-out hover:border-indigo-700 hover:bg-cyan-custom md:py-4 md:text-xl"
              href={resume}
              download="Ryan_Coppa_Resume_Public.pdf"
            >
              Download My Public Resume
              <FontAwesomeIcon className="pl-2" icon={faFilePdf} size="xl" />
            </a>
          </motion.div>
        </div>
        <div className="flex w-screen flex-col items-center justify-center gap-4 md:flex-row md:gap-20 md:py-8">
          <motion.div variants={cardAnim}>
            <div className="flex h-80 w-80 flex-col items-center rounded-lg bg-slate-900 hover:shadow-2xl hover:shadow-slate-500">
              <div className="w-full rounded-t-lg bg-slate-800">
                <img
                  className="w-1/2 p-2"
                  src={linkedinlogo}
                  alt="Linkedin Logo Dark Theme"
                />
              </div>
              <img
                className="my-2 flex w-20 rounded-full"
                alt="Profile Picture"
                src="https://media.licdn.com/dms/image/C5103AQGlLSKryMz6AQ/profile-displayphoto-shrink_200_200/0/1516980586170?e=1682553600&v=beta&t=-FHtdP1nOTMkEdQLMhhsFozdJm6MlkbC46MkSgpku8I"
              />
              <h3 className="my-2 text-2xl">Ryan Coppa</h3>
              <h4 className="font-montserrat text-sm">
                Senior API Engineer at Runkeeper
              </h4>
              <div className="my-1 flex flex-row">
                <a
                  className="px-2 font-montserrat text-xs hover:underline"
                  href="https://www.linkedin.com/company/fitnesskeeper-inc-?trk=public-profile-badge-profile-badge_company-name"
                  rel="noreferrer"
                  target="_blank"
                >
                  Runkeeper (ASICS Digital)
                </a>
                <a
                  className="px-2 font-montserrat text-xs hover:underline"
                  href="https://www.linkedin.com/school/durham-college/?trk=public-profile-badge-profile-badge_school-name"
                  rel="noreferrer"
                  target="_blank"
                >
                  Durham College
                </a>
              </div>
              <a
                className="my-2 w-1/2 rounded-lg border border-white p-2 font-montserrat text-sm hover:bg-slate-800"
                href="https://ca.linkedin.com/in/ryan-coppa?trk=profile-badge"
                rel="noreferrer"
                target="_blank"
              >
                View My Profile
              </a>
            </div>
          </motion.div>
          <motion.div variants={cardAnim}>
            <div className="flex h-80 w-80 flex-col items-center rounded-lg bg-slate-900 hover:shadow-2xl hover:shadow-slate-500">
              <div className="flex w-full flex-row rounded-t-lg bg-slate-800">
                <img
                  className="flex w-1/3 self-center pl-2"
                  src={githublogo}
                  alt="Github Logo Dark Theme"
                />
                <img
                  className="flex w-1/6 self-center p-2 pl-0"
                  src={githublogo2}
                  alt="Linkedin Logo Dark"
                />
              </div>
              <img
                className="my-2 flex w-24 rounded-full"
                alt="Profile Picture"
                src={logo}
              />
              <h3 className="my-2 text-2xl">Ryanc268</h3>
              <h4 className="font-montserrat text-sm">
                Front-end, Full-Stack & Backend Projects
              </h4>
              <a
                className="my-4 w-1/2 rounded-lg border border-white p-2 font-montserrat text-sm hover:bg-slate-800"
                href="https://github.com/ryanc268"
                rel="noreferrer"
                target="_blank"
              >
                View My Code
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      <ScrollTop />
    </motion.div>
  );
};

const CustomHelmet = () => {
  return (
    <Helmet>
      <title>Contact</title>
      <meta
        name="description"
        content="Contact me for any inquiries or further interest in my projects!"
      />
      <meta property="og:title" content="Contact Me" />
      <meta property="og:description" content="Contact page of my portfolio!" />
      <meta property="og:url" content="https://www.ryancoppa.com/contact" />
      <meta name="twitter:title" content="Contact Me" />
      <meta
        name="twitter:description"
        content="Contact me for any inquiries or further interest in my projects!"
      />
    </Helmet>
  );
};
