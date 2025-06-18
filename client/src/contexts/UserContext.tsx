import { createContext, useContext, ReactNode, useState } from "react";

interface UserContextType {
  name: string;
  points: number;
  coupons: number;
  redeemCoupon: (pointsCost: number) => void;
  addCoupons: (quantity: number) => void;
  addPoints: (quantity: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({
    name: "Mauricio Heredia",
    points: 1250,
    coupons: 8,
  });

  const redeemCoupon = (pointsCost: number) => {
    setUser((prev) => ({
      ...prev,
      points: prev.points - pointsCost,
      coupons: prev.coupons + 1,
    }));
  };

  const addCoupons = (quantity: number) => {
    setUser((prev) => ({
      ...prev,
      coupons: prev.coupons + quantity,
    }));
  };

  const addPoints = (quantity: number) => {
    setUser((prev) => ({
      ...prev,
      points: prev.points + quantity,
    }));
  };

  return (
    <UserContext.Provider
      value={{ ...user, redeemCoupon, addCoupons, addPoints }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
