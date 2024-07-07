import { Button } from '../../ui/Button/Button';
import './style.css'

interface ConfirmForm {
  setAuthType: React.Dispatch<React.SetStateAction<string>>;
}

export const ConfirmForm = ({ setAuthType }: ConfirmForm) => {

  return (
    <div className="confirm-form">
      <p className="confirm-form__descr">
        Используйте вашу электронную почту для входа
      </p>
      <Button onClick={() => { setAuthType('auth') }}>
        Войти
      </Button>
    </div>
  )
}
