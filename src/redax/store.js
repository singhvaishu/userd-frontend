
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './authslice';

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;  
