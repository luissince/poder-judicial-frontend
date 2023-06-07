import { RouteComponentProps } from "react-router-dom";
import { images } from "../../helper/index.helper";

const Formulario = (props: RouteComponentProps<{}>) => {

    return (
        <div className="isolate bg-white px-6 py-1 sm:py-5 lg:px-8">

            <div className="mx-auto mt-8 max-w-3xl sm:mt-12">

                <div className="grid grid-cols-8 w-full border-solid border-2 border-red-700">
                    <div className="col-start-1 col-end-1 p-2">
                        <img src={images.logo_poder_judicial} alt="logo" />
                    </div>
                    <div className="col-start-2 col-end-7 border-solid border-2 border-x-red-700 text-center">
                        <h1 className="font-bold text-2xl mt-1">PODER JUDICIAL</h1>
                        <h5>FORMULARIO DE INCIDENCIA</h5>
                    </div>
                    <div className="col-start-7 col-end-9 text-center">
                        <h5 className="font-bold text-xs mt-1">Formulario N°: </h5>
                        <p className="font-normal text-xs">P-01-2023-GI-GG-PJ-F-01</p> 
                        <h5 className="font-bold text-xs mt-1">Versión: <span className="font-normal text-xs">05</span> </h5>
                        <h5 className="font-bold text-xs mt-1">Fecha: <span className="font-normal text-xs">07/06/2023</span> </h5>
                    </div>
                </div>

            </div>



            {/* <div className="mx-auto max-w-2xl text-center bg-blue-900">
                <h4 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">FORMULARIO DE INCIDENCIA</h4>

            </div> */}
            <form action="#" method="POST" className="mx-auto mt-8 max-w-3xl sm:mt-12">

                <p className="mt-2 text-base leading-8 text-gray-600"> INFORMACIÓN DEL SISTEMA: </p>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Nombre
                            {/* <i className="bi bi-asterisk text-red-600 text-xs"></i> */}
                        </label>
                        <div className="mt-2.5">
                            <select className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option value="1">SIJ</option>
                                <option value="2">WEB</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Version
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                <br />
                <p className="mt-2 text-base leading-8 text-gray-600"> INFORMACIÓN DEL USUARIO: </p>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Nombre y Apellidos
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Celular / Anexo
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Sede
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Cargo
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                <br />
                <p className="mt-2 text-base leading-8 text-gray-600"> REPORTADO POR: </p>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Nombres y Apellidos

                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Celular
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                <br />
                <p className="mt-2 text-base leading-8 text-gray-600"> INCIDENCIA: </p>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Fecha
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="date"
                                name="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Descripción
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                name="message"
                                rows={2}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                            />
                        </div>
                    </div>
                </div>

                <br />
                <p className="mt-2 text-base leading-8 text-gray-600"> DESCARTES: </p>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <div className="mt-2.5">
                            <select className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6">
                                <option value="1">1. ¿El mismo incidente se reproduce en otro equipo? </option>
                                <option value="2">2. ¿El mismo incidente se reproduce con otros usuarios? </option>
                                <option value="3">3. ¿El incidente ocurre solo con un expediente? </option>
                                <option value="4">4. ¿Lo reportado ha sido validado por implantación? </option>
                                <option value="5">5. ¿Se está utilizando la última versión de la aplicación desplegada en la corte? </option>
                            </select>
                        </div>
                    </div>
                </div>

                <br />
                <p className="mt-2 text-base leading-8 text-gray-600"> FLUJO REALIZADO: </p>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="col-span-full">
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <i className="bi bi-image-fill"></i>
                                <div className="mt-1 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>Cargar un archivo</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">o arrastrar y soltar</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF hasta 10MB</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Formulario