import { useState } from "react";

export const useToken = () => {
  const [token, setToken] = useState("");

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  return [token, updateToken];
};
