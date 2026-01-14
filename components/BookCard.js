import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styles from "../assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

import COLORS from "../constants/colors";

const BookCard = ({ book }) => {
  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };
  const formatPublishDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  return (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          {/* <Image
            source={{ uri: item.user.profileImage }}
            style={styles.avatar}
          /> */}
          {/* <Text style={styles.username}>{item.user.name}</Text> */}
        </View>
      </View>

      <View style={styles.bookImageContainer}>
        <Image
          //   source={
          //     book?.image
          //       ? book?.image
          //       : require("../assets/images/screenshot-for-readme.png")
          //   }
          source={
            book?.image
              ? book?.image
              : require("../assets/images/screenshot-for-readme.png")
          }
          style={styles.bookImage}
          contentFit="cover"
        />
      </View>

      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{book.name}</Text>
        <View style={styles.ratingContainer}>
          {renderRatingStars(book.rating)}
        </View>
        <Text style={styles.caption}>{book.caption}</Text>
        <Text style={styles.date}>
          Shared on{" "}
          {formatPublishDate(
            book?.publishedAt ? book?.publishedAt : new Date()
          )}
        </Text>
      </View>
    </View>
  );
};

export default BookCard;
