import axios from 'axios'

const API_URL = 'https://usella.up.railway.app/';

const register = async(userData)=>{
    const response = await axios.post(API_URL + 'register', userData)
    if(response.data){
        localStorage.removeItem('google');
        localStorage.setItem('google', JSON.stringify(response.data));
    }
    return response.data
}


const login = async (userData)=>{
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('you', JSON.stringify(response.data));
    }

    return response.data;
}

//GET PROFILE DETAILS
const getProfile = async (id)=>{
    const response = await axios.get(API_URL + 'profile/' + id)
    return response.data;
}

//UPDATE PROFILE DETAILS
const updateProfile = async (id, userData)=>{
    const response = await axios.put(API_URL + 'profile/' + id, userData)
    return response.data;
}



const logout = ()=>{
    //get item from local storage
    
    localStorage.removeItem('you');
}



const authService ={
    login,
    register,
    logout,
    getProfile,
    updateProfile

}

export default authService
