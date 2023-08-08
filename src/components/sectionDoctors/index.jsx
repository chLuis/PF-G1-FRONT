import "./sectionDoctors.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";

export const SectionDoctors = ({ image, especialidad }) => {
    const doctors = useSelector((state) => state.userReducer.doctors);

    const [frontCard, setFrontCard] = useState("face front-card-show");
    const [backCard, setBackCard] = useState("face back-card-hide");

    const selectTurn = () => {
        frontCard === "face front-card-show"
            ? setFrontCard("face front-card-hide")
            : setFrontCard("face front-card-show");
        backCard === "face back-card-hide"
            ? setBackCard("face back-card-show")
            : setBackCard("face back-card-hide");
    };

    return (
        <div className="sectionDoctors" id={especialidad}>
            <div className="card-medic">
                <div className={frontCard}>
                    <h3>{especialidad}</h3>
                    <img src={image} alt="foto medico" />
                    <button onClick={selectTurn} className="btn-sacar-turnos">
                        Ver médicos
                    </button>
                </div>
                <div className={backCard}>
                    <h3 className="especialidad-back">{especialidad}</h3>
                    <div className="medicos-disponibles">
                        {doctors?.map((doctor, i) =>
                            doctor.aprobado === true &&
                            doctor.especialidad === especialidad ? (
                                <div key={i} className="medico-turno">
                                    <p>
                                        Dr. {doctor.nombre} {doctor.apellido}
                                    </p>
                                    <p>Matrícula Nº {doctor.matricula}</p>
                                </div>
                            ) : null
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
SectionDoctors.propTypes = {
    image: PropTypes.string.isRequired,
    especialidad: PropTypes.string.isRequired,
};
