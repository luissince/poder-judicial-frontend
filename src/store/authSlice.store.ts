import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Auth from '../model/types/auth.model';

const initialState: Auth = {
    cargando: true,
    codigo: "",
    token: null,
    autenticado: false,
} 

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        starting: (state) => {
            window.localStorage.clear();
            state.cargando = false;
            state.codigo = "";
            state.token = null;
            state.autenticado = false;
        },
        restore: (state, action: PayloadAction<{ codigo: string, token: string, authentication: boolean }>) => {
            state.cargando = false;
            state.codigo = action.payload.codigo
            state.token = action.payload.token;
            state.autenticado = action.payload.authentication;
        },
        login: (state, action: PayloadAction<{ codigo: string, token: string }>) => {
            state.autenticado = true;
            state.codigo = action.payload.codigo
            state.token = action.payload.token;
            window.localStorage.setItem('codigo', JSON.stringify(action.payload.codigo));
            window.localStorage.setItem('token', JSON.stringify(action.payload.token));
        },
        logout: (state) => {          
            state.cargando = true;
            state.codigo = "";
            state.token = null;
            state.autenticado = false;
            window.localStorage.clear();
        },
    },
})

export const { starting, login, logout, restore } = authSlice.actions

export default authSlice.reducer