import Respuesta from "./respuesta.model.interface";
import ListarConsulta from "./listarconsulta.model.interfaces";
import Frecuente from "./frecuente.model.interfaces";

export default interface Responde {
    resultado : ListarConsulta[] | Respuesta[] | Frecuente[],
    total: number
}