import Imagen from "./imagen.model.interface"

export default interface Formulario {
    nombreSistema: string,
    versionSistema: string,
    usuarioNombre: string,
    celularAxeso: string,
    sede: string,
    cargo: string,
    personaReporte: string,
    celularPersona: string
    fecha: string,
    descripcion: string,
    preguntaUno: string,
    preguntaDos: string,
    preguntaTres: string,
    preguntaCuatro: string,
    preguntaCinco: string,
    imagenes: Imagen[],
    idCorteCsj: string
}