import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import COLORS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation  } from "@react-navigation/native";


const Profile = () => {


  const navigation = useNavigation();


  const [passengerId, setPassengerId] = useState(null);
  const [PassengerFirstName, setPassengerFirstName] = useState(null);
  const [PassengerlastName, setPassengerLastName] = useState(null);
  const [PassengerEmail, setPassengerEmail] = useState(null);
  const [PassengerMobile, setPassengerMobile] = useState(null);


  function getuserdata() {
    AsyncStorage.getItem("passengerInfo")
      .then((value) => {
        if (value !== null) {
          const userData = JSON.parse(value);
          setPassengerId(userData._id);
          setPassengerFirstName(userData.firstName);
          setPassengerLastName(userData.lastName);
          setPassengerEmail(userData.email);
          setPassengerMobile(userData.Phone);
        }
      })
      .catch((error) => {
        console.log("error fetching user ID");
      });
  }

  useEffect(() => {
    getuserdata();
  }, []);

  const [isEditProfileModalVisible, setEditProfileModalVisible] =
    useState(false);
  const [isChangePasswordModalVisible, setChangePasswordModalVisible] =
    useState(false);

  // User information
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "123-456-7890",
    credits: 100,
  };

  const editProfile = () => {
    // Implement your logic for editing user profile here
    // You can use a state management solution like Redux or context API to update user information
  };

  const changePassword = () => {
    // Implement your logic for changing the password here
  };

  const logout = async () => {
    try {
      // Clear user data and navigate to the login screen (replace 'LoginScreen' with your actual login screen's name)
      await AsyncStorage.removeItem('passengerInfo'); // Remove user data from storage
      navigation.navigate('Login'); // Navigate to the login screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={["#ffffff", COLORS.secondary, "#ffffff"]}
    >
      <View style={styles.container}>

        <Text style={styles.header}>My Profile</Text>

        <View style={styles.userInfoContainer}>
          <Image
            source={require("../assets/pngegg.png")}
            style={{ width: 100, height: 100, alignSelf: "center" , marginBottom:50 }}
          />
          <Text style={styles.userInfoLabel}>User Name: {PassengerFirstName} {PassengerlastName}</Text>
          <Text style={styles.userInfoLabel}>User Email: {PassengerEmail}</Text>
          <Text style={styles.userInfoLabel}>Mobile Number: {PassengerMobile}</Text>
          <Text style={styles.userInfoLabel}>
            Credits: {user.credits} credits
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
          style={{margin:20 }}
            title="Edit Profile"
            onPress={() => setEditProfileModalVisible(true)}
          />
          <Button
           style={{margin:20}}
            title="Reset Password"
            onPress={() => setChangePasswordModalVisible(true)}
          />
          <Button  style={{margin:20}} title="Logout" onPress={logout} />
        </View>

        {/* Edit Profile Modal */}
        <Modal visible={isEditProfileModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Edit Profile</Text>
            {/* Add input fields for editing user profile */}
            <Button title="Save" onPress={editProfile} />
            <Button
              title="Close"
              onPress={() => setEditProfileModalVisible(false)}
            />
          </View>
        </Modal>

        {/* Change Password Modal */}
        <Modal visible={isChangePasswordModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Change Password</Text>
            {/* Add input fields for changing the password */}
            <Button title="Change Password" onPress={changePassword} />
            <Button
              title="Close"
              onPress={() => setChangePasswordModalVisible(false)}
            />
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop:20
  },
  userInfoContainer: {
    marginBottom: 50,
  },
  userInfoLabel: {
    fontSize: 20,
    margin: 10,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Profile;
