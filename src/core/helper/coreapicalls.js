import React from 'react'
import { API } from '../../backend'

 export const getProduct=()=> {
    return (
        fetch(`${API}/products`, {method:'GET'}).then(response=>{
            return response.json()
        }).catch(err=>console.log(err))
    )
}


export const loadCart=()=>{
    if(typeof window !== undefined){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'))
 }

}}