import { FC } from "react";
import { Loader } from "../../components/Loader/Loader";
import { Button } from "../Button/Button";
import '../../index.css'
import './style.css'
import './media.css'

export const RefreshButton: FC<Button> = ({
  isLoading,
  isDisabled = isLoading,
  children,
  className,
  kind,
  type,
  // onMouseEnter,
  // onMouseLeave,
  ...props
}) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      className="btn-reset refresh-button"
      data-kind={kind}
      // onMouseEnter={onMouseEnter}
      // onMouseLeave={onMouseLeave}
      {...props}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};
