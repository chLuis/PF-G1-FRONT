import "./join.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getUser } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Join = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const { user } = useSelector((state) => state.userReducer) || false;
    const [usuario, setUsuario] = useState(false);
    const [dni, setDni] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setUsuario(user);
        console.log("Effect USER", user);
        if (user) {
            setTimeout(() => {
                Navigate("/");
            }, 1000);
        } else {
            console.log("MNOOOOO USEER");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (dni.length < 7 || dni.length > 10) {
            return Swal.fire({
                icon: "error",
                title: "DNI: datos incorrectos!",
                text: "El DNI debe tener entre 7 y 10 caracteres.",
            });
        }
        if (Number.isNaN(Number(dni))) {
            return Swal.fire({
                icon: "error",
                title: "DNI: datos incorrectos!",
                text: "El DNI debe ser numérico.",
            });
        } else {
            dispatch(getUser(dni, password));
        }
    };

    return (
        <div className="cuerpo">
            {!user && (
                <div className="cuerpo">
                    <div className="wrapper">
                        <div className="form-wrapper">
                            <form>
                                <h2>Ingresar</h2>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        value={dni}
                                        onChange={(e) => setDni(e.target.value)}
                                        required
                                    />
                                    <label>DNI</label>
                                </div>
                                    <div className="input-group">
                                        <input
                                            className=""
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                        />
                                    <div className="Eye" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
                                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
                                        <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                                        </svg>}
                                    </div>
                                        <label>Contraseña</label>
                                </div>
                                <button
                                    className="buttonJoin"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Ingresar
                                </button>
                                <div className="join-link">
                                    <p>
                                        ¿No tienes cuenta? Registrarse como{" "}
                                        <Link to="/register">Paciente</Link> /{" "}
                                        <Link to="/registerDoc">Doctor</Link>
                                    </p>
                                </div>
                                <div className="letras-static letras-staticV2">
                                    En Rolling Medicine{" "}
                                </div>
                                <div className="letras-in letras-inV2">
                                    <span>
                                        La salud es lo más importante, déjanos
                                        cuidarte.
                                    </span>
                                    <span>
                                        Tu bienestar es nuestra prioridad.
                                    </span>
                                    <span>
                                        En nuestra clínica, te tratamos con
                                        compasión y respeto.
                                    </span>
                                    <span>
                                        Te brindamos atención médica integral y
                                        personalizada.
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
