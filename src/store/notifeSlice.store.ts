import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Notificacion } from '../model/types/notificacion.model'

type Body = {
    notifications: Notificacion[]
}

export const initialState: Body = {
    notifications: [],
}

export const notifeSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notificacion>) => {        
            state.notifications.push(action.payload);
        },
        removeNotification : (state, action : PayloadAction<{ id: string }>) => {
            state.notifications = state.notifications.filter(
                (notification) => notification.id !== action.payload.id
              );
        },
        clearNotifications : (state) => {
            state.notifications = [];
        }
    },
})

export const { addNotification, removeNotification, clearNotifications} = notifeSlice.actions

export default notifeSlice.reducer