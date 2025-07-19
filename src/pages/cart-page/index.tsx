// src/components/CartScreen.tsx
import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import ShippingOptionSelector from "@/components/ShippingOptionSelector";
import { useShippingStore } from "@/store/useShippingStore";
import {
  useCheckoutStore,
  type CheckoutResponse,
} from "@/store/useCheckoutStore";

function CartScreen() {
  const navigate = useNavigate();
  const { selectedOption } = useShippingStore();
  const { createOrder } = useCheckoutStore();
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCartStore();

  const { user, isLoading: authLoading } = useAuthStore();

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    if (
      window.confirm(
        "Are you sure you want to remove this item from your cart?"
      )
    ) {
      removeItem(productId);
    }
  };

  const handleProceedToCheckout = async () => {
    if (
      !user ||
      !user.address_line ||
      !user.city ||
      !user.postal_code ||
      !user.province ||
      !user.phone_number
    ) {
      toast.error(
        "Please complete your delivery address and phone number in your profile before proceeding to checkout."
      );
      navigate("/profile");
      return;
    } else if (!selectedOption?.cost) {
      toast.error("Please select a shipping option before proceeding.");
      return;
    }
    const orderResponse: CheckoutResponse | null = await createOrder();
    if (orderResponse && orderResponse.paymentUrl) {
      toast.info("Redirecting to payment gateway...");
      window.location.href = orderResponse.paymentUrl;
    } else if (orderResponse) {
      toast.success(orderResponse.message || "Order created successfully!");
      navigate("/order-confirmation");
    }
  };

  const handleContinueShopping = () => {
    navigate("/cakes");
  };

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice() + (selectedOption?.cost || 0);

  const isCheckoutDisabled =
    !user ||
    !user.address_line ||
    !user.city ||
    !user.postal_code ||
    !user.province ||
    !user.phone_number;

  return (
    <div className="__main-container mx-auto p-4 md:p-8 min-h-screen-minus-header-footer">
      <h1 className="text-3xl font-bold text-[#3C5A3E] mb-8 pt-16 text-center">
        Your Shopping Cart
      </h1>
      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-lg">
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Your cart is empty.
          </p>
          <button
            onClick={handleContinueShopping}
            className="inline-block bg-[#6B8E23] hover:bg-[#8BC34A] text-white font-bold py-2.5 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex items-start flex-col lg:flex-row gap-8">
          <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">
              Items in Your Cart ({totalItems})
            </h2>
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center border-b pb-6 last:border-b-0 last:pb-0"
                >
                  <img
                    src={item.product_image_url}
                    alt={item.product_name}
                    className="w-28 h-28 md:w-24 md:h-24 object-cover rounded-lg mr-0 md:mr-6 mb-4 md:mb-0 shadow-md flex-shrink-0"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                      {item.product_name}
                    </h3>
                    <p className="text-gray-700 font-bold mb-2">
                      Rp{item.product_price.toLocaleString("id-ID")}
                    </p>
                    <div className="flex items-center justify-center md:justify-start space-x-2 mt-1">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md hover:bg-gray-300 transition duration-200 text-base font-bold"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-base font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md hover:bg-gray-300 transition duration-200 text-base font-bold"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-3 text-red-500 hover:text-red-700 text-sm md:text-base font-medium transition duration-200"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="ml-0 md:ml-4 mt-4 md:mt-0 text-lg md:text-xl font-bold text-gray-900 flex-shrink-0">
                    Rp
                    {(item.product_price * item.quantity).toLocaleString(
                      "id-ID"
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t pt-6 gap-4">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-800 font-bold py-2 px-4 rounded-lg transition duration-300 text-base"
              >
                Clear Cart
              </button>
              <button
                onClick={handleContinueShopping}
                className="text-[#3C5A3E] hover:text-[#6B8E23] font-bold py-2 px-4 rounded-lg transition duration-300 text-base"
              >
                Continue Shopping
              </button>
            </div>
          </div>

          <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow-lg self-start sticky top-4">
            <ShippingOptionSelector />
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b py-4">
              Order Summary
            </h2>
            <div className="space-y-2 text-base text-gray-700 mb-6">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-semibold">{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">
                  Rp{totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Cost:</span>
                <span className="font-semibold">
                  Rp{(selectedOption?.cost || 0).toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-3 mt-3">
                <span>Total:</span>
                <span>Rp{totalPrice.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
              Delivery Address
            </h3>
            {authLoading ? (
              <p className="text-gray-600 italic">Loading address details...</p>
            ) : user ? (
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-700 text-base">
                  <span className="font-semibold w-24 flex-shrink-0">
                    Recipient:
                  </span>
                  <span className="ml-2 flex-grow">
                    {user.name || user.email || "N/A"}
                  </span>
                </div>

                <div className="flex text-gray-700 text-base">
                  <span className="font-semibold w-24 flex-shrink-0">
                    Address:
                  </span>
                  <span
                    className={`ml-2 flex-grow ${
                      !user.address_line ? "text-orange-600" : ""
                    }`}
                  >
                    {user.address_line || "Alamat tidak tersedia"}
                    {user.city && `, ${user.city}`}
                    {user.province && `, ${user.province}`}
                    {user.postal_code && ` - ${user.postal_code}`}
                  </span>
                </div>
                <div className="flex items-center text-gray-700 text-base">
                  <span className="font-semibold w-24 flex-shrink-0">
                    Phone:
                  </span>
                  <span className="ml-2 flex-grow">
                    {user.phone_number || "N/A"}
                  </span>
                </div>

                <button
                  onClick={() => navigate("/profile")}
                  className="mt-6 w-full bg-white text-[#3C5A3E] border border-[#3C5A3E] hover:bg-[#3C5A3E] hover:text-white font-bold py-2.5 px-6 rounded-lg shadow transition duration-300 transform hover:scale-105"
                >
                  Edit Address
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-600 mb-4">
                <p>
                  Please{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-[#3C5A3E] hover:underline font-semibold"
                  >
                    login
                  </button>{" "}
                  to view or set your delivery address.
                </p>
                <p className="text-sm mt-2">
                  Or{" "}
                  <button
                    onClick={() => navigate("/register")}
                    className="text-[#3C5A3E] hover:underline font-semibold"
                  >
                    register
                  </button>{" "}
                  if you don't have an account.
                </p>
              </div>
            )}

            <button
              onClick={handleProceedToCheckout}
              className={`w-full bg-[#6B8E23] text-white font-bold py-2.5 px-6 rounded-lg shadow-lg mt-6 transition duration-300 transform hover:scale-105
                ${
                  isCheckoutDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#8BC34A]"
                }`}
              disabled={isCheckoutDisabled}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartScreen;
