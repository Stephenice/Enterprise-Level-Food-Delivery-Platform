import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * useGetMyUser hook fetches the current user's profile data.
 * It sends a GET request to the API endpoint '/api/my/user' with the user's access token.
 * 
 * @returns {Object} - An object containing the fetched user data and loading state.
 */
export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();


   /**
   * Function to send a GET request to fetch the current user's profile data.
   * @returns {Promise<User>} - A promise that resolves to the fetched user data.
   */
  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };


  // Use useQuery hook to fetch user data and manage loading and error states
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading };
};

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};


/**
 * useCreateMyUser hook creates a new user profile.
 * It sends a POST request to the API endpoint '/api/my/user' with the user's access token and user data.
 * 
 * @returns {Object} - An object containing the function to create a user profile, loading state, error state, and success state.
 */
export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  /**
   * Function to send a POST request to create a new user profile.
   * @param {CreateUserRequest} user - Data of the user to be created.
   */
  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  // Use useMutation hook to create user and manage loading, error, and success states
  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};


/**
 * useUpdateMyUser hook updates the current user's profile data.
 * It sends a PUT request to the API endpoint '/api/my/user' with the user's access token and updated user data.
 * 
 * @returns {Object} - An object containing the function to update user profile data, loading state, and error state.
 */
export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();


  /**
   * Function to send a PUT request to update user profile data.
   * @param {UpdateMyUserRequest} formData - Updated data of the user profile.
   */
  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };

  // Use useMutation hook to update user profile and manage loading, success, and error states
  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  // Show success toast if update is successful
  if (isSuccess) {
    toast.success("User profile updated!");
  }

  // Show error toast if update fails
  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isLoading };
};