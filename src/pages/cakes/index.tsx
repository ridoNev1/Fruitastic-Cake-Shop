import { useProductStore } from "@/store/useProductStore";
import ProductCard from "../../components/product-card";
import { useCartStore } from "../../store/useCartStore";
import { useEffect } from "react";

const CakesList = () => {
  const { fetchAllProducts, products } = useProductStore();
  const { addItem, getDetailQtyById, updateQuantity } = useCartStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="min-h-screen __main-container pt-20">
      <section className="py-8 bg-white">
        <p className="text-3xl leading-8 mb-12 text-center font-bold tracking-tight text-[#3d4b2f]">
          Our Products
        </p>
        <div className="__main-container grid gap-6 justify-items-center grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {products?.map((el) => (
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
      </section>
    </div>
  );
};

export default CakesList;
