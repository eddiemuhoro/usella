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