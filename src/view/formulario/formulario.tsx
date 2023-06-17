import { RouteComponentProps } from "react-router-dom";
import { images } from "../../helper/index.helper";
import { useState, useRef, ChangeEvent } from "react";
import Formulario from "../../model/interfaces/formulario.model-interface";
import { imageBase64 } from "../../helper/herramienta.helper";
import Base64 from "../../model/interfaces/base64";
import toast, { Toaster } from "react-hot-toast";
import SeleccionarImagen from "./widget/seleccionar.imagen";
import MostrarPdf from "./widget/mostrar.pdf";
import TituloPdf from "./widget/titulo.pdf";
import React from "react";
import Imagen from "../../model/interfaces/imagen.model.interface";

const FormularioView = (props: RouteComponentProps<{}>) => {
    const [nombreSistema, setNombreSistema] = useState("");
    const [versionSistema, setVersionSistema] = useState("");
    const [usuarioNombre, setUsuarioNombre] = useState("");
    const [celularAxeso, setCelularAnexo] = useState("");
    const [sede, setSede] = useState("");
    const [cargo, setCargo] = useState("");
    const [personaReporte, setPersonaReporte] = useState("");
    const [celularPersona, setCelularPersona] = useState("");
    const [fecha, setFecha] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [descartes, setDescartes] = useState("");
    const [imagenes, setImagenes] = useState<Imagen[]>([]);

    const refNombreSistema = useRef<HTMLSelectElement>(null);
    const refVersionSistema = useRef<HTMLInputElement>(null);
    const refUsuarioNombre = useRef<HTMLInputElement>(null);
    const refCelularAxeso = useRef<HTMLInputElement>(null);
    const refSede = useRef<HTMLInputElement>(null);
    const refCargo = useRef<HTMLInputElement>(null);
    const refPersonaReporte = useRef<HTMLInputElement>(null);
    const refCelularPersona = useRef<HTMLInputElement>(null);
    const refFecha = useRef<HTMLInputElement>(null);
    const refDescripcion = useRef<HTMLTextAreaElement>(null);
    const refDescartes = useRef<HTMLSelectElement>(null);

    const [selectedFiles, setSelectedFiles] = useState<Array<{ ref: React.RefObject<HTMLInputElement>, file: File, description: string }>>([]);

    const [isOpen, setIsOpen] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [zoomLevel, setZoomLevel] = useState(100);

    const data: Formulario = {
        nombreSistema: nombreSistema,
        versionSistema: versionSistema,
        usuarioNombre: usuarioNombre,
        celularAxeso: celularAxeso,
        sede: sede,
        cargo: cargo,
        personaReporte: personaReporte,
        celularPersona: celularPersona,
        fecha: fecha,
        descripcion: descripcion,
        descartes: descartes,
        imagenes: imagenes
    }

    const handleButtonClick = async () => {
        if (refNombreSistema.current && refNombreSistema.current.value.trim() === "") {
            refNombreSistema.current.focus();
            return;
        }

        if (refVersionSistema.current && refVersionSistema.current.value.trim() === "") {
            refVersionSistema.current.focus();
            return;
        }

        if (refUsuarioNombre.current && refUsuarioNombre.current.value.trim() === "") {
            refUsuarioNombre.current.focus();
            return;
        }

        if (refCelularAxeso.current && refCelularAxeso.current.value.trim() === "") {
            refCelularAxeso.current.focus();
            return;
        }

        if (refSede.current && refSede.current.value.trim() === "") {
            refSede.current.focus();
            return;
        }

        if (refCargo.current && refCargo.current.value.trim() === "") {
            refCargo.current.focus();
            return;
        }

        if (refPersonaReporte.current && refPersonaReporte.current.value.trim() === "") {
            refPersonaReporte.current.focus();
            return;
        }

        if (refCelularPersona.current && refCelularPersona.current.value.trim() === "") {
            refCelularPersona.current.focus();
            return;
        }

        if (refFecha.current && refFecha.current.value.trim() === "") {
            refFecha.current.focus();
            return;
        }

        if (refDescripcion.current && refDescripcion.current.value.trim() === "") {
            refDescripcion.current.focus();
            return;
        }

        if (refDescartes.current && refDescartes.current.value.trim() === "") {
            refDescartes.current.focus();
            return;
        }

        // if (selectedFile == null) {
        //     toast((t) => (
        //         <div className="flex gap-x-4 items-center">

        //             <div className="flex items-center">
        //                 <div className="ml-3 flex-1">

        //                     <p className="text-sm text-black">
        //                         Seleccione una imagen
        //                     </p>
        //                 </div>
        //             </div>

        //             <div className="flex border-gray-200">
        //                 <button
        //                     className="px-2 py-1 rounded-full bg-red-500 hover:bg-red-600 text-white"
        //                     onClick={() => toast.dismiss(t.id)}>
        //                     <i className="bi bi-x-lg"></i>
        //                 </button>
        //             </div>
        //         </div>
        //     ), {
        //         position: "top-right"
        //     })
        // return;
        // }

        // const result = await imageBase64(refImagen.current.files) as Base64;
        // setBase64Str(result.base64String);
        // setExtension(result.extension);

        let listaImagenes:Imagen[] = [];
        for (const item of selectedFiles) {
           
            const result = await imageBase64(item.file) as Base64;
          
            const imagen:Imagen = {
                base64String: result.base64String,
                extension: result.extension.toLowerCase(),
                descripcion : item.description
            }
            
            listaImagenes.push(imagen);
        }
        setImagenes(listaImagenes);
        handleOpen();
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFiles(prevSelectedFiles => {
                const updatedFiles = [...prevSelectedFiles];
                updatedFiles[index].file = file;
                return updatedFiles;
            });
        }
    };

    const handleUploadButtonClick = (index: number) => {
        selectedFiles[index].ref.current?.click();
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const description = event.target.value;
        setSelectedFiles(prevSelectedFiles => {
            const updatedFiles = [...prevSelectedFiles];
            updatedFiles[index].description = description;
            return updatedFiles;
        });
    };

    const handleAddElement = () => {
        setSelectedFiles(prevSelectedFiles => [
            ...prevSelectedFiles,
            { ref: React.createRef<HTMLInputElement>(), file: null, description: "" }
        ]);
    };

    const handleRemoveElement = (index: number) => {
        setSelectedFiles(prevSelectedFiles => {
            const updatedFiles = [...prevSelectedFiles];
            updatedFiles.splice(index, 1);
            return updatedFiles;
        });
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleZoomIn = () => {
        if (zoomLevel < 200) {
            setZoomLevel(zoomLevel + 10);
        }
    };

    const handleZoomOut = () => {
        if (zoomLevel > 10) {
            setZoomLevel(zoomLevel - 10);
        }
    };

    const handlePrint = () => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow?.print();
        }
    }

    return (
        <div className="isolate bg-white px-6 py-0 sm:py-1 lg:px-8">
            <MostrarPdf
                isOpen={isOpen}
                data={data}
                iframeRef={iframeRef}
                zoomLevel={zoomLevel}
                setZoomLevel={setZoomLevel}
                handleClose={handleClose}
                handleZoomIn={handleZoomIn}
                handleZoomOut={handleZoomOut}
                handlePrint={handlePrint}
            />

            <TituloPdf />

            <div className="mx-auto mt-4 max-w-3xl sm:mt-8">
                <p className="mt-2 text-base leading-8 text-gray-600">
                    {" "}
                    INFORMACIÓN DEL SISTEMA:{" "}
                </p>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Nombre
                        </label>
                        <div className="mt-0">
                            <select
                                ref={refNombreSistema}
                                value={nombreSistema}
                                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                    setNombreSistema(event.currentTarget.value);
                                }}
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option value="">-- Seleccione --</option>
                                <option value="SIJ">SIJ</option>
                                <option value="WEB">WEB</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Versión
                        </label>
                        <div className="mt-0">
                            <input
                                type="text"
                                ref={refVersionSistema}
                                value={versionSistema}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setVersionSistema(event.target.value);
                                }}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                <br />
                <p className="mt-2 text-base leading-8 text-gray-600">
                    {" "}
                    INFORMACIÓN DEL USUARIO:{" "}
                </p>

                <div className="grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Nombre y Apellidos
                        </label>
                        <div className="mt-0">
                            <input
                                type="text"
                                ref={refUsuarioNombre}
                                value={usuarioNombre}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setUsuarioNombre(event.target.value);
                                }}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Celular / Anexo
                        </label>
                        <div className="mt-0">
                            <input
                                type="text"
                                ref={refCelularAxeso}
                                value={celularAxeso}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setCelularAnexo(event.target.value);
                                }}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Sede
                        </label>
                        <div className="mt-0">
                            <input
                                type="text"
                                ref={refSede}
                                value={sede}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setSede(event.target.value);
                                }}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Cargo
                        </label>
                        <div className="mt-0">
                            <input
                                type="text"
                                ref={refCargo}
                                value={cargo}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setCargo(event.target.value);
                                }}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                <br />
                <p className="mt-2 text-base leading-8 text-gray-600">
                    {" "}
                    REPORTADO POR:{" "}
                </p>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Nombres y Apellidos
                        </label>
                        <div className="mt-0">
                            <input
                                type="text"
                                ref={refPersonaReporte}
                                value={personaReporte}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setPersonaReporte(event.target.value);
                                }}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Celular
                        </label>
                        <div className="mt-0">
                            <input
                                type="text"
                                ref={refCelularPersona}
                                value={celularPersona}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setCelularPersona(event.target.value);
                                }}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        <div className="mt-0">
                            <input
                                type="date"
                                ref={refFecha}
                                value={fecha}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setFecha(event.target.value);
                                }}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Descripción
                        </label>
                        <div className="mt-0">
                            <textarea
                                rows={2}
                                ref={refDescripcion}
                                value={descripcion}
                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                                    setDescripcion(event.target.value);
                                }}
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                <br />
                <p className="mt-2 text-base leading-8 text-gray-600"> DESCARTES: </p>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <div className="mt-0">
                            <select
                                value={descartes}
                                ref={refDescartes}
                                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                    setDescartes(event.target.value);
                                }}
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                            >
                                <option value="">-- Seleccione --</option>
                                <option value="1. ¿El mismo incidente se reproduce en otro equipo?">
                                    1. ¿El mismo incidente se reproduce en otro equipo?{" "}
                                </option>
                                <option value="2. ¿El mismo incidente se reproduce con otros usuarios?">
                                    2. ¿El mismo incidente se reproduce con otros usuarios?{" "}
                                </option>
                                <option value="3. ¿El incidente ocurre solo con un expediente?">
                                    3. ¿El incidente ocurre solo con un expediente?{" "}
                                </option>
                                <option value="4. ¿Lo reportado ha sido validado por implantación?">
                                    4. ¿Lo reportado ha sido validado por implantación?{" "}
                                </option>
                                <option value="5. ¿Se está utilizando la última versión de la aplicación desplegada en la corte?">
                                    5. ¿Se está utilizando la última versión de la aplicación
                                    desplegada en la corte?{" "}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <br />
                <div className="">
                    <p className="mt-2 text-base leading-8 text-gray-600">
                        FLUJO REALIZADO:{" "}
                    </p>
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleAddElement}
                    >Agregra Captura</button>
                </div>

                <br />
                {selectedFiles.map((selectedFile, index) => (
                    <div key={index} className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <div className="col-span-full">
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center w-full">
                                    <div className="flex flex-col items-center">
                                        <input
                                            ref={selectedFile.ref}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={event => handleFileInputChange(event, index)}
                                        />
                                        <button
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 mb-4"
                                            onClick={() => handleUploadButtonClick(index)}
                                        >
                                            Cargar imagen
                                        </button>
                                        {selectedFile.file && (
                                            <div className="flex flex-col items-center">
                                                <div className="relative flex-shrink-0 mb-2">
                                                    <img
                                                        src={URL.createObjectURL(selectedFile.file)}
                                                        alt="Imagen seleccionada"
                                                        className="w-full h-auto sm:w-48 md:w-64 lg:w-80 rounded-md object-cover border-4 border-indigo-600"
                                                    />
                                                    <button
                                                        className="absolute top-0 right-0 -mt-2 -mr-2 px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                                                        onClick={() => handleRemoveElement(index)}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                                <div className="text-center">
                                                    <p className="font-semibold text-gray-800">{selectedFile.file.name}</p>
                                                    <p className="text-sm text-gray-500">{selectedFile.file.type}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-5">
                                        <textarea
                                            placeholder="Ingrese la descripción de su captura."
                                            className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={selectedFile.description}
                                            onChange={event => handleDescriptionChange(event, index)}>
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="mt-10">
                    <button
                        onClick={() => handleButtonClick()}
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Generar PDF
                    </button>
                </div>
                <br />
            </div>

            <Toaster />
        </div>
    );
};

export default FormularioView;
