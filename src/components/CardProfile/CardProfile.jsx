import React, {useState}from 'react'
import Card from '../card/Card'
import { useLoaderData } from 'react-router-dom';

const CardProfile = ({ currentPage, itemsPerPage ,post}) => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const { postResponse } = useLoaderData();
    console.log(postResponse)
    const transformedPosts = postResponse.map(post => ({
        ...post,
        lat: post.Latitude,
        lng: post.Longitude,
      }));
    
      const validPosts = transformedPosts.filter(post => post.lat !== undefined && post.lng !== undefined);
    // Slice the data array to get only the items for the current page
    const currentItems = post.slice(startIdx, endIdx);

    const [items, setItems] = useState(postResponse);


    const handleDelete = (id) => {
        setItems(items.filter(item => item.id !== id));

    };
    return (
    <div className='list'>
        {post.map(post => (
          <Card key={post.id} item={post} onDelete={handleDelete}  />
         ))}
    </div>
  )
}

export default CardProfile