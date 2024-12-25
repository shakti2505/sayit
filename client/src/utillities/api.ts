import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080/auth", // Base URL for your auth API
});

// Function to handle Google Authentication
export const googleAuth = async (code:string) => {
  try {
    const response = await api.get(`/google?code=${code}`);
    return response.data;
  } catch (error) {
    console.error("Google Authentication failed:", error);
    throw error; // Propagate the error to the caller
  }
};
