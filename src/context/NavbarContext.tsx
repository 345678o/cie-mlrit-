"use client";

import { createContext, useContext, useState } from "react";

type Ctx = { hidden: boolean; hide: () => void; show: () => void };

const NavbarContext = createContext<Ctx>({ hidden: false, hide: () => {}, show: () => {} });

export function useNavbarVisibility() {
  return useContext(NavbarContext);
}

export function NavbarProvider({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  return (
    <NavbarContext.Provider value={{ hidden, hide: () => setHidden(true), show: () => setHidden(false) }}>
      {children}
    </NavbarContext.Provider>
  );
}
