import React, { createContext, useContext, useState, useCallback } from "react";
import RESnackbar from "../components/UI/RESnackbar/RESnackbar";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    type: "info",
    duration: 4000,
  });

  const showSnackbar = useCallback((message, type = "info", duration = 4000) => {
    setSnackbarState({
      open: true,
      message,
      type,
      duration,
    });
  }, []);

  const hideSnackbar = useCallback(() => {
    setSnackbarState(prev => ({
      ...prev,
      open: false,
    }));
  }, []);

  // Convenience methods for different types
  const showSuccess = useCallback((message, duration) => {
    showSnackbar(message, "success", duration);
  }, [showSnackbar]);

  const showError = useCallback((message, duration) => {
    showSnackbar(message, "error", duration);
  }, [showSnackbar]);

  const showWarning = useCallback((message, duration) => {
    showSnackbar(message, "warning", duration);
  }, [showSnackbar]);

  const showInfo = useCallback((message, duration) => {
    showSnackbar(message, "info", duration);
  }, [showSnackbar]);

  const contextValue = {
    showSnackbar,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      {/* Global Snackbar - renders once for the entire app */}
      <RESnackbar 
        snackbarState={snackbarState}
        hideSnackbar={hideSnackbar}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};