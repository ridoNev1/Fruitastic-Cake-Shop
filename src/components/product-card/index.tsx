import React from "react";
import { MdVerified } from "react-icons/md";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useCartStore } from "../../store/useCartStore";
import { FiMinus, FiPlus } from "react-icons/fi";

type ProductCardProps = {
  imageUrl: string;
  name: string;
  isVerified?: boolean;
  bio: string;
  price?: number;
  addProduct?: () => void;
  minProduct?: () => void;
  id: number;
};

const formatterIDR = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  name,
  isVerified = true,
  bio,
  price,
  addProduct,
  minProduct,
  id,
}) => {
  const { getDetailQtyById } = useCartStore();
  return (
    <div className="w-[300px] overflow-hidden rounded-[28px] bg-white shadow-lg">
      <img
        src={imageUrl}
        alt={`Profile of ${name}`}
        className="block h-[300px] object-cover w-full"
      />
      <div className="p-6">
        <div className="mb-2 flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-800 text-ellipsis line-clamp-1">
            {name}
          </h2>
          {isVerified && <MdVerified className="h-6 w-6 text-green-500" />}
        </div>
        <p className="mb-6 text-sm leading-relaxed text-gray-500 text-ellipsis line-clamp-3">
          {bio}
        </p>
        <div className="flex items-center justify-between">
          {getDetailQtyById(id) < 1 ? (
            <button
              onClick={addProduct}
              className="rounded-xl text-sm flex items-center gap-2 bg-gray-100 px-2.5 py-2.5 font-semibold text-gray-800 transition-colors hover:bg-gray-200"
            >
              <span>Add Cart</span> <RiShoppingCart2Line />
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={minProduct}
                className="rounded-xl text-sm flex items-center gap-2 bg-gray-100 px-2.5 py-2.5 font-semibold text-gray-800 transition-colors hover:bg-gray-200"
              >
                <FiMinus />
              </button>
              <span>{getDetailQtyById(id)}</span>
              <button
                onClick={addProduct}
                className="rounded-xl text-sm flex items-center gap-2 bg-gray-100 px-2.5 py-2.5 font-semibold text-gray-800 transition-colors hover:bg-gray-200"
              >
                <FiPlus />
              </button>
            </div>
          )}

          {price && (
            <span className="text-amber-600 font-semibold">
              {formatterIDR.format(price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
