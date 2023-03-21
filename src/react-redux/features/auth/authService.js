import axios from 'axios'

const API_URL = 'https://odd-slip-ant.cyclic.app/';

const register = async(userData)=>{
    const response = await axios.post(API_URL + 'register', userData)
    if(response.data){
        localStorage.setItem('you', JSON.stringify(response.data));
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

const logout = ()=>{
    //get item from local storage
    
    localStorage.removeItem('you');
}



const authService ={
    login,
    register,
    logout,

}

export default authService
