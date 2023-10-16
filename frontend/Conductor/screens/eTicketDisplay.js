import {
    View,
    Text,
    Image,
    Pressable,
    TextInput,
    TouchableOpacity,
    
    StyleSheet,
  } from "react-native";
  import React, { useState  , useEffect} from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import COLORS from "../constants/colors";
  import { Ionicons } from "@expo/vector-icons";
  import Button from "../components/Button";
  import { LinearGradient } from "expo-linear-gradient";
  import { MaterialIcons } from "@expo/vector-icons";
  import QRCode from 'react-native-qrcode-svg';

  
  const QRDisplay = ({ navigation }) => {
    const [inputText, setInputText] = useState('');
  const [qrvalue, setQrvalue] = useState('');
    return (
      <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.primary, COLORS.tertinary]}
    >
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
        <Text style={styles.titleStyle}>
            E Ticket
          </Text>
          <QRCode
            value={qrvalue ? qrvalue : 'NA'}
            size={250}
            color="black"
            backgroundColor="white"
            // testID="qr-code" 
          />
          
          <TextInput
            style={styles.textInputStyle}
            onChangeText={
              (inputText) => setInputText(inputText)
            }
            value={inputText}
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => setQrvalue(inputText)}>
            <Text style={styles.buttonTextStyle}>
              SEND
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      </LinearGradient>
    );
  };
  
  export default QRDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  titleStyle: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    marginBottom:20
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
  },
  textInputStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#51D8C7',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
    width:100,
    justifyContent:'center',
    textAlign:'center'
  },
});
  