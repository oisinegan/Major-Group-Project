import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  PermissionsAndroid,
} from "react-native";
import * as React from "react";
import { WebView } from "react-native-webview";

function UserNotificationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Start</Text>
      <WebView source={{ uri: "https://reactnative.dev/" }} />
      <Text>end</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  navBar: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UserNotificationScreen;
