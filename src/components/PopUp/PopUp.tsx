import { ReactNode } from 'react';
import './style.css';

type PopUp = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  setIsClosed?: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordError?: React.Dispatch<React.SetStateAction<boolean>>;
  popUpVideoStyle?: object
}

export const PopUp = ({ active, setActive, children, setIsClosed, setPasswordError, popUpVideoStyle }: PopUp) => {

  return (
    <div
      style={popUpVideoStyle}
      className={active ? 'modal active' : 'modal'}
      onClick={() => { setActive(false); if (setIsClosed) setIsClosed(true); if (setPasswordError) setPasswordError(false) }}>
      {children}
    </div>
  )
}
