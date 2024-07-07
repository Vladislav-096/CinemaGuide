import { useContext, useEffect, useState } from "react";
import { PopUp } from "../PopUp/PopUp";
import { AuthForm } from "../AuthForm/AuthForm";
import { Link, useLocation } from "react-router-dom";
import UserIcon from '../../assets/user-icon.svg';
import { AuthContext } from "../../context/AuthContext";
import './style.css';
import './media.css';

interface Account {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Account = ({ modalActive, setModalActive }: Account) => {
  const location = useLocation();

  const [isClosed, setIsClosed] = useState(true);

  const [authType, setAuthType] = useState<string>("auth");

  const [isPasswordError, setPasswordError] = useState(false);

  const { user } = useContext(AuthContext)

  if (!user) {
    return (
      <div className="account-button-wrapper">
        <button onClick={() => { setModalActive(true); setIsClosed(false); setAuthType("auth") }} className="btn-reset btn-log-in">
          Войти
        </button>

        <button onClick={() => { setModalActive(true); setIsClosed(false); setAuthType("auth") }} className="btn-reset btn-log-in-768">
          <img src={UserIcon} />
        </button>
        <PopUp
          active={modalActive}
          setActive={setModalActive}
          setIsClosed={setIsClosed}
          setPasswordError={setPasswordError}
        >
          <AuthForm
            active={modalActive}
            setActive={setModalActive}
            isClosed={isClosed}
            setIsClosed={setIsClosed}
            authType={authType}
            setAuthType={setAuthType}
            setPasswordError={setPasswordError}
            isPasswordError={isPasswordError}
          />
        </PopUp>
      </div>
    );
  } else {
    return (
      <div>
        <Link to={"/account"} className={location.pathname == '/account' ? 'account-name chosen-element' : 'account-name'}>
          {user.name.slice(0, 18)}
        </Link>

        <Link to={"/account"} className="account-name-768">
          <img src={UserIcon} />
        </Link>
      </div>
    );
  }
}
