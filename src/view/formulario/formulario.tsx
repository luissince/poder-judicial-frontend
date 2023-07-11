import { RouteComponentProps } from "react-router-dom";
import { images, lista } from "../../helper/index.helper";
import { useState, useRef, ChangeEvent, useEffect, useMemo } from "react";
import Formulario from "../../model/interfaces/formulario.model-interface";
import { currentDate, imageBase64, keyNumberPhone, keyNumberVersion } from "../../helper/herramienta.helper";
import Base64 from "../../model/interfaces/base64";
import { Toaster } from "react-hot-toast";
import SeleccionarImagen from "./widget/seleccionar.imagen";
import MostrarPdf from "./widget/mostrar.pdf";
import TituloPdf from "./widget/titulo.pdf";
import React from "react";
import Imagen from "../../model/interfaces/imagen.model.interface";
import { Alerta } from "./widget/alerta";
import { ListaCorteCsj } from "../../network/rest/index.network";
import CorteCsj from "../../model/interfaces/cortecsj";
import Response from "../../model/class/response.model.class";
import RestError from "../../model/class/resterror.model.class";
import { Types } from "../../model/enum/types.model";

const FormularioView = (props: RouteComponentProps<{}>) => {

    const [cargando, setCargando] = useState<boolean>(true);
    const [tipoSistema, setTipoSistema] = useState('');
    const [nombreSistema, setNombreSistema] = useState("");
    const [versionSistema, setVersionSistema] = useState("");
    const [usuarioNombre, setUsuarioNombre] = useState("");
    const [celularAxeso, setCelularAnexo] = useState("");
    const [sede, setSede] = useState("");
    const [cargo, setCargo] = useState("");
    const [personaReporte, setPersonaReporte] = useState("");
    const [celularPersona, setCelularPersona] = useState("");
    const [fecha, setFecha] = useState(currentDate());
    const [descripcion, setDescripcion] = useState("");
    const [preguntaUno, setPreguntaUno] = useState('');
    const [preguntaDos, setPreguntaDos] = useState('');
    const [preguntaTres, setPreguntaTres] = useState('');
    const [preguntaCuatro, setPreguntaCuatro] = useState('');
    const [preguntaCinco, setPreguntaCinco] = useState('');
    const [imagenes, setImagenes] = useState<Imagen[]>([]);
    const [corteCsj, setCorteCsj] = useState('');
    const [listaCorteCsj, setListaCorteCsj] = useState<CorteCsj[]>([]);

    const refTipoSistema = useRef<HTMLInputElement>(null);
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
    const refPreguntaUno = useRef<HTMLInputElement>(null);
    const refPreguntaDos = useRef<HTMLInputElement>(null);
    const refPreguntaTres = useRef<HTMLInputElement>(null);
    const refPreguntaCuatro = useRef<HTMLInputElement>(null);
    const refPreguntaCinco = useRef<HTMLInputElement>(null);
    const refDescripcionImagen = useRef<HTMLTextAreaElement>(null);

    const refCorteCsj = useRef<HTMLSelectElement>(null);

    const [selectedFiles, setSelectedFiles] = useState<Array<{ ref: React.RefObject<HTMLInputElement>, file: File, description: string }>>([]);

    const [isOpen, setIsOpen] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const abortControllerCorteCsj = useRef(new AbortController());

    useEffect(() => {
        handleAddElement();

        const CargarCortCsj = async () => {

            const response = await ListaCorteCsj<CorteCsj[]>(abortControllerCorteCsj.current);
            if (response instanceof Response) {
                setListaCorteCsj(response.data);
                setCargando(false);
            }

            if (response instanceof RestError) {
                if (response.getType() === Types.CANCELED) return;
            }
        }

        CargarCortCsj();
    }, []);

    const data: Formulario = {
        nombreSistema: nombreSistema != "" && refNombreSistema.current.selectedOptions[0]?.innerText,
        versionSistema: versionSistema,
        usuarioNombre: usuarioNombre,
        celularAxeso: celularAxeso,
        sede: sede,
        cargo: cargo,
        personaReporte: personaReporte,
        celularPersona: celularPersona,
        fecha: fecha,
        descripcion: descripcion,
        preguntaUno: preguntaUno,
        preguntaDos: preguntaDos,
        preguntaTres: preguntaTres,
        preguntaCuatro: preguntaCuatro,
        preguntaCinco: preguntaCinco,
        imagenes: imagenes,
        idCorteCsj: corteCsj,
    }

    const handleButtonClick = async () => {
        if (tipoSistema === "") {
            refTipoSistema.current.focus();
            Alerta("Seleccione el tipo de sistema.");
            return;
        }

        if (refNombreSistema.current && refNombreSistema.current.value.trim() === "") {
            refNombreSistema.current.focus();
            Alerta("Seleccione el nombre del sistema - " + tipoSistema.toUpperCase() + " .");
            return;
        }

        if (refVersionSistema.current && refVersionSistema.current.value.trim() === "") {
            refVersionSistema.current.focus();
            Alerta("Ingrese la versión del formulario.");
            return;
        }

        if (refUsuarioNombre.current && refUsuarioNombre.current.value.trim() === "") {
            refUsuarioNombre.current.focus();
            Alerta("Ingrese los datos del usuario.");
            return;
        }

        if (refCelularAxeso.current && refCelularAxeso.current.value.trim() === "") {
            refCelularAxeso.current.focus();
            Alerta("Ingrese el celular o anexo.");
            return;
        }

        if (refSede.current && refSede.current.value.trim() === "") {
            refSede.current.focus();
            Alerta("Ingrese la sede.");
            return;
        }

        if (refCargo.current && refCargo.current.value.trim() === "") {
            refCargo.current.focus();
            Alerta("Ingrese el cargo.");
            return;
        }

        if (refPersonaReporte.current && refPersonaReporte.current.value.trim() === "") {
            refPersonaReporte.current.focus();
            Alerta("Ingrese los datos del que reporta.");
            return;
        }

        if (refCelularPersona.current && refCelularPersona.current.value.trim() === "") {
            refCelularPersona.current.focus();
            Alerta("Ingrese el n° de celular de la persona que reporte.");
            return;
        }

        if (refFecha.current && refFecha.current.value.trim() === "") {
            refFecha.current.focus();
            Alerta("Ingrese la fecha.");
            return;
        }

        if (refCorteCsj.current && refCorteCsj.current.value.trim() === "") {
            refCorteCsj.current.focus();
            Alerta("Seleccione Corte CSJ.");
            return;
        }


        if (refDescripcion.current && refDescripcion.current.value.trim() === "") {
            refDescripcion.current.focus();
            Alerta("Ingrese la descripción del caso.");
            return;
        }

        if (preguntaUno === "") {
            refPreguntaUno.current.focus();
            Alerta("Seleccione el primer descarte.");
            return;
        }

        if (preguntaDos === "") {
            refPreguntaDos.current.focus();
            Alerta("Seleccione el segundo descarte.");
            return;
        }

        if (preguntaTres === "") {
            refPreguntaTres.current.focus();
            Alerta("Seleccione el tercer descarte.");
            return;
        }

        if (preguntaCuatro === "") {
            refPreguntaCuatro.current.focus();
            Alerta("Seleccione la cuarta descarte.");
            return;
        }

        if (preguntaCinco === "") {
            refPreguntaCinco.current.focus();
            Alerta("Seleccione la quinta descarte.");
            return;
        }

        if (selectedFiles.length == 0) {
            Alerta("Agrega las imagenes correspondientes.");
            return;
        }

        let countImage = 0;
        let countDescripcion = 0;
        for (const item of selectedFiles) {
            if (item.file == null) {
                countImage++;
            }

            if (item.description == "") {
                countDescripcion++;
            }
        }
        if (countImage > 0) {
            Alerta("Hay imgenes sin cargar.");
            return;
        }

        // if (refDescripcionImagen.current && refDescripcionImagen.current.value.trim() === "") {
        //     refDescripcionImagen.current.focus();
        //     Alerta("Ingrese la descipcion de la imagen.");
        //     return;
        // }

        if (countDescripcion > 0) {
            Alerta("Hay descripciones de las imagenes sin ingresar.");
            return;
        }

        let listaImagenes: Imagen[] = [];
        for (const item of selectedFiles) {

            const result = await imageBase64(item.file) as Base64;

            const imagen: Imagen = {
                base64String: result.base64String,
                extension: result.extension.toLowerCase(),
                descripcion: item.description
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

    const handleUploadFileInput = (index: number) => {
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

    const handleRemoveImage = (index: number) => {
        setSelectedFiles(prevSelectedFiles => {
            const updatedFiles = [...prevSelectedFiles];
            updatedFiles[index].file = null;
            return updatedFiles;
        });
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
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
                handleClose={handleClose}
                handlePrint={handlePrint}
            />

            <TituloPdf />

            {cargando && <div className="fixed z-[500] left-0 top-0 right-0 bottom-0">
                <div className="w-full h-full bg-white opacity-90 pointer-events-none"></div>
                <div className="w-full h-full absolute left-0 top-0 text-black flex justify-center items-center flex-col">
                    <img src={images.logo_poder_judicial} className="w-[10.5rem] mr-0 my-3" alt="Flowbite Logo" />
                    <div style={{ borderTopColor: "transparent" }} className="w-16 h-16 border-4 border-upla-100 border-solid rounded-full animate-spin"></div>
                    <h1 className="m-3 text-center">Cargando información...</h1>
                </div>
            </div>}

            <div className="mx-auto mt-4 max-w-3xl sm:mt-8 border-solid bg-gray-100 p-5 border-gray-300 border-2">
                <p className="mt-2 text-base leading-8 text-gray-600">
                    {" "}
                    INFORMACIÓN DEL SISTEMA:{" "}
                </p>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Tipo de Sistema <a className="text-red-500" >(*)</a>
                        </label>
                        <fieldset>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="radio-sij"
                                        name="tipo-sij-web"
                                        type="radio"
                                        ref={refTipoSistema}
                                        className="h-4 w-4 border-gray-300 text-red-900 focus:ring-red-900"
                                        value={"sij"}
                                        checked={tipoSistema === "sij"}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setTipoSistema(event.target.value)
                                        }} />
                                    <label htmlFor="radio-sij" className="block text-xs font-medium leading-6 text-gray-900">SIJ</label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="radio-web"
                                        name="tipo-sij-web"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-red-900 focus:ring-red-900"
                                        value={"web"}
                                        checked={tipoSistema === "web"}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setTipoSistema(event.target.value)
                                        }} />
                                    <label htmlFor="radio-web" className="block text-xs font-medium leading-6 text-gray-900">WEB</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Sistema
                        </label>
                        <div className="mt-0">
                            <select
                                ref={refNombreSistema}
                                value={nombreSistema}
                                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                    setNombreSistema(event.currentTarget.value);
                                }}
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                            >
                                {
                                    tipoSistema == "" ?
                                        <option value="">-- Seleccione --</option>
                                        :

                                        tipoSistema == "sij" ?
                                            lista.ListaSij.map((item, index) => (
                                                <option key={index} value={item.id}>{item.nombre}</option>
                                            ))
                                            :
                                            lista.ListaWeb.map((item, index) => (
                                                <option key={index} value={item.id}>{item.nombre}</option>
                                            ))
                                }
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
                                onKeyDown={keyNumberVersion}
                                placeholder="0.0.0"
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
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
                            Nombre y Apellidos / ID
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
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
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
                                onKeyDown={keyNumberPhone}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="mt-1">
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
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="mt-1">
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
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
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
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
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
                                onKeyDown={keyNumberPhone}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
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
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Corte CSJ
                        </label>
                        <div className="mt-0">
                            <select
                                ref={refCorteCsj}
                                value={corteCsj}
                                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                    setCorteCsj(event.currentTarget.value);
                                }}
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                            >
                                <option value="">-- Seleccione --</option>
                                {
                                    listaCorteCsj.map((item, index) => (
                                        <option key={index} value={item.id}>{item.nombre_corte}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>

                <br />

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">
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
                                className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                <br />
                <p className="mt-2 text-base leading-8 text-gray-600"> DESCARTES: </p>

                <div className="mt-2">
                    <fieldset>
                        <legend className="text-sm leading-6 text-gray-900">1. ¿El mismo incidente se reproduce en otro equipo?</legend>
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center gap-x-3">
                                <input
                                    id="radio-uno-si"
                                    name="descartes-uno"
                                    type="radio"
                                    ref={refPreguntaUno}
                                    className="h-4 w-4 border-gray-300 text-red-900 focus:ring-red-900"
                                    value={"si"}
                                    checked={preguntaUno === "si"}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setPreguntaUno(event.target.value)
                                    }} />
                                <label htmlFor="radio-uno-si" className="block text-xs font-medium leading-6 text-gray-900">Si</label>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <input
                                    id="radio-uno-no"
                                    name="descartes-uno"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-red-900 focus:ring-red-900"
                                    value={"no"}
                                    checked={preguntaUno === "no"}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setPreguntaUno(event.target.value)
                                    }} />
                                <label htmlFor="radio-uno-no" className="block text-xs font-medium leading-6 text-gray-900">No</label>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div className="mt-2">
                    <fieldset>
                        <legend className="text-sm leading-6 text-gray-900"> 2. ¿El mismo incidente se reproduce con otros usuarios?</legend>
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center gap-x-3">
                                <input
                                    id="radio-dos-si"
                                    name="descartes-dos"
                                    type="radio"
                                    ref={refPreguntaDos}
                                    className="h-4 w-4 border-gray-300 text-red-900 focus:ring-red-900"
                                    value={"si"}
                                    checked={preguntaDos === "si"}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setPreguntaDos(event.target.value)
                                    }} />
                                <label htmlFor="radio-dos-si" className="block text-xs font-medium leading-6 text-gray-900">Si</label>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <input
                                    id="radio-dos-no"
                                    name="descartes-dos"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-red-900 focus:ring-red-900"
                                    value={"no"}
                                    checked={preguntaDos === "no"}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setPreguntaDos(event.target.value)
                                    }} />
                                <label htmlFor="radio-dos-no" className="block text-xs font-medium leading-6 text-gray-900">No</label>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div className="mt-2">
                    <fieldset>
                        <legend className="text-sm leading-6 text-gray-900">3. ¿El incidente ocurre solo con un expediente?</legend>
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center gap-x-3">
                                <input
                                    id="radio-tres-si"
                                    name="descartes-tres"
                                    type="radio"
                                    ref={refPreguntaTres}
                                    className="h-4 w-4 border-gray-300 text-red-900 focus:ring-red-900"
                                    value={"si"}
                                    checked={preguntaTres === "si"}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setPreguntaTres(event.target.value)
                                    }} />
                                <label htmlFor="radio-tres-si" className="block text-xs font-medium leading-6 text-gray-900">Si</label>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <input
                                    id="radio-tres-no"
                                    name="descartes-tres"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-red-900 focus:ring-red-900"
                                    value={"no"}
                                    checked={preguntaTres === "no"}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setPreguntaTres(event.target.value)
                                    }} />
                                <label htmlFor="radio-tres-no" className="block text-xs font-medium leading-6 text-gray-900">No</label>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div className="mt-2">
                    <fieldset>
                        <legend className="text-sm leading-6 text-gray-900">4. ¿Lo reportado ha sido validado por implantación?</legend>
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center gap-x-3">
                                <input
                                    id="radio-cuatro-si"
                                    name="descartes-cuatro"
                                    type="radio"
                                    ref={refPreguntaCuatro}
                                    className="h-4 w-4 border-gray-300 text-red-900 focus:ring-red-900"
                                    value={"si"}
                                    checked={preguntaCuatro === "si"}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setPreguntaCuatro(event.target.value)
                                    }} />
                                <label htmlFor="radio-cuatro-si" className="block text-xs font-medium leading-6 text-gray-900">Si</label>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <input
                                    id="radio-cuatro-no"
                                    name="descartes-cuatro"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-red-900 focus:ring-red-900"
                                    value={"no"}
                                    checked={preguntaCuatro === "no"}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setPreguntaCuatro(event.target.value)
                                    }} />
                                <label htmlFor="radio-cuatro-no" className="block text-xs font-medium leading-6 text-gray-900">No</label>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div className="mt-2">
                    <fieldset>
                        <legend className="text-sm leading-6 text-gray-900">5. ¿Se está utilizando la última versión de la aplicación
                            desplegada en la corte?</legend>
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center gap-x-3">
                                <input
                                    id="radio-cinco-si"
                                    name="descartes-cinco"
                                    type="radio"
                                    ref={refPreguntaCinco}
                                    className="h-4 w-4 border-gray-300 text-red-900 focus:ring-red-900"
                                    value={"si"}
                                    checked={preguntaCinco === "si"}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setPreguntaCinco(event.target.value)
                                    }} />
                                <label htmlFor="radio-cinco-si" className="block text-xs font-medium leading-6 text-gray-900">Si</label>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <input
                                    id="radio-cinco-no"
                                    name="descartes-cinco"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-red-900 focus:ring-red-900"
                                    value={"no"}
                                    checked={preguntaCinco === "no"}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setPreguntaCinco(event.target.value)
                                    }} />
                                <label htmlFor="radio-cinco-no" className="block text-xs font-medium leading-6 text-gray-900">No</label>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <br />

                <legend className="mt-2 text-base leading-8 text-gray-600">
                    <span>FLUJO REALIZADO: </span>
                    <span>
                        <a className="text-red-700" >Consideraciones (*)</a>
                    </span>
                </legend>

                <div className="mt-2">
                    <fieldset>
                        <legend className="text-sm leading-6 text-gray-900"><span>- Adjuntar la caratula del expediente </span><span><a className="text-red-500" >(*)</a></span></legend>
                        <legend className="text-sm leading-6 text-gray-900"><span>- Las capturas de pantalla deben ser completas </span><span><a className="text-red-500" >(*)</a></span></legend>
                        <legend className="text-sm leading-6 text-gray-900"><span>- Debe visualizarse el usuario y version del SIJ </span><span><a className="text-red-500" >(*)</a></span></legend>
                        <legend className="text-sm leading-6 text-gray-900"><span>- El PBTRACE.log debe adjuntarse de forma obligatoria en el ticket: </span><span><a className="text-red-500" href="https://drive.google.com/drive/folders/1tb-IgfclBNx_7HDBwE_hSrMGkkr_5ABT?usp=sharing" target="_blank">Click ver Manual (*)</a></span></legend>

                    </fieldset>
                </div>

                <br />
                <br />
                {selectedFiles.map((selectedFile, index) => (
                    <div key={index} className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <div className="col-span-full">
                            <div className="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/50 px-4 py-10">
                                <button
                                    className="absolute  top-0 right-0 -mt-2 -mr-2 px-4 py-4 text-3xl underline rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900"
                                    onClick={() => handleRemoveElement(index)}
                                >
                                    <i className="bi bi-x-circle text-red-900"></i>
                                </button>
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
                                            className="relative block rounded-md bg-red-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900 mb-4"
                                            onClick={() => handleUploadFileInput(index)}
                                        >
                                            Cargar imagen
                                        </button>

                                        {selectedFile.file && (
                                            <div className="flex flex-col items-center">
                                                <div className="relative flex-shrink-0 mb-2">
                                                    <img
                                                        src={URL.createObjectURL(selectedFile.file)}
                                                        alt="Imagen seleccionada"
                                                        className="w-full h-auto sm:w-48 md:w-64 lg:w-80 rounded-md object-cover border-4 border-red-900"
                                                    />
                                                    <button
                                                        className="absolute top-0 right-0 -mt-2 -mr-2 px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                                                        onClick={() => handleRemoveImage(index)}
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
                                            ref={refDescripcionImagen}
                                            placeholder="Ingrese la descripción de su captura."
                                            className="block w-full rounded-md border-0 px-3.5 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                                            value={selectedFile.description}
                                            onChange={event => handleDescriptionChange(event, index)}>
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <br></br>
                <div className="justify-center flex">
                    <button
                        type="button"
                        className="block rounded-md bg-red-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900"
                        onClick={handleAddElement}
                    >Agregar Captura</button>
                </div>

                <br />

                <div className="mt-10">
                    <button
                        onClick={() => handleButtonClick()}
                        className="block w-full rounded-md bg-red-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900">
                        Generar PDF
                    </button>
                </div>
                <br />
                <br />

            </div>

            <Toaster />
        </div>
    );
};

export default FormularioView;
