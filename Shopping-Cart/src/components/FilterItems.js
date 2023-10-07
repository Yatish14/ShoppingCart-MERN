import {Form,Button} from "react-bootstrap";
import "./FilterItems.css"
import { Ratings } from "./Ratings";
import { useContext } from "react";
import { FilterContext } from "../Context/ContextAPI";
export const FilterItems = () => {

  const {FilterState: {byStock,byFastDelivery,byRating,sort}, FilterDispatch} = useContext(FilterContext);
  return (
    <div className="filter">
        <span className="title">Filter Products</span>
        <span>
            <Form.Check 
              inline
              label="Ascending"
              name="order"
              type="radio"
              id={`inline-1`}
              onChange={() => FilterDispatch({type: "Sort_by_Price",payload: "asc"})}
              checked={sort === "asc" ? true : false}
            />
        </span>
        <span>
            <Form.Check 
              inline
              label="Descending"
              name="order"
              type="radio"
              id={`inline-2`}
              onChange={() => FilterDispatch({type: "Sort_by_Price",payload: "desc"})}
              checked={sort === "desc" ? true : false}
            />
        </span>
        <span>
            <Form.Check 
              inline
              label="Show Out of Stock"
              name="order"
              type="checkbox"
              id={`inline-3`}
              onChange={() => FilterDispatch({type: "Filter_by_Stock"})}
              checked={byStock}
            />
        </span>
        <span>
            <Form.Check 
              inline
              label="Fast Delivery"
              name="order"
              type="checkbox"
              id={`inline-4`}
              onChange={() => FilterDispatch({type: "Filter_by_FastDelivery"})}
              checked={byFastDelivery}
            />
        </span>
        <span>
            <label style={{ paddingRight: 5 }}>Rating : </label>
            <Ratings rating={byRating} onClick={(i)=> FilterDispatch({type: "Filter_by_Rating",payload: i+1})} style={{cursor: "pointer"}}/>
        </span>
        <Button
          onClick={() => FilterDispatch({type: "Clear_Filters"})}
        >
          Clear Filters
        </Button>
    </div>
  )
}