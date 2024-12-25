import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/Landing-page";
import GoogleLogin from "./auth/GoogleLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NotFound from "./components/Not-found-404";
import Dashboard from "./components/dashboard/Dashboard";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  // Check if the user is authenticated
  const [isAuthenticated, setisAuthenticated] = useState(true);

  const GoogleAuthWrapper = () => {
    // Access the Google Client ID from the environment variable
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    return (
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin></GoogleLogin>
      </GoogleOAuthProvider>
    );
  };

  const PrivateRoutes = ({ element }: { element: JSX.Element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route
          path="/dashboard"
          element={<PrivateRoutes element={<Dashboard />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Provider>
  );
}

export default App;
