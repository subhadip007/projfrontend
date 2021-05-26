import React, { useEffect, useState } from 'react'
import Base from '../core/Base'
import "../styles/userDash.css"
import {Link} from 'react-router-dom'

import { isAutheticated } from "../auth/helper/index"
import { getUser } from './helper/userapicalls'







 const  UserDashboard=() =>{
    const[user,setUser]=useState([])
     const[date,setDate]=useState()
    const userId = isAutheticated() && isAutheticated().user._id;
    const token = isAutheticated() && isAutheticated().token;

const getUserData=(userId,token)=>{
    getUser(userId,token).then(data=>(
        setUser(data) ))
}


useEffect(() => {
   getUserData(userId,token)
   console.log(user.purchases)
   
}, [])

return (
       <Base title='User Dashboard'>
          <div className="user-dash">
    <ul role="tablist" className="nav nav-tabs row">
        <li role="presentation" className="nav-item col-6"><a role="tab" data-bs-toggle="tab" className="nav-link text-center active" href="#tab-1">User Profile <i class="fas align-midlle fa-user-cog"></i></a></li>
        <li role="presentation" className="nav-item col-6"><a role="tab" data-bs-toggle="tab" className="nav-link text-center" href="#tab-2">Purcheses <i class="fas fa-shopping-bag"></i></a></li>
        
    </ul>
    <div className="tab-content">
        <div role="tabpanel" className="tab-pane active " id="tab-1">
        <div className="row">
        <h5 className="col-4 text-center field ">Username:  </h5>
            <h5 className="text-center data col-8">{user.name}</h5>
        <h5 className="col-4 text-center field ">Email:  </h5>
            <h5 className="text-center data col-8">{user.email}</h5>
            
           
            </div>
            <div class="d-grid gap-2">
            <button type="button" class="btn mt-4 btn-primary "><i class="fas fa-cogs"></i> <Link to="/user/dashboard/updateuser" className="edit">Edit</Link></button>
            </div>
        </div>
        <div role="tabpanel" className="tab-pane" id="tab-2">
           
            {0? (<p>products</p>):(<p className="text-center bg-danger btn-lg mt-2">You Havent purchased anything yet 😮 !!</p>)}
        </div>
        
    </div>
</div>
       </Base>
    )
}






export default UserDashboard;
