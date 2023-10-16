import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import React,{ useState , useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import  AsyncStorage  from '@react-native-async-storage/async-storage';


const NewJourney = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [passenger, setPassenger] = useState(null);
  const [passengerId, setPassengerId] = useState(null);
  const [PassengerName, setPassengerName] = useState(null);

  function getuserdata(){
  AsyncStorage.getItem('passengerInfo')
  .then(value => {
    if ( value !== null){
      const userData = JSON.parse(value);
      setPassenger(userData);
      setPassengerId(userData._id);
      setPassengerName(userData.firstName);
    }

  })
  .catch(error => {
    console.log("error fetching user ID")
  });
}

getuserdata()

function BusDropdown() {
  const [busRoutes, setBusRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState('');

  useEffect(() => {
    fetch('http://192.168.86.72:4000/Bus/bus-routes') 
      .then((response) => response.json())
      .then((data) => setBusRoutes(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <View>
      <Text>Select a Route:</Text>
      <Picker
        selectedValue={selectedRoute}
        onValueChange={(itemValue, itemIndex) => setSelectedRoute(itemValue)}
      >
        {/* <Picker.Item label="-- Select a Route --" value="" /> */}
        {busRoutes.map((route) => (
          <Picker.Item
            key={route._id}
            label={`${route.start_route} - ${route.end_route}`}
            value={`${route.start_route} - ${route.end_route}`}
          />
        ))}
      </Picker>
    </View>
  );
}




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
                  value={PassengerName}
                  keyboardType="email-address"
                  style={{
                    width: "100%",
                    color: '#000000'
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
               Select Bus Route
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
                <BusDropdown/>
              </View>
            </View>
            <Button
              title="Next"
              onPress={() => navigation.navigate("TicketDetails")}
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
