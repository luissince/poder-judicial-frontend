import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CustomModal from "../../../component/Modal.component";
import Formulario from "../../../model/interfaces/formulario.model-interface";
import { ObtenerPdf } from "../../../network/rest/index.network";
import RestError from "../../../model/class/resterror.model.class";
import Response from "../../../model/class/response.model.class";
import { images } from "../../../helper/index.helper";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";


type Props = {
    isOpen: boolean,
    data: Formulario,
    iframeRef: React.RefObject<HTMLIFrameElement>,
    handleClose: () => void,
    handlePrint: () => void,
}

const MostrarPdf = (props: Props) => {

    const [cargando, setCargando] = useState(true)
    const [mensaje, setMensaje] = useState("Generando PDF...");
    const [docs, setDocs] = useState([]);

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
                    let pdfBlob = new Blob([response.data], { type: "application/pdf" });

                    const pdfUrl = URL.createObjectURL(pdfBlob);
                    const url = [
                        {
                            uri: pdfUrl,
                            fileName: props.data.nombreSistema+'.pdf', 
                        }
                    ]
                    setDocs(url);
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
            <div className="flex items-center justify-center w-full h-full">
                <div className="w-full p-10">
                    <div className="relative z-10">
                        <div className="flex justify-center items-center flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                            
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
                        <div className="relative w-full overflow-auto border-2 border-indigo-500">
                            {
                                cargando ?
                                    <div className="obsolute z-[500] left-0 top-0 right-0 bottom-0">
                                        <div className="w-full h-full bg-black opacity-90 pointer-events-none"></div>
                                        <div className="w-full h-full absolute left-0 top-0  flex justify-center items-center flex-col">
                                            <img src={images.logo_poder_judicial} className="w-[10.5rem] mr-0 my-3" alt="Flowbite Logo" />
                                            <div style={{ borderTopColor: "transparent" }} className="w-16 h-16 border-4 border-upla-100 border-solid rounded-full animate-spin"></div>
                                            <h1 className="m-3 text-center text-gray-500 ">{mensaje}</h1>
                                        </div>
                                    </div>
                                    :
                                    <DocViewer
                                        documents={docs}
                                        initialActiveDocument={docs[1]}
                                        pluginRenderers={DocViewerRenderers}
                                    />
                            }

                            {/* <iframe
                                ref={props.iframeRef}
                                title="PDF Viewer"
                                width="100%"
                                height="600"
                                style={{ transform: `scale(${props.zoomLevel / 100})` }}
                            /> */}




                        </div>

                    </div>
                </div>
            </div>
        </CustomModal>
    );
}

export default MostrarPdf;