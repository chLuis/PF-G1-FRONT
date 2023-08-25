import './sacarTurno.css'
import { useState  } from 'react'
import { useNavigate } from 'react-router-dom'

export const SacarTurno = () => {

    const Navigate = useNavigate()
    const [turnos, setTurnos] = useState(["turnos-float"])
    const [turnos_especialidad, setTurnos_especialidad] = useState("turnos-float hide")
    const sacarTurno = () => {
        if(turnos  !== "turnos-float"){
            setTurnos("turnos-float hide")
            setTurnos_especialidad("turnos-float")
            // setTimeout(() => {
            //     Navigate("/turnos")
            
            // },1000)
        }
    }
    function irMisTurnos() {
        Navigate('/panelUser#mis-turnos')
    }
    
    return (
    <div className="sacarTurno">         
        <span className={turnos} onClick={sacarTurno}>Turno</span>
        <span className={turnos_especialidad}>
            <div className='div-turnos-component'>
                <div className='btn-sacarTurno'><a href='#/Turnos'>Sacar turno</a></div>
                <div className='btn-misTurnos'><span onClick={irMisTurnos}>Mis turnos</span></div>
            </div>
        </span>
    </div>
  )

}