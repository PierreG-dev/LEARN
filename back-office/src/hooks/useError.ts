import { useState, useCallback } from "react";

type IError = {
  status: boolean;
  msg: string;
};

// --- Hook qui gère les erreurs dans les formulaires
const useError = () => {
  const [error, setError] = useState<IError>({
    status: false,
    msg: "",
  });

  // --- Fonction qui change le msg de l'erreur
  const changeErrorMsg = useCallback((msg: string): void => {
    setError((prevstate: IError) => ({
      ...prevstate,
      msg: msg,
    }));
  }, []);
  // --- Fonction qui active l'erreur
  const enableError = useCallback((): void => {
    setError((prevstate) => ({
      ...prevstate,
      status: true,
    }));
  }, []);
  // --- Fonction qui désactive l'erreur
  const disableError = useCallback((): void => {
    setError((prevstate) => ({
      ...prevstate,
      status: false,
    }));
  }, []);

  return {
    error,
    changeErrorMsg,
    enableError,
    disableError,
  };
};

export default useError;
