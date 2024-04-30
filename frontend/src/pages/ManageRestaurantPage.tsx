import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";


/**
 * ManageRestaurantPage component represents the page for managing restaurant details.
 * It includes tabs for displaying active orders and managing restaurant information.
 * The component utilizes various custom hooks to fetch and manipulate restaurant data
 * such as creating, updating, and fetching restaurant details and orders.
 * 
 * @returns {JSX.Element} JSX representing the manage restaurant page.
 */
const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  // Hook to fetch active orders for the restaurant
  const { orders } = useGetMyRestaurantOrders();

  // Check if currently editing restaurant details
  const isEditing = !!restaurant;

  // Render tabs for managing orders and restaurant details
  return (
    <Tabs defaultValue="orders">
      <TabsList>
         {/* Tab for viewing orders */}
        <TabsTrigger value="orders">Orders</TabsTrigger>
         {/* Tab for managing restaurant */}
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
         {/* Render order items */}
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      {/* Content for managing restaurant */}
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
