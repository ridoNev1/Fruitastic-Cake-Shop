import { Link } from "react-router-dom";
import { HiOutlineTrash, HiPlus, HiMinus } from "react-icons/hi";
import type { Product } from "../../types.type";
import { useCartStore } from "../../store/useCartStore";

const CartPage = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } =
    useCartStore();

  const handleQuantityChange = (product: Product, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(product.id, newQuantity);
    } else {
      removeItem(product.id);
    }
  };

  const handleCheckoutToWhatsApp = () => {
    const whatsAppNumber = "6281383344477";
    const shippingCost = 15000;
    const tax = 5000;
    const total = getTotalPrice() + shippingCost + tax;

    let message = "Halo, saya ingin memesan:\n\n";

    items.forEach((item) => {
      message += `*${item.name}*\n`;
      message += `Qty: ${item.quantity}\n`;
      message += `Harga: Rp ${item.price.toLocaleString("id-ID")}\n\n`;
    });

    message += "-------------------\n";
    message += `Subtotal: Rp ${getTotalPrice().toLocaleString("id-ID")}\n`;
    message += `Ongkos Kirim: Rp ${shippingCost.toLocaleString("id-ID")}\n`;
    message += `Pajak: Rp ${tax.toLocaleString("id-ID")}\n`;
    message += `*Total Pesanan: Rp ${total.toLocaleString("id-ID")}*\n\n`;
    message += "Terima kasih!";

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;

    window.open(url, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto min-h-[50vh] px-4 py-20 mt-28 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Keranjang Anda Kosong
        </h1>
        <p className="text-gray-600 mb-8">
          Sepertinya Anda belum menambahkan produk apapun.
        </p>
        <Link
          to="/"
          className="inline-block bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 transition-colors"
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen mt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="mt-2 text-2xl leading-8 mb-12 text-center font-extrabold tracking-tight text-[#3d4b2f] sm:text-4xl">
          Keranjang Belanja
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md">
            <ul role="list" className="divide-y divide-gray-200">
              {items.map((product) => (
                <li key={product.id} className="flex flex-col sm:flex-row p-6">
                  <div className="h-32 w-32 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-0 sm:ml-4 mt-4 sm:mt-0 flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-gray-800">
                        Rp {product.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      {/* Kontrol Kuantitas */}
                      <div className="flex items-center rounded-md border border-gray-300">
                        <button
                          onClick={() =>
                            handleQuantityChange(product, product.quantity - 1)
                          }
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-md"
                        >
                          <HiMinus className="h-5 w-5" />
                        </button>
                        <span className="px-4 py-1 text-center font-medium">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(product, product.quantity + 1)
                          }
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-md"
                        >
                          <HiPlus className="h-5 w-5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="font-medium text-red-600 hover:text-red-500 flex items-center space-x-1"
                      >
                        <HiOutlineTrash className="h-5 w-5" />
                        <span className="text-sm">Hapus</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-6 border-t border-gray-200 text-right">
              <button
                onClick={() => clearCart()}
                className="text-sm font-medium text-gray-500 hover:text-red-600"
              >
                Kosongkan Keranjang
              </button>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-4">
                Ringkasan Pesanan
              </h2>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium">
                    Rp {getTotalPrice().toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Ongkos Kirim</p>
                  <p className="font-medium">Rp 15.000</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Pajak</p>
                  <p className="font-medium">Rp 5.000</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-bold">
                  <p>Total</p>
                  <p>
                    Rp{" "}
                    {(getTotalPrice() + 15000 + 5000).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleCheckoutToWhatsApp}
                  className="w-full flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
                >
                  Pesan via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
