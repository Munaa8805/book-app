import { StyleSheet, Text, View } from "react-native";
import React from "react";
import COLORS from "../constants/colors";

const FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <Text>FavoriteScreen</Text>
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
