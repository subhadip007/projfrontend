import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { isAutheticated } from '../auth/helper'
import Base from '../core/Base'
import {createCategory} from './helper/adminapicall'

const AddCategory=()=> {
    
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const {user,token}=isAutheticated()
    const goBack=()=>(
        <div className='mt-5' >
            <Link className='btn btn-sm btn-info m-3' to='/admin/dashboard'>Admin Home</Link>
        </div>
    )


    const handleChange=(event)=>{
        setError('');
        setName(event.target.value)

    }

    const onSubmit=(event)=>{

        event.preventDefault()
        setError('');
        setSuccess(false)

        //backedn req
        createCategory(user._id,token,{name})
        .then(data=>{
            if(data.error){
                setError(true)
            }else{
                setError('')
                setSuccess(true)
                setName('')
            }
        })
 }


 const successMesasge=()=>{
if(success){
    return <h4 className='text-success'>Category craeted successsfully</h4>
}

 }

 const warningMessage=()=>{
     if(error){
         return <h4 className='text-alert'>Create category failed</h4>
     }
 }
    const myCategoryForm=()=>(
        <form >
            <div className='form-group'>
                <p className='lead m-3'>Enter the category</p>
                <input type='text'
                 className='form-control m-3'
                  onChange={handleChange}
                  value={name}
                  autofocus
                   required
                    placeholder='ex. summer' />

                <button onClick={onSubmit} className='btn btn-outline-info m-3'>Create Category</button>
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

export default AddCategory;
