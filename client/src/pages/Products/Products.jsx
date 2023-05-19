import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import useFetch from "../../hooks/useFetch";
import "./Products.scss";

const Products = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(1000);

  // Error: Invalid order. order can only be one of asc|desc|ASC|DESC  
  // default value most be:  asc|desc|ASC|DESC  
  const [sort, setSort] = useState("asc");
  const [selectedSubCats, setSelectedSubCats] = useState([]);

  // console.log("🚀 ~ file: Products.jsx:10 ~ Products ~ catId:", catId)
  // console.log("🚀 ~ file: Products.jsx:17 ~ Products ~ process.env.REACT_APP_API_TOKEN:", process.env.REACT_APP_API_TOKEN)


// Find multiple restaurants with ids 3, 6, 8
// GET /api/restaurants?filters[id][$in][0]=3&filters[id][$in][1]=6&filters[id][$in][2]=8

  // example of custom filter :
  // :sub-category.sub-category?page=1&pageSize=10&sort=title:ASC
  // GET /api/books?filters[$or][0][date][$eq]=2020-01-01&filters[$or][1][date][$eq]=2020-01-02&filters[author][name][$eq]=Kai%20doe


  // Find books with 2 possible dates and a specific author
  //  GET /api/books?filters[$or][0][date][$eq]=2020-01-01&filters[$or][1][date][$eq]=2020-01-02&filters[author][name][$eq]=Kai%20doe

  // work 
  // const { data: subCategories } = useFetch(
  //   `/sub-categories?populate=*`
  // );



  const { data, loading, error } = useFetch(
    `/sub-categories?[filters][categories][id][$eq]=${catId}`
  );

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };


  if(error) return <h1>Error :( </h1>

  return (
    
    <div className="products">

      {loading
        ? "loading" :
        <>
        <div className="left">
            <div className="filterItem">
              <h2>Product Categories</h2>
              {data?.map((item) => (
                <div className="inputItem" key={item.id}>
                  <input
                    type="checkbox"
                    id={item.id}
                    value={item.id}
                    onChange={handleChange} />
                  <label htmlFor={item.id}>{item.attributes.title}</label>
                </div>
              ))}
            </div>
            <div className="filterItem">
              <h2>Filter by price</h2>
              <div className="inputItem">
                <span>0</span>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  onChange={(e) => setMaxPrice(e.target.value)} />
                <span>{maxPrice}</span>
              </div>
            </div>
            <div className="filterItem">
              <h2>Sort by</h2>
              <div className="inputItem">
                <input
                  type="radio"
                  id="asc"
                  value="asc"
                  name="price"
                  onChange={(e) => setSort("asc")} />
                <label htmlFor="asc">Price (Lowest first)</label>
              </div>
              <div className="inputItem">
                <input
                  type="radio"
                  id="desc"
                  value="desc"
                  name="price"
                  onChange={(e) => setSort("desc")} />
                <label htmlFor="desc">Price (Highest first)</label>
              </div>
            </div>
            </div>
            <div className="right">
              <img
                className="catImg"
                src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="" />
              <List catId={catId} maxPrice={maxPrice} sort={sort} subCats={selectedSubCats} />
            </div>
          </>
}
    </div>
  );
};

export default Products;