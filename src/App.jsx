import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { Navbarr, Footerr } from "./components/"; //SectionDoctorsMain SacarTurno
import {
    Home,
    Error404,
    Join,
    Register,
    RegisterDoc,
    Contact,
    AboutUs,
    Turnos,
    PanelUser,
} from "./pages/";

function App() {
    return (
        <div className="App">
            <Navbarr />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Turnos" element={<Turnos />} />
                <Route path="/Join" element={<Join />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/RegisterDoc" element={<RegisterDoc />} />
                <Route path="/error404" element={<Error404 />} />
                <Route path="/panelUser" element={<PanelUser />} />
            </Routes>
            <Footerr />
        </div>
    );
}

export default App;
