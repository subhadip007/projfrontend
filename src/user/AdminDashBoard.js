import React from 'react'
import Base from '../core/Base'
import {isAutheticated} from '../auth/helper/index'
import { Link } from 'react-router-dom'
 

const  AdminDashboard=() =>{

const {user:{name,email,role}}= isAutheticated()

const adminLeftSide=()=>{
    return(
        <div className='card'>
                   <h4 className='card-header bg-dark text-white'>Admin Navigation </h4>
             <ul className='list-group'>
                 <li className='list-group-item'>
                     <Link to='/admin/create/category'  className='nav-link text-success'>Create Category</Link>
                 </li>
                 <li className='list-group-item'>
                     <Link to='/admin/categories'  className='nav-link text-success'>Manege Category</Link>
                 </li>
                 <li className='list-group-item'>
                     <Link to='/admin/products'  className='nav-link text-success'>Manege product</Link>
                 </li>
                 <li className='list-group-item'>
                     <Link to='/admin/create/product'  className='nav-link text-success'>Create product</Link>
                 </li>
                 <li className='list-group-item'>
                     <Link to='/admin/create/orders'  className='nav-link text-success'>Manege Orders</Link>
                 </li>
             </ul>
               </div>
    )
}
const adminRightSide=()=>{
    return(
        <div className='card mb-4'>
                 <h4 className='card-header'>Admin Info</h4>
                 <ul className='list-group'>
                     <li className='list-group-item'>
                        <p> <span className='badge badge-success mr2'>Name:</span> {name}</p>
                     </li>
                     <li className='list-group-item'>
                        <p> <span className='badge badge-success mr2'>Email:</span> {email}</p>
                     </li>
                     <li className='list-group-item'>
                        <p> <span className='badge badge-danger mr2'>Admin Area</span> </p>
                     </li>
                 </ul>
        </div>
    )
};
    return (
       <Base title='AdminDashboard page' description='Manage your products here ' className='container bg-success p-4'>
           <h1>This is a Admin dashboard page</h1>
           <div className='row'>
          <div className='col-3'>
          {adminLeftSide()}

          </div>
          <div className='col-9'>
          {adminRightSide()}
          </div>
           </div>
           
          
          
       </Base>
    )
};

export default AdminDashboard;
