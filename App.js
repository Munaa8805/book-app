/**
 * Main App Component
 *
 * Purpose: Root component that sets up the app structure,
 * provides global context, and handles initial navigation
 */
import React from "react";
import { StatusBar } from "expo-status-bar";
import { AppProvider, useApp } from "./context/AppContext";
import { NavigationContainer } from "@react-navigation/native";
import SafeScreen from "./components/SafeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./bottomTab/bottomTabNavigator";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { ProductProvider } from "./context/ProductContext";
const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user } = useApp();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={user ? "Home" : "Login"}
    >
      {user ? (
        <Stack.Screen name="Home" component={BottomTabNavigator} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AppProvider>
        <ProductProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ProductProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}
