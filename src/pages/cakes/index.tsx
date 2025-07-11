import ProductCard from "../../components/product-card";
import { mockProductData } from "../../constant";
import { useCartStore } from "../../store/useCartStore";

const CakesList = () => {
  const { addItem, getDetailQtyById, updateQuantity } = useCartStore();

  return (
    <div className="min-h-screen __main-container pt-28">
      <section className="py-8 bg-white">
        <p className="mt-2 text-2xl leading-8 mb-12 text-center font-extrabold tracking-tight text-[#3d4b2f] sm:text-4xl">
          Our Products
        </p>
        <div className="__main-container grid gap-6 justify-items-center grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {mockProductData?.map((el) => (
            <ProductCard
              key={el.id}
              id={el.id}
              imageUrl={el?.imageUrl}
              price={el?.price}
              name={el?.name}
              isVerified={true}
              bio={el?.bio}
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
