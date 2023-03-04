import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem('user'))
const employer = JSON.parse(localStorage.getItem('employer'))

const initialState ={
    user: user ? user : null,
    employer: employer ? employer : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}



export const register = createAsyncThunk('/register', async(user, thunkAPI)=>{
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

export const registerEmployer = createAsyncThunk('/registerEmployer', async(employer, thunkAPI)=>{
    try {
        return await authService.registerEmployer(employer)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
}
)

export const loginEmployer = createAsyncThunk('/loginEmployer', async(employer, thunkAPI)=>{
    try {
        return await authService.loginEmployer(employer);
    } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

export const login = createAsyncThunk('/login', async(user, thunkAPI)=>{
    try {
        return await authService.login(user);
    } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})




export const logout = createAsyncThunk('/logout', (user, thunkAPI)=>{
    try {
        return  authService.logout(user);
    } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

export const logoutEmployer = createAsyncThunk('/logout', (employer, thunkAPI)=>{
    try {
        return  authService.logoutEmployer(employer);
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
            state.user= action.payload;
        })
        builder.addCase(register.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.payload;
            state.user = null;
        })
        builder.addCase(registerEmployer.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
            state.message = '';
        })
        builder.addCase(registerEmployer.fulfilled, (state, action)=>{
            state.isError= false;
            state.isSuccess = true;
            state.isLoading = false;
            state.message = action.payload.message;
            state.employer= action.payload;
        })
        builder.addCase(registerEmployer.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.payload;
            state.employer = null;
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
            //if login is successful, set user to the payload and redirect to dashboard
            state.isSuccess = true;
            state.message = action.payload.message;
            state.user = action.payload;
        })
        builder.addCase(login.rejected, (state, action)=>{
            state.isError = true
            state.isLoading= false
            state.isSuccess = false
            state.message = action.payload
        })

        builder.addCase(loginEmployer.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
            state.message = '';
        })
        builder.addCase(loginEmployer.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            //if login is successful, set user to the payload and redirect to dashboard
            state.isSuccess = true;
            state.message = action.payload.message;
            state.employer = action.payload;
        })
        builder.addCase(loginEmployer.rejected, (state, action)=>{
            state.isError = true

            state.isLoading= false
            state.isSuccess = false
            state.message = action.payload
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null;
        })

    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer