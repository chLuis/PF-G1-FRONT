import {POST_DOCTOR, GET_DOCTOR, GET_DOCTORS, PUT_DOCTOR, DELETE_DOCTOR, POST_PACIENTE, GET_PACIENTES, GET_PACIENTE, GET_USER, GET_USERS, LOGGED_IN, LOGGED_OUT, POST_TURNO, GET_TURNOS, DELETE_TURNO} from './types'

const inicialState = { doctorPost: [] , doctor: [], pacientePost: [] , paciente: [], pacientes: [], user: [], postTurno: [] }
const inicialStateUser = { user: false, admin: false, token: "No hay token",apellido: false, direccion: false, telefono: false, mail: false, fechaNacimiento: false, dni: false, medico: false, users: [], doctors: [], turnos: [] }


export const dataRoot = (state = inicialState, action) => {
    switch(action.type) {
        case POST_DOCTOR:
            return {...state, doctorPost: action.payload};
        case GET_DOCTOR:
            return { ...state, doctor: action.payload };
        case PUT_DOCTOR:
            return { ...state};
        case DELETE_DOCTOR:
            return { ...state, doctors: action.payload };
        case POST_PACIENTE:
            return { ...state, pacientePost: action.payload };
        case GET_PACIENTES:
            return { ...state, pacientes: action.payload };
        case GET_PACIENTE:
            return { ...state, paciente: action.payload };
        case POST_TURNO:
            return { ...state, paciente: action.payload };
        case DELETE_TURNO:
            return { ...state, paciente: action.payload };
        // case GET_USER:
        //     return { ...state, user: action.payload };
        default: 
            return state
    }
}


export const userReducer = (state = inicialStateUser, action) => {
    switch(action.type) {
        case GET_DOCTORS:
            return { ...state, doctors: action.payload };
        case GET_USER:
            return { ...state, user: action.payload };
        case GET_USERS:
            return { ...state, users: action.payload };
        case GET_TURNOS:
            return { ...state, users: action.payload };
        case LOGGED_IN:
            return {    user: action.payload.nombre || false,
                        apellido: action.payload.apellido || false,
                        direccion: action.payload.direccion || false,
                        dni: action.payload.dni || false,
                        telefono: action.payload.telefono || false,
                        mail: action.payload.mail || false,
                        fechaNacimiento: action.payload.fechaNacimiento || false,
                        admin: action.payload.administrador || false,
                        medico: action.payload.medico || false,
                        token: "Soy el token",
                    };
        case LOGGED_OUT:
            return { user: false, admin: false, token: "no hay token",apellido: false, direccion: false, telefono: false, mail: false, fechaNacimiento: false, dni: false, medico:false, users: [], turnos: [] };
        default:
            return state
        }
    }
