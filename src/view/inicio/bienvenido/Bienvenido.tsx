import { useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { images } from "../../../helper/index.helper";
import Transition from "../../../component/Transition.component";
import toast, { Toaster } from 'react-hot-toast';


const Bienvenido = (props: RouteComponentProps<{}>) => {

    // const [open, setOpen] = useState<boolean>(false);
    // const ref = useRef<HTMLDivElement>(null);

    // const onEventToggleModal = () => {
    //     if (open) {
    //         return;
    //     }

    //     setOpen(true)

    //     const element = ref.current as HTMLDivElement;

    //     if (element.classList.contains("animate-out")) {

    //         element.classList.remove("animate-out");
    //         element.classList.remove("!block");

    //         element.classList.add("animate-in");
    //         element.classList.add("!block");
    //     } else if (element.classList.contains("animate-in")) {
    //         element.classList.remove("animate-in");
    //         element.classList.remove("!block");

    //         element.classList.add("animate-out");
    //         element.classList.add("!block");
    //     } else {
    //         element.classList.add("animate-in");
    //         element.classList.add("!block");
    //     }

    //     const onEventAnimationEnd = () => {
    //         if (element.classList.contains("animate-out")) {
    //             element.classList.remove("animate-out");
    //             element.classList.remove("!block");
    //         }
    //         setOpen(false)
    //     }

    //     element.removeEventListener('animationend', onEventAnimationEnd);
    //     element.addEventListener('animationend', onEventAnimationEnd);
    // }

    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                    <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 dark:bg-gray-950  rounded-sm bg-clip-border">
                        <div className="p-4 pb-0 mb-0 border-b-0 rounded-t-2xl">
                            <div className="flex flex-wrap -mx-3">
                                <div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                                    <h6 className="mb-0 dark:text-white">¡Bienvenido/a al software web!</h6>
                                </div>
                            </div>
                        </div>
                        <div className="flex-auto p-4">
                            <p className="leading-normal text-sm dark:text-white dark:opacity-60">Estamos encantados de tenerle como usuario/a en nuestra plataforma. Hemos diseñado este software web para proporcionarle una experiencia única, intuitiva y sencilla. Con nuestro software, tendrá acceso a una variedad de herramientas y funciones que le permitirán alcanzar sus objetivos de manera eficiente.</p>
                        </div>
                    </div>
                </div>           
            </div>
            {/* <button className="text-white bg-gradient-to-br from-pink-500 to-voilet-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                type="button"
                onClick={onEventToggleModal}>
                Toggle modal 1
            </button>
 

            <div ref={ref} className={`fixed inset-0 z-[500] w-screen h-screen hidden`}>
                <div className=" w-screen h-screen bg-gray-900 opacity-50"></div>
                <div
                    id="modalEl"
                    tabIndex={-1}
                    className=" text-sm md:max-w-full  inset-0  flex overflow-y-auto overflow-x-hidden fixed  z-50 w-full md:w-[calc(100%_-_268px)] md:ml-[268px]  h-modal md:h-full justify-center items-center"
                >
                    <div className="md:max-w-full flex-wrap break-all">
                        <div className="md:max-h-[600px] mt-5 md:mt-0 max-h-[650px] overflow-auto p-4 md:max-w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <div className=" flex flex-wrap break-all justify-between items-center mb-4">
                                <h5 className="text-xl m-auto font-bold leading-none text-gray-900 dark:text-white">
                                    Datos del Estudiante
                                </h5>
                                <button
                                    onClick={onEventToggleModal}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5  inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-toggle="defaultModal"
                                >
                                    <svg

                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="max-w-[350px] md:max-w-full flow-root t">
                                <ul
                                    role="list"
                                    className="divide-y divide-gray-200 dark:divide-gray-700"
                                >
                                    <li className="flex py-2 sm:py-2 flex-wrap">
                                        <div className="flex w-28 items-center space-x-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Codigo
                                                </p>

                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Apellidos y Nombres
                                                </p>

                                            </div>
                                        </div>
                                    </li>
                                    <li className="flex overflow-hidden md:overflow-visible py-2 sm:py-2">
                                        <div className="flex min-w-[7rem] w-28 items-center space-x-4">
                                            <div className="flex-1  min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Celular
                                                </p>

                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Dirección
                                                </p>

                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-2 sm:py-2">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Correo
                                                </p>

                                            </div>
                                        </div>
                                    </li>
                                    <li className="pt-3 pb-0 sm:pt-4 ">
                                        <div className="flex items-center space-x-4 shadow-md rounded-lg">
                                            <div className="flex-1 min-w-0 ">

                                            </div>
                                        </div>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

        </>
    );
}

export default Bienvenido;