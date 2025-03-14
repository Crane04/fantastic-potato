import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getRequest from "../api/getRequest";


export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(null);
  const [userData, setUserData] = useState(null);

  const login = async (token) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      setJwt(token);
    } catch (error) {
      console.error("Error saving JWT:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setJwt(null);
      setUserData(null); // Clear user data on logout
    } catch (error) {
      console.error("Error removing JWT:", error);
    }
  };

  const loadJwt = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        setJwt(token);
      }
    } catch (error) {
      console.error("Error loading JWT:", error);
    }
  };

  const getUser = async () => {
    if (!jwt) return; // Prevent request if there's no JWT

    try {
      const response = await getRequest("/profile", {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    loadJwt();
  }, []);

  useEffect(() => {
    if (jwt) {
      getUser();
    }
  }, [jwt]); // Run getUser() only when jwt is set

  return (
    <AuthContext.Provider value={{ jwt, login, logout, getUser, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
