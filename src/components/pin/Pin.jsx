import React from 'react'
import "./pin.scss"
import { Link } from 'react-router-dom'
import { Marker, Popup } from 'react-leaflet'

const Pin = ({item}) => {
  return (
    <Marker position={[item.Latitude, item.Longitude]}>
      <Popup>
        <div className="popupContainer">
        <img src={item.images[0]} alt={item.title} />
            <div className="textContainer">
                <Link to={`/${item.id}`}>{item.title}</Link>
                <span >{item.bedRooms} bedroom</span>
                <b>$ {item.price}</b>
            </div>
        </div>
      </Popup>
    </Marker>
  )
}

export default Pin