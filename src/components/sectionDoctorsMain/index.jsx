import { SectionDoctors } from "../index.jsx";
import { Routes, Route } from "react-router-dom";
import './sectionDoctorsMain.css'

export const SectionDoctorsMain = () => {
    return(
        <div>
        <h3 className="especialidades-title">Especialidades</h3>
        <div className='cards-doctors-show'>
            <Routes>
                <Route path="/" element={<SectionDoctors especialidad={"Cardiología"} image={'https://i.ibb.co/mRLj6Td/cardiologia.jpg'} />} />
            </Routes>
            <Routes>
                <Route path="/" element={<SectionDoctors especialidad={"Dermatología"} image={'https://i.ibb.co/k1XVfPZ/dermatologia.jpg'} />} />
            </Routes>
            <Routes>
                <Route path="/" element={<SectionDoctors especialidad={"Neurología"} image={'https://i.ibb.co/cF0CmyM/neurologia.jpg'} />} />
            </Routes>
            <Routes>
                <Route path="/" element={<SectionDoctors especialidad={"Obstetricia"} image={'https://i.ibb.co/DKbkfPh/obstretra.jpg'} />} />
            </Routes>
            <Routes>
                <Route path="/" element={<SectionDoctors especialidad={"Odontología"} image={'https://i.ibb.co/CWmTtXm/odontologia.jpg'} />} />
            </Routes>
            <Routes>
                <Route path="/" element={<SectionDoctors especialidad={"Traumatología"} image={'https://i.ibb.co/MRhqHX4/traumatologia.jpg'} />} />
            </Routes>
</div>
      </div>)}