import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";

const RESnackbar = ({ snackbarState, hideSnackbar }) => {
  const { open, message, type = "info", duration = 4000 } = snackbarState;
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 10);

      return () => clearTimeout(showTimer);
    } else {
      setIsVisible(false);
      const hideTimer = setTimeout(() => {
        setShouldRender(false);
      }, 300);

      return () => clearTimeout(hideTimer);
    }
  }, [open]);

  useEffect(() => {
    if (open && duration > 0) {
      const timer = setTimeout(() => {
        hideSnackbar();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [open, duration, hideSnackbar]);

  const handleClose = () => {
    hideSnackbar();
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="w-5 h-5" />;
      case "error":
        return <ErrorIcon className="w-5 h-5" />;
      case "warning":
        return <WarningIcon className="w-5 h-5" />;
      case "info":
      default:
        return <InfoIcon className="w-5 h-5" />;
    }
  };

  const getStyles = () => {
    const baseStyles = "flex items-center gap-3 p-4 rounded-lg shadow-lg border min-w-80 max-w-md transition-all duration-300 ease-in-out transform";
    const animationStyles = isVisible 
      ? "translate-x-0 opacity-100" 
      : "translate-x-full opacity-0";
    
    switch (type) {
      case "success":
        return `${baseStyles} ${animationStyles} bg-green-50 border-green-200 text-green-800`;
      case "error":
        return `${baseStyles} ${animationStyles} bg-red-50 border-red-200 text-red-800`;
      case "warning":
        return `${baseStyles} ${animationStyles} bg-yellow-50 border-yellow-200 text-yellow-800`;
      case "info":
      default:
        return `${baseStyles} ${animationStyles} bg-blue-50 border-blue-200 text-blue-800`;
    }
  };

  if (!shouldRender) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={getStyles()}>
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        
        <div className="flex-1 text-sm font-medium">
          {message}
        </div>
        
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors duration-200"
          aria-label="Close notification"
        >
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default RESnackbar;