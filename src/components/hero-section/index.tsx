import React from "react";
import CallToActionButtons from "../call-to-action-button";
import CakeDecoration from "../../assets/cakes-decoration.png";

const HeroSection: React.FC = () => {
  return (
    <div className="max-w-lg text-left text-[#3d4b2f] z-10">
      <div className="flex items-center gap-2 mb-2">
        <img src={CakeDecoration} className="w-10" alt="cake-decoration" />
        <p className="text-3xl  __font-chicle">Every One Love's</p>
      </div>
      <h1 className="text-8xl leading-tight __font-chicle mb-5">
        <span className="text-[#ffc83e]">Natural</span> and{" "}
        <span className="text-[#ffc83e]">healthy</span> Cakes.
      </h1>
      <p className="text-base leading-relaxed mb-10">
        Di Fruitastic, kami menghadirkan kelezatan sejati dari kue-kue alami dan
        sehat. Nikmati setiap gigitan tanpa rasa bersalah!
      </p>
      <CallToActionButtons />
    </div>
  );
};

export default HeroSection;
