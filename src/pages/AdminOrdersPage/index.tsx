import { useEffect, useMemo } from "react";
import { useAdminStore } from "@/store/adminStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, DollarSign, CreditCard, Activity } from "lucide-react";
import type { Order } from "@/types";
import { AdminLayout } from "@/components/layout/AdminLayout";

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

const getStatusBadge = (status: number) => {
  switch (status) {
    case 1:
      return <Badge variant="destructive">Menunggu Pembayaran</Badge>;
    case 2:
      return <Badge className="bg-yellow-500">Sedang Diproses</Badge>;
    case 3:
      return (
        <Badge className="bg-green-500 text-white hover:bg-green-500/80">
          Selesai
        </Badge>
      );
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const calculateTotal = (order: Order) => {
  if (!order.cart_items) return order.shipping_cost;
  const itemsTotal = order.cart_items.reduce((acc, item) => {
    return acc + item.product.product_price * item.qty;
  }, 0);
  return itemsTotal + order.shipping_cost;
};

export function AdminOrdersPage() {
  const { orders, isLoading, fetchAdminOrders, updateOrderStatus } =
    useAdminStore();

  useEffect(() => {
    fetchAdminOrders();
  }, [fetchAdminOrders]);

  // Kalkulasi data insight menggunakan useMemo agar efisien
  const insights = useMemo(() => {
    const totalRevenue = orders
      .filter((order) => order.transaction_status === 3) // Hanya status "Done"
      .reduce((acc, order) => acc + calculateTotal(order), 0);

    const totalSales = orders.filter(
      (order) => order.transaction_status >= 2
    ).length;
    const newOrders = orders.filter(
      (order) => order.transaction_status === 2
    ).length;

    return { totalRevenue, totalSales, newOrders };
  }, [orders]);

  const handleUpdateStatus = (orderId: number, status: number) => {
    updateOrderStatus(orderId, { transaction_status: status });
  };

  const handleUpdateShipping = (orderId: number, status: number) => {
    updateOrderStatus(orderId, { tracking_position: status });
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-xl font-bold mb-6">Semua Pesanan</h1>

        {/* --- BAGIAN INSIGHT BARU --- */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Pendapatan
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(insights.totalRevenue)}
              </div>
              <p className="text-xs text-muted-foreground">
                Dari pesanan yang telah selesai
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Penjualan
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{insights.totalSales}</div>
              <p className="text-xs text-muted-foreground">
                Jumlah transaksi berhasil
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pesanan Baru
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{insights.newOrders}</div>
              <p className="text-xs text-muted-foreground">
                Pesanan yang perlu diproses
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Memuat data pesanan...</p>
            ) : (
              <Table>
                {/* ... Isi Tabel Anda (tidak ada perubahan di sini) ... */}
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Pelanggan</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Order Status</TableHead>
                    <TableHead>Shipment Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{order.recipient_name}</TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString("id-ID")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>
                            {getStatusBadge(order.transaction_status)}
                          </span>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleUpdateStatus(order.id, 2)}
                              >
                                Tandai Sedang Diproses
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleUpdateStatus(order.id, 3)}
                              >
                                Tandai Selesai
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>
                            {getShipmentBadge(order?.tracking_position)}
                          </span>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdateShipping(order.id, 2)
                                }
                              >
                                Tandai Dikirim
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdateShipping(order.id, 3)
                                }
                              >
                                Tandai Dalam Perjalanan
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdateShipping(order.id, 4)
                                }
                              >
                                Tandai Terkirim
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(calculateTotal(order))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
