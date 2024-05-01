import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * useGetMyOrders hook fetches the current user's orders.
 * It sends a GET request to the API endpoint '/api/order' with the user's access token.
 * 
 * @returns {Object} - An object containing the fetched orders and loading state.
 */
export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  /**
   * Function to send a GET request to fetch the current user's orders.
   * @returns {Promise<Order[]>} - A promise that resolves to an array of orders.
   */
  const getMyOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get orders");
    }

    return response.json();
  };

  // Use useQuery hook to fetch orders data and manage loading state with automatic refetching every 5 seconds
  const { data: orders, isLoading } = useQuery(
    "fetchMyOrders",
    getMyOrdersRequest,
    {
      refetchInterval: 5000,
    }
  );

  console.log('test order', orders)
  return { orders, isLoading };
};

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

/**
 * useCreateCheckoutSession hook creates a new checkout session for an order.
 * It sends a POST request to the API endpoint '/api/order/checkout/create-checkout-session' with the user's access token and checkout session data.
 * 
 * @returns {Object} - An object containing the function to create a checkout session, and loading and error states.
 */
export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  /**
   * Function to send a POST request to create a new checkout session.
   * @param {CheckoutSessionRequest} checkoutSessionRequest - Data for creating a checkout session.
   */
  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response.ok) {
      throw new Error("Unable to create checkout session");
    }

    return response.json();
  };

  // Use useMutation hook to create checkout session and manage loading, error, and success states
  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);

  // Show error toast if creating checkout session fails
  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    createCheckoutSession,
    isLoading,
  };
};
