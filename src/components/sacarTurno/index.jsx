import './sacarTurno.css'
import { useState  } from 'react'

export const SacarTurno = () => {

    const [turnos_especialidad, setTurnos_especialidad] = useState("turnos-float hide")
    const [turnos, setTurnos] = useState(["turnos-float"])
    const sacarTurno = () => {
        if(turnos  !== "turnos-float"){
            setTurnos("turnos-float hide")
            setTurnos_especialidad("turnos-float")
        }
    }
    
    
    return (
    <div className="sacarTurno">
        <span className={turnos_especialidad}>
            <div>
                <select name="" id="">
                    <option value="1">Seleccione una especialidad1</option>
                    <option value="2">Seleccione una especialidad2</option>
                    <option value="3">Seleccione una especialidad3</option>
                </select>
                <br className='turno-especialidad-br'></br>
                <button>Buscar Turno</button>
            </div>
        </span>
        <span className={turnos} onClick={sacarTurno}>Turnos</span>
    </div>
  )

}