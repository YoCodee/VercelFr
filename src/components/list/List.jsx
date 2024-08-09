import React, { useState } from 'react';
import { listData } from '../../lib/dummyData';
import CardHasil from '../CardHasil/CardHasil';
import "./List.scss";

const List = ({ currentPage, itemsPerPage ,bookings}) => {
    // Calculate the indices of the first and last item on the current page
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    
    // Slice the data array to get only the items for the current page
    const currentItems = listData.slice(startIdx, endIdx);
    const [items, setItems] = useState(bookings);
    const handleDelete = (id) => {
        setItems(items.filter(item => item.id !== id));

    };
    return (
        <div className='list'>
            {bookings.map((item) => (
                <CardHasil key={item.id} item={item} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default List;
