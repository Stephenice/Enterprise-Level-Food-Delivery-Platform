import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * useGetRestaurant hook fetches a restaurant by its ID.
 * It sends a GET request to the API endpoint '/api/restaurant/:restaurantId'.
 * 
 * @param {string | undefined} restaurantId - The ID of the restaurant to fetch.
 * @returns {Object} - An object containing the fetched restaurant and loading state.
 */
export const useGetRestaurant = (restaurantId?: string) => {

  /**
   * Function to send a GET request to fetch a restaurant by its ID.
   * @returns {Promise<Restaurant>} - A promise that resolves to the fetched restaurant.
   */
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  // Use useQuery hook to fetch restaurant data with optional request based on restaurantId
  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    getRestaurantByIdRequest,
    {
      enabled: !!restaurantId,
    }
  );

  return { restaurant, isLoading };
};


/**
 * useSearchRestaurants hook fetches restaurants based on search criteria.
 * It sends a GET request to the API endpoint '/api/restaurant/search/:city' with search parameters.
 * 
 * @param {SearchState} searchState - The current search state containing search criteria.
 * @param {string | undefined} city - The city to search for restaurants in.
 * @returns {Object} - An object containing the fetched search results and loading state.
 */
export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  /**
   * Function to send a GET request to search for restaurants based on search criteria.
   * @returns {Promise<RestaurantSearchResponse>} - A promise that resolves to the search results.
   */
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

    // Use useQuery hook to fetch search results data with optional request based on city
  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};
