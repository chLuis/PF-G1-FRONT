import './sacarTurno.css'
import { useState  } from 'react'

export const SacarTurno = () => {

    const [turnos, setTurnos] = useState(["turnos-float"])
    const [turnos_especialidad, setTurnos_especialidad] = useState("turnos-float hide")
    const sacarTurno = () => {
        if(turnos  !== "turnos-float"){
            setTurnos("turnos-float hide")
            setTurnos_especialidad("turnos-float")
        }
    }

    
    return (
    <div className="sacarTurno">         
        <span className={turnos} onClick={sacarTurno}>Turno</span>
        <span className={turnos_especialidad}>
            <div className='div-turnos-component'>
                <div className='btn-sacarTurno'><a href='#/Turnos'>Nuevo turno</a></div>
                <div className='btn-misTurnos'><a href='#/panelUser'>Mis turnos</a></div>
            </div>
        </span>
    </div>
  )

}