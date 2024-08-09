import React, { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("https://vercelhs.vercel.app/api/booking");
      return response.data;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  };

  const updateBookingStatus = async (bookingId) => {
    try {
        console.log("Updating status for booking ID:", bookingId);
        const response = await axios.put(`https://vercelhs.vercel.app/api/booking/${bookingId}/status`, { status: "Successfully" });
        return response.data;
    } catch (error) {
        console.error("Error updating booking status:", error.response ? error.response.data : error.message);
        throw error;
    }
};

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBookings();
      setBookings(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (bookings.length) {
      $('#bookingTable').DataTable();
    }
  }, [bookings]);

  const handleStatusChange = async (bookingId) => {
    if (!bookingId) {
        console.error("Booking ID is undefined or null");
        return;
    }

    try {
        const updatedBooking = await updateBookingStatus(bookingId);
        setBookings((prevBookings) =>
            prevBookings.map((booking) =>
                booking.id === bookingId ? updatedBooking : booking
            )
        );
        window.location.replace('/BookingTable');
    } catch (error) {
        console.error("Error updating booking status:", error);
    }
};

  return (
    <div className="overflow-x-auto">
      <table id="bookingTable" className="display min-w-full bg-white">
        <thead>
          <tr>
            <th>BookingId</th>
            <th>Name</th>
            <th>No Hp</th>
            <th>Booking Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.bookingCode}</td>
              <td>{booking.name}</td>
              <td>{booking.phone}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.totalPrice}</td>
              <td>{booking.status}</td>
              <td>
                {booking.status === "Pending" && (
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => handleStatusChange(booking._id)}
                  >
                    Mark as Successfully
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
