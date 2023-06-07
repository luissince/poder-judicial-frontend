import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { SoporteListarFrecuenteRest } from "../../../../network/rest/index.network";
import { Types } from "../../../../model/enum/types.model";
import RestError from "../../../../model/class/resterror.model.class";
import Response from "../../../../model/class/response.model.class";
import { logout } from "../../../../store/authSlice.store";
import Frecuente from "../../../../model/interfaces/soporte/frecuente.model.interfaces";
import { LoaderSvg } from "../../../../component/Svg.component";
import Responde from "../../../../model/interfaces/soporte/responde.model.interface";
import Paginacion from "../../../../component/Paginacion.component";
import { formatTime } from "../../../../helper/herramienta.helper";
import Agregar from "./widget/Agregar";
import Editar from "./widget/Editar";
import useSweetAlert from "../../../../component/hooks/useSweetAlert";

const PFrecuente = (props: RouteComponentProps<{}>) => {

    /**
     * Funcion de redux encargado de realizar la acciones de los reducer
     */
    const dispatch = useDispatch();
    const sweet = useSweetAlert();

    /**
     * Variables encargadas del manejo del listado de las 
     * preguntas frecuentes. 
     */
    const opcion = useRef<number>(0);
    const paginacion = useRef<number>(0);
    const restart = useRef<boolean>(false);
    const totalPaginacion = useRef<number>(0);
    const filasPorPagina = useRef<number>(10);
    const [buscar, setBuscar] = useState<string>("");
    const [frecuentes, setFrecuentes] = useState<Frecuente[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Funciones encargada de anular las peticiones http/https
     */
    const abortControllerTable = useRef(new AbortController());
    const abortControllerCrear = useRef(new AbortController());

    /**
     * Modal encargado de registrar la pregunta frecuente
     */
    const [isOpenAgregar, setIsOpenAgregar] = useState(false);

    /**
     * Modal encargado de actualizar el pregunta frecuente 
     */
    const [isOpenEditar, setIsOpenEditar] = useState(false);
    const [idFrecuente, setIdFrecuente] = useState<string>("");

    /**
     * Funcion que inicia la carga de datos
     */
    const loadInit = async () => {
        if (loading) return;

        paginacion.current = 1;
        restart.current = true;
        fillTable("");
        opcion.current = 0;
    }

    /**
     * 
     */
    const onEvenBuscar = async (value: string) => {
        if (loading) return;

        if (value.trim().length === 0) return;

        paginacion.current = 1;
        restart.current = false;
        fillTable(value.trim());
        opcion.current = 1;
    }

    /**
    * 
    */
    const paginacionTable = (listid: number) => {
        paginacion.current = listid;
        restart.current = false;
        onEventPaginacion();
    }

    /**
    * 
    */
    const onEventPaginacion = () => {
        switch (opcion.current) {
            case 0:
                fillTable("");
                break;
            case 1:
                fillTable(buscar);
                break;

            default: fillTable("");
        }
    }

    /**
    * 
    */
    const fillTable = async (buscar: string) => {
        setLoading(true);
        setFrecuentes([]);

        const data = {
            "buscar": buscar,
            "posPagina": ((paginacion.current - 1) * filasPorPagina.current),
            "filaPagina": filasPorPagina.current
        }

        const response = await SoporteListarFrecuenteRest<Responde>(data, abortControllerTable.current);

        if (response instanceof Response) {
            totalPaginacion.current = Math.ceil(response.data.total / filasPorPagina.current);
            setFrecuentes(response.data.resultado as Frecuente[])
            setLoading(false);
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

            setFrecuentes([]);
            setLoading(false);
        }
    }

    /**
    * 
    */
    useEffect(() => {
        loadInit();

        return () => {
            abortControllerTable.current.abort();
            abortControllerCrear.current.abort();

            if (sweet.alert !== undefined && sweet.alert.isVisible()) {
                sweet.alert.closePopup()
            }
        }
    }, []);

    /**
     * Funcion encargada de mostrar el modal agregar
     */
    const handleOpenAgregar = () => {
        setIsOpenAgregar(true);
    };

    /**
     * Funcion encargada de cerrar el modal agregar
     */
    const handleCloseAgregar = () => {
        setIsOpenAgregar(false);
    };

    /**
     * Funcion encargada de mostrar el modal editar
     */
    const handleOpenEditar = () => {
        setIsOpenEditar(true);
    };

    /**
     * Funcion encargada de cerrar el modal editar
     */
    const handleCloseEditar = () => {
        setIsOpenEditar(false);
    };


    /**
    * 
    */
    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className=" relative flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                    <Agregar
                        open={isOpenAgregar}
                        sweet={sweet}
                        loadInit={loadInit}
                        abortControl={abortControllerCrear.current}
                        onClose={handleCloseAgregar} />

                    <Editar
                        open={isOpenEditar}
                        idFrecuente={idFrecuente}
                        setIdFrecuente={setIdFrecuente}
                        sweet={sweet}
                        onEventPaginacion={onEventPaginacion}
                        abortControl={abortControllerCrear.current}
                        onClose={handleCloseEditar} />

                    <div className="flex items-start justify-between flex-col lg:flex-row">
                        <div>
                            <h5 className="mb-0 font-bold text-lg">Registrar pregunta frecuente</h5>
                            <p className="">Se va listar todas las preguntas prefuentes.</p>
                        </div>

                        <div className="my-3 flex items-center justify-start gap-x-3 gap-y-4 flex-col sm:flex-row">
                            <button
                                type="button"
                                aria-controls="address"
                                next-form-btn=""
                                className="focus:outline-none  bg-white border hover:bg-gray-500 hover:text-white focus:ring-4 focus:ring-gray-300 rounded-md text-sm px-4 py-2"
                                onClick={() => {
                                    loadInit()
                                }}>
                                <span className="mr-2">Recargar</span>
                                <i className="bi bi-arrow-clockwise"></i>
                            </button>
                            <button
                                type="button"
                                aria-controls="recargar"
                                next-form-btn=""
                                className="focus:outline-none  text-white  bg-upla-100  hover:bg-upla-200 hover:text-white focus:ring-4 focus:ring-upla-50 rounded-md text-sm px-4 py-2"
                                onClick={handleOpenAgregar}
                            >
                                <span className="mr-2">Agregar</span>
                                <i className="bi bi-plus"></i>
                            </button>
                        </div>
                    </div>

                    <div className="flex-auto">
                        <div>
                            <label className="inline-block mb-2 ml-1 text-sm text-slate-700">Buscar:</label>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Ingrese los datos para filtrar..."
                                className="text-sm block w-full appearance-none rounded-md border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:outline-none"
                                value={buscar}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setBuscar(event.currentTarget.value);
                                    onEvenBuscar(event.currentTarget.value);
                                }}
                            />
                        </div>

                        <div className="relative overflow-auto rounded-md my-6">
                            <table className="w-full text-gray-700 bg-upla-100 border">
                                <thead className="align-bottom">
                                    <tr>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs w-[5%]">#</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs w-[20%]">Fecha y Hora</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs w-[25%]">Asunto</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs w-[35%]">Descripción</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs w-[10%]">Estado</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs w-[5%]">Editar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loading ?
                                            <tr className="text-center bg-white border-b">
                                                <td colSpan={6} className="text-sm p-2 border-b border-solid">
                                                    <div className="flex items-center justify-center">
                                                        <LoaderSvg /> <span>Cargando datos...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            :
                                            frecuentes.length == 0 ?
                                                <tr className="text-center bg-white border-b">
                                                    <td colSpan={6} className="text-sm p-2  border-b border-solid">No hay datos para mostrar.</td>
                                                </tr>
                                                :
                                                frecuentes.map((item, index) => {

                                                    const estado = item.estado === 1 ?
                                                        <span className="bg-green-300 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">ACTIVO</span>
                                                        : <span className="bg-red-300 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">INACTIVO</span>;


                                                    return (
                                                        <tr key={index} className="bg-white border-b">
                                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.id}</td>
                                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.fecha} <br />{formatTime(item.hora)}</td>
                                                            <td className="text-sm p-2 text-left align-middle border-b border-solid">{item.asunto}</td>
                                                            <td className="text-sm p-2 text-left align-middle border-b border-solid">{item.descripcion}</td>
                                                            <td className="text-sm p-2 text-left align-middle border-b border-solid">{estado}</td>
                                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                <button
                                                                    className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 rounded-md text-sm px-4 py-2"
                                                                    onClick={() => {
                                                                        setIdFrecuente(item.idFrecuenta);
                                                                        handleOpenEditar();
                                                                    }}>
                                                                    <i className="bi bi-chat-left-text-fill text-sm"></i>
                                                                </button>
                                                            </td>
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
                                        loading={loading}
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
        </div>
    );
}

export default PFrecuente;