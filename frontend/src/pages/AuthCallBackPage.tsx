import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


/**
 * AuthCallbackPage component handles the callback after successful authentication.
 * It retrieves user information using Auth0's useAuth0 hook and creates a corresponding
 * user in the application using the useCreateMyUser hook. Once the user is created,
 * it navigates the user to the home page ("/"). This component ensures that the user
 * is redirected to the home page after authentication and user creation.
 * 
 * @returns {JSX.Element} JSX representing the authentication callback page.
 */
const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();

  const hasCreatedUser = useRef(false);

  // Effect to create user and navigate on user or createUser change
  useEffect(() => {
    // If user information is available and user hasn't been created yet
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      // Set hasCreatedUser to true to prevent redundant user creation
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]);

  // Render loading message while redirecting
  return <>Loading...</>;
};

export default AuthCallbackPage;
