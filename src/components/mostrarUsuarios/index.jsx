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

    const { token } = useSelector((state) => state.userReducer.user);
    const users = useSelector((state) => state.userReducer.users);
    const turnos = useSelector((state) => state.userReducer.turnos);

    const [listUsersShow, setListUsersShow] = useState(false);                      // mostrar ocultar lista
    const [dniSearchUser, setDniSearchUser] = useState(false);                      // buscar por dni

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
        dispatch(getUsers(token));
        setListUsersShow(!listUsersShow);
    }
    //Funcion para borrar un usuario de la base de datos 
    async function deleteUserSelected(user) {
        let conTurnoAsignado = false
        turnos?.map((turno) => {
            if(turno.doctor_id === user.id_user || turno.paciente_id === user.id_user)
                {
                    conTurnoAsignado = true}    
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
                        await dispatch(deleteUser(userId, token));
                        dispatch(getUsers(token));
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
                                        <h5>Médicos:</h5>
                                        {users?.filter(user => user.medico === 'MEDICO').map((user, i) =>
                                                <div key={i} className="doctorToApprove">
                                                    <span>
                                                        {user.apellido}{" "}
                                                        {user.nombre} - {" "}
                                                        {user.medico}
                                                    </span>
                                                    <span>
                                                        DNIº {user.dni}
                                                    </span>
                                                    <span className="btn-manage-doc">
                                                        <button className="btn-delete-admin" onClick={() => deleteUserSelected(user)}>
                                                            Eliminar
                                                        </button>
                                                    </span>
                                                </div>
                                        )}
                                        <h5>Pacientes:</h5>
                                        {users?.filter(user => user.medico === 'PACIENTE').map((user, i) =>
                                            
                                                <div key={i} className="doctorToApprove">
                                                    <span>
                                                        {user.apellido}{" "}
                                                        {user.nombre} - {" "}
                                                        {user.medico}
                                                    </span>
                                                    <span>
                                                        DNIº {user.dni}
                                                    </span>
                                                    <span className="btn-manage-doc">
                                                        <button className="btn-delete-admin" onClick={() => deleteUserSelected(user)}>
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
                                                        {user.apellido}{" "}
                                                        {user.nombre} - {" "}
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