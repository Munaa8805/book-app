import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, register } from "../api/auth";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }
    };
    fetchUser();
  }, []);

  const loginHandler = async (email, password) => {
    console.log("email-password", email, password);
    const response = await fetch(
      "https://backend-ideas-8pfw.onrender.com/api/v1/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    // console.log("response-login", response.ok);
    if (response.ok) {
      const result = await response.json();
      setToken(result.accessToken);
      setUser(result.data);
      setIsLoading(false);
      await AsyncStorage.setItem("token", result.accessToken);
      await AsyncStorage.setItem("user", JSON.stringify(result.data));
      return { success: true, data: result.data };
    } else {
      return { success: false, error: "Login failed" };
    }

    // const result = await login({ email, password });
    // console.log("result-login", result);
  };

  const registerHandler = async (name, email, password) => {
    try {
      const response = await axios.post(
        "https://backend-ideas-8pfw.onrender.com/api/v1/auth/register",
        {
          name,
          email,
          password,
        }
      );
      setToken(response.data.accessToken);
      setUser(response.data.user);
      setIsLoading(false);
      return {
        success: true,
        accessToken: response.data.accessToken,
        data: response.data,
      };
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  const logoutHandler = async () => {
    try {
      const response = await fetch(
        "https://backend-ideas-8pfw.onrender.com/api/v1/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        setToken("");
        setUser(null);
      }
      return { success: true, data: {} };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };
  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        token,
        setToken,
        user,
        setUser,
        loginHandler,
        registerHandler,
        logoutHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};
