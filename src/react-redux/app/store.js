import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import jobReducer from "../features/products/productSlice";
const store = configureStore({
    reducer:{
        auth: authReducer ,
        jobReducer: jobReducer,
        
    }
})

export default store