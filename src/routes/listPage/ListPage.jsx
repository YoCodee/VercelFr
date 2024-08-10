import React, { useState, useEffect } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import Card from "../../components/card/Card.jsx";
import Filter from "../../components/filter/Filter.jsx";
import Map from "../../components/map/Map.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import "../listPage/listPage.scss";
import Pagination from '../../components/Pagination/Pagination';

const ListPage = () => {
  const { postResponse } = useLoaderData();
  const [filteredPosts, setFilteredPosts] = useState(postResponse);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const location = useLocation();

  // Get query parameters
  const queryParams = new URLSearchParams(location.search);
  const searchLocation = queryParams.get('location') || '';
  const searchDate = queryParams.get('date') || '';

  useEffect(() => {
    if (searchLocation || searchDate) {
      handleFilter({ city: searchLocation, title: '', minPrice: '', maxPrice: '', address: '' });
    }
  }, [searchLocation, searchDate]);

  const handleFilter = (filters) => {
    const { city, title, minPrice, maxPrice, address } = filters;

    const filtered = postResponse.filter(post => {
      return (
        (city === '' || post.city.toLowerCase().includes(city.toLowerCase())) &&
        (title === '' || post.title.toLowerCase().includes(title.toLowerCase())) &&
        (minPrice === '' || post.price >= parseFloat(minPrice)) &&
        (maxPrice === '' || post.price <= parseFloat(maxPrice)) &&
        (address === '' || post.address.toLowerCase().includes(address.toLowerCase()))
      );
    });

    setFilteredPosts(filtered);
  };

  // Pagination logic
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Transform and filter posts to ensure they have valid latitude and longitude
  const transformedPosts = currentPosts.map(post => ({
    ...post,
    lat: post.Latitude,
    lng: post.Longitude,
  }));

  const validPosts = transformedPosts.filter(post => post.lat !== undefined && post.lng !== undefined);

  return (
    <>
    
    <div className="App">
    <Navbar />
      <div className="listPage pl-4">
        <div className="listContainer">
          <div className="wrapper">
            <Filter onFilter={handleFilter} />
            {currentPosts.map(post => (
              <Card key={post.id} item={post} />
            ))}
                <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredPosts.length}
          onPageChange={setCurrentPage}
        />
          </div>
        </div>
        <div className="mapContainer">
          <Map items={validPosts} />
        </div>
    
      </div>
    </div>
    </>
  );
};

export default ListPage;
