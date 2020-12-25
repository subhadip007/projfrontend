import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAutheticated } from '../auth/helper'
import Base from '../core/Base'
import {updateCategory, getCategory} from './helper/adminapicall'

const UpdateCategory=({match})=> {
    const { user, token } = isAutheticated();
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    
    const goBack=()=>(
        <div className='mt-5' >
            <Link className='btn btn-sm btn-info m-3' to='/admin/dashboard'>Admin Home</Link>
        </div>
    )


    const handleChange=(event)=>{
        setError('');
        setName(event.target.value)

    }


    const preload = (categoryId) => {
       
        getCategory(categoryId).then(data => {
        //   console.log(data);
          if (data.error) {
          console.log(data.error)
          } else {
            setName(data.name)
          }
        });
      };

      useEffect(() => {
        preload(match.params.categoryId);
      }, []);


    const onSubmit=(event)=>{

        event.preventDefault()
        setError('');
        setSuccess(false)

        //backedn req
        updateCategory(match.params.categoryId,user._id,token,{name})
        .then(data=>{
            console.log(data)
            if(data.error){
                setError(true)
            }else{
                setError('')
                setSuccess(true)
                setName(data.name)
            }
        })
 }


 const successMesasge=()=>{
if(success){
    return <h4 className='text-success'>Category updated successsfully</h4>
}

 }

 const warningMessage=()=>{
     if(error){
         return <h4 className='text-alert'> category update failed</h4>
     }
 }
    const myCategoryForm=()=>(
        <form >
            <div className='form-group'>
                <p className='lead m-3'>Update the category</p>
                <input type='text'
                 className='form-control m-3'
                  onChange={handleChange}
                  value={name}
                  autofocus
                   required
                    placeholder='ex. summer' />

                <button onClick={onSubmit} className='btn btn-outline-info m-3'>Update Category</button>
            </div>
        </form>
    )
    
    return (
        <Base title='Create categorty here' description='you can create a category here' className='container bg-info p-4'>
            <div className='row bg-white rounded'>
                <div clssname='col-md-8 offset-md-2'>
                    {successMesasge()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                    
                </div>
            </div>
        </Base>
    )
}

export default UpdateCategory;
