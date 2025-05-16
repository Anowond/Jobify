import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "../utils/customAxios";

const RequireAuth = ({ children }) => {
    console.log('RequireAuth')
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
       const response = await customAxios.get('/users/getCurrentUser', { withCredentials: true });
        if (response.status === 200) {setIsAuthenticated(true)}
      } catch (err) {
        navigate("/"); 
      }
    };

    checkAuth();
  }, []);

  return isAuthenticated && children;
};

export default RequireAuth;
