import { useState } from "react";
import { VIEWS } from "../types/enums";

export const useViewChange = () => {
  const [currentView, setCurrentView] = useState<VIEWS>(VIEWS.MAIN);
  const handleViewChange = (newView: VIEWS) => {
    setCurrentView(newView);
  };
  return { currentView, handleViewChange };
};
