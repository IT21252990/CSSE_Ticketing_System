import { View, Text } from "react-native";
import COLORS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import NewJourney from './NewJourney'
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useRef } from "react";



const Home = ({ navigation }) => {
  const [passengerId, setPassengerId] = useState(null);
  const [PassengerFirstName, setPassengerFirstName] = useState(null);
  const [PassengerlastName, setPassengerLastName] = useState(null);


  function getuserdata() {
    AsyncStorage.getItem("passengerInfo")
      .then((value) => {
        if (value !== null) {
          const userData = JSON.parse(value);
          setPassengerId(userData._id);
          setPassengerFirstName(userData.firstName);
          setPassengerLastName(userData.lastName);
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
      <View style={{width:"100%" , height:80, backgroundColor:COLORS.secondary,position:"absolute",marginTop:32}}>

      </View>
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: "#000000",
              marginTop: 50,
              marginLeft: 20,
            }}
          >
            Welcome !! 
          </Text>

          <Text
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#000000",
              marginTop: 30,
              marginLeft: 100,
            }}
          >
            {PassengerFirstName} {PassengerlastName}
          </Text>

          <Button
            title="NEW JOURNEY"
            onPress={() => navigation.navigate("NewJourney")}
            filled
            style={{
              height: 100,
              marginTop: 150,
              marginBottom: 4,
              borderColor: COLORS.tertinary,
            }} />

          <Button
            title="HISTORY"
            onPress={() => navigation.navigate("Home")}
            filled
            style={{
              height: 100,
              marginTop: 18,
              marginBottom: 4,
              borderColor: COLORS.tertinary,
            }} />

          <Button
            title="TIME TABLES"
            onPress={() => navigation.navigate("Home")}
            filled
            style={{
              height: 100,
              marginTop: 18,
              marginBottom: 4,
              borderColor: COLORS.tertinary,
            }} />
        </View>
      </LinearGradient></>
  );
};
export default Home;
