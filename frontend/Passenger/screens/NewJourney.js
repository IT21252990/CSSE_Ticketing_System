import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewJourney = ({ navigation }) => {
  const [passenger, setPassenger] = useState(null);
  const [passengerId, setPassengerId] = useState(null);
  const [PassengerFirstName, setPassengerFirstName] = useState(null);
  const [PassengerlastName, setPassengerLastName] = useState(null);


  function getuserdata() {
    AsyncStorage.getItem("passengerInfo")
      .then((value) => {
        if (value !== null) {
          const userData = JSON.parse(value);
          setPassenger(userData);
          setPassengerId(userData._id);
          setPassengerFirstName(userData.firstName);
          setPassengerLastName(userData.lastName);
        }
      })
      .catch((error) => {
        console.log("error fetching user ID");
      });
  }

  useEffect(() => {
    getuserdata();
  }, []);

  const [busRoutes, setBusRoutes] = useState([]);

  useEffect(() => {
    fetch("http://192.168.86.72:4000/Bus/bus-routes")
      .then((response) => response.json())
      .then((data) => setBusRoutes(data))
      .catch((error) => console.error(error));
  }, []);

  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(busRoutes);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState('');

  const searchRef = useRef();
  const onSearch = (search) => {
    if (search !== "") {
      let tempData = data.filter((route) => {
        return (
          route.start_route.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          route.end_route.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
      });
      setData(tempData);
    } else {
      setData(busRoutes);
    }
  };

  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.primary, COLORS.tertinary]}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
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
          <View style={{ marginBottom: 0 }}>
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
                value={PassengerFirstName + " " + PassengerlastName}
                keyboardType="email-address"
                style={{
                  width: "100%",
                  color:"#000"
                }}
                editable={false}
              />
            </View>
          </View>

          <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 10,
              }}
            >
              Select Bus Route :
            </Text>

          

          <TouchableOpacity
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: 15,
              paddingRight: 15,
              height: 40,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
  
              paddingLeft: 22,
            }}
            onPress={() => {
              setClicked(!clicked);
            }}
          >
            <Text style={{ fontWeight: "600" }}>
              {selectedRoute == "" ? "Select Bus Route" : selectedRoute}
            </Text>
            {clicked ? (
              <Image
                source={require("../assets/upload.png")}
                style={{ width: 20, height: 20 }}
              />
            ) : (
              <Image
                source={require("../assets/dropdown.png")}
                style={{ width: 20, height: 20 }}
              />
            )}
          </TouchableOpacity>
          <ScrollView style={{ marginTop: 10 , position:"absolute" , width:"95%" , top:215}}>
            {clicked ? (
              <View
                style={{
                  elevation: 5,
                  marginTop: 20,
                  height: 400,
                  alignSelf: "center",
                  width: "90%",
                  backgroundColor: "#fff",
                  borderRadius: 10,
                }}
              >
                <TextInput
                  placeholder="Search.."
                  value={search}
                  ref={searchRef}
                  onChangeText={(txt) => {
                    onSearch(txt);
                    setSearch(txt);
                  }}
                  style={{
                    width: "90%",
                    height: 50,
                    alignSelf: "center",
                    borderWidth: 0.2,
                    borderColor: "#8e8e8e",
                    borderRadius: 7,
                    marginTop: 20,
                    paddingLeft: 20,
                  }}
                />

                <FlatList
                  data={data}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        style={{
                          width: "85%",
                          alignSelf: "center",
                          height: 50,
                          justifyContent: "center",
                          borderBottomWidth: 0.5,
                          borderColor: "#8e8e8e",
                        }}
                        onPress={() => {
                          setSelectedRoute(
                            `${item.start_route}` + " - " + `${item.end_route}`
                          );
                          setClicked(!clicked);
                          onSearch("");
                          setSearch("");
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "600",
                            textAlign: "center",
                            marginTop: 20,
                          }}
                        >
                          {item.start_route} - {item.end_route}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            ) : null}
          </ScrollView>
          {!clicked ? (
          <View style={{ marginBottom: 0 }}>
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
                placeholder="Add ticket Quantity here"
                keyboardType="numeric"
                value={ticketQuantity}
              onChangeText={text => setTicketQuantity(text)}
                style={{
                  width: "100%",
                  color: "#000000",
                }}
              />
            </View>
          </View>
          ) : null}

{!clicked ? (
          <Button 
            title="Next"
            onPress={() => 
               {
                if (selectedRoute) {
                 const [startRoute, endRoute] = selectedRoute.split(" - ");
                navigation.navigate("TicketDetails",
                  {
                    start_route: startRoute,
                    end_route: endRoute,
                    p_Id: passengerId,
                    // p_Id: "44444",
                    p_Fname: PassengerFirstName,
                    p_Lname: PassengerlastName,
                    ticket_quantity:ticketQuantity
                  });
                
              } else {
                Alert.alert(
                  "Please Select Bus Route",
                  "You must select a bus route before proceeding.",
                );
              }
            }
          }
            filled
            style={{
              position:"absolute",
              width:"80%",
              marginLeft:"10%",
              marginTop: 500,
              marginBottom: 20,
              borderColor: COLORS.tertinary,
            }}
            disabled={!selectedRoute}
          />
          ) : null}

          {/* <Button
            title="Next"
            onPress={() =>
              navigation.navigate("TicketDetails", {
                start_route: "selectedStartRoute",
                    end_route: "selectedEndRout",
                    // p_Id: passengerId,
                    p_Id: "44444",
                    p_Fname: "PassengerFirstName",
                    p_Lname: "PassengerlastName",
              })
            }
            filled
            style={{
              marginTop: 10,
              marginBottom: 20,
              borderColor: COLORS.tertinary,
            }}
          /> */}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default NewJourney;
