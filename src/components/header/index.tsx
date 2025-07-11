import React from "react";
import {} from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";
import FtasticLogo from "../../assets/ftastic-logo.png";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="absolute top-0 left-0 w-full py-5 z-50">
      <div className="__main-container flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={FtasticLogo} className="max-h-12" alt="FtasticLogo" />
          <span className="text-3xl text-[#333333] chewy-regular">
            Fruitastic
          </span>
        </div>
        <nav>
          <ul className="flex gap-8">
            <li>
              <a
                href="/"
                className="text-[#333333] font-semibold hover:text-[#333333]/70 transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/cakes"
                className="text-[#333333] font-semibold hover:text-[#333333]/70 transition-colors duration-300"
              >
                Cakes
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-[#333333] font-semibold hover:text-[#333333]/70 transition-colors duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex gap-5">
          <RiShoppingCart2Line
            onClick={() => navigate("/cart-page")}
            className="w-6 h-6 cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
