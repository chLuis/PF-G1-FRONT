import "./adminEspecialidades.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
    postEspecialidad,
    deleteEspecialidad,
    getEspecialidades,
    patchEspecialidad,
} from "../../redux/actions";
import Swal from "sweetalert2";

export const AdminEspecialidades = () => {
    const dispatch = useDispatch();

    const doctors = useSelector((state) => state.userReducer.doctors);
    const token = useSelector((state) => state.userReducer.user.token);
    const especialidades =
        useSelector((state) => state.userReducer.especialidades) || [];

    const [nuevaEspecialidad, setNuevaEspecialidad] = useState(""); // Input de la especialidad a agregar
    const [imagenNuevaEspecialidad, setImagenNuevaEspecialidad] = useState(""); // input de la img de la nueva especialidad
    const [editImage, setEditImage] = useState(false); // Modal para editar la img de una especialidad
    const [especialidadUpdate, setEspecialidadUpdate] = useState(""); // Escribe el nombre de la especialidad a modificar en label
    const [especialidadImg, setEspecialidadImg] = useState(""); // Input de la nueva img para la especialidad seleccionada
    const [idEspecialidad, setIdEspecialidad] = useState(""); // Id de la especialidad seleccionada para patch img
    const [esImagenValida, setEsImagenValida] = useState(false);
    const [esNuevaImagenValida, setEsNuevaImagenValida] = useState(false);


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });

    // Quitar especialidad
    async function deleteEspecialidadFunction(id_especialidad, especialidad) {
        let doctoresEspecialidad = false;
        doctors?.map((doctor) => {
            if (doctor.especialidad == especialidad) {
                doctoresEspecialidad = true;
            }
        });
        if (doctoresEspecialidad) {
            return swalWithBootstrapButtons.fire(
                "Acción cancelada",
                "No puedes borrar especialidades que tiene doctores asignados, primero elimina todos los doctores de esa especialidad",
                "error"
            );
        }
        swalWithBootstrapButtons
            .fire({
                title: "¿Estas seguro?",
                text: "Vas a ELIMINAR esta especialidad",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Si! Eliminar!",
                cancelButtonText: "No, conservar!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    await dispatch(deleteEspecialidad(id_especialidad,token));
                    dispatch(getEspecialidades());
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Acción cancelada",
                        "Esta especialidad se ha conservado",
                        "info"
                    );
                }
            });
    }


    function esUrlImagenValida(url) {
        // Expresión para verificar si la URL es de una imagen válida
        const formatoImagen = /^https?:\/\/.*\.(jpeg|jpg|gif|png|svg)$/i;
        return formatoImagen.test(url);
    }
    

      manejarNuevaImagen
    //////////////// Nueva especialidad /////////////////
    function primeraMayusRestoMinus(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    function manejarNuevaEspecialidad(e) {
        let especialidad = primeraMayusRestoMinus(e.target.value);
        setNuevaEspecialidad(especialidad);
    }
    function manejarNuevaImagen(e) {
        setImagenNuevaEspecialidad(e.target.value);
        setEsImagenValida(esUrlImagenValida(e.target.value))
    }

    async function agregarEspecialidad() {
        if(nuevaEspecialidad.length < 3){
            return swalWithBootstrapButtons.fire(
                "Acción cancelada",
                "La especialidad debe tener al menos 3 caracteres",
                "info"
            )
        }
        if(imagenNuevaEspecialidad === ""){
            return swalWithBootstrapButtons.fire(
                "Acción cancelada",
                "Debe incluir un enlace para una imagen",
                "info"
            )
        }
        if(esImagenValida === false){
            return swalWithBootstrapButtons.fire(
                "Acción cancelada",
                "Debe ingresar un enlace valido de imagen",
                "info"
            )}

        swalWithBootstrapButtons
            .fire({
                title: "¿Estas seguro?",
                text: "Vas a agregar a esta especialidad",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Si! Agregar!",
                cancelButtonText: "No, cancelar!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    await dispatch(
                        postEspecialidad(
                            nuevaEspecialidad,
                            imagenNuevaEspecialidad,
                            token
                        )
                    );
                    dispatch(getEspecialidades());
                    setNuevaEspecialidad("");
                    setImagenNuevaEspecialidad("");
                    setTimeout(() => {
                        window.location.reload();
                        }, 2000)
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Acción cancelada",
                        "Este especialidad no se ha agregado",
                        "info"
                    );
                }
            });
        }
        let volverACero
    //////// Cambiar imagen de la especialidad //////////
    function editImageEsp(id, espec, img) {
        setEditImage(!editImage);
        setEspecialidadUpdate(espec);
        setEspecialidadImg(img);
        setIdEspecialidad(id);
    }
    function manejarNuevaImagenUpdate(e) {
        setEspecialidadImg(e.target.value);
        setEsNuevaImagenValida(esUrlImagenValida(e.target.value))
    }
    function updateImageEsp() {
        if(especialidadImg === ""){
            return swalWithBootstrapButtons.fire(
                "Acción cancelada",
                "Debe incluir un enlace para una imagen",
                "info"
            )
        }
        if(esNuevaImagenValida === false){
            return swalWithBootstrapButtons.fire(
                "Acción cancelada",
                "Debe ingresar un enlace valido de imagen",
                "info"
            )}
        swalWithBootstrapButtons
            .fire({
                title: "¿Estas seguro?",
                text: "Vas a cambiar la imagen de esta especialidad",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Si! Actualizar!",
                cancelButtonText: "No, conservar!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    await dispatch(
                        patchEspecialidad(idEspecialidad, especialidadImg, token)
                    );
                    dispatch(getEspecialidades());
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Acción cancelada",
                        "No se modificó la imagen de la especialidad",
                        "info"
                    );
                }
            });
        setEditImage(!editImage);
    }

    return (
        <>
            <>
                <h4 className="h4-add-especialidades h4-agregar-Especialidad">
                    Agregar especialidades
                </h4>
                <div className="div-add-especialidades">
                    <div className="div-add-especialidades-input">
                        <label>Especialidad:</label>
                        <input
                        value={volverACero}
                        required={true}
                            placeholder="Neurología..."
                            onChange={manejarNuevaEspecialidad}
                            type="text"
                            maxLength={20}
                            minLength={3}
                        ></input>
                    </div>
                    <div className="div-add-especialidades-input">
                        <label>Imagen:</label>
                        <input
                            placeholder="https://..."
                            onChange={manejarNuevaImagen}
                            maxLength={180}
                        ></input>
                    </div>
                    <button
                        onClick={agregarEspecialidad}
                        className="btn-approve-admin-add"
                    >
                        Agregar
                    </button>
                </div>
            </>

            <h4 className="h4-add-especialidades">
                ⚠️{" "}
                <span className="tooltipPanel">
                    Los cambios que realice aquí pueden afectar negativamente el
                    funcionamiento de la página
                </span>
                <span className="span-danger">Danger zone!</span> Editar
                Especialidades
            </h4>

            {especialidades?.map((especialidad, i) => (
                <div key={i} className="div-delete-especialidades">
                    <label className="span-especialidades">
                        {especialidad.especialidad}
                    </label>
                    <button
                        onClick={() =>
                            editImageEsp(
                                especialidad._id,
                                especialidad.especialidad,
                                especialidad.image
                            )
                        }
                        className="btn-update-img"
                    >
                        <span className="btn-min-width"><i className="fa-regular fa-pen-to-square"></i></span> <span className="btn-normal-width">Imagen</span>
                    </button>
                    <button
                        onClick={() =>
                            deleteEspecialidadFunction(
                                especialidad._id,
                                especialidad.especialidad
                            )
                        }
                        className="btn-delete-admin-esp"
                    >
                        <span className="btn-min-width"><i className="fa-regular fa-trash-can"></i></span><span className="btn-normal-width">Eliminar</span>
                    </button>
                </div>
            ))}
            {editImage && (
                <div className="div-update-img-especialidades">
                    <h5>Cambiar imagen de especialidad</h5>
                    <label>{especialidadUpdate}</label>
                    <input
                        placeholder={especialidadImg}
                        maxLength={180}
                        onChange={manejarNuevaImagenUpdate}
                    ></input>
                    <div className="btn-div-update-img">
                        <button
                            className="btn-approve-admin-add"
                            onClick={updateImageEsp}
                        >
                            Aceptar
                        </button>
                        <button
                            className="cancelar-img"
                            onClick={() => setEditImage(!editImage)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
