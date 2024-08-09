import { MapContainer , TileLayer, Marker, Popup} from 'react-leaflet'
import React from 'react'
import "./map.scss"
import "leaflet/dist/leaflet.css"
import Pin from '../pin/Pin'

const Map = ({items}) => {

    const position = [-2.12100736666531, 106.11150148638855]
  return (
    <MapContainer center={position} zoom={10} zoomControl={false} scrollWheelZoom={true} className='map'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {items.map(item=> (
      <Pin key={item.id} item={item}/>
    ))}

  </MapContainer>
  )
}

export default Map