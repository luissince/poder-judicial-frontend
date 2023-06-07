import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { images } from '../../helper/index.helper';

const Busqueda = (props: RouteComponentProps<{}>) => {

    const [dni, setDNI] = useState('');
    const [fullName, setFullName] = useState('');
    const [otherInfo, setOtherInfo] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Aquí puedes realizar una llamada a una API o procesar los datos ingresados de alguna manera

        // Ejemplo de asignación de valores obtenidos
        setFullName('Nombre Apellido');
        setOtherInfo('Otra información relevante');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient bg-no-repeat bg-cover">
            <div className="w-full sm:w-auto bg-white">
                <div className="flex justify-between items-center sm:flex-row flex-col">
                    <div className="w-full sm:w-[40%] p-8 sm:border-r">
                        <div className="flex flex-col items-center">
                            <img src={images.logo} alt="Logo" className="w-32 h-32 mr-4" />
                            <div className="text-center">
                                <p className="">
                                    <strong>Fecha y Hora</strong>
                                </p>
                                <p>
                                    {currentDateTime.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full sm:w-[60%] border-t sm:border-t-0 p-8">
                        <h1 className="text-2xl font-bold mb-4 text-center">Buscar Persona por Cód. Alumno o N° DNI</h1>
                        <form onSubmit={handleSubmit} className="flex flex-row items-center justify-center mb-4">
                            <input
                                type="text"
                                autoFocus
                                value={dni}
                                onChange={(e) => setDNI(e.target.value)}
                                className="p-2 border border-gray-300 rounded-l"
                                placeholder="Ingrese el número de documento"
                            />
                            <button type="submit" className="bg-blue-500 text-peru border border-blue-500 px-4 py-2 rounded-r">
                                <i className="bi bi-search"></i>
                            </button>
                        </form>
                        {fullName && (
                            <div>
                                <div className="flex mt-4 items-center">
                                    <div>
                                        <img src={images.noimage} alt="Foto del usuario" className="w-32 sm:w-42" />
                                    </div>
                                    <div className="ml-4">
                                        <p>
                                            <strong>Código/DNI:</strong> {dni}
                                        </p>
                                        <p>
                                            <strong>Nombres Completos:</strong> {fullName}
                                        </p>
                                        <p>
                                            <strong>Otra Información:</strong> {otherInfo}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Busqueda;