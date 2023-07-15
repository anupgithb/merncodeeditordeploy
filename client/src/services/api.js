import axios from 'axios';
const url = '';

export const sendCode = async(codeWritten) =>{
    try {
        return await axios.post(`${url}/compile`, codeWritten);
    } catch (error) {
        // console.log('Error while calling login API: ', error);
        return error.response;
    }
}
export const sendUser = async(user)=>{
    try {
        return await axios.post(`${url}/signup`, user,{withCredentials: true});
    } catch (error) {
        // console.log('Error while calling login API: ', error);
        return error.response;
    }
}

export const sendUserLogin = async(user)=>{
    try {
        return await axios.post(`${url}/login`, user,{withCredentials: true});  
    } catch (error) {
        // console.log('Error while calling login API: ', error);
        return error.response;
    }
}
export const logoutUser = async()=>{
    try {
        return await axios.get(`${url}/logout`,{withCredentials: true});
    } catch (error) {
        // console.log('Error while calling login API: ', error);
        return error.response;
    }
}

export const getMe= async()=>{
    try {
        return await axios.get(`${url}/api/auth/me`,{withCredentials: true});
    } catch (error) {
        // console.log('Error while calling login API: ', error);
        return error.response;
    }
}
// export const authenticateLogin = async (user) => {
//     try {
//         return await axios.post(`${url}/login`, user)
//     } catch (error) {
//         console.log('Error while calling login API: ', error);
//         return error.response;
//     }
// }