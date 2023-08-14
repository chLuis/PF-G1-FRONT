import './sacarTurno.css'
import { useState  } from 'react'
import { useNavigate } from 'react-router-dom'

export const SacarTurno = () => {

    const Navigate = useNavigate()
    const [turnos, setTurnos] = useState(["turnos-float"])
    const sacarTurno = () => {
        if(turnos  !== "turnos-float"){
            setTurnos("turnos-float hide")
            setTimeout(() => {
                Navigate("/turnos")
            
            },1000)
        }
    }
    
    
    return (
    <div className="sacarTurno">         
        <span className={turnos} onClick={sacarTurno}>Turno</span>
    </div>
  )

}