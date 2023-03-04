import axios from 'axios'

const API_URL = 'https://real-rose-millipede-veil.cyclic.app/';

const createJob = async(jobData)=>{
  
    const response = await axios.post(API_URL + 'job', jobData,
    
    )

    return response.data
}

const createMessage = async (messageData) => {

  const response = await axios.post(
      API_URL + "bid",
      messageData,
   
      
  );
  return response.data;
    }

    


const getJob = async()=>{
  
  const response = await axios.get(API_URL + 'jobs',

  )
//data response
  localStorage.setItem('job', JSON.stringify(response.data))
  return response.data
}

//get employer info
const getEmployer = async()=>{
  const response = await axios.get(API_URL + 'jobs/employers',
)
  return response.data
}

const deleteGoal = async (jobId) => {
 

    const response = await axios.delete(API_URL + 'job/' + jobId)
  
    return response.data
  }

  const  updateJob = async (jobId, jobData) => {
  
    const response = await axios.put(API_URL + 'jobs/' + jobId, jobData)

    return response.data
  }
  
const jobService={
    createJob,
    createMessage,
    deleteGoal,
    getJob,
    getEmployer,
    updateJob
}
export default jobService