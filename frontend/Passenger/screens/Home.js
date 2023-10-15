import { View, Text } from "react-native";
import React from "react";
import COLORS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import NewJourney from './NewJourney'

const Home = ({ navigation }) => {
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
              marginTop: 50,
              marginLeft: 20,
            }}
          >
            Welcome username
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
