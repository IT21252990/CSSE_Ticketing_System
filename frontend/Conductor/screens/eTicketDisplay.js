import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
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
  const [credits, setCredits] = useState(null);

  const {
    userId,
    startLocation,
    endLocation,
    pricePerTicket,
    ticketQuantity,
    totalPrice
  } = route.params;

  const totalPriceAsNumber = parseFloat(totalPrice);
  const creditsAsNumber = parseFloat(credits);

  const UserCredits = ({ userId }) => {

    useEffect(() => {
      const fetchCredits = async () => {
        try {
          const response = await fetch(`http://localhost:4000/users/${userId}/credits`);
          const data = await response.json();
          if (response.ok) {
            setCredits(data.credits);
          } else {
            console.error('Error:', data.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchCredits();
    }, [userId]);
  }

  const handleCreateTicket = async (e) => {
    if (creditsAsNumber < totalPriceAsNumber) {
      Alert.alert(
        "Insufficient Credits",
        "You don't have enough credits to purchase this ticket."
      );
      return;
    }

    else {
      try {
        const response = await fetch("http://192.168.78.186:4000/ticket/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            startLocation,
            endLocation,
            pricePerTicket,
            ticketQuantity,
            totalPrice,
          }),
        });

        if (response.ok) {
          Alert.alert("Ticket sent successfully");
        } else {
          console.log(response);
          Alert.alert("Failed to send ticket");
        }
      } catch (error) {
        console.error("Error:", error);
        Alert.alert("An error occurred");
      }
    }
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
            onPress={() => {
              const ticketInfo = `UserId: ${userId}\n
                                  Start Location: ${startLocation}\n
                                  End Location: ${endLocation}\n
                                  Price Per Ticket: ${pricePerTicket}\n
                                  Ticket Quantity: ${ticketQuantity}\n
                                  Total Price: ${totalPrice}`;
              setQrvalue(ticketInfo);
              handleCreateTicket();
            }}
          >
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
