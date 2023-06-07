import Menu from "./Menu";
import { AiOutlineMinus } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { css } from "../../../../../helper/index.helper";
import { useEffectOnce } from "react-use";
import { useRef } from "react";

type Props = {
    desplegar: boolean,
    idList: string,
    icon: string,
    nombre: string,
    children: React.ReactNode,
}

const ListMenu = (props: Props) => {

    const refUl = useRef<HTMLUListElement>(null);

    useEffectOnce(() => {
        if (props.desplegar) {
            const element = refUl.current as HTMLElement;
            element.setAttribute("aria-expanded", "true");
            element.style.maxHeight = element.scrollHeight + "px";

            const button = (element.parentNode as HTMLElement).querySelector("button") as HTMLButtonElement;

            button.classList.remove("text-gray-400");
            button.classList.add("text-white");
            button.classList.add("bg-gray-700");
            button.children[2].classList.remove("rotate-[-90deg]");
        }
    });

    return (
        <li>
            <button
                type="button"
                id-list={props.idList}
                className={`
                flex 
                items-center 
                p-3 
                w-full 
                text-sm 
                font-normal 
                text-gray-400                
                transition 
                duration-75 
                group 
                hover:text-white`}
            >
                <i className={`bi ${props.icon}  text-xl pr-2`} ></i>
                <span
                    className="flex-1 
                    pr-2
                    text-left 
                    whitespace-nowrap 
                    overflow-hidden"
                    sidebar-toggle-item="true"
                >
                    {props.nombre}
                </span>
                <IoIosArrowDown className={`rotate-[-90deg] w-5 h-5 transition-all duration-700`} />
            </button>
            <ul
                ref={refUl}
                aria-expanded={false}
                className={`max-h-0 
                            overflow-hidden 
                            transition-all 
                            duration-500                          
                            bg-gray-700`}
            >
                {props.children}

            </ul>
        </li>
    );

}

export default ListMenu;