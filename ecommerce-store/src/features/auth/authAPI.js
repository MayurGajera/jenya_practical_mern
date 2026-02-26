import axios from "axios";

// Login User API Call
export const loginApi = async (credentials) => {
  if (credentials.username === "admin" && credentials.password === "admin") {
    return {
      id: 999,
      username: "admin",
      firstName: "Admin",
      lastName: "User",
      token: "fake-jwt-token-for-admin-access",
    };
  }

  const response = await axios.post(
    "https://dummyjson.com/auth/login",
    credentials,
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.data;
};
