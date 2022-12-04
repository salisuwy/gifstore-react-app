import React from "react";
import { IconSocialHandle } from "./icons";

const Footer = () => {

  return (
    <footer className="mt-5 bg-white p-4 shadow md:px-6 md:py-8">
      <div className="container mx-auto sm:flex sm:items-center sm:justify-between">
        <a
          href="https://github.com/salisuwy"
          title="Github"
          className="mb-4 flex items-center sm:mb-0"
        >
          <IconSocialHandle cssClasses="mr-1 h-6 w-6 text-indigo-500" />
         
          <span className="self-center whitespace-nowrap text-2xl font-semibold">
            salisuwy
          </span>
        </a>
        <ul className="mb-6 flex flex-wrap items-center text-sm text-gray-500 sm:mb-0">
          <li>
            <a
              href="https://github.com/salisuwy"
              className="mr-4 hover:underline md:mr-6"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://medium.com/@salisuwy"
              className="mr-4 hover:underline md:mr-6"
            >
              Medium
            </a>
          </li>
          <li>
            <a href="https://twitter.com/salisuwy" className="hover:underline">
              Twitter
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
