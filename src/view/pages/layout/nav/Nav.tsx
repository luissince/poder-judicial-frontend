import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/authSlice.store";
import useEventSource from "../../../../component/hooks/useEventSource";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { sound } from "../../../../helper/index.helper";
import { RootState } from "../../../../store/configureStore.store";
import { addNotification, removeNotification } from "../../../../store/notifeSlice.store";
import { Notificacion } from "../../../../model/types/notificacion.model";
import { v4 as uuidv4 } from 'uuid';

type Props = {
    refBlock: React.RefObject<HTMLInputElement>,
    onEventMenu: React.MouseEventHandler,
}

const uniqueId = uuidv4();

const Nav = (props: Props) => {

    const dispatch = useDispatch();

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)

    const noticaciones = useSelector((state: RootState) => state.notificacion);

    const message: Notificacion | undefined = useEventSource(`${import.meta.env.VITE_URL_SERVER_SEND_EVENT}notify?id=${uniqueId}&codigo=${codigo}`)

    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const loadNotify = async () => {
            if (message != undefined && Object.keys(message).length !== 0) {

                dispatch(addNotification(message));

                toast((t) => (
                    <div className="flex gap-x-4">

                        <div className="flex items-center">
                            <div className="flex-shrink-0 pt-0.5">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                    alt=""
                                />
                            </div>

                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {message.titulo}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    {message.mensaje}
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

                const audio = new Audio(sound.mixkit);
                if (audio !== undefined) {
                    const promise = audio.play();
                    if (promise !== undefined) {
                        promise.then(_ => {
                        }).catch(error => {

                        });
                    }
                }
            }
        }

        loadNotify();
    }, [message]);

    return (
        <nav
            className="drop-shadow bg-upla-100 flex left-0 fixed w-full border-gray-200 z-20 h-[50px]">
            <div
                ref={props.refBlock}
                className="w-0 md:w-64 bg-gray-50 transition-all duration-500">
            </div>
            <button
                onClick={props.onEventMenu}
                className="flex items-center justify-center px-4 text-white hover:bg-white hover:text-upla-100">
                <i className="bi bi-justify text-2xl"></i>
            </button>
            <ul className="flex items-center flex-1 justify-end pr-3">
                <li className="flex justify-center h-full relative">
                    <button className="px-4 text-white hover:bg-white hover:text-upla-100 relative"
                        onClick={() => setOpen(!open)}>
                        <i className="bi bi-bell text-xl"></i>
                        <span className="absolute right-[5px] top-[2px] bg-yellow-300 text-yellow-800 text-xs font-medium px-1.5 py-0.5 rounded text-center">{noticaciones.notifications.length}</span>
                    </button>
                    <ul className={`${open ? "block" : "hidden"}  absolute h-fit translate-x-[-270px] translate-y-[53px] inset-0  w-80 bg-white rounded-sm drop-shadow-md`}>
                        <div className="max-h-[220px] overflow-y-auto">
                            {
                                noticaciones.notifications.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <a className="flex flex-row items-center justify-between px-2 py-5 border-b-2 border-[#ddd] border-solid m-0">
                                                <div className="p-3">
                                                    <div className="flex items-center justify-center relative w-12">
                                                        <div className="absolute left-0"><i className="bi bi-circle-fill text-5xl text-upla-100"></i> </div>
                                                        <div className="absolute left-3"><i className="bi bi-chat-dots-fill text-2xl text-white"></i></div>
                                                    </div>
                                                </div>
                                                <div className="ml-1 flex-1 w-full">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {item.titulo}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {item.mensaje}
                                                    </p>
                                                </div>
                                                <div>
                                                    <button
                                                        className="focus:outline-none text-black bg-white hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-300  rounded-md text-sm px-3 py-2"
                                                        onClick={() => {
                                                            dispatch(removeNotification({ id: item.id }));
                                                        }}>
                                                        <i className="bi bi-x-lg"></i>
                                                    </button>
                                                </div>
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <li className="bg-[#eee] text-sm px-2 py-3 text-center">
                                {noticaciones.notifications.length == 0 ? "No hay notificaciones para mostrar." : `Tiene ${noticaciones.notifications.length} ${noticaciones.notifications.length == 1 ? "notificacione" : "notificaciones"}`}
                            </li>
                        </div>
                    </ul>
                </li>
                <li className="flex justify-center h-full">
                    <button
                        onClick={() => dispatch(logout())}
                        className="px-4 text-white hover:bg-white hover:text-upla-100">
                        <i className="bi bi-person-circle text-xl"></i>
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;