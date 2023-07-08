import { images } from "../../../helper/index.helper";

const TituloPdf = () => {

    return (
        <div className="mx-auto mt-2 max-w-3xl sm:mt-6">
            <div className="grid grid-cols-8 w-full border-solid border-2 border-red-900">
                <div className="col-start-1 col-end-1 p-2">
                    <img src={images.logo_poder_judicial} alt="logo" />
                </div>
                <div className="col-start-2 col-end-7 border-solid border-2 border-x-red-700 text-center">
                    <h1 className="font-bold text-2xl mt-1">PODER JUDICIAL</h1>
                    <h5>FORMULARIO DE INCIDENCIA</h5>
                </div>
                <div className="col-start-7 col-end-9 text-center">
                    <h5 className="font-bold text-xs mt-1">Formulario N°: </h5>
                    <p className="font-normal text-xs">P-01-2023-GI-GG-PJ-F-01</p>
                    <h5 className="font-bold text-xs mt-1">
                        Versión: <span className="font-normal text-xs">05</span>{" "}
                    </h5>
                    <h5 className="font-bold text-xs mt-1">
                        Fecha: <span className="font-normal text-xs">07/06/2023</span>{" "}
                    </h5>
                </div>
            </div>
        </div>
    );
}

export default TituloPdf;