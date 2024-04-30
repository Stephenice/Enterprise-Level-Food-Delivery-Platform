import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

/**
 * OrderStatusPage component represents the page for displaying the status of user orders.
 * It fetches the user's orders using the useGetMyOrders hook and renders each order's status.
 * If no orders are found or data is still loading, appropriate messages are displayed.
 * 
 * @returns {JSX.Element} JSX representing the order status page.
 */
const OrderStatusPage = () => {
  // Hook to fetch user orders and check loading status
  const { orders, isLoading } = useGetMyOrders();

  // Render loading message while data is being fetched
  if (isLoading) {
    return "Loading...";
  }

  if (!orders || orders.length === 0) {
    return "No orders found";
  }

  return (
    <div className="space-y-10">
      {/* Map through each order and render its status */}
      {orders.map((order) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
          {/* Render order status header */}
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            {/* Render restaurant image */}
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
