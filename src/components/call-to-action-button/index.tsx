import React from "react";
import { useNavigate } from "react-router-dom";

const CallToActionButtons: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-5">
      <button
        className="px-8 py-4 bg-[#3d4b2f] text-white rounded-md text-base font-semibold cursor-pointer transition-all duration-300"
        onClick={() => navigate("/cakes")}
      >
        ORDER NOW
      </button>
      <button
        onClick={() => navigate("/cakes")}
        className="px-8 py-4 bg-transparent border-2 border-[#3d4b2f] text-[#3d4b2f] rounded-md text-base font-semibold cursor-pointer transition-all duration-300"
      >
        EXPLORE MORE
      </button>
    </div>
  );
};

export default CallToActionButtons;
