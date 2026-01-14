import { StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import SafeScreen from "../components/SafeScreen";
import Button from "../components/Button";
import { useApp } from "../context/AppContext";

const ProfileScreen = () => {
  const { logoutHandler, user } = useApp();
  const navigation = useNavigation();
  const handleLogout = async () => {
    const result = await logoutHandler();
    if (!result.success) {
      Alert.alert("Error", result.error);
    } else {
      navigation.navigate("Login");
    }
  };
  return (
    <SafeScreen
      style={{
        backgroundColor: "orange",
      }}
    >
      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <View style={styles.profileImageContainer}>
            <Image source={user?.profileImage} style={styles.profileImage} />
          </View>
          <View style={styles.profileInfoTextContainer}>
            <Text style={styles.profileInfoText}>Profile : {user?.name}</Text>
            <Text style={styles.profileInfoText}>Email : {user?.email}</Text>
            <Text style={styles.profileInfoText}>
              Member Since : {new Date(user?.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </SafeScreen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: {
    backgroundColor: "blue",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfoText: {
    fontSize: 20,
    fontWeight: "200",
    color: "white",
  },
  profileImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  profileInfoTextContainer: {
    backgroundColor: "green",
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    alignItems: "start",
    justifyContent: "center",
  },
  logoutButtonContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
  },
});
