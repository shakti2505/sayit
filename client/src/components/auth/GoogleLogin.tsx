import React from "react";
import { useGoogleLogin, CodeResponse } from "@react-oauth/google";
import { useNavigate, useSearchParams } from "react-router-dom";
import { googleAuth } from "./authServices";
import { Button } from "../ui/button";
import googlesvg from "../../assets/images/google.png";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { login } from "../../components/auth/authSlices";

const GoogleLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const groupid = searchParams.get("gorup_id");

  const responseGoogle = async (authResponse: CodeResponse) => {
    try {
      if (authResponse["code"]) {
        // Use the separated service for Google authentication
        const result = await googleAuth(authResponse["code"]);
        const { name, email, image, _id, public_key } = result.user;
        // Dispatch the n action
        dispatch(
          login({
            email,
            image,
            _id,
            token: result.token,
            user: name,
          })
        );
        // Save the user data to the local storage
        localStorage.setItem(
          "user",
          JSON.stringify({
            name,
            email,
            image,
            token: result.token,
            id: _id,
            public_key,  
          })
        );

        // genrate RSA key

        // Redirect to the home page
        if (groupid) {
          navigate(`/chats/${groupid}`);
        } else {
          navigate("/dashboard");
        }
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
