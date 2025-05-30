// import { Tooltip } from 'react-tooltip';
// import 'react-tooltip/dist/react-tooltip.css';

import { CircularProgress } from "@mui/material";

const REButton = ({ text, onClick, isLoading, type, disabled, theme, variant, size, customSize="", iconLeft, iconRight, 
  tooltip, maxWidthMax, responsive, hover, className, loader, loaderState}) => {

  const getBtnBgColor = () => {
    if(disabled){
      return 'bg-gray-500 text-gray rounded-lg cursor-not-allowed'
    }
    if(theme == 'primary') {
      return 'btn-primary'
    }
    else if(theme == 'primary-solid') {
      return 'btn-primary-solid'
    }
    else if(theme == 'secondary') {
      return 'btn-secondary'
    } 
    else if(theme == 'white') {
      return 'btn-white'
    }
    else if(theme == 'green') {
      return 'bg-grey-lighter  text-green-500 '
    }
    else if(theme == 'danger') {
      return 'bg-red-500  text-white '
    }
    else if(theme == 'success') {
      return 'bg-green-500  text-white '
    }

    else if(theme == 'transparent') {
      return 'bg-transparent  text-app-purple '
    }
    else {
      return 'border-green-new'
    }
  }

  const getBtnSize = () => {
    if(size == 'small') {
      return 'px-3 py-1.5 '
    }
    if(responsive) {
      return 'px-3 md:px-4 py-1.5 md:py-3'
    }
    if(customSize) {
      return customSize;
    }
    return 'px-6 py-3'
  }
  const getBtnType = () => {
    if(disabled){
      return 'button';
    }
    if(type) {
      return type;
    }
    return 'button';
  }

  const getBtnVariant = () => {
    if(variant == 'dark') {
      return 'btn-variant-dark';
    }
    return '';
  }
  const getHover = () => {
    if(hover == 'danger') {
      return 'bg-red-600';
    }
    if(hover == 'success') {
      return 'bg-green-600';
    }
    return '';
  }
  
    return (
      <>
        <button
          data-tooltip-content={tooltip}
          data-tooltip-place="right"
          className={`flex gap-2 transition-all ease-out duration-800 ${className && className} ${getBtnBgColor()} ${getBtnVariant()} ${getBtnSize()} ${tooltip ? 'btn-tooltip' : ''} ${maxWidthMax ? 'max-w-max' : ''} hover:${getHover()}`}
          type={getBtnType()}
          onClick={!disabled ? onClick : null}
        >
          {iconLeft && <span className="button-icon-left">{ isLoading ? <CircularProgress color="success" /> : iconLeft }</span>}
          {text}
          {loader && <CircularProgress sx={{marginLeft:'10px'}} size={20} color="success" hidden={loaderState} />}
          {iconRight && <span className="button-icon-right">{ isLoading ? <CircularProgress color="success" /> : iconRight}</span>}
        </button>
        {/* {tooltip && <Tooltip anchorSelect=".btn-tooltip"/>} */}
      </>
    );
};

export default REButton;