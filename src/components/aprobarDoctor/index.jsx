import './aprobarDoctor.css'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
    getDoctorsAdmin,
    putDoctor,
    deleteDoctor,
    getEspecialidades
} from "../../redux/actions";

export const AprobarDoctor = () => {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.userReducer.user);
    const doctorsAdmin = useSelector((state) => state.userReducer.doctorsAdmin);
    const [listDoctorsForAprobe, setListDoctorsForAprobe] = useState(false); // mostrar lista para aprobar
    const [listDoctorsForDisapprove, setListDoctorsForDisapprove] = useState(false); // mostrar lista para aprobar

    const [dniSearch, SetDniSearch] = useState(false); // buscar por dni (oculta la lista)
    const [dniSearchDesaprobar, SetDniSearchDesaprobar] = useState(false); // buscar por dni (oculta la lista)


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });

    //Muestra la lista de doctores que necesitan aprobacion para figurar en tarjetas de entrada
    function showDoctorForApprove() {
        dispatch(getDoctorsAdmin(token));
        setListDoctorsForAprobe(!listDoctorsForAprobe);
    }
    function showDoctorForDisapprove() {
        dispatch(getDoctorsAdmin(token));
        setListDoctorsForDisapprove(!listDoctorsForDisapprove);
    }
    //input donde se hace la busqueda por DNI de medicos para aprobar
    function guardarDNI(e) {
        SetDniSearch(e);
        setListDoctorsForAprobe(false);
        setListDoctorsForDisapprove(false);
    }
    function guardarDNIDesaprobar(e) {
        SetDniSearchDesaprobar(e);
        setListDoctorsForAprobe(false);
        setListDoctorsForDisapprove(false);
    }
    //Actualiza el doc como aprobado
    async function refreshDoctors(doctorId, aprobado) {
        await dispatch(putDoctor(doctorId, aprobado, token));
        dispatch(getDoctorsAdmin(token));
        dispatch(getEspecialidades());
    }
    //Funcion para cambiar estado de "No aprobado" a "aprobado"
    function changeAprobado(doctorId, aprobado) {
        if (aprobado === true) {
            swalWithBootstrapButtons
                .fire({
                    title: "¿Estas seguro?",
                    text: "Vas a permitir al usuario a acceder como Medico autorizado",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonText: "Si! Aprobar!",
                    cancelButtonText: "No, cancelar!",
                    reverseButtons: true,
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        refreshDoctors(doctorId, aprobado);
                        swalWithBootstrapButtons.fire(
                            "Aprobado!",
                            "Has aprobado este doctor como Medico autorizado.",
                            "success"
                        );
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire(
                            "Acción cancelada",
                            "No aprobaste esta cuenta como Medico autorizado",
                            "error"
                        );
                    }
                });
        } else if (aprobado === false) {
            swalWithBootstrapButtons
                .fire({
                    title: "¿Estas seguro?",
                    text: "Vas a quitarle los permisos como Medico autorizado",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonText: "Si! Quitar!",
                    cancelButtonText: "No, cancelar!",
                    reverseButtons: true,
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        refreshDoctors(doctorId, aprobado);
                        swalWithBootstrapButtons.fire(
                            "Removido!",
                            "Has quitado a este Medico de la lista de autorizados.",
                            "success"
                        );
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire(
                            "Acción cancelada",
                            "Has conservado a este Medico en la lista de autorizado",
                            "error"
                        );
                    }
                });
        }
    }

    //Funcion para borrar un doctor de la lista de doctores
    async function deleteDoctorSelected(doc) {
        swalWithBootstrapButtons
            .fire({
                title: "¿Estas seguro?",
                text: "Vas a borrar a este medico de la base de datos",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Si! Borrar!",
                cancelButtonText: "No, conservar!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    //let doctorId = "sdf";
                    await dispatch(deleteDoctor(doc.id_user, token));
                    dispatch(getDoctorsAdmin(token));
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Acción cancelada",
                        "Este doctor sigue en la base de datos",
                        "info"
                    );
                }
            });
    }

    return (
        <>
            <h4>Doctores para aprobar</h4>
            <div className="div-btn-showAll-and-input">
                <button onClick={showDoctorForApprove}>
                    {" "}
                    {listDoctorsForAprobe
                        ? "Ocultar lista"
                        : "Mostrar todos"}{" "}
                </button>
                <span>
                    <input
                        onChange={(e) => guardarDNI(e.target.value)}
                        type="text"
                        placeholder="Buscar por DNI"
                        className="searchDNI"
                    />
                </span>
            </div>
            {listDoctorsForAprobe && (
                <>
                    {doctorsAdmin?.map((doctor, i) =>
                        doctor.aprobado === false ? (
                            <div key={i} className="doctorToApprove">
                                <span>
                                    Matrícula: {doctor.matricula} - Dr.{" "}
                                    {doctor.nombre} {doctor.apellido} -{" "}
                                    {doctor.especialidad}
                                </span>
                                <span>DNIº {doctor.dni}</span>
                                <span className="btn-manage-doc">
                                    <div className='btn-div-approve'>
                                    <button
                                        className="btn-approve-admin"
                                        onClick={() =>
                                            changeAprobado(doctor, true)
                                        }
                                    >
                                    <span className="btn-min-width"><i className="fa-regular fa-pen-to-square"></i></span> <span className="btn-normal-width">Aprobar</span>
                                        
                                    </button>
                                    <button
                                        className="btn-delete-admin"
                                        onClick={() =>
                                            deleteDoctorSelected(doctor)
                                        }
                                    >
                                        <span className="btn-min-width"><i className="fa-regular fa-trash-can"></i></span><span className="btn-normal-width">Eliminar</span>
                                    </button>
                                    </div>
                                </span>
                            </div>
                        ) : null
                    )}
                </>
            )}
            {doctorsAdmin?.map((doctor, i) => {
                if (doctor.dni == dniSearch && doctor.aprobado === false) {
                    return (
                        <div key={i} className="doctorToApprove">
                            <span>
                                Matrícula: {doctor.matricula} - Dr.{" "}
                                {doctor.nombre} {doctor.apellido} -{" "}
                                {doctor.especialidad}
                            </span>
                            <span>DNIº {doctor.dni}</span>
                            <span className="btn-manage-doc">
                            <div className='btn-div-approve'>
                                <button
                                    className="btn-approve-admin"
                                    onClick={() => changeAprobado(doctor, true)}
                                >
                                    <span className="btn-min-width"><i className="fa-regular fa-pen-to-square"></i></span> <span className="btn-normal-width">Aprobar</span>
                                </button>
                                <button
                                    className="btn-delete-admin"
                                    onClick={() => deleteDoctorSelected(doctor)}
                                >
                                    <span className="btn-min-width"><i className="fa-regular fa-trash-can"></i></span><span className="btn-normal-width">Eliminar</span>
                                </button>
                                </div>
                            </span>
                        </div>
                    );
                } else {
                    return null; // O podrías renderizar un mensaje "no hay coincidencia" si lo prefieres
                }
            })}
            <>
                <h4>Doctores para quitar aprobación</h4>
                <div className="div-btn-showAll-and-input">
                    <button onClick={showDoctorForDisapprove}>
                        {" "}
                        {listDoctorsForDisapprove
                            ? "Ocultar lista"
                            : "Mostrar todos"}{" "}
                    </button>
                    <span>
                        <input
                            onChange={(e) => guardarDNIDesaprobar(e.target.value)}
                            type="text"
                            placeholder="Buscar por DNI"
                            className="searchDNI"
                        />
                    </span>
                </div>
                {listDoctorsForDisapprove && (
                    <>
                        {doctorsAdmin?.map((doctor, i) =>
                            doctor.aprobado === true ? (
                                <div key={i} className="doctorToApprove">
                                    <span>
                                        Matrícula: {doctor.matricula} - Dr.{" "}
                                        {doctor.nombre} {doctor.apellido} -{" "}
                                        {doctor.especialidad}
                                    </span>
                                    <span>DNIº {doctor.dni}</span>
                                    <span className="btn-manage-doc">
                                    <div className='btn-div-approve'>
                                        <button
                                            className="btn-disapprove-admin"
                                            onClick={() =>
                                                changeAprobado(doctor, false)
                                            }
                                        >
                                        <span className="btn-min-width"><i className="fa-regular fa-pen-to-square"></i></span> <span className="btn-normal-width">Quitar</span>
                                            
                                        </button>
                                        <button
                                            className="btn-delete-admin"
                                            onClick={() =>
                                                deleteDoctorSelected(doctor)
                                            }
                                        >
                                            <span className="btn-min-width"><i className="fa-regular fa-trash-can"></i></span><span className="btn-normal-width">Eliminar</span>
                                        </button>
                                        </div>
                                    </span>
                                </div>
                            ) : null
                        )}
                    </>
                )}
                {doctorsAdmin?.map((doctor, i) => {
                    if (doctor.dni == dniSearchDesaprobar && doctor.aprobado === true) {
                        return (
                            <div key={i} className="doctorToApprove">
                                <span>
                                    Matrícula: {doctor.matricula} - Dr.{" "}
                                    {doctor.nombre} {doctor.apellido} -{" "}
                                    {doctor.especialidad}
                                </span>
                                <span>DNIº {doctor.dni}</span>
                                <span className="btn-manage-doc">
                                <div className='btn-div-approve'>
                                    <button
                                        className="btn-disapprove-admin"
                                        onClick={() =>
                                            changeAprobado(doctor, false)
                                        }
                                    >
                                        <span className="btn-min-width"><i className="fa-regular fa-pen-to-square"></i></span> <span className="btn-normal-width">Quitar</span>
                                    </button>
                                    <button
                                        className="btn-delete-admin"
                                        onClick={() =>
                                            deleteDoctorSelected(doctor)
                                        }
                                    >
                                        <span className="btn-min-width"><i className="fa-regular fa-trash-can"></i></span><span className="btn-normal-width">Eliminar</span>
                                    </button>
                                    </div>
                                </span>
                            </div>
                        );
                    } else {
                        return null; // O podrías renderizar un mensaje "no hay coincidencia" si lo prefieres
                    }
                })}
            </>
        </>
    );
};
