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
          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginVertical: 12,
                color: COLORS.black,
              }}
            >
              form to enter Journey Details
            </Text>
  
            
          </View>
        </View>
      </SafeAreaView>
      </LinearGradient>
    );
  };
  
  export default NewJourney;
  