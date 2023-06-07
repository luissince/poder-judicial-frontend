import { Dispatch, SetStateAction } from "react";
import { EyeSlashSvg, EyeSvg } from "../../../component/Svg.component";

type Props = {
    see: boolean,
    refClave: React.RefObject<HTMLInputElement>,
    clave: string,
    setClaveMensaje: Dispatch<SetStateAction<string>>,
    setClave: Dispatch<SetStateAction<string>>,
    onEvenVerClave: React.MouseEventHandler,
    claveMensaje: string,
    setMensaje: Dispatch<SetStateAction<string>>
}

const InputPassword = (props: Props) => {
    return (
        <div className="my-3">
            <label
                htmlFor="password"
                className="font-mont block mb-2 text-sm font-medium text-gray-900 "
            >
                Contraseña
            </label>

            <div className="relative w-full">
                <input
                    type={props.see ? "text" : "password"}
                    placeholder="Dijite su contraseña"
                    className="font-mont bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    ref={props.refClave}
                    value={props.clave}
                    onChange={(changeevent: React.ChangeEvent<HTMLInputElement>) => {
                        if (changeevent.target.value.length == 0) {
                            props.setClaveMensaje("!El campo es oblogatorio¡");
                            props.setClave(changeevent.target.value)
                        } else {
                            props.setClave(changeevent.target.value)
                            props.setClaveMensaje("");
                        }
                        props.setMensaje("");
                    }}
                />
                <button
                    onClick={props.onEvenVerClave}
                    type="button"
                    className="absolute 
                    top-0 right-0 
                    p-2.5
                    text-sm 
                    font-medium
                    text-white
                    bg-upla-100 
                    rounded-r-lg 
                    border
                    border-blue-700
                    hover:bg-upla-200 
                    focus:ring-4 
                    focus:outline-none
                    focus:ring-blue-300">
                    {
                        props.see ?
                            <EyeSvg />
                            :
                            <EyeSlashSvg />
                    }
                </button>
            </div>
            <span className="text-red-600 text-xs">{props.claveMensaje}</span>
        </div>
    );
}

export default InputPassword;