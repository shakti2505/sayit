import axios from "axios";
import { genrateAndStoreKeyPair } from "../../crypto/key_manager";

const BASE_URL = "http://localhost:8080";

interface GoogleAuthResponse {
  user: {
    name: string;
    email: string;
    image: string;
    _id: string;
    public_key:string;
  };
  token: string;
}

export const googleAuth = async (
  authCode: string
): Promise<GoogleAuthResponse> => {
  try {
    // genrating and storing public key and private keys
    const key = await genrateAndStoreKeyPair();
    const response = await axios.get(
      `${BASE_URL}/auth/google?code=${authCode}&key=${key}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error during Google authentication:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Google login failed");
  }
};
