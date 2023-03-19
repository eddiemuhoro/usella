import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'
import axios from 'axios'
import { useEffect, useState } from 'react';



const user = JSON.parse(localStorage.getItem('user'))

const initialState ={
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

export const createproduct = createAsyncThunk('products/create',
async(productData, thunkAPI)=>{
    try {
        return await productService.createProduct(productData)
    } catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})



export const getProduct = createAsyncThunk('products/get',
async(_, thunkAPI)=>{
    try {
        return await productService.getProduct()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}
)


export const getProductById = createAsyncThunk('products/get',
async(productId, thunkAPI)=>{
  try {
    return await productService.getProductById(productId)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}
)

//get product by user id
export const getProductByUser = createAsyncThunk('products/get',
async(userId, thunkAPI)=>{
  try {
    return await productService.getProductByUser(userId)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
    
  }
)

//add to cart
export const addToCart = createAsyncThunk('products/addToCart',
async(cartData, thunkAPI)=>{
  try {
    return await productService.addToCart(cartData)
    
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}
)

//get cart item by product id
export const getCart = createAsyncThunk('products/getCart',
async(productId, thunkAPI)=>{
  try {
    return await productService.getCart(productId)
  }
  catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}
)

//get cart item by user id
export const getCartByUser = createAsyncThunk('products/getCartByUser',
async(userId, thunkAPI)=>{
  try {
    return await productService.getCartByUser(userId)
  }
  catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}
)

//remove item from cart by product id
export const deleteCart = createAsyncThunk('products/deleteCart',
async(productId, thunkAPI)=>{
  try {
    return await productService.deleteCart(productId)
  }
  catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}
)

//update cart item quantity
export const updateCart = createAsyncThunk('products/updateCart',
async(cartData, thunkAPI)=>{
  try {
    return await productService.updateCart(cartData)
  }
  catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}
)

//get product by category
export const getProductByCategory = createAsyncThunk('products/get',
async(category, thunkAPI)=>{
  try {
    return await productService.getProductByCategory(category)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}
)

export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (id, thunkAPI) => {
      try {
        return await productService.deleteProduct(id)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

  export const updateProduct = createAsyncThunk(
    'products/delete',
    async (id,productData, thunkAPI) => {
      try {
        return await productService.updateProduct(id,productData)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

  //GET ORDER BY USER ID
export const getOrderByUser = createAsyncThunk('products/get',
async(userId, thunkAPI)=>{
  try {
    return await productService.getOrdersByUser(userId)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
    
  }
)

//delete order by order id
export const deleteOrder = createAsyncThunk('products/delete',
async(orderId, thunkAPI)=>{
  try {
    return await productService.deleteOrder(orderId)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
    
  }
)

//UPDATE PRODUCT'S QUANTITY AFTER ORDER
export const updateProductQuantity = createAsyncThunk('products/update',
async(productData, thunkAPI)=>{
  try {
    return await productService.updateProductQuantity(productData)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
    
  }
)



//EXTRA REDUCERS
export const productSlice= createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state)=>initialState
    }, 
    extraReducers:(builder)=>{
        builder.addCase(createproduct.pending, (state)=>{
            state.isLoading= true
        })
        .addCase(createproduct.fulfilled, (state, action)=>{
            state.isLoading =false
            state.isSuccess = true
            //
            state.products.push(action.payload)
        })
        .addCase(createproduct.rejected, (state, action)=>{
            state.isError =true
            state.isSuccess = false
            //
            state.message=(action.payload)
        })
        .addCase(deleteProduct.pending, (state) => {
            state.isLoading = true
          }
        )
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            //
            state.products = state.products.filter((product) => product._id !== action.payload._id)
          }
        )
        .addCase(deleteProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            //
            state.message = action.payload
          }
        )
        .addCase(getProduct.pending, (state)=>{
            state.isLoading= true
        })
        .addCase(getProduct.fulfilled, (state, action)=>{
            state.isLoading =false
            state.isSuccess = true
            //
            state.products=action.payload

        }
        )
        .addCase(getProduct.rejected, (state, action)=>{
            state.isError =true
            state.isSuccess = false
            //
            state.message=(action.payload)
        }
        )

        
        

    }
})
export const {reset} = productSlice.actions
export default productSlice.reducer