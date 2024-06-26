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

//const URL_actions = "https://pf-back-dev-hchm.4.us-1.fl0.io" //  // "http://localhost:8080"
const URL_actions = "https://pf-back-zeta.vercel.app" //  // "http://localhost:8080"


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
            (pac) => pac.mail
        );
        const arrayDniDoc = Object.values(existingDoctor.data).map(
            (doctor) => doctor.dni
        );
        const arrayDniPac = Object.values(existingPaciente.data).map(
            (pac) => pac.dni
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

export const getDoctor = (id, token) => async (dispatch) => {
    if (id) {
        try {
            const res = await axios.get(
                `${URL_actions}/doctor/get/${id}`, { headers: {
                    'Authorization': `Bearer ${token}`
                }}
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
        if(err.response.data === "jwt expired"){
            Swal.fire({
                icon: "error",
                title: "Surgió un error",
                text: `${err.response.data}`,
            })
            logoutUser()
        } else {
            console.log(err)
        }
        
    }
};

export const putDoctor = (doctor, aprobar, token) => async (dispatch) => {
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
                }, { headers: {
                    'Authorization': `Bearer ${token}`
                }}
            );
            dispatch({
                type: PUT_DOCTOR,
                payload: res.data,
            })
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Surgió un error",
                text: `${err.response.data}`,
            });
            dispatch(logoutUser())
        }
    }
    //console.log("ID Debe proveerse");
};

export const deleteDoctor = (id, token) => async (dispatch) => {
    try {
        const res = await axios.delete(
            `${URL_actions}/doctor/delete/${id}`, { headers: {
                'Authorization': `Bearer ${token}`
              }}
        );
        dispatch({
            type: DELETE_DOCTOR,
            payload: res.data,
        })
        Swal.fire(
            "Borrado!",
            "Has borrado a este doctor de la base de datos.",
            "success"
        );
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Surgió un error",
            text: `${err.response.data}`,
        })
    }
};

export const getPacientes = (token) => async (dispatch) => {
    try {
        const res = await axios.get(`${URL_actions}/paciente/get/`,{ headers: {
            'Authorization': `Bearer ${token}`
        }});
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

export const getUsers = (token) => async (dispatch) => {
    try {
        const res = await axios.get(`${URL_actions}/user/get/`, { headers: {
            'Authorization': `Bearer ${token}`
        }});
        dispatch({
            type: GET_USERS,
            payload: res.data,
        });
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Surgió un error",
            text: `${err.response.data}`,
        })
        dispatch(logoutUser())
    }
};

export const logoutUser = () => {
    return {
        type: LOGGED_OUT,
    };
};

export const deleteUser = (id, token) => async (dispatch) => {
    try {
        const res = await axios.delete(
            `${URL_actions}/user/delete/${id}`, { headers: {
                'Authorization': `Bearer ${token}`
            }}
        );
        dispatch({
            type: DELETE_DOCTOR,
            payload: res.data,
        });
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Surgió un error",
            text: `${err.response.data}`,
        })
        dispatch(logoutUser())
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
            (pac) => pac.mail
        );
        const arrayDniDoc = Object.values(existingDoctor.data).map(
            (doctor) => doctor.dni
        );
        const arrayDniPac = Object.values(existingPaciente.data).map(
            (pac) => pac.dni
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

    export const getTurnos = (token) => async (dispatch) => {
        try {
            const res = await axios.get(`${URL_actions}/turno/get/`, { headers: {
                'Authorization': `Bearer ${token}`
            }});
            dispatch({
                type: GET_TURNOS,
                payload: res.data,
            });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Surgió un error",
                text: `${err.response.data}`,
            })
            dispatch(logoutUser())
        }
    
    }

    export const deleteTurno = (id, token) => async (dispatch) => {
        try {
            const res = await axios.delete(
                `${URL_actions}/turno/delete/${id}`, { headers: {
                    'Authorization': `Bearer ${token}`
                }}
            );
            dispatch({
                type: DELETE_TURNO,
                payload: res.data,
            });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Surgió un error",
                text: `${err.response.data}`,
            })
            dispatch(logoutUser())
        }
    }


///////////////////////////////// ESPECIALIDADES //////////////////////////////////////

    export const postEspecialidad = (especialidad, image, token) => async (dispatch) => {
        try {
            const res = await axios.post(
                `${URL_actions}/especialidad/post`,
                {
                    especialidad,
                    image
                }, { headers: {
                    'Authorization': `Bearer ${token}`
                }}
            );
            dispatch({
                type: POST_ESPECIALIDAD,
                payload: res.data,
            });
            Swal.fire({
                icon: "success",
                title: "Registro Especialidad Exitoso!",
            })
        }
            catch(err) {
                Swal.fire({
                    icon: "error",
                    title: "Surgió un error",
                    text: `${err.response.data}`,
                })
                dispatch(logoutUser())
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

    export const patchEspecialidad = (id, image, token) => async (dispatch) => {
        try {
            const res = await axios.patch(
                `${URL_actions}/especialidad/patch/${id}`,
                {image}, { headers: {
                    'Authorization': `Bearer ${token}`
                }}
            );
            dispatch({
                type: PATCH_ESPECIALIDAD,
                payload: res.data,
            });
            Swal.fire(
                    "Actualizada!",
                    "Has actualizado la imagen de esta especialidad.",
                    "success"
                )
            ;
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Surgió un error",
                text: `${err.response.data}`,
            })
            dispatch(logoutUser())
        }
    }

    export const deleteEspecialidad = (id, token) => async (dispatch) => {
        try {
            const res = await axios.delete(
                `${URL_actions}/especialidad/delete/${id}`, { headers: {
                    'Authorization': `Bearer ${token}`
                }}
            );
            dispatch({
                type: DELETE_ESPECIALIDAD,
                payload: res.data,
            });
            Swal.fire(
                "Eliminada!",
                "Has eliminado esta especialidad.",
                "success"
            );
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Surgió un error",
                text: `${err.response.data}`,
            })
            dispatch(logoutUser())
        }
    }