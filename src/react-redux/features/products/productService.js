import axios from 'axios'

const API_URL = 'https://usella.up.railway.app/';

const createProduct = async(productData)=>{
    const response = await axios.post(API_URL + 'product/send', productData,
    )
    return response.data
}

const getProduct = async()=>{
  const response = await axios.get(API_URL + 'product',
  )
//data response
  return response.data
}

//get single product by id
const getProductById = async(productId)=>{
  const response = await axios.get(API_URL + 'product/' + productId,
  )
//data response
  return response.data
}

//get product by category
const getProductByCategory = async(category)=>{
  const response = await axios.get(API_URL + 'product/category/' + category,
  )
//data response
 return response.data
}

//get product by user id
const getProductByUser = async(userId)=>{
  const response = await axios.get(API_URL + 'product/user/' + userId,
  )
//data response
  return response.data  
}


const deleteProduct = async (productId) => {

    const response = await axios.delete(API_URL + 'product/delete/' + productId)
  
    return response.data
  }

  const  updateProduct = async (productId, productData) => {
    const response = await axios.put(API_URL + 'product/' + productId, productData)
    return response.data
  }


  //post item to cart
  const addToCart = async (cartData) => {
    const response = await axios.post(API_URL + 'products/cart', cartData)
    return response.data
  }


  //fetch cart item by product id
  const getCart = async (productId) => {
    const response = await axios.get(API_URL + 'products/cart/' + productId)
    return response.data
  }

  //fetch cart item by user id
  const getCartByUser = async (userId) => {
    const response = await axios.get(API_URL + 'products/cart/user/' + userId)
    return response.data
  }

  //remove item from cart by product id
  const deleteCart = async (productId) => {
    const response = await axios.delete(API_URL + 'products/cart/' + productId)
    return response.data
  }

  //UPDATING CART QUANTITY
  const updateCart = async (newQuantity, productId) => {
    const response = await axios.put(API_URL + 'products/cart/' + productId, newQuantity)
    return response.data
  }

  //GET ORDERS BY USER ID
  const getOrdersByUser = async (userId) => {
    const response = await axios.get(API_URL + 'products/orders/user/' + userId)
    return response.data
  }

  //GET ORDERS BY PRODUCT ID
  const getOrdersByProduct = async (productId) => {
    const response = await axios.get(API_URL + 'products/orders/product/' + productId)
    return response.data
  }


  //DELETE ORDER BY ORDER ID
  const deleteOrder = async (orderId) => {
    const response = await axios.delete(API_URL + 'products/orders/' + orderId)
    return response.data
  }



  //UPDATE PRODUCT QUANTITY AFTER ORDER
  const updateProductQuantity = async (productId, newQuantity) => {
    const response = await axios.put(API_URL + 'products/orders/' + productId, newQuantity)
    return response.data
  }



 
  
const productService={
    createProduct,
    deleteProduct,
    getProductByUser,
    addToCart,
    getCart,
    getCartByUser,
    deleteCart,
    updateCart,
    getProductById,
    getProductByCategory,
    getProduct,
    updateProduct,
    getOrdersByUser,
    getOrdersByProduct,
    deleteOrder,
    updateProductQuantity
}
export default productService