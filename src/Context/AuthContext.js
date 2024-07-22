import { useState, useEffect, createContext } from "react";
import axiosInstance from "../Utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);
  const navigate = useNavigate();

  // console.log(user);

  useEffect(() => {
    if (!user && user === null) {
      fetchUserData();
    }
  }, [user, userUpdated]);

  const fetchUserData = async () => {
    try {
      setCheckUser(true);
      const response = await axiosInstance.get("user/logged-in-user");
      // console.log(response.data.user);
      setUser(response.data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setCheckUser(false);
    }
  };

  // const logOut = async () => {
  //   const response = await axiosInstance.post("user/logout");

  //   if (response) {
  //     // console.log("cleared as welll");
  //     setUser(null);
  //     navigate("/");
  //   }
  // };

  const logOut = async () => {
    try {
      console.log("Sending logout request");
      await axiosInstance.post(
        "user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Logout request successful");
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        checkUser,
        setUser,
        logOut,
        fetchUserData,
        setUserUpdated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
