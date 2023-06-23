import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../Redux/Crud/productslice";
import { getCategory, getProductByCategory } from "../Redux/Crud/categoryslice";
import { filterByTitle } from "../Redux/Crud/filterslice";

export default function About() {
  const dispatch = useDispatch();

  const { products } = useSelector((i) => i.product);
  const { categories,caregoryList } = useSelector((i) => i.category);
  const{filterProducts} = useSelector(i => i.filter)
  console.log(filterProducts,"filters");
  // console.log(categories, "categories");

  const [currentProducts,setCurrentProducts] = useState([])

  

  // console.log(products,"products");

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCategory());

   
  }, [getProduct, getCategory]);

  useEffect(()=>{
    if( filterProducts.length){
      setCurrentProducts(filterProducts)
    }else if(caregoryList.length ){
      setCurrentProducts(caregoryList)
    }else{
      setCurrentProducts(products)
    }
  },[caregoryList,products,filterProducts])

  const onClickCategory = (e) => {
      let val = e.target.value
       dispatch(getProductByCategory(val))
 
 
  };
  const [val,setVal] = useState("")

  return (
    <>
      <h1>All products</h1>
      <select onChange={onClickCategory}>
        {categories.map((data) => (
          <option value={data.id}>{data.name}</option>
        ))}
      </select>
      <div className="search">
        <input type="text" placeholder="search" value={val} onChange={(e)=>{setVal(e.target.value); dispatch(filterByTitle(e.target.value))}}  />
      
      </div>
      {/* <button onClick={onClickCategory} >Select</button> */}
      <div className="row">
        {currentProducts.map((data) => (
          <div className="col-md-3">
            <figure>
              <img src={data.images[0]} alt="" />
            </figure>
            <h4>{data.title}</h4>
            <p>{data.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
