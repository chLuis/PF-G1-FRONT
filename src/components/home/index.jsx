import "./home.css";

export const Home = () => {
    return (
        <div className="main-page-div">
            <h2 className="main-page-div-h2">Hospital Clinica Rolling Medicine</h2>
            <div className="front-page">
                <div className="gallery">
                    <img
                        src="https://www.simbiotia.com/wp-content/uploads/diseno-de-salas-de-espera.jpg"
                        alt="sala de espera"
                    />
                    <img
                        src="https://buenosaires.gob.ar/sites/default/files/media/image/2018/04/03/faf69bb7808179f922dda209c3e40b3a20921127.jpg"
                        alt="camillas"
                    />
                    <img
                        src="https://www.karlstorz.com/static/file_pics/pic_editorial/es/CORP/3613741_rdax_800x553_80s.jpg"
                        alt="consultorio"
                    />
                    <img
                        src="https://www.infogremiales.com.ar/wp-content/uploads/2022/04/papelmatic-higiene-profesional-dia-mundial-salud-evolucion.jpg"
                        alt="medicos"
                    />
                </div>

                <div className="letras">
                    <h2>Bienvenidos a Rolling Medicine</h2>
                    <p>
                        En Rolling Medicine, nuestro compromiso es brindar
                        atención médica de la más alta calidad para mejorar la
                        salud y el bienestar de nuestros pacientes. Somos un
                        centro de excelencia médica, en constante evolución,
                        donde la experiencia, la tecnología avanzada y el
                        enfoque humano se unen para ofrecer un cuidado integral
                        y personalizado. Nuestro equipo de profesionales
                        altamente capacitados y dedicados incluye médicos
                        especialistas, enfermeras y personal de apoyo que
                        trabajan de manera colaborativa para garantizar el mejor
                        tratamiento y atención para cada paciente que confía en
                        nosotros.
                    </p>
                    <span className="letras-static">
                        Si tenes síntomas de una enfermedad{" "}
                    </span>
                    <div className="letras-in">
                        <span>No te automediques</span>
                        <span>Sacá un turno</span>
                        <span>Tratate con Profesionales</span>
                        <span>Estamos para cuidarte ❤️</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
{
    /* <Letras /> */
}
