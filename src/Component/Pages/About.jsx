import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductPaginate, getProduct } from "../Redux/Crud/productslice";
import { getCategory, getProductByCategory } from "../Redux/Crud/categoryslice";
import { filterByTitle } from "../Redux/Crud/filterslice";
import RangeSlider from "../range-slider/RangeSlider";

export default function About() {
  const dispatch = useDispatch();

  const { products } = useSelector((i) => i.product);
  const { categories, caregoryList } = useSelector((i) => i.category);
  const { filterProducts } = useSelector((i) => i.filter);
  // console.log(filterProducts, "filters");
  // console.log(categories, "categories");
  const [offset, setOffset] = useState(5);
  const [limit, setLimit] = useState(10);
  const [currentProducts, setCurrentProducts] = useState([]);

  useEffect(() => {
    // dispatch(getProduct());
    dispatch(getCategory({ offset, limit }));
    dispatch(ProductPaginate({ offset, limit }));
    dispatch(getProductByCategory({id:-1,offset,limit}));
  }, [getProduct, getCategory, ProductPaginate, offset, limit]);

  useEffect(() => {
    if (filterProducts.length) {
      setCurrentProducts(filterProducts);
    } else if (caregoryList.length) {
      setCurrentProducts(caregoryList);
    } else {
      setCurrentProducts(products);
    }
  }, [caregoryList, products, filterProducts]);

  const onClickCategory = useCallback((e) => {
    let id = e.target.value;
    dispatch(getProductByCategory({id,offset,limit}));

  },[offset,limit])
  const [val, setVal] = useState("");

  const nextPage = () => {
    setOffset(offset + limit);

  };
  const prevPage = () => {
    if (offset <= 5) {
      setOffset(offset);
    } else {
      setOffset(offset - limit);
    }


  };
  return (
    <div className="container">
      <h1>All products</h1>
      <select onChange={onClickCategory}>
        {categories.map((data) => (
          <option value={data.id}>{data.name}</option>
        ))}
      </select>
     <RangeSlider/>
      <div className="search">
        <input
          type="text"
          placeholder="search"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            dispatch(filterByTitle(e.target.value));
          }}
        />
      </div>
      {/* <button onClick={onClickCategory} >Select</button> */}
      <div className="row g-3">
        {currentProducts.map((data) => (
          <div className="col-md-3">
            <figure>
              <img src={data.images[0]} alt="" />
            </figure>
            <h4>{data.title}</h4>
            <p>{data.description}</p>
            <span><strong>Price:-</strong>  {data.price}$</span>
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={prevPage}>
              Previous
            </button>
          </li>

          <li className="page-item">
            <button className="page-link" onClick={nextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
