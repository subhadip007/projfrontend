import React,{Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import '../styles/nav.css'

const currentTab =(history,path)=>{
  if(history.location.pathname===path){
    return {color:'#2ecc72'}
  }else{
  return {color:'#FFFFFF'}
  }
} 


// <ul className="nav nav-tabs bg-dark">
// <li className="nav-item">
//   <Link  style={currentTab(history,'/')} className="nav-link" to="/">
//     Home
//   </Link>
// </li>
// <li className="nav-item">
//   <Link style={currentTab(history,'/cart')} className="nav-link" to="/cart">
//     Cart
//   </Link>
// </li>
// {isAutheticated() && isAutheticated().user.role===0 &&(
// <li className="nav-item">
//   <Link  style={currentTab(history,'/user/dashboard')} className="nav-link" to="/user/dashboard">
//     U.Dashboard
//   </Link>
// </li>
// )}
// {isAutheticated() && isAutheticated().user.role===1 &&(
//   <li className="nav-item">
//   <Link style={currentTab(history,'/admin/dashboard')} className="nav-link" to="/admin/dashboard">
//     A. Dashboard
//   </Link>
// </li>
// )}

// </ul>
// </div>

const Menu=({history})=>{



  return(
    <nav className="navbar navbar-light navbar-expand-md navigation-clean-button">
    <div className="container"><a className="navbar-brand" href="#">CuteTees</a><button data-toggle="collapse" data-target="#navcol-1" class="navbar-toggler"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="navbar-nav mr-auto">
                {/* <li className="nav-item"><a class="nav-link active" href="#">First Item</a></li>
                <li className="nav-item"><a class="nav-link" href="#">Second Item</a></li> */}
                <li className="nav-item">
   <Link  style={currentTab(history,'/')} className="nav-link" to="/">
     Home
   </Link>
 </li>
                <li className="nav-item">
                <Link style={currentTab(history,'/cart')} className="nav-link" to="/cart">
    <i class="fa fa-lg fa-shopping-cart"></i>
   </Link>
 </li>

            </ul>
            <span className="navbar-text">
            {isAutheticated() && isAutheticated().user.role===0 &&(

  
  <Link  style={currentTab(history,'/user/dashboard')} className="info"   to="/user/dashboard">
  <i class="fa fa-lg fa-user"></i>
  </Link>

)}
{isAutheticated() && isAutheticated().user.role===1 &&(
  
  <Link style={currentTab(history,'/admin/dashboard')} className="pr-4 active" to="/admin/dashboard">
  <i class="fas fa-lg fa-user-ninja"></i>
  </Link>

)}
            
            {!isAutheticated() &&
  (
    <div>
  
    <Link style={currentTab(history,'/signup')} className="btn btn-info action-button " to="/signup">
    
      Signup
     
    </Link>
  
  
  <span className="navbar-text">
  
    <Link style={currentTab(history,'/signin')} className="nav-link login" to="/signin">
    
      Sign In
      
    </Link>
    
  </span>
  </div>
  )}
  {isAutheticated() && (
    <span className='nav-item'>
       
         <Link
         className='btn action-button btn-danger  '
         onClick={() => {
           signout(()=>{
             history.push('/')
           })
         }}
         >
          Signout
         </Link>
         
      </span>
  )}

            
           
            </span>
        </div>
    </div>
</nav>
  )
}



{/* <li className="nav-item" ><Link className="login" >Log In</Link></li>
            <li className="nav-item" ><Link className="Signup" >Sign Up</a></Link></li> */}

export default withRouter(Menu);
