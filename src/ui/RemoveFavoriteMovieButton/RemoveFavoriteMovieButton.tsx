import { FC } from "react";
import { Loader } from "../../components/Loader/Loader";
import { Button } from "../Button/Button";
import '../../index.css'

export const RemoveFavoriteMovieButton: FC<Button> = ({
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
      className={className}
      // className="btn-reset btn-close"
      data-kind={kind}
      // onMouseEnter={onMouseEnter}
      // onMouseLeave={onMouseLeave}
      {...props}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
}

