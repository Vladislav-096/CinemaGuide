import { FC, ReactNode } from "react";
import './style.css'

interface FormField {
  label: string;
  children: ReactNode;
  errorMessage?: string;
  isText: string;
}

export const FormField: FC<FormField> = ({
  children,
  label,
  errorMessage,
  isText,
}) => {

  return (
    <label className="form-field">
      {!isText && <span className="form-field__placeholder">{label}</span>}
      {children}
      <div >
        {errorMessage &&
          <span className={"form-field__error-text"}>{errorMessage}</span>
        }
      </div>
    </label>
  );
};
