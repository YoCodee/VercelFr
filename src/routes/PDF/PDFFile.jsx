import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from '@react-pdf/renderer';
import numeral from 'numeral';

const PDFFile = () => {
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
  });

  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/bookingById/${id}`)
        .then((response) => {
          setBooking(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching booking:', error);
          setLoading(false);
        });
    }
  }, [user, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!booking) {
    return <div>No booking found</div>;
  }

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src="../public/Untitled design (7).png" style={styles.logo} />
          <View>
            <Text style={styles.title}>Invoice Booking</Text>
            <Text>Invoice Number: {booking?.bookingCode}</Text>
            <Text>Date: {new Date().toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.customerInfo}>
          <Text>Customer Information:</Text>
          <Text>Name: {booking?.name}</Text>
          <Text>Email: {booking?.user?.email}</Text>
          <Text>Phone: {booking?.phone}</Text>
         
        </View>
        <View style={styles.bookingDetails}>
        <Text>Booking Date: {new Date(booking?.bookingDate).toLocaleDateString()}</Text>
          <Text>Visit Date: {new Date(booking?.visitDate).toLocaleDateString()}</Text>
          <Text>Package: {booking?.package?.name}</Text>
          <Text>Number of People: {booking?.numberOfPeople}</Text>
          <Text>Total Days: {booking?.TotalDays}</Text>
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
              <Text style={styles.tableCell}>{booking?.package?.name}</Text>
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
      </Page>
    </Document>
  );

  return (
    <div>
      <PDFDownloadLink document={<MyDocument />} fileName="booking.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download PDF'
        }
      </PDFDownloadLink>
    </div>
  );
};

export default PDFFile;
