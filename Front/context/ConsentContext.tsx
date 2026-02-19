"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface ConsentContextType {
  hasConsent: boolean;
  accept: () => void;
  decline: () => void;
}

const ConsentContext = createContext<ConsentContextType>({
  hasConsent: false,
  accept: () => {},
  decline: () => {},
});

export const ConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasConsent, setHasConsent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookie-consent");
    if (savedConsent === "accepted") {
      setHasConsent(true);
    }
    setLoading(false);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setHasConsent(true);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setHasConsent(false);
  };

  return (
    <ConsentContext.Provider  value={{ hasConsent, accept, decline }}>
      {!loading && children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => useContext(ConsentContext);