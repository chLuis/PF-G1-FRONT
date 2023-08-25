import './mostrarUsuarios.css'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";
import {
    getUsers,
    deleteUser
} from "../../redux/actions";

export const MostrarUsuarios = () => {

    const dispatch = useDispatch();

    //const doctors = useSelector((state) => state.userReducer.doctors);
    //const doctorsAdmin = useSelector((state) => state.userReducer.doctorsAdmin);
    const users = useSelector((state) => state.userReducer.users);
    const turnos = useSelector((state) => state.userReducer.turnos);
    //const especialidades = useSelector((state) => state.userReducer.especialidades) || [];

    //const [listDoctorsForAprobe, setListDoctorsForAprobe] = useState(false);        // mostrar lista para aprobar
    //const [listDoctorsForDisapprove, setListDoctorsForDisapprove] = useState(false);// mostrar lista para aprobar
    const [listUsersShow, setListUsersShow] = useState(false);                      // mostrar ocultar lista
    //const [dniSearch, SetDniSearch] = useState(false);                              // buscar por dni (oculta la lista)
    const [dniSearchUser, setDniSearchUser] = useState(false);                      // buscar por dni
    //const [dniTurno, setDniTurno] = useState(false);                                // buscar por dni turnos
    //const [userImage, setUserImage] = useState("")                                  // Modifica la imagen de log
    //const [tipoUsuario, setTipoUsuario] = useState("")                              // Clasifica al user por Doc/Paciente/Administrador
    //const [nuevaEspecialidad, setNuevaEspecialidad] = useState("")                  // Input de la especialidad a agregar
    //const [imagenNuevaEspecialidad, setImagenNuevaEspecialidad] = useState("")      // input de la img de la nueva especialidad
    //const [editImage, setEditImage] = useState(false)                               // Modal para editar la img de una especialidad
    //const [especialidadUpdate, setEspecialidadUpdate] = useState("")                // Escribe el nombre de la especialidad a modificar en label
    //const [especialidadImg, setEspecialidadImg] = useState("")                      // Input de la nueva img para la especialidad seleccionada
    //const [idEspecialidad, setIdEspecialidad] = useState("")                        // Id de la especialidad seleccionada para patch img
    //const fechaActual = new Date().toISOString();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });
    function guardarDNIuser(e) {
        setDniSearchUser(e)
        setListUsersShow(false)
    }

        //Funcion para mostrar todos los usuarios
        function showAllUsers() {
            dispatch(getUsers());
            setListUsersShow(!listUsersShow);
        }
    //Funcion para borrar un usuario de la base de datos 
    async function deleteUserSelected(user) {
        //console.log(user)
        let conTurnoAsignado = false
        turnos?.map((turno) => {
            if(turno.doctor_id === user.id_user || turno.paciente_id === user.id_user){
                //console.log(turno.doctor_id)
                //console.log(turno.paciente_id)
                //console.log("EStoy aquyi?=")
                conTurnoAsignado = true
            }    
        })
        if(conTurnoAsignado){
            return swalWithBootstrapButtons.fire(
                "Acción cancelada",
                "No puedes borrar usuarios que tengan turnos asignados",
                "error"
            );
        }
        swalWithBootstrapButtons
            .fire({
                title: "¿Estas seguro?",
                text: "Vas a borrar a este usuario de la base de datos",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Si! Borrar!",
                cancelButtonText: "No, conservar!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    let userId = user.id_user;
                    await dispatch(deleteUser(userId));
                    dispatch(getUsers());
                    swalWithBootstrapButtons.fire(
                        "Borrado!",
                        "Has borrado a este usuario de la base de datos.",
                        "success"
                    );
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Acción cancelada",
                        "Este usuario se ha conservado",
                        "info"
                    );
                }
            });
    }


    return (
        <>
                                <h4>Usuarios</h4>
                                <div className="div-btn-showAll-and-input">
                                <button onClick={showAllUsers}>
                                {listUsersShow
                                        ? "Ocultar lista"
                                        : "Mostrar todos"}{" "}
                                </button>
                                <span>
                                    <input
                                        onChange={(e) =>
                                            guardarDNIuser(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Buscar por DNI"
                                        className="searchDNI"
                                    />
                                </span>
                                </div>
                                {listUsersShow && (
                                    <>
                                        {users?.map((user, i) =>
                                                <div
                                                    key={i}
                                                    className="doctorToApprove"
                                                >
                                                    <span>
                                                        {user.nombre}{" "}
                                                        {user.apellido} - {" "}
                                                        {user.medico}
                                                    </span>
                                                    <span>
                                                        DNIº {user.dni}
                                                    </span>
                                                    <span className="btn-manage-doc">
                                                        <button
                                                            className="btn-delete-admin"
                                                            onClick={() =>
                                                                deleteUserSelected(
                                                                    user
                                                                )
                                                            }
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </span>
                                                </div>
                                        )}
                                    </>
                                )}
                                {users?.map((user, i) => {
                                        if (user.dni == dniSearchUser) {
                                            return (
                                                <div
                                                    key={i}
                                                    className="doctorToApprove"
                                                >
                                                    <span>
                                                        {user.nombre}{" "}
                                                        {user.apellido} - {" "}
                                                        {user.medico}
                                                    </span>
                                                    <span>
                                                        DNIº {user.dni}
                                                    </span>
                                                    <span className="btn-manage-doc">
                                                        <button
                                                            className="btn-delete-admin"
                                                            onClick={() =>
                                                                deleteUserSelected(
                                                                    user
                                                                )
                                                            }
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </span>
                                                </div>
                                            );
                                        } else {
                                            return null; // O podrías renderizar un mensaje "no hay coincidencia" si lo prefieres
                                        }
                                    })}
        </>
    )}