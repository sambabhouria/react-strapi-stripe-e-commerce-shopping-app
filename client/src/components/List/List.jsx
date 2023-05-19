import React from "react";
import "./List.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";

const List = ({ subCats, maxPrice, sort, catId }) => {


// Find books with 2 possible dates and a specific author
// GET /api/books?filters[$or][0][date][$eq]=2020-01-01&filters[$or][1][date][$eq]=2020-01-02&filters[author][name][$eq]=Kai%20doe


// const { data: datta, error: err } = useFetch(
 
//   `/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
//     (item) => `&[filters][sub_categories][id][$eq]=${item}`
//   )}&[filters][price][$lte]=${maxPrice}`
// );
//   console.log("🚀 ~ file: List.jsx:18 ~ List ~ datta:", datta)
//   console.log("🚀 ~ file: List.jsx:14 ~ List ~ err:", err)
  
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  );

  if(error ) return <h1>Error in List jsx</h1>

  return (
    <div className="list">
      {loading
        ? "loading"
        : data?.map((item) => <Card item={item} key={item.id} />)}
    </div>
  );
};

export default List;