// PRACTICAL 5: Custom React Hook - reusable logic wrapped in a hook

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Instead of importing useContext + AuthContext everywhere,
// components can simply call useAuth()
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
