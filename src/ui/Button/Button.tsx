import { FC, HTMLAttributes } from "react";
import { Loader } from '../../components/Loader/Loader';
import './style.css'

export interface Button extends HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: "submit" | "reset" | "button";
  kind?: 'primary' | 'secondary' | 'thirdly';
  // onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  // onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<Button> = ({
  isLoading,
  isDisabled,
  children,
  className,
  kind = 'primary',
  type,
  // onMouseEnter,
  // onMouseLeave,
  ...props
}) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      className="button"
      data-kind={kind}
      // onMouseEnter={onMouseEnter}
      // onMouseLeave={onMouseLeave}
      {...props}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};
