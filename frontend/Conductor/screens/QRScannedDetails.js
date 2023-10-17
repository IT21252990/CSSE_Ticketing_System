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
  const [totalPrice, setTotalPrice] = useState("1040.00");
  
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
              QR Scanner
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
              Ticket Info
            </Text>

            <View style={{ marginBottom: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 10,
                }}
              >
                Journey Start :
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
                  value="Kandy"
                  placeholderTextColor={"#000000"}
                  keyboardType="email-address"
                  style={{
                    width: "100%",
                    color: COLORS.darkGray
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
                Journey End :
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
                  value="Panadura"
                  placeholderTextColor={"#000000"}
                  keyboardType="email-address"
                  style={{
                    width: "100%",
                    color: COLORS.darkGray
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
                Price Per Ticket :
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
                  value="LKR. 520.00"
                  placeholderTextColor={"#000000"}
                  keyboardType="email-address"
                  style={{
                    width: "100%",
                    color: COLORS.darkGray
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
                Ticket Quantity :
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
                  value="2"
                  placeholderTextColor={"#000000"}
                  keyboardType="email-address"
                  style={{
                    width: "100%",
                    color: COLORS.darkGray
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
                Total Price :
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
                  value={totalPrice}
                  placeholderTextColor={"#000000"}
                  keyboardType="email-address"
                  style={{
                    width: "100%",
                    color: COLORS.darkGray
                  }}
                  onChangeText={(text) => setTotalPrice(text)}
                  editable={true}
                />
              </View>
            </View>

            <Button
              title="Generate E Ticket"
              onPress={() => navigation.navigate("eTicketDisplay", {
                userId:"652cd67e91bbf39b53498639",
                startLocation: "Kandy",
                endLocation: "Panadura",
                pricePerTicket: "520.00",
                ticketQuantity: "2",
                totalPrice: totalPrice
              })}
              filled
              style={{
                marginTop: 100,
                marginBottom: 4,
                borderColor: COLORS.tertinary,
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default NewJourney;
