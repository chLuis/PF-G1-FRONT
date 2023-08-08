import "./footer.css"
import { Link } from "react-router-dom"

export const Footerr = () => {
    return (
    <div className="footerr">
      <div className="sb__footer section__padding">
        <div className="sb__footer-links">
            <div className="sb__footer-links_div">
                <h4>Trámites</h4>
                <Link to="/turnos">
                    <p>Turnos</p>
                </Link>
                <Link to="/error404">
                    <p>Prestaciones de Salud</p>
                </Link>
                <Link to="/join">
                    <p>Registrarme</p>
                </Link>
            </div>
            <div className="sb__footer-links_div">
                <h4>Recursos</h4>
                <Link to="/contact">
                    <p>¿Como Llegar?</p>
                </Link>
                <Link to="/error404">
                    <p>Beneficiarios</p>
                </Link>
                <Link to="/error404">
                    <p>Novedades</p>
                </Link>
            </div>
            <div className="sb__footer-links_div">
                <h4>Información General</h4>
                <Link to="/contact">
                    <p>¿Quines Somos?</p>
                </Link>
                <Link to="/error404">
                    <p>Condiciones Legales</p>
                </Link>
                <Link to="/error404">
                    <p>Política de Privacidad</p>
                </Link>
                <Link to="/error404">
                    <p>Política de Cookies</p>
                </Link>
            </div>
            <div className="sb__footer-links_div">
                <h4>Comming Soon on</h4>
                <div className="socialmedia">
                    <Link to="/error404"><p><img className="imgnetwork" src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-facebook_-512.png" alt=""/></p></Link>
                    <Link to="/error404"><p><img className="imgnetwork" src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-twitter-512.png" alt=""/></p></Link>
                    <Link to="/error404"><p><img className="imgnetwork" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_linkedin-1024.png" alt=""/></p></Link>
                    <Link to="/error404"><p><img className="imgnetwork" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-512.png" alt=""/></p></Link>
                </div>
            </div>
        </div>

        <hr></hr>

        <div className="sb__footer-below">
            <div className="sb__footer-copyright">
                <p>
                    @{new Date().getFullYear()} Hospital Clinica Rolling Medicine. All rights reserved.
                </p>
            </div>
            <div className="sb__footer-below-links">
                <Link to="/error404"><div><p>Terms & Conditions</p></div></Link>
                <Link to="/error404"><div><p>Privacy Policy</p></div></Link>            
                <Link to="/error404"><div><p>Security Policy</p></div></Link>            
                <Link to="/error404"><div><p>Coocke Declaration</p></div></Link>            
            </div>
        </div>

      </div>
    </div>
  )
}