import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import jobReducer from "../features/jobs/jobSlice";
import messageReducer from "../features/messages/messageSlice";
const store = configureStore({
    reducer:{
        auth: authReducer ,
        job: jobReducer,
        message: messageReducer
        
    }
})

export default store