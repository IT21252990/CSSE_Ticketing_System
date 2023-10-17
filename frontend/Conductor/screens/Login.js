import { View, Text, Image, Pressable, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Button from '../components/Button';
import { LinearGradient } from "expo-linear-gradient";
import BottomTabNavigation from "../navigations/BottomTabNavigation";
import Home from './Home'



const Login = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleConductorLogin = async () => {
    try {
      const response = await fetch('http://192.168.78.186:4000/auth/conductor/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const conductorData = await response.json();
        // localStorage.setItem("conductorInfo", JSON.stringify(conductorData));
        Alert.alert(
          "Login successful"
        );
        navigation.navigate(BottomTabNavigation);
        // Perform actions after successful login (e.g., navigation or storing data)
      } else {
        Alert.alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('An error occurred');
    }
  };



  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.primary, COLORS.secondary]}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <View style={{ marginVertical: 22 }}>
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: COLORS.black
            }}>
              Hi Welcome Back ! 👋
            </Text>

            <Text style={{
              fontSize: 16,
              color: COLORS.black
            }}>Hello again you have been missed!</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8
            }}>User Name</Text>

            <View style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22
            }}>
              <TextInput
                placeholder='Enter your user name'
                placeholderTextColor={COLORS.black}
                keyboardType='default'
                style={{ width: '100%' }}
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8
            }}>Password</Text>

            <View style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22
            }}>
              <TextInput
                placeholder='Enter your password'
                placeholderTextColor={COLORS.black}
                secureTextEntry={isPasswordShown}
                style={{ width: '100%' }}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{
                  position: "absolute",
                  right: 12
                }}
              >
                {
                  isPasswordShown == true ? (
                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                  ) : (
                    <Ionicons name="eye" size={24} color={COLORS.black} />
                  )
                }

              </TouchableOpacity>
            </View>
          </View>



          <Button
            title="Login"
            onPress={handleConductorLogin}
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
              borderColor: COLORS.tertinary
            }}
          />
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
  )
}

export default Login