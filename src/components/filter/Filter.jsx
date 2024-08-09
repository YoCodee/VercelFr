import React, { useState } from 'react';
import "./Filter.scss";

const Filter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    city: '',
    title: '',
    minPrice: '',
    maxPrice: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleFilter = () => {
    onFilter(filters);
  };

  return (
    <div className='filter'>
      <h1>Search result for <b>Destinasi Bangka</b></h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input type="text" id='city' name='city' placeholder='City Location' onChange={handleChange} />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="title">Title</label>
          <input type="text" id='title' name='title' placeholder='any' onChange={handleChange} />
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input type="number" id='minPrice' name='minPrice' placeholder='any' onChange={handleChange} />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input type="number" id='maxPrice' name='maxPrice' placeholder='any' onChange={handleChange} />
        </div>
        <div className="item">
          <label htmlFor="address">Address</label>
          <input type="text" id='address' name='address' placeholder='any' onChange={handleChange} />
        </div>
        <button onClick={handleFilter}>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Filter;
