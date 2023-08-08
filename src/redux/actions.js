import axios from "axios";
import {
    POST_DOCTOR,
    GET_DOCTOR,
    GET_DOCTORS,
    PUT_DOCTOR,
    DELETE_DOCTOR,
    GET_PACIENTES,
    GET_PACIENTE,
    POST_PACIENTE,
    GET_USERS,
    LOGGED_IN,
    LOGGED_OUT,
    POST_TURNO,
    GET_TURNOS,
    DELETE_TURNO,
} from "./types";
import Swal from "sweetalert2";

export const postDoctor = (user) => async (dispatch) => {
    try {
        const existingDoctor = await axios.get(
            `http://localhost:8080/doctor/get/`
        ); //peticion de la data
        const matriculaIngresada = parseInt(user.matricula); // convertir matricula ingresada string a number
        const matriculas = Object.values(existingDoctor.data).map(
            (doctor) => doctor.matricula
        ); //mapeo para obtener todas la matriculas de la data
        const emails = Object.values(existingDoctor.data).map(
            (doctor) => doctor.mail
        );
        const arrayDni = Object.values(existingDoctor.data).map(
            (doctor) => doctor.dni
        );
        const dniIngresado = parseInt(user.dni);

        if (arrayDni.includes(dniIngresado)) {
            //validacion si el dni ingresado coincide con dni de la data salta el error
            Swal.fire({
                icon: "error",
                title: "Error al registrar el doctor",
                text: "Ya existe un doctor registrado con ese DNI. Inténtalo nuevamente con uno diferente.",
            });
            return;
        }
        if (emails.includes(user.mail)) {
            //validacion si la matricula ingresada coincide con matriculas de la data salta el error
            Swal.fire({
                icon: "error",
                title: "Error al registrar el doctor",
                text: "Ya existe un doctor registrado con ese EMAIL. Inténtalo nuevamente con uno diferente.",
            });
            return;
        }
        if (matriculas.includes(matriculaIngresada)) {
            //validacion si la matricula ingresada coincide con matriculas de la data salta el error
            Swal.fire({
                icon: "error",
                title: "Error al registrar el doctor",
                text: "Ya existe un doctor registrado con esa MATRICULA. Inténtalo nuevamente con una diferente.",
            });
            return;
        }

        const res = await axios.post("http://localhost:8080/doctor/post", user);
        dispatch({
            type: POST_DOCTOR,
            payload: res.data,
        });
        Swal.fire({
            icon: "success",
            title: "Registro Doctor Exitoso!",
        });
    } catch (err) {
        console.log(err);
        Swal.fire({
            icon: "error",
            title: "Error al registrar el doctor",
            text: "Hubo un problema al enviar el formulario. Inténtalo nuevamente.",
        });
    }
};

export const getDoctor = (id) => async (dispatch) => {
    if (id) {
        try {
            const res = await axios.get(
                `http://localhost:8080/doctor/get/${id}`
            );
            dispatch({
                type: GET_DOCTOR,
                payload: res.data,
            });
        } catch (err) {
            console.log(err);
        }
    }
};

export const getDoctors = () => async (dispatch) => {
    try {
        const res = await axios.get("http://localhost:8080/doctor/get/");
        dispatch({
            type: GET_DOCTORS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.message);
    }
};

export const putDoctor = (doctor, aprobar) => async (dispatch) => {
    if (doctor) {
        try {
            let {
                id_user,
                nombre,
                apellido,
                dni,
                direccion,
                telefono,
                mail,
                fechaNacimiento,
                password,
                matricula,
                especialidad,
                usuario_id,
            } = doctor;

            const res = await axios.put(
                `http://localhost:8080/doctor/put/${id_user}`,
                {
                    nombre,
                    apellido,
                    dni,
                    direccion,
                    telefono,
                    mail,
                    fechaNacimiento,
                    password,
                    matricula,
                    especialidad,
                    usuario_id,
                    aprobado: aprobar,
                }
            );
            console.log(res);
            console.log(res.data);
            console.log("esto es res.data");

            dispatch({
                type: PUT_DOCTOR,
                payload: res.data,
            });
        } catch (err) {
            console.log("asd");
            console.log(err);
        }
    }
    console.log("ID Debe proveerse");
};

export const deleteDoctor = (id, next) => async (dispatch) => {
    console.log("ESTOY DELETEDOCTOR DEL FRONT ACTIONS");
    try {
        const res = await axios.delete(
            `http://localhost:8080/doctor/delete/${id}`
        );
        console.log("res ---->", res);
        console.log("res.data ---->", res.data);
        next();
        dispatch({
            type: DELETE_DOCTOR,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getPacientes = () => async (dispatch) => {
    try {
        const res = await axios.get("http://localhost:8080/paciente/get/");
        dispatch({
            type: GET_PACIENTES,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getPaciente = (id) => async (dispatch) => {
    if (id) {
        try {
            console.log("estop en getPaciente");
            console.log(id);
            const res = await axios.get(
                `http://localhost:8080/paciente/get/${id}`
            );
            console.log(res.data);
            console.log("esto es res.data");
            dispatch({
                type: GET_PACIENTE,
                payload: res.data,
            });
        } catch (err) {
            console.log();
            console.log(err);
        }
    }
    console.log("ID Debe proveerse");
};

////////////////////////////////////// USUARIO //////////////////////////////////////

export const getUser = (dni, password) => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:8080/user/get/${dni}`, {
            params: {
                dni,
                password,
            },
        });
        dispatch({
            type: LOGGED_IN,
            payload: res.data,
        });
        if (res.data) {
            Swal.fire({
                icon: "success",
                title: `'Bienvenido ${res.data.nombre}!'`,
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Datos Incorrectos!",
                text: "DNI o Contraseña Invalidos.",
            });
        }
    } catch (err) {
        console.log(err);
    }
};

export const getUsers = () => async (dispatch) => {
    try {
        const res = await axios.get("http://localhost:8080/user/get/");
        dispatch({
            type: GET_USERS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const logoutUser = () => {
    return {
        type: LOGGED_OUT,
    };
};

export const deleteUser = (id, next) => async (dispatch) => {
    try {
        const res = await axios.delete(
            `http://localhost:8080/user/delete/${id}`
        );
        next();
        dispatch({
            type: DELETE_DOCTOR,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const postPaciente = (user) => async (dispatch) => {
    try {
        const existingPaciente = await axios.get(
            "http://localhost:8080/paciente/get/"
        ); //peticion de la data
        console.log(existingPaciente.data);

        const emails = Object.values(existingPaciente.data).map(
            (paciente) => paciente.usuario.mail
        );
        const arrayDni = Object.values(existingPaciente.data).map(
            (paciente) => paciente.usuario.dni
        );
        const dniIngresado = parseInt(user.dni);

        if (arrayDni.includes(dniIngresado)) {
            //validacion si el dni ingresado coincide con dni de la data salta el error
            Swal.fire({
                icon: "error",
                title: "Error al registrar el paciente",
                text: "Ya existe un paciente registrado con ese DNI. Inténtalo nuevamente con uno diferente.",
            });
            return;
        }
        if (emails.includes(user.mail)) {
            //validacion si la matricula ingresada coincide con matriculas de la data salta el error
            Swal.fire({
                icon: "error",
                title: "Error al registrar el paciente",
                text: "Ya existe un paciente registrado con ese EMAIL. Inténtalo nuevamente con uno diferente.",
            });
            return;
        }

        const res = await axios.post(
            "http://localhost:8080/paciente/post",
            user
        );
        dispatch({
            type: POST_PACIENTE,
            payload: res.data,
        });
        Swal.fire({
            icon: "success",
            title: "Registro Paciente Exitoso!",
        });
    } catch (err) {
        console.log(err);
        Swal.fire({
            icon: "error",
            title: "Error al registrar el Paciente",
            text: "Hubo un problema al enviar el formulario. Inténtalo nuevamente.",
        });
    }
  }

    export const postTurno = (turno) => async (dispatch) => {
        console.log("esto es turno");
        console.log(turno);
        try {
            console.log("TRY");
            const res = await axios.post(
                "http://localhost:8080/turno/post",
                turno
            );
            dispatch({
                type: POST_TURNO,
                payload: res.data,
            });
            Swal.fire({
                icon: "success",
                title: "Registro Turno Exitoso!",
            });
        } catch (err) {
            console.log(err.message);
            Swal.fire({
                icon: "error",
                title: "Error al registrar el Turno",
                text: "Hubo un problema al enviar el formulario. Inténtalo nuevamente.",
            });
        }
    };

