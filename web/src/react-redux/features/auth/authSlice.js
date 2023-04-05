import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const you = JSON.parse(localStorage.getItem('you'))
const employer = JSON.parse(localStorage.getItem('employer'))

const initialState ={
    you: you ? you : null,
    employer: employer ? employer : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}



export const register = createAsyncThunk('/register', async(you, thunkAPI)=>{
    try {
        return await authService.register(you)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})




export const login = createAsyncThunk('/login', async(you, thunkAPI)=>{
    try {
        return await authService.login(you);
    } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

//GET PROFILE DETAILS
export const getProfile = createAsyncThunk('/getProfile', async(id, thunkAPI)=>{
    try {
        return await authService.getProfile(id);
    } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
}
)

//UPDATE PROFILE DETAILS
export const updateProfile = createAsyncThunk('/updateProfile', async(userData, thunkAPI)=>{
    try {
        return await authService.updateProfile(userData);
    } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
}
)




export const logout = createAsyncThunk('/logout', (you, thunkAPI)=>{
    try {
        return  authService.logout(you);
    } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

export const getFollowers = createAsyncThunk('/getFollowers', async(id, thunkAPI)=>{
    try {
        return await authService.getFollowers(id)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})



export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message =''
        }
    }, 
    extraReducers: (builder)=>{
        builder.addCase(register.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
            state.message = '';
        })
        builder.addCase(register.fulfilled, (state, action)=>{
            state.isError= false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = action.payload.message;
            state.you= action.payload;
        })
        builder.addCase(register.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.payload;
            state.you = null;
        })
       
        builder.addCase(login.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
            state.message = '';
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            //if login is successful, set you to the payload and redirect to dashboard
            state.isSuccess = true;
            state.message = action.payload.message;
            state.you = action.payload;
        })
        builder.addCase(login.rejected, (state, action)=>{
            state.isError = true
            state.isLoading= false
            state.isSuccess = false
            state.message = action.payload
        })

        builder.addCase(logout.fulfilled, (state) => {
            state.you = null;
        })

    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer