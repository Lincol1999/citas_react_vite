import { useEffect } from "react";
import { useState } from "react";
import { Formulario } from "./components/Formulario"
import Header from "./components/Header"
import { ListadoPacientes } from "./components/ListadoPacientes"


function App() {

  const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) ?? []); //El conjunto [] de pacientes

  const [paciente, setPaciente] = useState({}) //Los atributos {} de 1 paciente


  // useEffect(() => {

  //   const obtenerLocalStorage = () => {
  //     //Si no existe un localStorage, creamos uno (un arreglo vacio)
  //     const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [] ;
  //     setPacientes(pacientesLS);
  //   }

  //   obtenerLocalStorage();

  // }, [])



  useEffect(() => {

    localStorage.setItem('pacientes', JSON.stringify(pacientes))

  }, [pacientes])


  const eliminarPaciente = (id) => {

    const pacienteActualizados = pacientes.filter(paciente => paciente.id !== id);
    setPacientes(pacienteActualizados);

  }

  return (
    <div className="container mx-auto mt-10">
      <Header

      />
      <div className="mt-12 md:flex">

        <Formulario

          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}


        />

        <ListadoPacientes

          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}

        />
      </div>

    </div>
  )
}

export default App
