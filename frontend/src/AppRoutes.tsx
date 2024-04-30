import { Navigate, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallBackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";


/**
 * Defines the routing structure for the application using React Router.
 * 
 * The AppRoutes component specifies the different routes available in the application
 * and their corresponding components. It utilizes React Router's Route and Routes
 * components to define the routing structure. Each Route component represents a
 * specific path in the application and renders the appropriate component when that
 * path is matched.
 * 
 * @returns {JSX.Element} JSX representing the application routes.
 */


export default function AppRoutes() {
  return (
    <Routes>
      {/* Route for the home page */}
      <Route path="/" element={<Layout showHero><HomePage/></Layout>} />

      {/* Route for authentication callback */}
      <Route path="/auth-callback" element={<AuthCallbackPage />} />

      {/* Route for searching restaurants by city */}
      <Route path="/search/:city" element={
      <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      /> 

      {/* Route for viewing restaurant details */}
      <Route
        path="/detail/:restaurantId"
        element={
          <Layout showHero={false}>
            <DetailPage />
          </Layout>
        }
      />

      {/* Protected routes */}
      <Route element={<ProtectedRoute/>}>
        {/* Route for viewing order status */}
      <Route path="/order-status" element={<Layout><OrderStatusPage /></Layout>}/>
        {/* Route for viewing user profile */}
      <Route path="/user-profile" element={<Layout><UserProfilePage /></Layout>} />
      {/* Route for managing restaurant */}
      <Route path="/manage-restaurant" element={<Layout> <ManageRestaurantPage /> </Layout> } />
      </Route>
      {/* Redirect to home page for undefined routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
