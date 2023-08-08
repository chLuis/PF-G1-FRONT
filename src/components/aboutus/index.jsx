import "./aboutus.css"

export const AboutUs = () => {
    return (
    <div className="aboutus-container">
      <div className="aboutus-content">
        <div className="aboutus">
          <h1 style={({margin: "20px"})}>¿Quiénes somos?</h1>
          <p>Somos un grupo diverso de personas con un interés común, aprender desarrollar páginas web. Como estudiantes tenemos diferentes niveles de experiencia, pero todos estamos comprometidos a mejorar nuestros conocimientos y habilidades en programación. Trabajamos en este proyectos en equipo y colaboramos entre sí para resolver problemas y completar tareas.</p>
        </div>
        <div>
          <ul className="team">
            <li>
              <img src="https://i.ibb.co/SN9nnRK/luis.jpg" alt="Luis Chrestia"  className="avatar-container"/>
              <h2>Luis Chrestia</h2>
            </li>
            <li>
              <img src="https://i.ibb.co/5FXB7pZ/1234.jpg" alt="Vellido Germán Exequiel"  className="avatar-container"/>
              <h2>Vellido Germán Exequiel</h2>
            </li>
          </ul>
        </div>
      </div>
    </div>  
  );

}