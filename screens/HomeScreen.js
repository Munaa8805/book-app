/**
 * HomeScreen Component
 *
 * Purpose: Main screen component that displays the home page
 * Handles data fetching and navigation logic
 */
import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useApp } from "../context/AppContext";
import { useProduct } from "../context/ProductContext";
import BookCard from "../components/BookCard";
import SafeScreen from "../components/SafeScreen";
const HomeScreen = () => {
  const navigation = useNavigation();
  const { books } = useProduct();
  const { theme, setTheme } = useApp();

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  const handleRegisterPress = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <SafeScreen>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Book App</Text>
          <Text style={styles.subtitle}>Share your favorite reads</Text>
        </View>
        <View style={styles.buttonSpacing} />
        <View style={styles.listContainer}>
          <FlatList
            data={books}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <BookCard book={item} key={item._id} />}
          />
        </View>
      </SafeScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
  buttonSpacing: {
    height: 12,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
