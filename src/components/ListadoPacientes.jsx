import React from 'react'
// import { useEffect } from 'react'
import { Paciente } from './Paciente'

export const ListadoPacientes = ({ pacientes, setPaciente, eliminarPaciente }) => {

    // console.log(pacientes && pacientes.length); -> Da 0


    // useEffect(() => {

    //     (pacientes.length > 0) && console.log('Nuevo paciente');

    // }, [pacientes])


    return (
        <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">

            {
                //Comprobamos que paciente tenga algo, si tiene algo accede a su propiedad length
                //Y continua con el ternario, sino, no accede a la propiedad length
                (pacientes && pacientes.length) ? (
                    <>
                        <h2 className="font-black text-3xl text-center">
                            Listado pacientes

                        </h2>
                        <p className="text-lg mt-5 mb-10 text-center">
                            Administra tus {''}
                            <span className="text-indigo-600 font-bold">
                                Pacientes y Citas
                            </span>

                        </p>

                        {

                            // pacientes.map((paciente, index) => (  -> Mala practica
                            pacientes.map((paciente) => (

                                //Cuando tienes un listado y lo generas varias veces (.map()) debe tener un key unico.
                                <Paciente
                                    // key={index} -> Mala practica, por que el indice de un array se puede agregar o eliminar
                                    //Originando un performance muy pesado.

                                    //Forma correctamente
                                    key={paciente.id}
                                    paciente={paciente}

                                    setPaciente={setPaciente}

                                    eliminarPaciente={eliminarPaciente}
                                />
                            ))
                        }
                    </>
                ) : (
                    <>
                        <h2 className="font-black text-3xl text-center">
                            No hay pacientes

                        </h2>
                        <p className="text-lg mt-5 mb-10 text-center">
                            Comienza agregando pacientes {''}
                            <span className="text-indigo-600 font-bold">
                                y aparecerán en este lugar
                            </span>

                        </p>
                    </>
                )
            }


        </div>
    )
}
