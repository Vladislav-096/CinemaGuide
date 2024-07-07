import { ReactNode } from "react"
import './style.css'

interface RefetchComponent {
  children: ReactNode;
  descr: string;
}

export const RefetchComponent = ({ children, descr }: RefetchComponent) => {

  return (
    <div className="wrapper">
      <p className="descr">{descr}</p>
      {children}
    </div >
  )
}
