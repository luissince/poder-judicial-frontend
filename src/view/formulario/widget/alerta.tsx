import toast from "react-hot-toast";

export function Alerta(mensaje:string) {
    toast((t) => (
        <div className="flex gap-x-4 items-center bg-amber-100">

            <div className="flex items-center">
                <div className="ml-3 flex-1">
                    <p className="text-sm text-black">
                        {mensaje}
                    </p>
                </div>
            </div>

            <div className="flex border-gray-200">
                <button
                    className="px-2 py-1 rounded-full  hover:bg-indigo-600 hover:text-white text-red-600"
                    onClick={() => toast.dismiss(t.id)}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
        </div>
    ), {
        position: "top-right",
        style: {"margin": "0px", "padding": "0px"}
    })
}