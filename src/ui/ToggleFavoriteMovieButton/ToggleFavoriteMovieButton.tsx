import { FC, HTMLAttributes } from "react";
import { Loader } from "../../components/Loader/Loader";
import { Tooltip } from "react-tooltip";
import '../../index.css'
import './style.css'
import './media.css'

export interface ToggleFavoriteMovieButton extends HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: "submit" | "reset" | "button";
  kind?: 'primary' | 'secondary' | 'thirdly';
  // authStatus: string;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ToggleFavoriteMovieButton: FC<ToggleFavoriteMovieButton> = ({
  isLoading,
  isDisabled = isLoading,
  children,
  className,
  type,
  // authStatus,
  setModalActive,
  // onMouseEnter,
  // onMouseLeave,
  ...props
}) => {
  return (
    <>
      <button
        disabled={isDisabled}
        type={type}
        className="btn-reset favorite-button"
        // onMouseEnter={onMouseEnter}
        // onMouseLeave={onMouseLeave}
        {...props}
      >
        {isLoading ? <Loader /> : children}
      </button>

      {/* {
        authStatus == 'error' &&
        <div className="favorite-button-tooltip">
          <Tooltip anchorSelect=".favorite-button" clickable>
            <span className="descr-open-modal-toggle-favorite">Чтобы добавить фильм в избранное необходимо</span>
            <button
              className="btn-reset btn-open-modal-toggle-favorite"
              onClick={() => { setModalActive(true) }}
            >
              зарегистрироваться
            </button>
          </Tooltip>
        </div>
      } */}
    </>
  );
};
