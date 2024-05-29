import React, { createContext, useContext, useState } from 'react';

// Crie o contexto
const SidebarContext = createContext();

// Crie o provedor de contexto
export const SidebarProvider = ({ children }) => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarHidden, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Crie um hook para usar o contexto
export const useSidebar = () => useContext(SidebarContext);
