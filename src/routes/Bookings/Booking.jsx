import React from 'react'
import BookingTable from '../../components/BookingTable/BookingTable'
import Navbar from '../../components/navbar/Navbar'

const Booking = () => {
  return (
    <>
    <Navbar/>
<div className="container flex flex-col mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Booking Management</h1>
      <BookingTable />
    </div>
    </>
  )
}

export default Booking