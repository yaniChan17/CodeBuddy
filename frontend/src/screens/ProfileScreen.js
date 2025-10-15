import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Profile: undefined;
  Settings: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const ORANGE = "#ff7800";

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState("Mark James");
  const [bio, setBio] = useState("☕ Coffee lover | 📸 Photographer | 🌍 Traveler");
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/300");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);

  // Ask for permissions
  const requestPermissions = async () => {
    const camera = await ImagePicker.requestCameraPermissionsAsync();
    const library = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!camera.granted || !library.granted) {
      Alert.alert("Permission required", "Please allow camera and photo access.");
      return false;
    }
    return true;
  };

  // Pick from gallery
  const pickFromGallery = async () => {
    const granted = await requestPermissions();
    if (!granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      setPickerModalVisible(false);
    }
  };

  // Take photo with camera
  const takePhoto = async () => {
    const granted = await requestPermissions();
    if (!granted) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      setPickerModalVisible(false);
    }
  };

  // Save edits
  const handleSave = () => {
    setEditModalVisible(false);
    Alert.alert("Profile updated", "Your changes have been saved!");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.headerBg, { backgroundColor: ORANGE }]}>
        <TouchableOpacity onPress={() => setPickerModalVisible(true)}>
          <Image style={styles.avatar} source={{ uri: avatar }} />
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={20} color="#fff" />
          </View>
        </TouchableOpacity>

        <Text style={styles.username}>{username}</Text>
        <Text style={styles.bio}>{bio}</Text>

        {/* Edit Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setEditModalVisible(true)}
        >
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Settings */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate("Settings")}
      >
        <Ionicons name="settings-outline" size={22} color="#333" />
        <Text style={styles.settingsText}>Settings</Text>
      </TouchableOpacity>

      {/* Edit Modal */}
      <Modal visible={editModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              value={bio}
              onChangeText={setBio}
              placeholder="Bio"
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: ORANGE }]}
                onPress={handleSave}
              >
                <Text style={[styles.modalButtonText, { color: "#fff" }]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Avatar Picker Modal */}
      <Modal visible={pickerModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={[styles.modalBox, { width: "80%" }]}>
            <Text style={styles.modalTitle}>Change Profile Picture</Text>

            <TouchableOpacity style={styles.optionButton} onPress={takePhoto}>
              <Ionicons name="camera-outline" size={20} color="#333" />
              <Text style={styles.optionText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionButton} onPress={pickFromGallery}>
              <Ionicons name="image-outline" size={20} color="#333" />
              <Text style={styles.optionText}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionButton, { justifyContent: "center" }]}
              onPress={() => setPickerModalVisible(false)}
            >
              <Text style={[styles.optionText, { color: "red", fontWeight: "600" }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  headerBg: {
    alignItems: "center",
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#00000088",
    padding: 6,
    borderRadius: 15,
  },
  username: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginTop: 10,
  },
  bio: {
    fontSize: 14,
    color: "#eee",
    marginTop: 5,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff9f43",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 15,
  },
  editText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 5,
  },
  settingsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },
  settingsText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});