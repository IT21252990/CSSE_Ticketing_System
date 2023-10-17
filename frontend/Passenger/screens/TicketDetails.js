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
import QRDisplay from "./QRDisplay";
import { useRoute } from "@react-navigation/native";
import { useParams } from "react-router-native";

const NewJourney = ({ navigation }) => {
  const route = useRoute();

  const {
    start_route,
    end_route,
    p_Id,
    p_Fname,
    p_Lname,
    ticket_quantity,
    price_per_ticket,
    total_price,
  } = route.params;

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
              Journey Detals
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
                  value={start_route}
                  placeholderTextColor={"#000000"}
                  keyboardType="email-address"
                  style={{
                    width: "100%",
                    color: "#000",
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
                  value={end_route}
                  placeholderTextColor={"#000000"}
                  keyboardType="email-address"
                  style={{
                    width: "100%",
                    color: "#000",
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
                  value={"LKR. " + price_per_ticket}
                  placeholderTextColor={"#000000"}
                  keyboardType="email-address"
                  style={{
                    width: "100%",
                    color: "#000",
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
                  value={ticket_quantity}
                  editable={false}
                  keyboardType="email-address"
                  style={{
                    width: "100%",
                    color: "#000",
                  }}
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
                  value={"LKR. " + total_price}
                  editable={false}
                  style={{
                    width: "100%",
                    color: "#000",
                  }}
                />
              </View>
            </View>

            <Button
              title="Edit Destination"
              onPress={() => {
                navigation.navigate("NewJourney");
              }}
              filled
              style={{
                marginTop: 18,
                marginBottom: 4,
                borderColor: COLORS.tertinary,
              }}
            />

            <Button
              title="Pay"
              onPress={() => {
              }}
              filled
              style={{
                marginTop: 18,
                marginBottom: 4,
                borderColor: COLORS.tertinary,
              }}
            />

            <Button
              title="Next"
              onPress={() =>
                navigation.navigate("QRDisplay", {
                  start_route: start_route,
                  end_route: end_route,
                  p_Id: p_Id,
                  p_Fname: p_Fname,
                  p_Lname: p_Lname,
                  ticket_quantity: ticket_quantity,
                  price_per_ticket: price_per_ticket,
                  total_price: total_price,
                })
              }
              filled
              style={{
                marginTop: 18,
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
