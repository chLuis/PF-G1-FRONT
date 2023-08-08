import { SectionDoctors } from "../index.jsx";
import { Routes, Route } from "react-router-dom";
import './sectionDoctorsMain.css'

export const SectionDoctorsMain = () => {
    return(
        <div>
        <h3 className="especialidades-title">Especialidades</h3>
        <div className='cards-doctors-show'>
            <Routes>
                <Route path="/" element={<SectionDoctors especialidad={"Cardiología"} image={'./src/images/especialidades/cardiologia.jpg'} />} />
            </Routes>
            <Routes>
                <Route path="/" element={<SectionDoctors especialidad={"Dermatología"} image={'./src/images/especialidades/dermatologia.jpg'} />} />
            </Routes>
            <Routes>
                <Route path="/" element={<SectionDoctors especialidad={"Neurología"} image={'./src/images/especialidades/neurologia.jpg'} />} />
            </Routes>
            <Routes>
                <Route path="/" element={<SectionDoctors especialidad={"Obstetricia"} image={'./src/images/especialidades/obstetricia.jpg'} />} />
            </Routes>
            <Routes>
                <Route path="/" element={<SectionDoctors especialidad={"Odontología"} image={'./src/images/especialidades/odontologia.jpg'} />} />
            </Routes>
            <Routes>
                <Route path="/" element={<SectionDoctors especialidad={"Traumatología"} image={'./src/images/especialidades/traumatologia.jpg'} />} />
            </Routes>
</div>
      </div>)}