import { Dispatch, SetStateAction } from "react";

type Props = {
    refCodigo: React.RefObject<HTMLInputElement>,
    codigo: string,
    codigoMensaje: string,
    setCodigoMessage: Dispatch<SetStateAction<string>>,
    setCodigo: Dispatch<SetStateAction<string>>,
    setMensaje: Dispatch<SetStateAction<string>>
}

const InputClave = (props: Props) => {
    return (
        <div className="my-3">
            <label
                htmlFor="codigo"
                className="font-mont block mb-2 text-sm font-medium text-gray-900 "
            >
                Codigo
            </label>
            <input
                type="text"
                className="font-mont bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Dijite su código"
                ref={props.refCodigo}
                value={props.codigo}
                onChange={(changeevent: React.ChangeEvent<HTMLInputElement>) => {
                    if (changeevent.target.value.length == 0) {
                        props.setCodigoMessage("!El campo es oblogatorio¡");
                        props.setCodigo(changeevent.target.value);
                    } else {
                        props.setCodigo(changeevent.target.value);
                        props.setCodigoMessage("");
                    }
                    props.setMensaje("");
                }}
                autoFocus
            />
            <span className="text-red-600 text-xs">{props.codigoMensaje}</span>
        </div>
    );
}

export default InputClave;