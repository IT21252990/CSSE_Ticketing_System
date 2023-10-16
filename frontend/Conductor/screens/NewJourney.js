import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const NewJourney = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.primary, COLORS.tertinary]}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={{ flex: 1, marginHorizontal: 22 }}>
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
              Home
            </Text>
            <MaterialIcons
              name="keyboard-arrow-left"
              size={24}
              color={COLORS.black}
            />
          </TouchableOpacity>

          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginVertical: 12,
                color: COLORS.black,
              }}
            >
              Enter Your Trip Details
            </Text>

            <View style={{ marginBottom: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 10,
                }}
              >
                Passenger Name :
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
                  value="Passenger Name"
                  placeholderTextColor={"#000000"}
                  keyboardType="email-address"
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
            </View>

            <View style={{ marginBottom: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 10,
                }}
              >
                Token ID :
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
                  value="Token ID"
                  placeholderTextColor={"#000000"}
                  keyboardType="email-address"
                  style={{
                    width: "100%",
                  }}
                  editable={false}
                />
              </View>
            </View>

            <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 10,
            }}
          >
            From :
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
              value="Katunayake"
              placeholderTextColor={'#000000'}
              keyboardType="email-address"
              style={{
                width: "100%",
              }}
              editable = {false}
            />
          </View>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 10,
            }}
          >
            To :
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
              placeholder="Enter your destination"
              placeholderTextColor={'#000000'}
              keyboardType="email-address"
              style={{
                width: "100%",
              }}
            />
          </View>
        </View>

        <Button
          title="Next"
          onPress={() => navigation.navigate("TicketDetails")}
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
            borderColor:COLORS.tertinary
          }}
        />
            

          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default NewJourney;
