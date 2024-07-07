import { RegisterForm } from '../RegisterForm/RegisterForm';
import { LoginForm } from '../LoginForm/LoginForm';
import CinemaGuideLogo from '../../assets/CinemaGuide.svg'
import { ConfirmForm } from '../ConfirmForm/ConfirmForm';
import '../../index.css'
import './style.css';
import './media.css';

type AuthForm = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  isClosed: boolean;
  setIsClosed: React.Dispatch<React.SetStateAction<boolean>>;
  authType: string;
  setAuthType: React.Dispatch<React.SetStateAction<string>>;
  setPasswordError: React.Dispatch<React.SetStateAction<boolean>>;
  isPasswordError: boolean;
}

export const AuthForm = ({ active, setActive, isClosed, setIsClosed, authType, setAuthType, setPasswordError, isPasswordError }: AuthForm) => {

  const handleFormClick = () => {
    setAuthType((prevState) =>
      prevState === "register" ? "auth" : "register",
    );
  };

  const handleClick = () => {
    setActive(!active);
    setIsClosed(true);
    setPasswordError(false);
  };

  function formHeading() {
    if (authType == 'register') {
      return 'Регистрация'
    }

    if (authType == 'auth') {
      return ''
    }

    if (authType == 'confirm') {
      return 'Регистрация завершена'
    }
  }

  function fomrView() {
    if (authType == 'auth') {
      return <LoginForm isClosed={isClosed} setPasswordError={setPasswordError} isPasswordError={isPasswordError} />
    }

    if (authType == 'register') {
      return <RegisterForm isClosed={isClosed} setAuthType={setAuthType} />
    }

    if (authType == 'confirm') {
      return <ConfirmForm setAuthType={setAuthType} />
    }
  }

  function LoginToRegisterButton() {
    if (authType == 'register') {
      return (
        <button className="btn-reset auth-form__button" onClick={handleFormClick}>
          Уже есть аккаунт
        </button>
      )
    }

    if (authType == 'auth') {
      return (
        <button className="btn-reset auth-form__button" onClick={handleFormClick}>
          Регистрация
        </button>
      )
    }
  }

  return (
    <div className={active ? 'modal-content active' : 'modal-content'} onClick={e => e.stopPropagation()}>
      <div className="modal-logo-wrapper">
        <img className='modal-logo' src={CinemaGuideLogo} alt="logo" />
      </div>
      <div className='auth-form__title-wrapper'>
        <p className="auth-form__title">
          {formHeading()}
        </p>
      </div>
      {fomrView()}
      <div className='btn-regester-login-wrapper'>
        {LoginToRegisterButton()}
      </div>
      <button className='btn-reset btn-close btn-close-modal' onClick={handleClick}></button>
    </div>
  )
}
