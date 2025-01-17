import axios from "axios";

const BASE_URL = "http://localhost:8080";

interface GoogleAuthResponse {
  user: {
    name: string;
    email: string;
    image: string;
    _id:string;
  };
  token: string;
}

export const googleAuth = async (
  authCode: string
): Promise<GoogleAuthResponse> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/auth/google?code=${authCode}`,
      {
        withCredentials:true,
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


