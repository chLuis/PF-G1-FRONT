import "./contact.css"

export const Contact = () => {
    return (
    <div className="contact-body">
        <div className="contact">
            <div className="contact-form">
                <form action="https://formsubmit.co/german_vellido98@hotmail.com" method="POST" >
                    <h2>Envianos un Mensaje</h2>
                    <div className="input-group">
                            <input name="Nombre" type="text" required/>
                            <label>Nombre y Apellido</label>
                    </div>
                    <div className="input-group">
                            <input name="email" type="email" required/>
                            <label>Email</label>
                    </div>
                    <div className="input-group">
                            <input name="consulta" type="text" required/>
                            <label>Consulta</label>
                    </div>
                    <button type="submit">Enviar</button>
                    <h2>Hospital Clinica Rolling Medicine</h2>
                    <p>Direccíon para llegar a nuestra sede a hacer los trámites personalmente, te esperamos brindarte la mejor información y nuestra ayuda. </p>
                    <div className="iframe-container" >
                        <iframe loading="lazy" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.1022202999184!2d-65.209390485688!3d-26.83670088316032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1616643393539!5m2!1ses-419!2sar"></iframe>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}