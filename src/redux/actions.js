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
    POST_ESPECIALIDAD,
    GET_ESPECIALIDADES,
    DELETE_ESPECIALIDAD,
    PATCH_ESPECIALIDAD,
    GET_DOCTORS_ADMIN,
} from "./types";
import Swal from "sweetalert2";

const URL_actions = "http://localhost:8080"

export const postDoctor = (user) => async (dispatch) => {
    try {
        const existingDoctor = await axios.get(
            `${URL_actions}/doctor/get/`
        ); //peticion de la data doctor

        const existingPaciente = await axios.get(
            `${URL_actions}/paciente/get/`
        ); //peticion de la data p○ciente

        const matriculaIngresada = parseInt(user.matricula); // convertir matricula ingresada string a number
        const matriculas = Object.values(existingDoctor.data).map(
            (doctor) => doctor.matricula
        ); //mapeo para obtener todas la matriculas de la data
        const emailsDoc = Object.values(existingDoctor.data).map(
            (doctor) => doctor.mail
        );
        const emailsPac = Object.values(existingPaciente.data).map(
            (pac) => pac.usuario.mail
        );
        const arrayDniDoc = Object.values(existingDoctor.data).map(
            (doctor) => doctor.dni
        );
        const arrayDniPac = Object.values(existingPaciente.data).map(
            (pac) => pac.usuario.dni
        );
        const dniIngresado = parseInt(user.dni);

        if (arrayDniDoc.includes(dniIngresado) || arrayDniPac.includes(dniIngresado)) {
            //validacion si el dni ingresado coincide con dni de la data salta el error
            Swal.fire({
                icon: "error",
                title: "Error al registrar el doctor",
                text: "Ya existe un doctor registrado con ese DNI. Inténtalo nuevamente con uno diferente.",
            });
            return;
        }
        if (emailsDoc.includes(user.mail) || emailsPac.includes(user.mail)) {
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

        const res = await axios.post(`${URL_actions}/doctor/post`, user);
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
                `${URL_actions}/doctor/get/${id}`
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
        const res = await axios.get(`${URL_actions}/doctor/get/`);
        dispatch({
            type: GET_DOCTORS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.message);
    }
};
export const getDoctorsAdmin = (token) => async (dispatch) => {
    try {
        const res = await axios.get(`${URL_actions}/doctor/admin/get/`, { headers: {
            'Authorization': `Bearer ${token}`
          }});
        dispatch({
            type: GET_DOCTORS_ADMIN,
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
                `${URL_actions}/doctor/put/${id_user}`,
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
            dispatch({
                type: PUT_DOCTOR,
                payload: res.data,
            })
        } catch (err) {
            console.log(err);
        }
    }
    //console.log("ID Debe proveerse");
};

export const deleteDoctor = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(
            `${URL_actions}/doctor/delete/${id}`
        );
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
        const res = await axios.get(`${URL_actions}/paciente/get/`);
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
            const res = await axios.get(
                `${URL_actions}/paciente/get/${id}`
            );
            dispatch({
                type: GET_PACIENTE,
                payload: res.data,
            });
        } catch (err) {
            console.log(err);
        }
    }
    console.log("ID Debe2 proveerse");
};

////////////////////////////////////// USUARIO //////////////////////////////////////

export const getUser = (dni, password) => async (dispatch) => {
    try {
        const res = await axios.get(`${URL_actions}/user/get/${dni}`, {
            params: {dni, password} });
        //console.log(res)
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
        const res = await axios.get(`${URL_actions}/user/get/`);
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
            `${URL_actions}/user/delete/${id}`
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
        const existingDoctor = await axios.get(
            `${URL_actions}/doctor/get/`
        ); //peticion de la data doctor

        const existingPaciente = await axios.get(
            `${URL_actions}/paciente/get/`
        ); //peticion de la data p○ciente

        const emailsDoc = Object.values(existingDoctor.data).map(
            (doctor) => doctor.mail
        );
        const emailsPac = Object.values(existingPaciente.data).map(
            (pac) => pac.usuario.mail
        );
        const arrayDniDoc = Object.values(existingDoctor.data).map(
            (doctor) => doctor.dni
        );
        const arrayDniPac = Object.values(existingPaciente.data).map(
            (pac) => pac.usuario.dni
        );
        const dniIngresado = parseInt(user.dni);

        if (arrayDniDoc.includes(dniIngresado) || arrayDniPac.includes(dniIngresado)) {
            //validacion si el dni ingresado coincide con dni de la data salta el error
            Swal.fire({
                icon: "error",
                title: "Error al registrar el paciente",
                text: "Ya existe un paciente registrado con ese DNI. Inténtalo nuevamente con uno diferente.",
            });
            return;
        }
        if (emailsDoc.includes(user.mail) || emailsPac.includes(user.mail)) {
            //validacion si la matricula ingresada coincide con matriculas de la data salta el error
            Swal.fire({
                icon: "error",
                title: "Error al registrar el paciente",
                text: "Ya existe un paciente registrado con ese EMAIL. Inténtalo nuevamente con uno diferente.",
            });
            return;
        }
        
        const res = await axios.post(
            `${URL_actions}/paciente/post`,
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

////////////////////////////////// TURNOS //////////////////////////////////


    export const postTurno = (turno) => async (dispatch) => {
        try {
            const res = await axios.post(
                `${URL_actions}/turno/post`,
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

    export const getTurnos = () => async (dispatch) => {
        try {
            const res = await axios.get(`${URL_actions}/turno/get/`);
            dispatch({
                type: GET_TURNOS,
                payload: res.data,
            });
        } catch (err) {
            console.log(err);
        }
    
    }

    export const deleteTurno = (id, next) => async (dispatch) => {
        try {
            const res = await axios.delete(
                `${URL_actions}/turno/delete/${id}`
            );
            next();
            dispatch({
                type: DELETE_TURNO,
                payload: res.data,
            });
        } catch (err) {
            console.log(err);
        }
    }


///////////////////////////////// ESPECIALIDADES //////////////////////////////////////

    export const postEspecialidad = (especialidad, image) => async (dispatch) => {
        try {
            const res = await axios.post(
                `${URL_actions}/especialidad/post`,
                {
                    especialidad,
                    image
                }
            );
            dispatch({
                type: POST_ESPECIALIDAD,
                payload: res.data,
            });
            Swal.fire({
                icon: "success",
                title: "Registro Especialidad Exitoso!",
            });}
            catch(err) {
                console.log(err)
            }
        
    }


    export const getEspecialidades = () => async (dispatch) => {
        try {
            const res = await axios.get(`${URL_actions}/especialidad/get/`);
            dispatch({
                type: GET_ESPECIALIDADES,
                payload: res.data,
            });
        } catch (err) {
            console.log(err);
        }
    
    }

    export const patchEspecialidad = (id, image) => async (dispatch) => {
        try {
            const res = await axios.patch(
                `${URL_actions}/especialidad/patch/${id}`,
                {image}
            );
            dispatch({
                type: PATCH_ESPECIALIDAD,
                payload: res.data,
            });
            Swal.fire({
                icon: "success",
                title: "Se agregó la nueva imagen!",
            });
        } catch (err) {
            console.log(err);
        }
    }

    export const deleteEspecialidad = (id) => async (dispatch) => {
        try {
            const res = await axios.delete(
                `${URL_actions}/especialidad/delete/${id}`
            );
            dispatch({
                type: DELETE_ESPECIALIDAD,
                payload: res.data,
            });
        } catch (err) {
            console.log(err);
        }
    }