import React, { useState, useEffect } from 'react'

import { Error } from './Error';



export const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {


    const [nombre, setNombre] = useState('');

    const [propietario, setPropietario] = useState('');

    const [email, setEmail] = useState('');

    const [fecha, setFecha] = useState('');

    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false)


    useEffect(() => {

        //Comprueba si el obj paciente tiene datos
        if (Object.keys(paciente).length > 0) {
            //paciente.nombre es el obj que esta en memoria, lo que sale al editar
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
        }

        //Se pasa los nombres al formulario por que esta leyendo los cambios del obj paciente
    }, [paciente])



    const generarId = () => {
        const random = Math.random().toString(36).substring(2);
        // console.log(random); '2t6djjdhs6'

        const fecha = Date.now().toString(36);
        // console.log(fecha); 'l4fwba3c'

        return random + fecha;

    }

    const handleSumit = (e) => {
        e.preventDefault();

        //Validación de formulario
        if ([nombre, email, propietario, fecha, sintomas].includes('')) {
            console.log('Hay al menos un campo vacio');
            setError(true)
            return
        }

        //Esto hacemos para que ya no salga el error cuando los campos esten llenos.
        setError(false);

        //Creamos el objeto Paciente
        const objPaciente = {
            nombre,
            email,
            propietario,
            fecha,
            sintomas,
        }

        //EDITAR REGISTRO
        if (paciente.id) { //Si tiene un id
            //Editando el registro
            //Del obj creado (line 65) creamos un nuevo campo donde asignamos el id del paciente
            objPaciente.id = paciente.id
            // console.log(objPaciente); Obj paciente actualizado
            // console.log(paciente); Obj paciente sin actualizar

            //Iteramos sobre todos los pacientes 
            //pacientes -> el array con los obj paciente
            const pacienteActualizado = pacientes.map(
                (pacienteState) => pacienteState.id === paciente.id
                    //Si el id de pacienteState es igual al id de paciente
                    ? objPaciente //Retorna el objPaciente actualizado
                    : pacienteState //De lo contrario retorna un obj actual sin modificar

            )

            setPacientes(pacienteActualizado);
            setPaciente({}); //Limpia el state anterior


        } else {
            //Nuevo registro
            objPaciente.id = generarId();
            //SI DESEAS MODIFICAR UN ESTADO, CREA O COPIA LOS DATOS A UN NUEVO ARREGLO
            //SOLO METODOS INMUTABLES

            //objPaciente -> es el objeto que captura los datos ingresados
            setPacientes([...pacientes, objPaciente]);
            // console.log(objPaciente);
        }



        //Reiniciar el form
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }

    return (
        //w-1/2 -> With 50 - 50 - w-2/5 -> 40%
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">
                Seguimiento Pacientes
            </h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {' '}

                <span className="text-indigo-600 font-bold ">
                    Administrarlos</span>
            </p>

            {/*py -> arriba abajo, ´x -> izquierda - derecha */}
            <form
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                onSubmit={handleSumit}
            >
                {
                    error &&
                    (
                        // //FORMA 1:
                        // <Error
                        //  mensaje='Todos los campos son obligatorios'
                        // />

                        //FORMA 2: Te permite agregar html dentro del component
                        <Error>
                            <p>Todos los campos son obligatorios</p>
                        </Error>
                    )

                }
                <div className="mb-5">
                    <label htmlFor='mascota' className="block text-gray-700 uppercase font-bold">
                        Nombre Mascota
                    </label>

                    {/*w-full toma todo el hancho del contenedor
                        p-2 -> padding de 2
                    */}
                    <input
                        id='mascota'
                        type="text"
                        placeholder='Nombre de la mascota'
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className='mb-5'>
                    <label htmlFor='propietario' className="block text-gray-700 uppercase font-bold">
                        Nombre Propietario
                    </label>

                    {/*w-full toma todo el hancho del contenedor
                        p-2 -> padding de 2
                    */}
                    <input
                        id='propietario'
                        type="text"
                        placeholder='Nombre del propietario'
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>

                <div className='mb-5'>
                    <label htmlFor='email' className="block text-gray-700 uppercase font-bold">
                        Email
                    </label>

                    {/*w-full toma todo el hancho del contenedor
                        p-2 -> padding de 2
                    */}
                    <input
                        id='email'
                        type="email"
                        placeholder='Email de Contacto Propietario'
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='mb-5'>
                    <label htmlFor='alta' className="block text-gray-700 uppercase font-bold">
                        alta
                    </label>

                    {/*w-full toma todo el hancho del contenedor
                        p-2 -> padding de 2
                    */}
                    <input
                        id='alta'
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>

                <div className='mb-5'>
                    <label htmlFor='sintomas' className="block text-gray-700 uppercase font-bold">
                        Síntomas
                    </label>

                    <textarea
                        id='sintomas'
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe los síntomas"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>

                <input

                    type="submit"
                    className="
                        bg-indigo-600 w-full 
                        p-3 
                        text-white 
                        uppercase 
                        font-bold 
                        rounded-md
                        hover:bg-indigo-700
                        cursor-pointer
                        transition-colors
                        "
                    value={
                        paciente.id ? 'Editar Paciente' : 'Agregar Paciente'
                    }
                />
            </form>
        </div>
    )
}
