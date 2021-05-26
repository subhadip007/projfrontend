import React,{useState,useEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProduct } from "./helper/coreapicalls";
import { getCategories } from "../admin/helper/adminapicall";


export default function Home() {
  
const [products, setProducts] = useState([])
const [categories, setCategories] = useState([])

const [error,setError]= useState(false)
const [cate,setCate]=useState("All");
const loadAllProduct=()=>{
  getProduct().then(data=>{
    if(data.error){
      setError(data.error)
    }else if(cate=="All"){
      setProducts(data)
    }else{
      console.log(cate)
      let val=data.filter(prod=>prod.category.name == cate)
      setProducts(val)
      
    }
  })
}
const loadAllCategory=()=>{
  getCategories().then(data=>{
   
   
    if(data.error){
      setError(data.error)
    }else{
      setCategories(data)
    }
  })
}

const handleVal=e=>{

 setCate(e.target.value) 

}
useEffect(()=>{
loadAllProduct()
loadAllCategory()

},[cate])

return (
    <Base>
    <p>Sort By Category</p>
    <select onChange={handleVal} className="btn bg-info filter">
    <option className="ng-success" value={"All"}>All</option>
      {
        categories.map((category,index)=>(
<option className="bg-success" key={index}  value={category.name}>{category.name}</option>
        ))
      }
    </select>
      <div className="row  text-center">
      {
        
        
        <div className='row'>{products.map((product,index)=>{
         
         
          return(

           
            <div key={index} className='col mb-4'>
            
              <Card product={product} className="card"/>
            </div>
          )
        })}</div>}
      </div>
    

    
    </Base>
  );
}
