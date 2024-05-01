import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
  order: Order;
};

/**
 * OrderStatusHeader component displays the header for the order status, including the status label and expected delivery time.
 * 
 * @component
 * @param {Props} props - Props for OrderStatusHeader component.
 * @returns {JSX.Element} - JSX element representing the OrderStatusHeader component.
 */
const OrderStatusHeader = ({ order }: Props) => {
  /**
   * Calculates the expected delivery time based on the order creation time and estimated delivery time from the restaurant.
   * @returns {string} - Expected delivery time string in format "HH:MM".
   */
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  /**
   * Retrieves order status information from ORDER_STATUS based on the order's status value.
   * @returns {Object} - Object containing label and progress value for the order status.
   */
  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span> Order Status: {getOrderStatusInfo().label}</span>
        <span> Expected by: {getExpectedDelivery()}</span>
      </h1>
      <Progress
        className="animate-pulse"
        value={getOrderStatusInfo().progressValue}
      />
    </>
  );
};

export default OrderStatusHeader;
