import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/configureStore.store";
import { ActualizarFrecuenteRest, ObtenerFrecuentePorIdFrecuenteRest } from "../../../../../network/rest/index.network";
import { Types } from "../../../../../model/enum/types.model";
import RestError from "../../../../../model/class/resterror.model.class";
import Response from "../../../../../model/class/response.model.class";
import { logout } from "../../../../../store/authSlice.store";
import CustomModal from "../../../../../component/Modal.component";
import Frecuente from "../../../../../model/interfaces/soporte/frecuente.model.interfaces";
import Sweet from "../../../../../model/interfaces/Sweet.mode.interface";

type Props = {
    open: boolean,
    idFrecuente: string,
    setIdFrecuente: Dispatch<SetStateAction<string>>,
    sweet: Sweet,
    onEventPaginacion: () => void,
    abortControl: AbortController,
    onClose: () => void
}

const Editar = (props: Props) => {

    const dispatch = useDispatch();
    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)

    const [loading, setLoading] = useState(true);

    const [asunto, setAsunto] = useState<string>("");
    const [descripcion, setDescripcion] = useState<string>("");
    const [estado, setEstado] = useState<string>("");

    const [mensajeAsunto, setMensajeAsunto] = useState<string>("");
    const [mensajeDescripcion, setMensajeDescripcion] = useState<string>("");
    const [mensajeEstado, setMensajeEstado] = useState<string>("");

    const refAsunto = useRef<HTMLInputElement>(null);
    const refDescripcion = useRef<HTMLTextAreaElement>(null);
    const refEstado = useRef<HTMLSelectElement>(null);

    const onEventOpen = async () => {
        setLoading(true);
        const response = await ObtenerFrecuentePorIdFrecuenteRest<Frecuente>(props.idFrecuente);

        if (response instanceof Response) {
            setAsunto(response.data.asunto);
            setDescripcion(response.data.descripcion);
            setEstado(response.data.estado.toString());
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

            props.onClose();
        }
    }

    const onEventEditar = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (asunto.trim().length == 0) {
            setMensajeAsunto("Ingrese el asunto.");
            refAsunto.current?.focus();
            return;
        }

        if (descripcion.trim().length == 0) {
            setMensajeDescripcion("Ingrese la descripción.");
            refDescripcion.current?.focus();
            return;
        }

        if (estado.trim().length == 0) {
            setMensajeEstado("Seleccione el estado.");
            refEstado.current?.focus();
            return;
        }

        const params =
        {
            "id": 0,
            "idFrecuenta": props.idFrecuente,
            "asunto": asunto.trim(),
            "descripcion": descripcion.trim(),
            "estado": estado,
            "fecha": "",
            "hora": "",
            "c_cod_usuario": codigo
        }

        props.sweet.openDialog("P. Frecuente", "¿Esta seguro de continuar?", async (value) => {
            if (value) {
                props.onClose();
                props.sweet.openInformation("P. Frecuente", "Procesando información...")

                const response = await ActualizarFrecuenteRest<String>(params, props.abortControl);

                if (response instanceof Response) {
                    props.sweet.openSuccess("P. Frecuente", response.data as string, () => props.onEventPaginacion());
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

                    props.sweet.openWarning("P. Frecuente", response.getMessage());
                }
            }
        });
    }

    return (
        <CustomModal
            isOpen={props.open}
            onOpen={onEventOpen}
            onHidden={() => {
                setAsunto("");
                setDescripcion("")
                setEstado("")
                props.setIdFrecuente("")
            }}
            onClose={props.onClose}>
            <div className="relative flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 rounded-xl">

                {loading && <div className="absolute z-[500] left-0 top-0 right-0 bottom-0">
                    <div className=" w-full h-full bg-gray-900 opacity-80"></div>
                    <div className=" w-full h-full absolute left-0 top-0 text-white flex justify-center items-center flex-col">
                        <div style={{ "borderTopColor": "transparent" }}
                            className="w-16 h-16 border-4 border-upla-100 border-solid rounded-full animate-spin">
                        </div>
                        <h1 className='m-3 text-center'>Cargando datos...</h1>
                    </div>
                </div>}

                <form className="relative" onSubmit={onEventEditar}>
                    <h5 className="mb-0 font-bold text-lg">Actualizar pregunta frecuente</h5>
                    <p className="mb-0 leading-normal text-sm">Las consultas registradas se van usar como preguntas frecuentes.</p>
                    <p className="mb-0 leading-normal text-sm">Completa los campos requeridos para continuar.</p>

                    <div className="flex flex-wrap mt-4 -mx-3">
                        <div className="w-full max-w-full px-3 flex-0">
                            <label className="mb-2 ml-1 font-bold text-xs text-slate-700 ">Asunto</label>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Asunto de la consulta."
                                className=" text-sm block w-full appearance-none rounded-md border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                                ref={refAsunto}
                                value={asunto}
                                onChange={(changeevent: React.ChangeEvent<HTMLInputElement>) => {
                                    if (changeevent.target.value.trim().length == 0) {
                                        setMensajeAsunto("Ingrese el asunto.");
                                    } else {
                                        setMensajeAsunto("");
                                    }
                                    setAsunto(changeevent.target.value);
                                }} />
                            <span className="text-red-600 text-xs">{mensajeAsunto}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap mt-4 -mx-3">
                        <div className="w-full max-w-full px-3 flex-0">
                            <label className="mb-2 ml-1 font-bold text-xs text-slate-700 ">Descripción</label>
                            <textarea
                                placeholder="Descripción de la consulta."
                                className="focus:shadow-soft-primary-outline  text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                                ref={refDescripcion}
                                value={descripcion}
                                onChange={(changeevent: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    if (changeevent.target.value.trim().length == 0) {
                                        setMensajeDescripcion("Ingrese la descripción.");
                                    } else {
                                        setMensajeDescripcion("");
                                    }
                                    setDescripcion(changeevent.target.value);
                                }}
                            ></textarea>
                            <span className="text-red-600 text-xs">{mensajeDescripcion}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap mt-4 -mx-3">
                        <div className="w-full max-w-full px-3 flex-0">
                            <label className="mb-2 ml-1 font-bold text-xs text-slate-700 ">Estado</label>
                            <select
                                className="focus:shadow-soft-primary-outline  text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                                ref={refEstado}
                                value={estado}
                                onChange={(changeevent: React.ChangeEvent<HTMLSelectElement>) => {
                                    if (changeevent.target.value.trim().length == 0) {
                                        setMensajeEstado("Seleccione el estado.");
                                    } else {
                                        setMensajeEstado("");
                                    }
                                    setEstado(changeevent.target.value);
                                }}
                            >
                                <option value="">- Seleccione -</option>
                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>
                            </select>
                            <span className="text-red-600 text-xs">{mensajeEstado}</span>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-start gap-x-3 gap-y-4 flex-col sm:flex-row">
                        <button
                            type="submit"
                            aria-controls="address"
                            next-form-btn=""
                            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 rounded-md text-sm px-4 py-2"
                        >
                            <span className="mr-2">Editar</span>
                            <i className="bi bi-box-arrow-right"></i>
                        </button>
                        <button
                            type="button"
                            aria-controls="address"
                            next-form-btn=""
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300  rounded-md text-sm px-4 py-2"
                            onClick={props.onClose}>
                            <span className="mr-2">Cancelar</span>
                            <i className="bi bi-x-circle"></i>
                        </button>

                    </div>

                </form>
            </div>
        </CustomModal>
    );
}

export default Editar;