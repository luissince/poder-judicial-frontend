import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.store';
import notifeSlice from './notifeSlice.store';

 const store = configureStore({
  reducer: {
    autenticacion: authReducer,
    notificacion: notifeSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export default store;