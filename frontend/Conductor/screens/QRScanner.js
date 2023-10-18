import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Button from "../components/Button";
import COLORS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";


export default function QRScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')
  const [passengerName, setPassengerName] = useState('')
  const [startLocation, setStartLocation] = useState('')
  const [endLocation, setEndLocation] = useState('')
  const [ticketPrice, setTicketPrice] = useState('')
  const [ticketQuantity, setTicketQuantity] = useState('')
  const [totalPrice, setTotalPrice] = useState('')

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    handleQRScanned(data); // Call the function to handle the scanned data
  };

  const handleQRScanned = (scannedData) => {
    const lines = scannedData.split('\n'); // Split the data into lines

    const passengerId = lines[0].split(': ')[1]; // Extract passenger ID
    const passengerName = lines[2].split(': ')[1]; // Extract passenger Name
    const startLocation = lines[4].split(': ')[1]; // Extract start location
    const endLocation = lines[6].split(': ')[1]; // Extract end location
    const ticketPrice = lines[8].split(': ')[1]; // Extract ticket price
    const ticketQuantity = lines[10].split(': ')[1]; // Extract ticket quantity
    const totalPrice = lines[12].split(': ')[1]; // Extract total price

    console.log('Passenger ID:', passengerId);
    console.log('Passenger Name:', passengerName);
    console.log('Start Location:', startLocation);
    console.log('End Location:', endLocation);
    console.log('Ticket Price:', ticketPrice);
    console.log('Ticket Quantity:', ticketQuantity);
    console.log('Total Price:', totalPrice);

    setPassengerName(passengerName);
    setStartLocation(startLocation);
    setEndLocation(endLocation);
    setTicketPrice(ticketPrice);
    setTicketQuantity(ticketQuantity);
    setTotalPrice(totalPrice);

  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  // Return the View
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['#ffffff', COLORS.secondary, '#ffffff']} // Customize the colors as needed
    >
      <View style={styles.container}>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 600, width: 600 }} />
        </View>
        {/* <Text style={styles.maintext}>{text}</Text> */}

        {scanned && (<><Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' style={{
          height: 70,
          width: 200,
          marginTop: 30,
          marginBottom: 4,
          backgroundColor: COLORS.primary,
        }} />
          <Button
            title="DONE"
            onPress={() => navigation.navigate("QRScannedDetails",{
                userId:"652cd67e91bbf39b53498639",
                startLocation: {startLocation},
                endLocation: {endLocation},
                pricePerTicket: {ticketPrice},
                ticketQuantity: {ticketQuantity},
                totalPrice: {totalPrice}
            })}
            testID='scan-again-button'
            filled
            style={{
              height: 60,
              width: 120,
              marginTop: 30,
              marginBottom: 4,
              backgroundColor: COLORS.secondary,
              borderColor: COLORS.darkGray,
              shadowColor: COLORS.secondary,
              shadowOffset: {
                width: 4,
                height: 4,
              },
              shadowOpacity: 10,
              shadowRadius: 6,
              elevation: 10,

            }} /></>

        )}



      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 600,
    width: 600,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: COLORS.secondary
  }
});