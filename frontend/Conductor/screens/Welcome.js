import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import Button from "../components/Button";

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1 , top:30} }>
        <View>
          <Image
            source={require("../assets/hero1.jpg")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: "absolute",
              top: 10,
              transform: [
                { translateX: 20 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />

          <Image
            source={require("../assets/hero3.jpg")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: "absolute",
              top: -30,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-5deg" },
              ],
            }}
          />

          <Image
            source={require("../assets/hero3.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              position: "absolute",
              top: 130,
              left: -50,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "15deg" },
              ],
            }}
          />

          <Image
            source={require("../assets/hero2.jpg")}
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: "absolute",
              top: 110,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />
        </View>

        {/* content  */}

        <View
          style={{
            paddingHorizontal: 22,
            position: "absolute",
            top: 400,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: COLORS.white,
              marginTop:-2
            }}
          >
            Let's Get
          </Text>
          <Text
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: COLORS.white,
            }}
          >
            Started
          </Text>

          <Text
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: COLORS.white
            }}
          >
            WayFare ✨
          </Text>

          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
                marginVertical: 4,
              }}
            >
              your ticket to hassle-free travel with cashless transactions and
              precise schedules!
            </Text>
          </View>

          <Button
            title="LOGIN"
            onPress={() => navigation.navigate("Login")}
            style={{
              marginTop: 22,
              width: "100%",
              height:'20%',
              borderColor:COLORS.darkGray,
              color:COLORS.darkGray,
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
