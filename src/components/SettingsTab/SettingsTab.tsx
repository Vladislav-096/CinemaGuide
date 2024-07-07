import { LogoutButton } from "../../ui/LogoutButton/LogoutButton";
import emailSvg from '../../assets/email-white.svg'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import './style.css';
import './media.css'

export const SettingsTab = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="container">
      <ul className="list-reset user-info-list">
        <li className="settings-tab-main-wrapper">
          <div className="settings-tab-logo-wrapper">
            <div className="settings-tab-circle">
              <div className="settings-tab-descr-wrapepr">
                <span>{user?.name.slice(0, 1).toUpperCase()}</span>
                <span>{user?.surname.slice(0, 1).toUpperCase()}</span>
              </div>
            </div>
          </div>
          <div className="settings-tab-info-wrapper">
            <p className="settings-lable">Имя Фамилия</p>
            <div className="settings-tab-info">
              <span className="settings-tab-name">{user && user.name.substring(0, 1).toUpperCase() + user.name.substring(1).toLowerCase()}</span>
              <span>{user && user.surname.substring(0, 1).toUpperCase() + user.surname.substring(1).toLowerCase()}</span>
            </div>
          </div>
        </li>
        <li className="settings-tab-main-wrapper">
          <div className="settings-tab-logo-wrapper">
            <div className="settings-tab-circle">
              <div className="settings-tab-descr-wrapepr">
                <img src={emailSvg} alt="" />
              </div>
            </div>
          </div>
          <div className="settings-tab-info-wrapper">
            <p className="settings-lable">Электронная почта</p>
            <p className="settings-tab-info"><span>{user?.email}</span></p>
          </div>
        </li>
      </ul>
      <div>
      </div>
      <div className="settings-logout-button">
        <LogoutButton />
      </div>
    </div>
  )
}
