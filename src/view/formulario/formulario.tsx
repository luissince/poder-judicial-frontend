import { RouteComponentProps } from "react-router-dom";
import { images } from "../../helper/index.helper";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import Formulario from "../../model/interfaces/formulario.model-interface";
import { ObtenerPdf } from "../../network/rest/index.network";
import Response from "../../model/class/response.model.class";
import RestError from "../../model/class/resterror.model.class";
import { useEffectOnce } from "react-use";
import CustomModal from "../../component/Modal.component";
import { imageBase64 } from "../../helper/herramienta.helper";
import Base64 from "../../model/interfaces/base64";
import toast from "react-hot-toast";

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
    const [base64Str, setBase64Str] = useState("");
    const [extension, setExtension] = useState("");

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

    const refImagen = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File>();

    const [isOpen, setIsOpen] = useState(false);
    const embedRef = useRef<HTMLEmbedElement | null>(null);

    useEffect(() => {
        return () => {
            if (embedRef.current != null) {
                window.URL.revokeObjectURL(embedRef.current.src);
            }
        };
    }, []);

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files.length !== 0) {
            setSelectedFile(e.target.files[0]);
        } else {
            setSelectedFile(null);
            refImagen.current.value = "";
        }
    };

    const handleRemoveImage = () => {
        refImagen.current.value = "";
        setSelectedFile(null);
    };

    const handleUploadButtonClick = () => {
        refImagen.current.click();
    };

    const handleButtonClick = async () => {
        if (refNombreSistema.current && refNombreSistema.current.value.trim() === "") {
            refNombreSistema.current.focus();
        } else if (refVersionSistema.current && refVersionSistema.current.value.trim() === "") {
            refVersionSistema.current.focus();
        } else if (refUsuarioNombre.current && refUsuarioNombre.current.value.trim() === "") {
            refUsuarioNombre.current.focus();
        } else if (refCelularAxeso.current && refCelularAxeso.current.value.trim() === "") {
            refCelularAxeso.current.focus();
        } else if (refSede.current && refSede.current.value.trim() === "") {
            refSede.current.focus();
        } else if (refCargo.current && refCargo.current.value.trim() === "") {
            refCargo.current.focus();
        } else if (refPersonaReporte.current && refPersonaReporte.current.value.trim() === "") {
            refPersonaReporte.current.focus();
        } else if (refCelularPersona.current && refCelularPersona.current.value.trim() === "") {
            refCelularPersona.current.focus();
        } else if (refFecha.current && refFecha.current.value.trim() === "") {
            refFecha.current.focus();
        } else if (refDescripcion.current && refDescripcion.current.value.trim() === "") {
            refDescripcion.current.focus();
        } else if (refDescartes.current && refDescartes.current.value.trim() === "") {
            refDescartes.current.focus();
        } else if (selectedFile == null) {
            toast((t) => (
                <div className="flex gap-x-4">

                    <div className="flex items-center">
                        <div className="ml-3 flex-1">

                            <p className="mt-1 text-sm text-gray-500">
                                Seleccione una imagen
                            </p>
                        </div>
                    </div>

                    <div className="flex border-l border-gray-200">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-upla-100 hover:text-upla-200 focus:outline-none focus:ring-2 focus:ring-upla-100">
                            Cerrar
                        </button>
                    </div>
                </div>
            ), {
                position: "top-right"
            })
        }
        else {
            const result = await imageBase64(refImagen.current.files) as Base64;
            setBase64Str(result.base64String);
            setExtension(result.extension);
            handleOpen();
        }
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div className="isolate bg-white px-6 py-0 sm:py-1 lg:px-8">
            <CustomModal
                isOpen={isOpen}
                onOpen={async () => {
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
                        base64Str: base64Str,
                        extension: extension
                    };
                    const response = await ObtenerPdf<Blob>(data);

                    if (response instanceof Response) {
                        const blob = new Blob([response.data], { type: "application/pdf" });

                        const url = window.URL.createObjectURL(blob);
                        embedRef.current.src = url;
                    }

                    if (response instanceof RestError) {
                        console.log(response.getMessage());
                    }
                }}
                onHidden={() => { }}
                onClose={handleClose}
            >
                <button
                    className="absolute top-2 right-2 p-2 z-[100] rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800"
                    onClick={handleClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div className="flex items-center justify-center w-full h-full">
                    <div className="w-full p-10">
                        <embed
                            ref={embedRef}
                            className="w-full h-[800px]"
                            type="application/pdf"
                        />
                    </div>
                </div>
            </CustomModal>
            <div className="mx-auto mt-2 max-w-3xl sm:mt-6">
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
                        <h5 className="font-bold text-xs mt-1">
                            Versión: <span className="font-normal text-xs">05</span>{" "}
                        </h5>
                        <h5 className="font-bold text-xs mt-1">
                            Fecha: <span className="font-normal text-xs">07/06/2023</span>{" "}
                        </h5>
                    </div>
                </div>
            </div>

            {/* <div className="mx-auto max-w-2xl text-center bg-blue-900">
                <h4 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">FORMULARIO DE INCIDENCIA</h4>

            </div> */}
            <div className="mx-auto mt-4 max-w-3xl sm:mt-8">
                <p className="mt-2 text-base leading-8 text-gray-600">
                    {" "}
                    INFORMACIÓN DEL SISTEMA:{" "}
                </p>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Nombre
                            {/* <i className="bi bi-asterisk text-red-600 text-xs"></i> */}
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
                <p className="mt-2 text-base leading-8 text-gray-600">
                    {" "}
                    FLUJO REALIZADO:{" "}
                </p>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div className="col-span-full">
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <div className="flex flex-col items-center">
                                    <input
                                        ref={refImagen}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileInputChange}
                                    />
                                    <button
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 mb-4"
                                        onClick={handleUploadButtonClick}
                                    >
                                        Cargar una imagen
                                    </button>
                                    {selectedFile && (
                                        <div className="flex flex-col items-center">
                                            <div className="relative flex-shrink-0 mb-2">
                                                <img
                                                    src={URL.createObjectURL(selectedFile)}
                                                    alt="Imagen seleccionada"
                                                    className="w-full h-auto sm:w-48 md:w-64 lg:w-80 rounded-md object-cover border-4 border-indigo-600"
                                                />
                                                <button
                                                    className="absolute top-0 right-0 -mt-2 -mr-2 px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                                                    onClick={handleRemoveImage}
                                                >
                                                    X
                                                </button>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-semibold text-gray-800">{selectedFile.name}</p>
                                                <p className="text-sm text-gray-500">{selectedFile.type}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <button
                        onClick={() => handleButtonClick()}
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Generar PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormularioView;
