import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from './user/Signup'
import Signin from './user/Signin'
import AdminRoute   from "./auth/helper/AdminRoutes";
import PrivateRoute   from './auth/helper/PrivateRoutes'
import UserDashBoard from  './user/UserDashBoard'
import  AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from './admin/AddCategory'
import ManegeCategories from './admin/ManegeCategories'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategories";
import Cart from "./core/Cart";
import UpdateUser from "./user/helper/ManageUser";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute  path="/user/dashboard" exact component={UserDashBoard}/>
        <PrivateRoute  path="/user/dashboard/updateuser" exact component={UpdateUser}/>
        <AdminRoute  path="/admin/dashboard" exact component={AdminDashBoard }/>
        <AdminRoute  path="/admin/create/category" exact component={AddCategory }/>
        <AdminRoute  path="/admin/categories" exact component={ManegeCategories }/>
        <AdminRoute  path="/admin/create/product" exact component={AddProduct }/>
        <AdminRoute  path="/admin/products" exact component={ManageProducts }/>
        <AdminRoute  path="/admin/product/update/:productId" exact component={UpdateProduct }/>
        <AdminRoute  path="/admin/category/update/:categoryId" exact component={UpdateCategory }/>
         </Switch>
    </BrowserRouter>
  );
};

export default Routes;
