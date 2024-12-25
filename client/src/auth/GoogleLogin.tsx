import React from "react";
import { useGoogleLogin, CodeResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { googleAuth } from "./authServices";

const GoogleLogin: React.FC = () => {
  const navigate = useNavigate();
  const responseGoogle = async (authResponse: CodeResponse) => {
    try {
      if (authResponse["code"]) {
        console.log(authResponse["code"]);
        // Use the separated service for Google authentication
        const result = await googleAuth(authResponse["code"]);
        const { name, email, image } = result.user;
        // Save the user data to the local storage
        localStorage.setItem("user", JSON.stringify({ name, email, image }));
        // Redirect to the home page
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("Error during Google login:", err);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => {
      console.log("Error during login:", error);
    },
    flow: "auth-code", // Ensure you're using the authorization code flow
  });


  return (
    <div>
      <button onClick={googleLogin}>Login with Google</button>
    </div>
  );
};

export default GoogleLogin;
