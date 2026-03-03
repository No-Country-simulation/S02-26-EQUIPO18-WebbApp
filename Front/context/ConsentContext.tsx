"use client";
import { createContext, useContext, useState } from "react";

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
  const [hasConsent, setHasConsent] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("cookie-consent") === "accepted";
  });

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
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => useContext(ConsentContext);