// import axios from "axios";

// const API_URL = "http://localhost:4000/";

//  const createMessage = async (messageData, token) => {
//     const response = await axios.post(
//         API_URL + "message",
//         messageData,
//         {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//         }
//     );
//     if (response.data) {
//         localStorage.setItem("message", JSON.stringify(response.data));
//     }
    
//     return response.data;
//     }


// const messageService = {
//     createMessage,
// };

// export default messageService;