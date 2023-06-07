import { useEffect, useRef, useState } from "react";
import { RouteComponentProps, useLocation } from "react-router-dom";
import { LoaderSvg } from "../../../../component/Svg.component";
import Response from "../../../../model/class/response.model.class";
import RestError from "../../../../model/class/resterror.model.class";
import { Types } from "../../../../model/enum/types.model";
import Paginacion from "../../../../component/Paginacion.component";
import { EnviarNotifacionCelular, ListarRespuestasPorIdConsultaRest, ObtenerConsultaPorIdConsultaRest, RegistrarRespuestaRest } from "../../../../network/rest/index.network";
import Responde from "../../../../model/interfaces/soporte/responde.model.interface";
import Respuesta from "../../../../model/interfaces/soporte/respuesta.model.interface";
import { formatTime } from "../../../../helper/herramienta.helper";
import { images } from "../../../../helper/index.helper";
import CustomModal from "../../../../component/Modal.component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configureStore.store";
import { logout } from "../../../../store/authSlice.store";
import useSweetAlert from "../../../../component/hooks/useSweetAlert";
import Consulta from "../../../../model/interfaces/soporte/consulta.mode.interfaces";

const Responder = (props: RouteComponentProps<{}>) => {

    const dispatch = useDispatch();
    const sweet = useSweetAlert();

    const location = useLocation<{ idConsulta: string }>();

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)

    const [loadingConsulta, setLoadingConsulta] = useState<boolean>(true);
    const [consulta, setConsulta] = useState<Consulta>();

    const opcion = useRef<number>(0);
    const paginacion = useRef<number>(0);
    const restart = useRef<boolean>(false);
    const totalPaginacion = useRef<number>(0);
    const filasPorPagina = useRef<number>(10);
    const [loadingRespuesta, setLoadingRespuesta] = useState<boolean>(false);
    const [respuestas, setRespuestas] = useState<Respuesta[]>([]);

    const refRespuesta = useRef<HTMLTextAreaElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [respuesta, setRespuesta] = useState<string>("");
    const [mensaje, setMensaje] = useState<string>("");

    const abortControllerCabecera = useRef(new AbortController());
    const abortControllerDetalle = useRef(new AbortController());

    const loadCabecera = async () => {
        const response = await ObtenerConsultaPorIdConsultaRest<Consulta>(location.state.idConsulta, abortControllerCabecera.current);

        if (response instanceof Response) {
            setConsulta(response.data);
            setLoadingConsulta(false);
        }

        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;

        }
    }

    const loadDetalle = async () => {
        if (loadingRespuesta) return;

        paginacion.current = 1;
        restart.current = true;
        fillTable(location.state.idConsulta);
        opcion.current = 0;
    }


    const paginacionTable = (listid: number) => {
        paginacion.current = listid;
        restart.current = false;
        onEventPaginacion();
    }

    const onEventPaginacion = () => {
        switch (opcion.current) {
            case 0:
                fillTable(location.state.idConsulta);
                break;

            default: fillTable(location.state.idConsulta);
        }
    }

    const fillTable = async (idConsulta: string) => {
        setLoadingRespuesta(true);
        setRespuestas([]);

        const data = {
            "idConsulta": idConsulta,
            "posPagina": ((paginacion.current - 1) * filasPorPagina.current),
            "filaPagina": filasPorPagina.current
        }

        const response = await ListarRespuestasPorIdConsultaRest<Responde>(data, abortControllerDetalle.current);

        if (response instanceof Response) {
            totalPaginacion.current = Math.ceil(response.data.total / filasPorPagina.current);
            setRespuestas(response.data.resultado as Respuesta[])
            setLoadingRespuesta(false);
        }

        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;

            if (response.getStatus() == 401) {
                dispatch(logout());
                return;
            }

            if (response.getStatus() == 403) {
                dispatch(logout());
                return;
            }

            setRespuestas([]);
            setLoadingRespuesta(false);
        }
    }

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const onEventRegistrar = () => {
        if (respuesta.trim().length == 0) {
            setMensaje("!El campo es oblogatorio¡");
            refRespuesta.current?.focus();
            return;
        }

        const params = {
            "id": 0,
            "idRespuesta": 0,
            "idConsulta": location.state.idConsulta,
            "c_cod_usuario": codigo,
            "detalle": respuesta.trim(),
            "fecha": "",
            "hora": ""
        }

        sweet.openDialog("Respuesta", "¿Esta seguro de continuar?", async (value) => {
            if (value) {

                setIsOpen(false);
                sweet.openInformation("Respuesta", "Procesando información...")

                const response = await RegistrarRespuestaRest(params);

                if (response instanceof Response) {

                    sweet.openSuccess("Respuesta", response.data as string, () => {
                        loadDetalle();
                    });
                    EnviarNotifacionCelular(location.state.idConsulta);
                }

                if (response instanceof RestError) {
                    if (response.getType() === Types.CANCELED) return;

                    sweet.openWarning("Repuesta", response.getMessage());
                }
            }
        });
    }


    useEffect(() => {
        loadCabecera();
        loadDetalle();

        return () => {
            abortControllerCabecera.current.abort();
            abortControllerDetalle.current.abort();

            if (sweet.alert !== undefined && sweet.alert.isVisible()) {
                sweet.alert.closePopup()
            }
        }
    }, []);

    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className=" relative flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                    {loadingConsulta && <div className="absolute z-[500] left-0 top-0 right-0 bottom-0">
                        <div className=" w-full h-full bg-gray-900 opacity-80"></div>
                        <div className=" w-full h-full absolute left-0 top-0 text-white flex justify-center items-center flex-col">
                            <img src={images.logo} className="w-[10.5rem] mr-0 my-3" alt="Flowbite Logo" />
                            <div style={{ "borderTopColor": "transparent" }}
                                className="w-16 h-16 border-4 border-upla-100 border-solid rounded-full animate-spin">
                            </div>
                            <h1 className='m-3 text-center'>Cargando información...</h1>
                        </div>
                    </div>}

                    <CustomModal
                        isOpen={isOpen}
                        onOpen={() => {

                        }}
                        onHidden={() => {
                            setRespuesta("");
                        }}
                        onClose={handleClose}>
                        <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border">
                            <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-3 pb-0">
                                <h6 className="mb-1 dark:text-white">Registrar</h6>
                                <p className="mb-0 leading-normal text-sm dark:text-white/60">Ingrese su respuesta de maneda adecuada y entendible.</p>
                            </div>
                            <div className="flex-auto p-3">
                                <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">Ingrese su respuesta.</label>
                                <div className="mb-4">
                                    <textarea
                                        autoFocus
                                        className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 block w-full appearance-none rounded-md border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                                        placeholder="Ingrese su respuesta"
                                        ref={refRespuesta}
                                        value={respuesta}
                                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                                            if (event.currentTarget.value.length == 0) {
                                                setMensaje("!El campo es oblogatorio¡");
                                            } else {
                                                setMensaje("");
                                            }
                                            setRespuesta(event.currentTarget.value);
                                        }}>
                                    </textarea>
                                    <span className="text-red-600 text-xs">{mensaje}</span>
                                </div>
                                <div className="flex items-center justify-start gap-x-3 gap-y-4 flex-col sm:flex-row">
                                    <button
                                        type="button"
                                        className="focus:outline-none text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300  rounded-md text-sm px-4 py-2"
                                        onClick={onEventRegistrar}>
                                        <span className="mr-2">Registrar</span>
                                        <i className="bi bi-save2-fill"></i>
                                    </button>
                                    <button
                                        type="button"
                                        aria-controls="address"
                                        next-form-btn=""
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300  rounded-md text-sm px-4 py-2"
                                        onClick={handleClose}>
                                        <span className="mr-2">Cancelar</span>
                                        <i className="bi bi-x-circle-fill"></i>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </CustomModal>

                    <div className="flex items-start justify-between flex-col lg:flex-row">
                        <div>
                            <h5 className="mb-0 font-bold text-lg">Registrar respuesta</h5>
                            <p className="">Se va listar todas las respuestas de la consulta realizada.</p>
                        </div>

                        <div className="my-3 flex items-center justify-start gap-x-3 gap-y-4 flex-col sm:flex-row">
                            <button
                                type="button"
                                aria-controls="address"
                                next-form-btn=""
                                className="focus:outline-none  bg-white border hover:bg-gray-500 hover:text-white focus:ring-4 focus:ring-gray-300 rounded-md text-sm px-4 py-2"
                                onClick={() => props.history.goBack()}>
                                <span className="mr-2">Regresar</span>
                                <i className="bi bi-arrow-left-circle"></i>
                            </button>
                            <button
                                type="button"
                                aria-controls="address"
                                next-form-btn=""
                                className="focus:outline-none  bg-white border hover:bg-gray-500 hover:text-white focus:ring-4 focus:ring-gray-300 rounded-md text-sm px-4 py-2"
                                onClick={() => {
                                    setLoadingConsulta(true);
                                    loadCabecera();
                                    loadDetalle();
                                }}>
                                <span className="mr-2">Recargar</span>
                                <i className="bi bi-arrow-clockwise"></i>
                            </button>
                            <button
                                type="button"
                                aria-controls="recargar"
                                next-form-btn=""
                                className="focus:outline-none  text-white  bg-upla-100  hover:bg-upla-200 hover:text-white focus:ring-4 focus:ring-upla-50 rounded-md text-sm px-4 py-2"
                                onClick={handleOpen}
                            >
                                <span className="mr-2">Responder</span>
                                <i className="bi bi-lightbulb"></i>
                            </button>
                        </div>
                    </div>

                    <div className="flex-auto gap-y-4">

                        <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                            <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal border-0 rounded-t-lg text-sm text-inherit">
                                <strong className="text-slate-700 dark:text-white">Ticket:</strong> &nbsp; N° - {consulta?.ticket}
                            </li>
                            <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal border-0 rounded-t-lg text-sm text-inherit">
                                <strong className="text-slate-700 dark:text-white">Tipo:</strong> &nbsp; {consulta?.tipoConsultaDetalle}
                            </li>
                            <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal border-0 rounded-t-lg text-sm text-inherit">
                                <strong className="text-slate-700 dark:text-white">Estado:</strong> &nbsp; {consulta?.estado_descripcion}
                            </li>
                            <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal border-0 rounded-t-lg text-sm text-inherit">
                                <strong className="text-slate-700 dark:text-white">Asunto:</strong> &nbsp; {consulta?.asunto}
                            </li>
                            <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal border-0 rounded-t-lg text-sm text-inherit">
                                <strong className="text-slate-700 dark:text-white">Descripción:</strong> &nbsp; {consulta?.descripcion}
                            </li>
                        </ul>
                    </div>

                    <div className="relative overflow-auto rounded-md my-6">
                        <table className="w-full text-gray-700 bg-upla-100 border">
                            <thead className="align-bottom">
                                <tr>
                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs w-[5%]">#</th>
                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs w-[25%]">Fecha y Hora</th>
                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs w-[70%]">Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loadingRespuesta ?
                                        <tr className="text-center bg-white border-b">
                                            <td colSpan={3} className="text-sm p-2 border-b border-solid">
                                                <div className="flex items-center justify-center">
                                                    <LoaderSvg /> <span>Cargando datos...</span>
                                                </div>
                                            </td>
                                        </tr>
                                        :
                                        respuestas.length == 0 ?
                                            (<tr className="text-center bg-white border-b">
                                                <td colSpan={3} className="text-sm p-2  border-b border-solid">No hay datos para mostrar.</td>
                                            </tr>)
                                            :
                                            respuestas.map((item, index) => {

                                                return (
                                                    <tr key={index} className="bg-white border-b">
                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid whitespace-nowrap">{item.id}</td>
                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid whitespace-nowrap">{item.fecha} <br />{formatTime(item.hora)}</td>
                                                        <td className="text-sm p-2 text-left align-middle border-b border-solid whitespace-nowrap">{item.detalle}</td>
                                                    </tr>
                                                );
                                            })
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between flex-col md:flex-row gap-y-4">
                        <div>
                            <span className="text-sm font-normal text-gray-900 ">Mostrando <span className="font-semibold text-gray-900">{paginacion.current}-{totalPaginacion.current}</span> de <span className="font-semibold text-gray-900">{filasPorPagina.current} </span>filas </span>
                        </div>
                        <nav className="bg-white rounded-md">
                            <ul className="flex">
                                <Paginacion
                                    loading={loadingRespuesta}
                                    restart={restart.current}
                                    paginacion={paginacion.current}
                                    totalPaginacion={totalPaginacion.current}
                                    fillTable={paginacionTable}
                                />
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Responder;