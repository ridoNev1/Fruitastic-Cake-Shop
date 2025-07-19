import { useEffect } from "react";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Order } from "@/types";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const getShipmentBadge = (status: number | null) => {
  switch (status) {
    case 1:
      return <Badge variant="outline">Pesanan Dibuat</Badge>;
    case 2:
      return (
        <Badge className="bg-blue-500 hover:bg-blue-500/80">
          Pesanan Dikirim
        </Badge>
      );
    case 3:
      return (
        <Badge className="bg-purple-500 hover:bg-purple-500/80">
          Dalam Perjalanan
        </Badge>
      );
    case 4:
      return (
        <Badge className="bg-green-500 hover:bg-green-500/80">
          Pesanan Selesai
        </Badge>
      );
    default:
      return <Badge variant="secondary">Pesanan Bermasalah</Badge>;
  }
};

const calculateTotal = (order: Order) => {
  const itemsTotal = order.cart_items.reduce((acc, item) => {
    return acc + item.product.product_price * item.qty;
  }, 0);
  return itemsTotal + order.shipping_cost;
};

export function MyOrdersPage() {
  const { orders, isLoading, fetchOrders } = useCheckoutStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="__main-container mx-auto min-h-screen py-28">
      <h1 className="text-2xl font-bold mb-6 text-primary">
        Riwayat Pesanan Saya
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p>Memuat data pesanan...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">
                        ID Pesanan #{order.id}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    {getShipmentBadge(order.tracking_position)}
                  </div>
                </CardHeader>
                <CardContent className="p-4 grid grid-cols-[1fr_2fr] items-start gap-8 divide-x-2">
                  <Card className="p-0 overflow-hidden">
                    <div className="space-y-3 text-primary">
                      <div className="flex p-4 bg-gray-200 items-center text-base">
                        <span className="font-semibold w-24 flex-shrink-0">
                          Recipient:
                        </span>
                        <span className="ml-2 flex-grow">
                          {order.recipient_name || "N/A"}
                        </span>
                      </div>
                      <div className="flex text-base py-1 px-4">
                        <span className="font-semibold w-24 flex-shrink-0">
                          Address:
                        </span>
                        <span
                          className={`ml-2 flex-grow ${
                            !order.shipping_address ? "text-orange-600" : ""
                          }`}
                        >
                          {order.shipping_address || "Alamat tidak tersedia"}
                          {order.shipping_city && `, ${order.shipping_city}`}
                        </span>
                      </div>
                      <div className="flex items-center p-4 bg-gray-200 text-base">
                        <span className="font-semibold w-24 flex-shrink-0">
                          Phone:
                        </span>
                        <span className="ml-2 flex-grow">
                          {order.recipient_phone || "N/A"}
                        </span>
                      </div>
                    </div>
                  </Card>
                  <div>
                    {order.cart_items.map((item, index) => (
                      <div key={item.id}>
                        <div className="flex items-center gap-4 py-4">
                          <img
                            src={item.product.product_image_url}
                            alt={item.product.product_name}
                            className="w-16 h-16 rounded-md object-cover"
                          />
                          <div className="flex-grow">
                            <p className="font-semibold">
                              {item.product.product_name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {item.qty} x{" "}
                              {formatCurrency(item.product.product_price)}
                            </p>
                          </div>
                          <p className="font-semibold">
                            {formatCurrency(
                              item.product.product_price * item.qty
                            )}
                          </p>
                        </div>
                        {index < order.cart_items.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 p-4 flex flex-col items-end space-y-2">
                  <div className="flex justify-between w-full text-sm">
                    <span>Ongkos Kirim:</span>
                    <span className="font-semibold">
                      {formatCurrency(order.shipping_cost)}
                    </span>
                  </div>
                  <div className="flex justify-between w-full text-base font-bold">
                    <span>Total Pesanan:</span>
                    <span>{formatCurrency(calculateTotal(order))}</span>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-20">
              <p>Anda belum memiliki pesanan.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
