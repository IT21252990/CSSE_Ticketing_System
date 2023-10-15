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
  
  const QRDisplay = ({ navigation }) => {
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
              Ticket Details
            </Text>
            <MaterialIcons
              name="keyboard-arrow-left"
              size={24}
              color={COLORS.black}
            />
          </TouchableOpacity>
          <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    marginVertical: 10,
                  }}
                >
                  QR Display Page
                </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  };
  
  export default QRDisplay;
  