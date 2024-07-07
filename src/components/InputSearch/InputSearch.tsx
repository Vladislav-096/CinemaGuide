import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutSide";
import { MovieListType } from "../../api/Movies";
import { SearchInfoComponent } from "../SearchInfoComponent/SearchInfoComponent";
import { fetchSuggestions } from "../Header/Header";
import CloseInput from "../../assets/close-input.svg";
import "./style.css";
import "./media.css";
import { debounce } from "lodash";

interface InputSearch {
  fetchSuggestions: ({ count, value }: fetchSuggestions) => Promise<void>;
  suggestions: MovieListType;
  // isLoading: boolean;
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InputSearch = ({
  fetchSuggestions,
  suggestions,
  setSearch,
}: InputSearch) => {
  const [isText, setText] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const count = 5;
  const debouncedSavs = useCallback(
    debounce((value) => fetchSuggestions({ value, count }), 400),
    []
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    setText(value);
    debouncedSavs(value);
  };

  const handleRemove = () => {
    if (isText) {
      setText("");
    }
  };

  useClickOutside(inputRef, () => {
    if (isText) {
      setText("");
    }
  });

  return (
    <div className="input-main-wrapper">
      <div className="input-wrapper">
        {isText && (
          <img
            className="input-close-button"
            src={CloseInput}
            onClick={handleRemove}
          />
        )}
        <input
          type="text"
          className="input"
          onChange={handleChange}
          ref={inputRef}
          value={isText}
        />
        <div className="search-icon"></div>
        {isText === "" && <span className="custom-placeholder">Поиск</span>}
        <SearchInfoComponent suggestions={suggestions} isText={isText} />
        <button className="btn-reset input-close-button-768">
          <img
            src={CloseInput}
            onClick={() => {
              setSearch(false);
            }}
          />
        </button>
      </div>
    </div>
  );
};
