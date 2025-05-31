import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Alert, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const SnackbarContext = createContext();

const CustomSnackbar = ({ snackbar, onClose, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => onClose(snackbar.id), 300);
  };

  useEffect(() => {
    if (snackbar.duration && snackbar.duration > 0) {
      const timer = setTimeout(handleClose, snackbar.duration);
      return () => clearTimeout(timer);
    }
  }, [snackbar.duration]);

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'success':
        return 'bg-green-500 text-white border-green-600';
      case 'error':
        return 'bg-red-500 text-white border-red-600';
      case 'warning':
        return 'bg-orange-500 text-white border-orange-600';
      case 'info':
      default:
        return 'bg-blue-500 text-white border-blue-600';
    }
  };

  return (
    <div
      className={`
        transform transition-all duration-300 ease-in-out mb-2
        ${isVisible && !isLeaving 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
        }
      `}
      style={{
        zIndex: 1000 + index,
      }}
    >
      <div className={`
        min-w-[300px] max-w-[400px] p-4 rounded-lg shadow-lg border-l-4 flex items-center justify-between
        ${getSeverityStyles(snackbar.severity)}
      `}>
        <div className="flex-1 pr-2">
          <p className="text-sm font-medium">{snackbar.message}</p>
        </div>
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{ 
            color: 'inherit', 
            padding: '2px',
            '&:hover': { 
              backgroundColor: 'rgba(255,255,255,0.1)' 
            }
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
};

export const SnackbarProvider = ({ children }) => {
  const [snackbars, setSnackbars] = useState([]);

  const showSnackbar = useCallback((message, severity = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    
    const newSnackbar = {
      id,
      message,
      severity,
      duration
    };

    setSnackbars(prev => [...prev, newSnackbar]);
  }, []);

  const hideSnackbar = useCallback((id) => {
    setSnackbars(prev => prev.filter(snackbar => snackbar.id !== id));
  }, []);

  const hideAllSnackbars = useCallback(() => {
    setSnackbars([]);
  }, []);

  const contextValue = {
    showSnackbar,
    hideSnackbar,
    hideAllSnackbars
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      
      {snackbars.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col-reverse max-h-screen overflow-hidden">
          {snackbars.map((snackbar, index) => (
            <CustomSnackbar
              key={snackbar.id}
              snackbar={snackbar}
              onClose={hideSnackbar}
              index={index}
            />
          ))}
        </div>
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};