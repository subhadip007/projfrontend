
import { API } from "../../backend"


//TODO:
export const getUser=(userId,token)=>{
    return(
        fetch(`${API}/user/${userId}`, {
            method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`

        }}).then(response=>{
            return response.json().then(console.log(response))
        }).catch(err=>console.log(err))
        
        )
}

