import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";



const Signup = ({ navigation }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handleSignup = async (e) => {

    if (!firstName || !lastName || !email || !Phone || !password || !confirmPassword) {
      Alert.alert(
        "Please fill in all fields."
      );
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      Alert.alert(
        "Please enter a valid email address."
      );
      return;
    }

  
    if (!password || password.length < 6) {
      Alert.alert(
        "Password must be at least 6 characters long."
      );
      return;
    }
    
        if (password !== confirmPassword) {
          Alert.alert(
            "Passwords do not match."
          );
          return;
        }
    

    try {
      const response = await fetch("http://172.28.7.172:4000/auth/passengersignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          Phone,
          password,
        }),
      });

      if (response.ok) {
        Alert.alert(
          "User created successfully"
        );
        navigation.navigate('Login');
      } else {
        console.log(response);
        Alert.alert(
          "Failed to create user"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "An error occurred"
      );
    }
  };

  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.primary, COLORS.tertinary]}
    >
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
            Create Your Passenger Account
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
            }}
          >
            Connect with WayFare today!
          </Text>
        </View>

        {/* passenger signUp fistname */}

        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 5,
            }}
          >
            Fist Name
          </Text>

          <View
            style={{
              width: "100%",
              height: 40,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your First Name"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              value={firstName}
              onChangeText={text => setFirstName(text)}
              style={{
                width: "100%",
              }}
            />
          </View>
        </View>

        {/* passenger signUp lastname */}

        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 10,
            }}
          >
            Last Name
          </Text>

          <View
            style={{
              width: "100%",
              height: 40,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your Last Name"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              value={lastName}
              onChangeText={text => setLastName(text)}
              style={{
                width: "100%",
              }}
            />
          </View>
        </View>

        {/* Passenger Email Address */}

        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 10,
            }}
          >
            Email address
          </Text>

          <View
            style={{
              width: "100%",
              height: 40,
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
              keyboardType="email-address"
              value={email}
              onChangeText={text => setEmail(text)}
              style={{
                width: "100%",
              }}
            />
          </View>
        </View>

        {/* Passenger Mobile Number */}

        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 10,
            }}
          >
            Mobile Number
          </Text>

          <View
            style={{
              width: "100%",
              height: 40,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 22,
            }}
          >
           
            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              value={Phone}
              onChangeText={text => setPhone(text)}
              style={{
                width: "80%",
              }}
            />
          </View>
        </View>
        {/* Passenger SignUp Password */}
        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 10,
            }}
          >
            Password
          </Text>

          <View
            style={{
              width: "100%",
              height: 40,
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
              secureTextEntry={isPasswordShown}
              value={password}
              onChangeText={text => setPassword(text)}
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
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Passenger SignUP Comfirm Password */}

        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 10,
            }}
          >
            Comfirm Password
          </Text>

          <View
            style={{
              width: "100%",
              height: 40,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your  Comfirm Password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
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
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Button
          title="Sign Up"
          onPress={handleSignup}
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
            borderColor:COLORS.tertinary
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
            Already have an account
          </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                fontSize: 16,
                color: '#0000ff',
                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
    </LinearGradient>
  );
};

export default Signup;
