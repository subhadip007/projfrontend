import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    lastname:"",
    email: "",
    password:"",
    phnumber:"",
    address1:"",
    address2:"",
    postalcode: "",
    error: "",
    success: false
  });
  const [field,setField]= useState("password");
  const { name,lastname,email,password,phnumber,address1,address2,postalcode,error, success } = values;

  //for changing the state of each value
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    
   
    signup({ name,lastname,phnumber, email,password,postalcode,address1,address2 })  //this signup has been brought from the  helper
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            lastname:"",
            email: "",
            password:"",
            password1:"",
            phnumber:"",
            address1:"",
            address2:"",
            postalcode: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
    
  };

let myFunction=()=>
{
    if(field=="password"){
      setField("text")
    }else{
      setField("password")
    }
   
  }
  
  const signUpForm = () => {
    return (
      <form>
      <div className="row">
     
        <div className="col-6  text-left">
          
            <div className="form-group">
              <label className="text-light">Name(Username)<span style={{color:"red"}}>*</span></label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Last Name</label>
              <input
                className="form-control"
                onChange={handleChange("lastname")}
                type="text"
                value={lastname}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email<span style={{color:"red"}}>*</span></label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password<span style={{color:"red"}}>*</span></label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type={field}
                value={password}
              />
              <input type="checkbox" onClick={myFunction}/>Show Password
            </div>
            </div>
            <div className="col-6  text-left">
            <div className="form-group">
              <label className="text-light">Phone Number<span style={{color:"red"}}>*</span></label>
              <input
                className="form-control"
                onChange={handleChange("phnumber")}
                type="text"
                value={phnumber}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Address 1<span style={{color:"red"}}>*</span></label>
              <input
                className="form-control"
                onChange={handleChange("address1")}
                type="text"
                value={address1}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Address2</label>
              <input
                className="form-control"
                onChange={handleChange("address2")}
                type="text"
                value={address2}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Postal Code<span style={{color:"red"}}>*</span></label>
              <input
                className="form-control"
                onChange={handleChange("postalcode")}
                type="text"
                value={postalcode}
              />
            </div>
            
          
        </div>
        <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
      </div>
      </form>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signup;
