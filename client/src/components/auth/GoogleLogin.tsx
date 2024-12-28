import React from "react";
import { useGoogleLogin, CodeResponse } from "@react-oauth/google";
import {useNavigate } from "react-router-dom";
import { googleAuth } from "./authServices";
import { Button } from "../ui/button";
import googlesvg from '../../assets/images/google.png'
import {AppDispatch, } from  '../../store/store';
import { useDispatch } from "react-redux";
import {login} from '../../components/auth/authSlices'


const GoogleLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()

  const responseGoogle = async (authResponse: CodeResponse) => {
    try {
      if (authResponse["code"]) {
        // Use the separated service for Google authentication
        const result = await googleAuth(authResponse["code"]);
        const { name, email, image } = result.user;
        // Dispatch the login action
        dispatch(login({
          user: name, email, image,
          token: result.token
        }));
        // Save the user data to the local storage
        localStorage.setItem("user", JSON.stringify({ name, email, image, token: result.token }));
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
    <Button variant="outline" onClick={googleLogin}>
      <img
        src={googlesvg}
        className=" mr-4"
        width={25}
        height={25}
        alt="google"
      />
      Continue with Google
    </Button>
  );
};

export default GoogleLogin;
