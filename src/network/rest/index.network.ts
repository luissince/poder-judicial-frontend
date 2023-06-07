import axios from 'axios';
import Response from '../../model/class/response.model.class';
import Resolve from '../../model/class/resolve.model.class';
import RestError from '../../model/class/resterror.model.class';
import Consulta from '../../model/interfaces/soporte/consulta.mode.interfaces';

const instance = axios.create({
    baseURL: import.meta.env.VITE_URL_APP,
    timeout: 10000,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

instance.interceptors.request.use((config) => {
    const storage = window.localStorage as Storage;
    const token = storage.getItem('token');
    if (token !== null) {
        config.headers.Authorization = 'Bearer ' + JSON.parse(token);
    }
    return config;
});

export async function LoginRest<Login>(params: object, signal = null): Promise<Response<Login> | RestError> {
    return await Resolve.create<Login>(instance.post<Login>("/Login", params, { signal: signal! }));
}

export async function EstudianteRest<Estudiante>(codigo: string, signal = null): Promise<Response<Estudiante> | RestError> {
    return await Resolve.create<Estudiante>(instance.get<Estudiante>("/MostrarFacultad/" + codigo, { signal: signal! }));
}

export async function TrabajadorRest<Trabajador>(dni: string, signal = null): Promise<Response<Trabajador> | RestError> {
    return await Resolve.create<Trabajador>(instance.get<Trabajador>("/Soporte/obtenerDatosTrabajadorPorDni/" + dni, { signal: signal! }));
}

export async function ValidarTokenRest<Void>(signal = null): Promise<Response<Void> | RestError> {
    return await Resolve.create<Void>(instance.get<Void>("/Aplicacion/validarToken", { signal: signal! }));
}

export async function SoporteListarConsultasRest<Responde>(params: object, abortController: AbortController | null): Promise<Response<Responde> | RestError> {
    return await Resolve.create<Responde>(instance.post<Responde>("/Soporte/listarConsultas", params, { signal: abortController?.signal }));
}

export async function ObtenerConsultaPorIdConsultaRest<Consulta>(codigo: string, abortController: AbortController | null): Promise<Response<Consulta> | RestError> {
    return await Resolve.create<Consulta>(instance.get<Consulta>("/Soporte/obtenerConsultaPorIdConsulta/" + codigo, { signal: abortController?.signal }));
}

export async function ListarRespuestasPorIdConsultaRest<Responde>(params: object, abortController: AbortController | null): Promise<Response<Responde> | RestError> {
    return await Resolve.create<Responde>(instance.post<Responde>("/Soporte/listarRespuestasPorIdConsulta", params, { signal: abortController?.signal }));
}

export async function RegistrarRespuestaRest<String>(params: object, abortController: AbortController | null = null): Promise<Response<String> | RestError> {
    return await Resolve.create<String>(instance.post<string>("/Soporte/registrarRespuesta", params, { signal: abortController?.signal }));
}

export async function TerminarConsultaRest<String>(params: Consulta, abortController: AbortController | null = null): Promise<Response<String> | RestError> {
    return await Resolve.create(instance.post<string>("/Soporte/terminarConsulta", params, { signal: abortController?.signal }));
}

export async function AnularConsultaRest<String>(params: Consulta, abortController: AbortController | null = null): Promise<Response<String> | RestError> {
    return await Resolve.create<String>(instance.post<String>("/Soporte/anularConsulta", params, { signal: abortController?.signal }));
}

export async function SoporteListarFrecuenteRest<Responde>(params: object, abortController: AbortController | null): Promise<Response<Responde> | RestError> {
    return await Resolve.create<Responde>(instance.post<Responde>("/Soporte/listarFrecuentes", params, { signal: abortController?.signal }));
}

export async function RegistrarFrecuenteRest<String>(params: object, abortController: AbortController | null = null): Promise<Response<String> | RestError> {
    return await Resolve.create(instance.post<string>("/Soporte/registrarFrecuente", params, { signal: abortController?.signal }));
}

export async function ObtenerFrecuentePorIdFrecuenteRest<Frecuente>(idFrecuente: string, abortController: AbortController | null = null): Promise<Response<Frecuente> | RestError> {
    return await Resolve.create(instance.get<Frecuente>("/Soporte/obtenerFrecuentePorIdFrecuente/" + idFrecuente, { signal: abortController?.signal }));
}

export async function ActualizarFrecuenteRest<String>(params: object, abortController: AbortController | null = null): Promise<Response<String> | RestError> {
    return await Resolve.create(instance.post<string>("/Soporte/actualizarFrecuente", params, { signal: abortController?.signal }));
}

export async function EnviarNotifacionCelular(idConsulta: string, abortController: AbortController | null = null): Promise<Response<String> | RestError> {
    return await Resolve.create(axios.get("https://api.upla.edu.pe/servicios/push-app/notificar/" + idConsulta)
        // instance.get<string>("https://app.upla.edu.pe/consulta/CS0022", { signal: abortController?.signal })
    );
}