import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const getAccessToken = () => {
    return Cookies.get("accessToken");
  };

  const loginCompanyAuth = (token: any) => {
    Cookies.set("accessToken", token, { expires: 2 });
    setIsAuthenticated(true);
    router.push("/products");
  };

  const logout = () => {
    Cookies.remove("accessToken");
    setIsAuthenticated(false);
    router.push("/");
  };

  return { isAuthenticated, loginCompanyAuth, logout, getAccessToken };
};
