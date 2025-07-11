import React from "react";
import { LuPalette, LuSparkles, LuLeaf } from "react-icons/lu";

interface UspItem {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const UspSection: React.FC = () => {
  const usps: UspItem[] = [
    {
      icon: LuLeaf,
      title: "Bahan Alami & Sehat",
      description:
        "Dibuat dengan buah segar pilihan dan bahan berkualitas tinggi, tanpa pengawet atau pewarna buatan, aman dan menyehatkan.",
      color: "#3d4b2f",
    },
    {
      icon: LuSparkles,
      title: "Resep Unik & Inovatif",
      description:
        "Menyajikan kombinasi rasa yang inovatif dan resep istimewa yang berbeda dari toko kue lainnya.",
      color: "#3d4b2f",
    },
    {
      icon: LuPalette,
      title: "Tampilan Menarik Visual",
      description:
        "Setiap kue dirancang dengan tampilan yang kreatif dan kekinian, menjadikannya menarik secara visual.",
      color: "#3d4b2f",
    },
  ];

  return (
    <div className="py-12 font-inter px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-base text-white font-semibold tracking-wide uppercase"
            style={{ color: usps[0].color }}
          >
            Mengapa Memilih Fruitastic?
          </h2>
          <p className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Keunggulan yang Membedakan Kami
          </p>
          <p className="mt-4 max-w-2xl text-lg text-white mx-auto">
            Kami berkomitmen untuk memberikan pengalaman kuliner yang tak
            terlupakan dengan kualitas terbaik.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {usps.map((usp, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center text-center"
            >
              <div
                className="flex items-center justify-center h-16 w-16 rounded-full text-white mb-6"
                style={{ backgroundColor: usp.color }}
              >
                <usp.icon size={32} strokeWidth={2.5} />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {usp.title}
              </h3>

              <p className="text-gray-600">{usp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UspSection;
