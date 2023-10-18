import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import BottomTabNavigation from "../navigations/BottomTabNavigation";
import Home from "./Home";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      Alert.alert("Please enter a valid email address");
      return;
    }

    if (!password || password.length < 6) {
      Alert.alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.86.72:4000/auth/passengerlogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        const passengerData = await response.json();
        AsyncStorage.setItem("passengerInfo", JSON.stringify(passengerData));
        Alert.alert("Login successful");
        navigation.navigate("BottomTabNavigation");

        setEmail("");
        setPassword("");
      } else {
        Alert.alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("An error occurred");
    }
  };

  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.primary, COLORS.secondary]}
    >
      <View style={{width:"100%" , height:80, backgroundColor:COLORS.secondary,position:"absolute",marginTop:32}}>

</View>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginVertical: 12,
                color: COLORS.black,
              }}
            >
              Hi Welcome Back ! 👋
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
                marginTop:20
              }}
            >
              Hello again you have been missed!
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Email address
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.black}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                style={{
                  width: "100%",
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Password
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={COLORS.black}
                secureTextEntry={!isPasswordShown}
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={{
                  width: "100%",
                }}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >
                {isPasswordShown == true ? (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <Button
            title="Login"
            onPress={handleLogin}
            // onPress={navigation.navigate("BottomTabNavigation")}
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
              borderColor: COLORS.tertinary,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
            }}
          >
            <Text style={{ fontSize: 16, color: COLORS.black }}>
              Don't have an account ?{" "}
            </Text>
            <Pressable onPress={() => navigation.navigate("Signup")}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#0000ff",
                  fontWeight: "bold",
                  marginLeft: 6,
                }}
              >
                Register
              </Text>
            </Pressable>
          </View>

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
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Login;
