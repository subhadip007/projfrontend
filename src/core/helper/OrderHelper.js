import { API } from "../../backend";

export const createOrder =(userId,token,orderData)=>{
  return fetch(`${API}/order/create/${userId}`,{
      method:"POST",
      headers:{
          Accepet:'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
      },
      body:JSON.stringify({order:orderData})
  }).then(res=>{
      return res.json()
  }).catch(err=>console.log(err))  
}