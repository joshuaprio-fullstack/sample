import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useFetchMeta = () => {
  const { user } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [metaData, setMetaData] = useState({});

  const fetchMeta = async () => {
    setIsLoading(true);

    const response = await fetch(process.env.REACT_APP_BACKEND + "api/meta", {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const meta = await response.json();

    if (response.ok) {
      setIsLoading(false);
      setMetaData(meta);
      return;
    }

    if (!response.ok) {
      setError("Error");
    }
  };

  return { fetchMeta, metaData, isLoading, error };
};

export default useFetchMeta;
