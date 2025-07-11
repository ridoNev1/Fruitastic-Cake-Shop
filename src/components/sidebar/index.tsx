import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialMediaSidebar: React.FC = () => {
  return (
    <div className="text-[#3d4b2f] absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-5 py-5 px-2 rounded-r-lg z-20">
      <ul className="flex flex-col gap-4">
        <li>
          <a href="#">
            <FaFacebookF className="w-6 h-6 grayscale hover:grayscale-0 transition-all duration-300" />
          </a>
        </li>
        <li>
          <a href="#">
            <FaInstagram className="w-6 h-6 grayscale hover:grayscale-0 transition-all duration-300" />
          </a>
        </li>
        <li>
          <a href="#">
            <FaXTwitter className="w-6 h-6 grayscale hover:grayscale-0 transition-all duration-300" />
          </a>
        </li>
      </ul>
      <span className="transform -rotate-90 whitespace-nowrap text-xs font-semibold mt-20">
        ANY TYPE OF CAKE YOU NEED
      </span>
    </div>
  );
};

export default SocialMediaSidebar;
