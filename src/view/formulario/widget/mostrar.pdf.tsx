import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CustomModal from "../../../component/Modal.component";
import Formulario from "../../../model/interfaces/formulario.model-interface";
import { ObtenerPdf } from "../../../network/rest/index.network";
import RestError from "../../../model/class/resterror.model.class";
import Response from "../../../model/class/response.model.class";
import { images } from "../../../helper/index.helper";

type Props = {
    isOpen: boolean,
    data: Formulario,
    iframeRef: React.RefObject<HTMLIFrameElement>,
    zoomLevel: number,
    setZoomLevel: Dispatch<SetStateAction<number>>,
    handleClose: () => void,
    handleZoomIn: () => void,
    handleZoomOut: () => void,
    handlePrint: () => void,
}

const MostrarPdf = (props: Props) => {

    const [cargando, setCargando] = useState(true)
    const [mensaje, setMensaje] = useState("Generando PDF...");

    return (
        <CustomModal
            isOpen={props.isOpen}
            onOpen={async () => {
                setCargando(true)
                setMensaje("Generando PDF...")
                const data: Formulario = {
                    nombreSistema: props.data.nombreSistema,
                    versionSistema: props.data.versionSistema,
                    usuarioNombre: props.data.usuarioNombre,
                    celularAxeso: props.data.celularAxeso,
                    sede: props.data.sede,
                    cargo: props.data.cargo,
                    personaReporte: props.data.personaReporte,
                    celularPersona: props.data.celularPersona,
                    fecha: props.data.fecha,
                    descripcion: props.data.descripcion,
                    imagenes: props.data.imagenes,
                    preguntaUno: props.data.preguntaUno,
                    preguntaDos: props.data.preguntaDos,
                    preguntaTres: props.data.preguntaTres,
                    preguntaCuatro: props.data.preguntaCuatro,
                    preguntaCinco: props.data.preguntaCinco,
                    idCorteCsj: props.data.idCorteCsj,
                };

                const response = await ObtenerPdf<Blob>(data);

                if (response instanceof Response) {
                    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
                    const pdfUrl = URL.createObjectURL(pdfBlob);
                    if (props.iframeRef.current) {
                        props.iframeRef.current.src = pdfUrl;
                    }
                    setCargando(false);
                }

                if (response instanceof RestError) {
                    setCargando(false);
                    setMensaje(response.getMessage());
                }
            }}
            onHidden={() => {
                setCargando(false)
            }}
        >
            {/* <button
                    className="absolute top-2 right-2 p-2 z-[100] rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800"
                    onClick={props.handleClose}
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
                </button> */}
            <div className="flex items-center justify-center w-full h-full">
                <div className="w-full p-10">
                    <div className="relative z-10">
                        <div className="flex justify-center items-center flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                            <button
                                className="block w-full sm:w-auto rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={props.handleZoomIn}
                            >
                                Acercar <i className="bi bi-zoom-in"></i>
                            </button>
                            <button
                                className="block w-full sm:w-auto rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={props.handleZoomOut}
                            >
                                Alejar <i className="bi bi-zoom-out"></i>
                            </button>
                            <button
                                className="block w-full sm:w-auto rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={props.handlePrint}
                            >
                                Imprimir <i className="bi bi-printer"></i>
                            </button>
                            <button
                                className="block w-full sm:w-auto rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                onClick={props.handleClose}
                            >
                                Cerrar <i className="bi bi-x-circle"></i>
                            </button>
                        </div>
                        <br />
                        <div className="flex justify-center mb-4">
                            <p className="mr-2">Zoom: {props.zoomLevel.toFixed(0)}%</p>
                            <input
                                type="range"
                                min={10}
                                max={200}
                                value={props.zoomLevel}
                                onChange={(e) => props.setZoomLevel(Number(e.target.value))}
                                className="w-48"
                            />
                        </div>
                        <div className="relative w-full overflow-auto border-2 border-indigo-500">
                            {
                                cargando &&
                                    <div className="obsolute z-[500] left-0 top-0 right-0 bottom-0">
                                        <div className="w-full h-full bg-black opacity-90 pointer-events-none"></div>
                                        <div className="w-full h-full absolute left-0 top-0  flex justify-center items-center flex-col">
                                            <img src={images.logo_poder_judicial} className="w-[10.5rem] mr-0 my-3" alt="Flowbite Logo" />
                                            <div style={{ borderTopColor: "transparent" }} className="w-16 h-16 border-4 border-upla-100 border-solid rounded-full animate-spin"></div>
                                            <h1 className="m-3 text-center text-gray-500 ">{mensaje}</h1>
                                        </div>
                                    </div>}
                            <iframe
                                ref={props.iframeRef}
                                title="PDF Viewer"
                                width="100%"
                                height="600"
                                style={{ transform: `scale(${props.zoomLevel / 100})` }}
                            />

                        </div>

                    </div>
                </div>
            </div>
        </CustomModal>
    );
}

export default MostrarPdf;