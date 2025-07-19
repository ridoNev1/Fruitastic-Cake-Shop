import React, { useEffect } from "react";
import HeroSection from "../../components/hero-section";
import CakeImageSection from "../../components/cake-image";
import UspSection from "../../components/usp-section";
import ProductCard from "../../components/product-card";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { useProductStore } from "@/store/useProductStore";
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { fetchAllProducts, products } = useProductStore();
  const { addItem, getDetailQtyById, updateQuantity } = useCartStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <>
      <div className="relative min-h-screen bg-white p-0">
        <main className="relative z-10 flex gap-8 justify-between py-12 flex-col md:flex-row items-center __main-container pt-28">
          <HeroSection />
          <CakeImageSection />
        </main>
      </div>
      <section className="bg-[#3d4b2f]">
        <div className="__main-container">
          <UspSection />
        </div>
      </section>
      <section className="py-16 bg-white">
        <p className="mt-2 text-3xl leading-8 mb-12 text-center font-bold tracking-tight text-[#3d4b2f]">
          Our Products
        </p>
        <div className="__main-container grid gap-6 justify-items-center grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {products.slice(0, 4).map((el) => (
            <ProductCard
              key={el.id}
              id={+el.id}
              imageUrl={el?.product_image_url}
              price={el?.product_price}
              name={el?.product_name}
              isVerified={true}
              bio={el?.product_story}
              addProduct={() => addItem(el)}
              minProduct={() =>
                updateQuantity(el.id, getDetailQtyById(el.id) - 1)
              }
            />
          ))}
        </div>
        <div className="flex justify-center mt-12 items-center">
          <button
            onClick={() => navigate("/cakes")}
            className="px-8 py-2 bg-[#3d4b2f] text-white rounded-md text-base font-semibold cursor-pointer transition-all duration-300"
          >
            Explore More
          </button>
        </div>
      </section>
    </>
  );
};

export default HomePage;
