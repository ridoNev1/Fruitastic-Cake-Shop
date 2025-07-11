import React from "react";
import mainCake from "../../assets/cake-main.jpg";
import StarRating from "../star-rating";
import HealthyChocolateCookies from "../../assets/healthy-chocolate-cookies.jpg";
import Raspberry from "../../assets/Raspberry-Cupcakes-57-1.jpg";
import Bpancakes from "../../assets/healthy2Bpancakes2Brecipe.jpg";

const CakeImageSection: React.FC = () => {
  return (
    <div className="relative w-[600px] h-[600px] flex justify-center items-center rounded-full -ml-12 shadow-xl">
      <div className="absolute w-[150px] h-[150px] p-3 border-4 border-dashed border-white rounded-full flex justify-center items-center text-center text-white font-semibold text-xs uppercase top-12 left-12 z-30 bg-[#ffc83e]">
        <p className="transform rotate-[20deg]">WE CARE ABOUT YOUR CAKE!</p>
      </div>

      <div className="w-[600px] h-[600px] grid grid-cols-2 gap-4">
        <img
          src={mainCake}
          alt="Main Cake"
          className="relative z-20 object-cover w-[300px] rounded rounded-tl-full"
        />
        <img
          src={HealthyChocolateCookies}
          alt="Main Cake"
          className="relative z-20 object-cover w-[300px] rounded"
        />
        <img
          src={Bpancakes}
          alt="Main Cake"
          className="relative z-20 object-cover w-[300px] rounded rounded-bl-full"
        />
        <img
          src={Raspberry}
          alt="Main Cake"
          className="relative z-20 object-cover w-[300px] rounded rounded-br-full"
        />
      </div>

      <div className="absolute bottom-12 left-12 bg-white bg-opacity-80 p-4 rounded-lg flex items-center gap-2 shadow-lg z-30">
        <p className="font-semibold text-base">Sweet Cakes</p>
        <StarRating rating={4.5} />
        <p className="font-bold text-lg text-[#FF69B4]">4.5</p>
      </div>
    </div>
  );
};

export default CakeImageSection;
