import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

/**
 * CheckoutButton component renders a button for checkout, handling authentication and user profile data.
 * 
 * @param {Props} props - The props for the CheckoutButton component.
 * @param {Function} props.onCheckout - Function to handle checkout process with user form data.
 * @param {boolean} props.disabled - Indicates whether the button is disabled.
 * @param {boolean} props.isLoading - Indicates whether the button is in loading state.
 * @returns {JSX.Element} - JSX element representing the CheckoutButton component.
 */
const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  // Auth0 authentication hook to check if the user is authenticated
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  // React Router hook to get the current location
  const { pathname } = useLocation();

  // Custom hook to fetch current user's profile data
  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  // Function to handle login process
  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  // Render login button if user is not authenticated
  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-orange-500 flex-1">
        Log in to check out
      </Button>
    );
  }

  // Render loading button if authentication or user profile data is loading
  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />;
  }

  // Render checkout button and dialog for user profile form
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-500 flex-1">
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title="Confirm Deliery Details"
          buttonText="Continue to payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
