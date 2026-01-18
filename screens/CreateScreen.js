import { useState } from "react";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../assets/styles/create.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";


import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";


export default function Create() {
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(3);
  const [image, setImage] = useState(null); // to display the selected image
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();



  /**
   * Pick and compress image
   * 
   * Purpose: Selects image from library, resizes and compresses it
   * to reduce payload size before converting to base64
   */
  const pickImage = async () => {
    try {
      // request permission if needed
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
          Alert.alert("Permission Denied", "We need camera roll permissions to upload an image");
          return;
        }
      }

      // launch image library with lower quality and size constraints
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.3, // reduced quality for smaller file size
        base64: false, // don't get base64 directly, we'll compress first
      });

      if (!result.canceled) {
        const originalUri = result.assets[0].uri;

        // Resize and compress image using expo-image-manipulator
        // This reduces the file size significantly before converting to base64
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          originalUri,
          [
            {
              resize: {
                width: 800, // Maximum width in pixels
              },
            },
          ],
          {
            compress: 0.3, // Compress to 30% quality (very low for smaller size)
            format: ImageManipulator.SaveFormat.JPEG, // Always use JPEG for smaller size
            base64: true, // Get base64 after compression
          }
        );

        // Set the compressed image URI for preview
        setImage(manipulatedImage.uri);

        // Use the compressed base64
        if (manipulatedImage.base64) {
          setImageBase64(manipulatedImage.base64);
        } else {
          // Fallback: convert to base64 if not provided
          const base64 = await FileSystem.readAsStringAsync(manipulatedImage.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          setImageBase64(base64);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "There was a problem selecting your image");
    }
  };

  /**
   * Handle form submission
   * 
   * Purpose: Validates form data and submits book recommendation to API
   * Handles image conversion and navigation after success
   */
  const handleSubmit = async () => {
    if (!name || !caption || !rating) {
      Alert.alert("Error", "Please fill in all fields and select an image");
      return;
    }

    try {
      setLoading(true);

      // Image is already compressed and converted to JPEG by expo-image-manipulator
      // Use JPEG format directly for smaller file size
      const imageDataUrl = `data:image/jpeg;base64,${imageBase64}`;

      const response = await fetch(`https://backend-ideas-8pfw.onrender.com/api/v1/mobile`, {
        method: "POST",
        headers: {
          // Authorization: `Bearer ${token}`,  
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          caption,
          author,
          rating: rating.toString(),
          image: image ? imageDataUrl : "https://res.cloudinary.com/drneyxkqq/image/upload/v1768087485/samples/balloons.jpg",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      Alert.alert("Success", "Your book recommendation has been posted!");
      setName("");
      setCaption("");
      setAuthor("");
      setRating(3);
      setImage(null);
      setImageBase64(null);
      // Navigate back to Home screen
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const renderRatingPicker = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.starButton}>
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={32}
            color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.ratingContainer}>{stars}</View>;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Add Book Recommendation</Text>
            <Text style={styles.subtitle}>Share your favorite reads with others</Text>
          </View>

          <View style={styles.form}>
            {/* BOOK TITLE */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Name</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter book name"
                  placeholderTextColor={COLORS.placeholderText}
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Author</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter book author"
                  placeholderTextColor={COLORS.placeholderText}
                  value={author}
                  onChangeText={setAuthor}
                />
              </View>
            </View>


            {/* RATING */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Rating</Text>
              {renderRatingPicker()}
            </View>

            {/* IMAGE */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Image</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
                    <Text style={styles.placeholderText}>Tap to select image</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* CAPTION */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Caption</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Write your review or thoughts about this book..."
                placeholderTextColor={COLORS.placeholderText}
                value={caption}
                onChangeText={setCaption}
                multiline
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={20}
                    color={COLORS.white}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Share</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
