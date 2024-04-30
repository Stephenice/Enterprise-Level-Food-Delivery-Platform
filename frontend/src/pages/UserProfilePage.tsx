import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

/**
 * UserProfilePage component represents the page for displaying and updating user profile information.
 * It utilizes custom hooks to fetch and update user data, and renders a user profile form for editing.
 * 
 * @returns {JSX.Element} JSX representing the user profile page.
 */
const UserProfilePage = () => {
   // Hook to fetch current user data and check loading status
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();

  // Hook to update user data and check loading status
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  // Render loading message while user data is being fetched
  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  // Render message if user data cannot be loaded
  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  // Render user profile form for editing
  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;
