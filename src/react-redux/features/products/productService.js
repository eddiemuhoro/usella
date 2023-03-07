import axios from 'axios'

const API_URL = 'http://localhost:9000/';

const createProduct = async(productData)=>{
    const response = await axios.post(API_URL + 'products', productData,
    )
    return response.data
}

const getProduct = async()=>{
  const response = await axios.get(API_URL + 'products',
  )
//data response
  return response.data
}

const deleteProduct = async (productId) => {

    const response = await axios.delete(API_URL + 'products/' + productId)
  
    return response.data
  }

  const  updateProduct = async (productId, productData) => {
  
    const response = await axios.put(API_URL + 'products/' + productId, productData)

    return response.data
  }
  
const productService={
    createProduct,
    deleteProduct,
    getProduct,
    updateProduct
}
export default productService