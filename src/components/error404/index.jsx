import './error404.css'
import { useEffect } from 'react'

export const Error404 = () => { 

    useEffect(() => {
        const timeout = setTimeout(() => {
            window.history.back()
        }, 10000);
        return () => clearTimeout(timeout);}) 
    return (
        <div className='pagina-404'>
            <div id="background"></div>
                <div className="top">
                    <h1>404</h1>
                    <h3>page not found</h3>
                    <h4>Espere... Será redirecionado automaticamente.</h4>
                </div>
                <div className="container-404">
                <div className="ghost-copy">
                    <div className="one"></div>
                    <div className="two"></div>
                    <div className="three"></div>
                    <div className="four"></div>
                </div>
                <div className="ghost">
                    <div className="toface">
                    <div className="eye"></div>
                    <div className="eye-right"></div>
                    <div className="mouth"></div>
                    </div>
                </div>
                <div className="shadow"></div>
                
            </div>
        </div>

    )
}
