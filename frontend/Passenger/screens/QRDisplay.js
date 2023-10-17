import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";
import { useRoute } from "@react-navigation/native";

const QRDisplay = ({ navigation }) => {
  const [qrvalue, setQrvalue] = useState(null); // Initialize as null
  const [showQR, setShowQR] = useState(false); // Tracks whether to show the QR code
  const route = useRoute();

  const {
    start_route,
    end_route,
    p_Id,
    p_Fname,
    p_Lname,
    ticket_quantity,
    price_per_ticket,
    total_price,
  } = route.params;

  const generateQRCode = () => {
    setQrvalue(
      `Passenger ID: ${p_Id}\n
      Passenger Name: ${p_Fname} ${p_Lname}\n
      Journey Start Location: ${start_route}\n
      Journey End Location: ${end_route}\n
      Ticket Price : LKR. ${price_per_ticket}\n
      Ticket Quantity : ${ticket_quantity}\n
      Total Price : LKR. ${total_price}\n`
    );
    setShowQR(true); // Show the QR code when generated
  };

  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.primary, COLORS.tertinary]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 5, marginTop: 10 }}
          >
            <Text
              style={{
                fontSize: 18,
                position: "absolute",
                marginLeft: 20,
                marginTop: 2,
              }}
            >
              Back
            </Text>
            <MaterialIcons
              name="keyboard-arrow-left"
              size={24}
              color={COLORS.black}
            />
          </TouchableOpacity>
          <Text style={styles.maintitleStyle}>Your Journey Ticket</Text>
          <Text style={styles.titleStyle2}>Please Waiting for Conductor</Text>
          <Text style={styles.titleStyle}>
            📌 Passenger Name : {p_Fname} {p_Lname}
          </Text>
          <Text style={styles.titleStyle}>
            📌 Journey : {start_route} to {end_route}
          </Text>
          <Text style={styles.titleStyle}>
            📌 Ticket Price per Person : LKR. {price_per_ticket}
          </Text>
          <Text style={styles.titleStyle}>
            📌 Ticket Quantity : {ticket_quantity}
          </Text>
          <Text style={styles.titleStyle}>
            📌 Total Amount : LKR. {total_price}
          </Text>
          <TouchableOpacity style={styles.buttonStyle} onPress={generateQRCode}>
            <Text style={styles.buttonTextStyle}>Generate QR Code</Text>
          </TouchableOpacity>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            {showQR && qrvalue && (
              <QRCode
                value={qrvalue}
                size={250}
                color="black"
                backgroundColor="white"
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default QRDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  maintitleStyle: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    marginBottom: 20,
    marginTop: 10,
    fontWeight: "bold",
  },
  titleStyle2: {
    fontSize: 25,
    textAlign: "center",
    margin: 5,
    marginBottom: 50,
  },
  titleStyle: {
    fontSize: 18,
    margin: 10,
    marginBottom: 10,
    marginLeft: 50,
  },
  textStyle: {
    textAlign: "center",
    margin: 10,
  },
  buttonStyle: {
    marginLeft: "20%",
    paddingBottom: 16,
    paddingVertical: 10,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 4,
    borderColor: COLORS.tertinary,
    backgroundColor: COLORS.primary,
    width: "60%",
  },
  buttonTextStyle: {
    color: COLORS.darkGray,
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
});
