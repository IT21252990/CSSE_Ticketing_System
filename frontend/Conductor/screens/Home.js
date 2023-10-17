import { View, Text } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import COLORS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from 'react-native';

const Home = ({ navigation }) => {

  const [conductorName, setConductorName] = useState(null);

  function getuserdata() {
    AsyncStorage.getItem("conductorInfo")
      .then((value) => {
        if (value !== null) {
          const userData = JSON.parse(value);

          setConductorName(userData.conductorName);

        }
      })
      .catch((error) => {
        console.log("error fetching user ID");
      });
  }

  useEffect(() => {
    getuserdata();
  }, []);

  return (
    <>

      <LinearGradient
        style={{
          flex: 1,
        }}
        colors={["#ffffff", COLORS.secondary, "#ffffff"]}
      >
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: "#000000",
              marginTop: 70,
              marginLeft: 20,
            }}
          >
            Welcome
          </Text>

          <Text
            style={{
              fontSize: 50,
              fontWeight: 800,
              color: COLORS.tertinary,
              marginTop: 10,
              marginLeft: 170,
            }}
          >
            {conductorName} 👋🏻
          </Text>



          <Button
            title='Scan  Passangers  QR  Code'
            onPress={() => navigation.navigate("QRScanner")}
            filled
            style={styles.button} />
        </View>
      </LinearGradient></>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 350,
    borderColor: COLORS.darkGray,
    backgroundColor: COLORS.secondary,
    width:250,
    marginTop: 90,
    marginLeft:65,
    fontWeight: 'bold',
    fontSize: 30,
    padding:30, 
    textAlign: 'center',
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 10,
    shadowRadius: 6,
    elevation: 10, 
    textAlign: 'center', // Center text within the button
   
  },
});

export default Home;
