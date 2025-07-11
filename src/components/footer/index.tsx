import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const FruitasticFooter: React.FC = () => {
  return (
    <footer className="bg-[#374111] text-stone-200">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold text-white">Fruitastic</h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-300">
              Menghadirkan kelezatan sejati dari kue-kue alami dan sehat.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-yellow-400 transition-colors"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-yellow-400 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-yellow-400 transition-colors"
              >
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  Cakes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>Jl. Jend. Sudirman No. 52-53, Jakarta</li>
              <li>
                <a
                  href="mailto:hello@fruitastic.com"
                  className="hover:text-yellow-400"
                >
                  hello@fruitastic.com
                </a>
              </li>
              <li>
                <a href="+6281383344477" className="hover:text-yellow-400">
                  +62 813-8334-4477
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Join Our List
            </h3>
            <p className="mt-4 text-sm text-stone-300">
              Dapatkan promo dan info terbaru langsung di email Anda.
            </p>
            <form className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-md border-transparent bg-white/10 px-4 py-2 text-white placeholder-stone-400 focus:border-yellow-400 focus:ring-yellow-400"
              />

              <button
                type="submit"
                className="rounded-md bg-yellow-400 px-4 py-2 font-bold text-[#374111] hover:bg-yellow-300 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-stone-400"></div>
      </div>
    </footer>
  );
};

export default FruitasticFooter;
