import { useDispatch, useSelector } from "react-redux";
import "./sectionDoctorsMain.css";
import { useEffect } from "react";
import { getEspecialidades } from "../../redux/actions";
export const SectionDoctorsMain = () => {
    const dispatch = useDispatch();
    const doctors = useSelector((state) => state.userReducer.doctors);
    const especialidades = useSelector((state) => state.userReducer.especialidades) || [];

    let especialidadesDoctores = []
    doctors?.map((doctor) => {
        doctor.aprobado
        ? especialidadesDoctores.push(doctor.especialidad)
        : null
    })
    const especialidadArray = new Set(especialidadesDoctores)
    const especialidadesDoctorAprobado = [...especialidadArray]  // Aqui hago un array con las especialidades que tienen un doctor aprobado, para que se muestre la especialidad

    useEffect(() => {
        dispatch(getEspecialidades());
    }, []);

    return (
        <div className="test">
            <h3 className="especialidades-title">Especialidades</h3>
            <div className="cards-doctors-show">
                {especialidades?.map((especialidad, i) => (
                    especialidadesDoctorAprobado.includes(especialidad.especialidad) &&
                    <div
                        className="sectionDoctors"
                        key={i}
                        id={especialidad.especialidad}
                    >
                        <div className="card-medic">
                            <div className="face front-card-show">
                                <h3>{especialidad.especialidad}</h3>
                                <img
                                    className="foto-especialidad"
                                    src={especialidad.image}
                                    alt="foto medico"
                                />
                            </div>
                            <div className="face back-card-show">
                                <h3 className="especialidad-back">
                                    {especialidad.especialidad}
                                </h3>
                                <div className="medicos-disponibles">
                                    {doctors?.map((doctor, i) =>
                                        doctor.aprobado === true &&
                                        doctor.especialidad ===
                                            especialidad.especialidad ? (
                                            <div
                                                key={i}
                                                className="medico-turno"
                                            >
                                                <p>
                                                    Dr. {doctor.nombre}{" "}
                                                    {doctor.apellido}
                                                </p>
                                                <p>
                                                    Matrícula Nº{" "}
                                                    {doctor.matricula}
                                                </p>
                                            </div>
                                        ) : null
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
