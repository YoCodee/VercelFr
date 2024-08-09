import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from '@react-pdf/renderer';
import axios from 'axios';

import './CardHasil.scss';
import JsBarcode from 'jsbarcode';

const generateBarcode = (text) => {
  const canvas = document.createElement('canvas');
  JsBarcode(canvas, text, {
    format: 'CODE128',
    displayValue: false,
    height: 50,
  });
  return canvas.toDataURL('image/png');
};

const PDFDocument = ({ booking }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      backgroundColor: '#F5F5F5',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    logo: {
      width: 85,
      height: 85,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
    },
    customerInfo: {
      marginBottom: 20,
      gap: 7,
    },
    bookingDetails: {
      textAlign: 'right',
      gap: 7,
    },
    table: {
      display: 'table',
      width: 'auto',
      borderStyle: 'solid',
      borderColor: '#bfbfbf',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: 'auto',
      flexDirection: 'row',
    },
    tableColHeader: {
      width: '25%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#bfbfbf',
      borderLeftWidth: 0,
      borderTopWidth: 0,
      backgroundColor: '#F2F2F2',
    },
    tableCol: {
      width: '25%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#bfbfbf',
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCellHeader: {
      margin: 5,
      fontSize: 12,
      fontWeight: 'bold',
    },
    tableCell: {
      margin: 5,
      fontSize: 10,
    },
    total: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 10,
    },
    footer: {
      marginTop: 20,
      textAlign: 'center',
    },
    barcode: {
      marginTop: 10,
      textAlign: 'center',
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src="/Untitled design (7).png" style={styles.logo} />
          <View>
            <Text style={styles.title}>Invoice Booking</Text>
            <Text>Invoice Number: {booking?.bookingCode}</Text>
            <Text>Date: {new Date().toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.customerInfo}>
          <Text>Customer Information:</Text>
          <Text>Name: {booking?.name}</Text>
          <Text>Email: {booking?.userId?.email}</Text>
          <Text>Phone: {booking?.phone}</Text>
        </View>

        <View style={styles.bookingDetails}>
          <Text>Booking Date: {new Date(booking?.bookingDate).toLocaleDateString()}</Text>
          <Text>Visit Date: {new Date(booking?.visitDate).toLocaleDateString()}</Text>
          <Text>Package: {booking?.packageId?.name}</Text>
          <Text>Number of People: {booking?.numberOfPeople}</Text>
          <Text>Total Days: {booking?.TotalDays}</Text>
          <Text>Booking Code: {booking?.bookingCode}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Item</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Quantity</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Price</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Total</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{booking?.packageId?.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{booking?.numberOfPeople}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {booking.totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {booking.totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.total}>
          <Text>Total Price:
            {booking.totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>Additional Notes:</Text>
          <Text>{booking?.additionalNotes.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
        </View>

        <View style={styles.footer}>
          <Text>Thank you for your business!</Text>
          <Text>Terms and Conditions apply.</Text>
        </View>

        <View style={styles.barcode}>
          <Image src={generateBarcode(booking?.bookingCode)} />
        </View>
      </Page>
    </Document>
  );
};

const CardHasil = ({ item,onDelete }) => {
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDelete = async () => {
    try{
      await axios.delete(`https://vercelhs.vercel.app/api/booking/${item._id}`)
      onDelete(item.id);
      window.location.replace('/')
      setIsModalOpen(false);
    } catch(error) {
      console.error("Error deleting the post", error);
    }

  }

  return (
    <div className='Card'>
      <div className='imageContainer'>
      {item.postId.images?.length > 0 ? (
          <img src={item.postId.images[0]} alt={item.title} />
        ) : (
          <img src="/default-image.png" alt="Default" />
        )}
      </div>
      <div className="textContainer">
        <h2 className='text-2xl font-bold'>
          {item.bookingCode}
        </h2>
        <p className='address'>
          <img src="/pin.png" alt="" />
          {item.postId.city}, {item.postId.address}
        </p>
        <p className='price'>Rp. {item.totalPrice.toLocaleString('id-ID')}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              {item && item.status === "Pending" ? (
                <span className='bg-gray-500 text-white px-3 py-2 border-none'> {item.status}</span>
              ) : (
                <span className='bg-cyan-600 text-white px-3 py-2 border-none'> {item.status}</span>
              )}
            </div>
          </div>
          <div className="icons">
            {item && item.status === "Pending" ? (
              <div className="icons bg-gray-500 px-3 py-1 text-white border-none ">
                <h1>View PDF</h1>
              </div>
            ) : (
              <PDFDownloadLink document={<PDFDocument booking={item} />} fileName={item.bookingCode}>
                {({ loading }) => (
                  <div className="icons bg-cyan-500 text-white px-3 py-2 border-none">
                    <h1>{loading ? 'Loading document...' : 'View PDF'}</h1>
                  </div>
                )}
              </PDFDownloadLink>
            )}
            <Link to={`/bookingUpdate/${item._id}?postId=${item.postId._id}`}>
              <div className="icon bg-cyan-500 text-white px-3 py-2 border-none">
                <h1>Update</h1>
              </div>
            </Link>
            <div className="bg-red-500 text-white h-max px-3 py-3  border-none cursor-pointer" onClick={() => setIsModalOpen(true)}>
                <img src="/delete-32.png" alt="" />
            </div>
          </div>
          {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="text-center p-5 flex-auto justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <h2 className="text-xl font-bold py-4">Are you sure?</h2>
              <p className="text-sm text-gray-500 px-8">Do you really want to delete this booking? This process cannot be undone.</p>
            </div>
            <div className="p-3 mt-2 text-center space-x-4 md:block">
              <button className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600 cursor-pointer" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
       
        </div>
      
      </div>
    </div>
  );
};

export default CardHasil;
