import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer'

export const ConfigureStore = () => {
    const store = configureStore({
        reducer: rootReducer
    });

    return store;
}