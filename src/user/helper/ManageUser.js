import React,{ useEffect, useState } from 'react';
import Base from "../../core/Base"
import { Link, Redirect } from "react-router-dom";
import { getUser, updateUser } from './userapicalls';
import { isAutheticated } from '../../auth/helper';




const UpdateUser = ()=>{
    const userId = isAutheticated() && isAutheticated().user._id;
    const token = isAutheticated() && isAutheticated().token;

    
    const [user,setUser]=useState({
    
        name:"",
        email:"",
        error:false,
        success:false,
        redirect:false
})


const {name,email,error,success,redirect}=user;

const handleChange = name => event => {
    setUser({ ...user, error: false, [name]: event.target.value });
  };

const preload=(userId,token)=>{
    getUser(userId,token).then(data=>{
        console.log(data)
        if(data.error){
          return setUser({...user,error:data.error})
        }else{
            return setUser({...user,name: data.name, email: data.email})
        }
        })
}
const setRedirect=()=>{
  setTimeout(() => {
    if(success== true){
       setUser({...user,redirect: true})
    }
  }, 3000);
}

const fun=()=>{
  if(redirect== true){
    return <Redirect to="/user/dashboard"/>
  }
}

useEffect(() => {
    preload(userId,token)
    setRedirect()
  }, [success]);


  const onSub = event => {
    event.preventDefault();
    setUser({ ...user, error: false });
    updateUser(userId,token,{name,email})  //this signup has been brought from the  helper
      .then(data => {
        if (data.error) {
          setUser({...user, error: data.error})
        } else {
          setUser({
            ...user,
            name: "",
            email: "",
            error: false,
            success: true
          });
        }
      }).then(
         fun()
       
      )
      
  };

  const successMesasge=()=>{
    if(success == true){
        return <h4 className='text-success'>Category updated successsfully</h4>
        
    }
    
     }
    
     const warningMessage=()=>{
         if(error == true){
             return <h4 className='text-alert'> error</h4>
         }
     }


return(
    <>
    <Base>
    
       <h2 className="text-center">Edit your user data here</h2>
       <div className="text-center">
       {successMesasge()}
       {warningMessage()}
       {fun()}
       </div>
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
            <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>

            
            <button onClick={onSub} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    
  
   </Base>
    </>
)

}


export default UpdateUser;