import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,

  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import QRCode from 'react-native-qrcode-svg';
import { useRoute } from '@react-navigation/native';
import { useParams } from 'react-router-native';


const QRDisplay = ({ navigation }) => {
  const [inputText, setInputText] = useState('');
  const [qrvalue, setQrvalue] = useState('');
  const route = useRoute();

  const {
    userId,
    startLocation,
    endLocation,
    pricePerTicket,
    ticketQuantity,
    totalPrice
  } = route.params;


  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.primary, COLORS.tertinary]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.titleStyle}>
            E Ticket
          </Text>

          <Text style={styles.infoText}>
            Start Location: {startLocation}
          </Text>
          <Text style={styles.infoText}>
            End Location: {endLocation}
          </Text>
          <Text style={styles.infoText}>
            Total Price: {totalPrice}
          </Text>


          <QRCode
            value={qrvalue ? qrvalue : 'NA'}
            size={250}
            color="black"
            backgroundColor="white"
          // testID="qr-code" 
          />

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => setQrvalue(`UserId: ${userId}\nStart Location: ${startLocation}\nEnd Location: ${endLocation}\nPrice Per Ticket: ${pricePerTicket}\nTicket Quantity: ${ticketQuantity}\nTotal Price: ${totalPrice}`)}>
            <Text style={styles.buttonTextStyle}>
              SEND
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default QRDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  titleStyle: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    marginBottom: 20
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
  },

  buttonStyle: {
    backgroundColor: COLORS.darkGray,
    borderWidth: 0,
    color: COLORS.lightOrange,
    borderColor: COLORS.primary,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
    width: 100,
    justifyContent: 'center',
    textAlign: 'center'
  },
  infoContainer: {
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.darkGray,
  },
});
