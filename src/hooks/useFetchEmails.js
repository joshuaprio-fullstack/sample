import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useFetchEmails = () => {
  const { user } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emails, setEmails] = useState([]);

  const fetchEmails = async (sent) => {
    setIsLoading(true);

    const response = await fetch(
      process.env.REACT_APP_BACKEND + `emails?sent=${sent}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const emails = await response.json();

    if (response.ok) {
      setIsLoading(false);
      setEmails(emails);
      return;
    }

    if (!response.ok) {
      setError("Error");
    }
  };

  return { fetchEmails, emails, isLoading, error };
};

export default useFetchEmails;
