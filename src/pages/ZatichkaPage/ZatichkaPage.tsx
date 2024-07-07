import './style.css'

interface ZatichkaPage {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ZatichkaPage = ({ setModalActive }: ZatichkaPage) => {

  const handleOpenModal = () => {
    setModalActive(true)
  }

  return (
    <div className='container'>
      <div className="main-container-zatichka">
        <span className='zatichka-descr'>Чтобы зайти в аккаунт</span>
        <button className='btn-reset zatichka-btn' onClick={handleOpenModal}>войдите или зарегистрируйтесь</button>
        <span className='zatichka-descr'>на CinemaGuide</span>
      </div>
    </div>
  )
}
