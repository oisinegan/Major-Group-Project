import {StyleSheet, Text, View, Button, Alert, ScrollView, Image, TextInput, Pressable, TouchableOpacity, KeyboardAvoidingView, PermissionsAndroid} from "react-native";
import * as React from "react";
import UserMessageScreen from "./UserMessageScreen";

function UserMessage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>user messages</Text>

      <View>
        <Button
          title="clicks on message screen"
          onPress={() => navigation.navigate("UserMessageScreen")}
        />
      </View>

      <View style={styles.navBar}>
        <Button
          title="Home"
          onPress={() => navigation.navigate("UserHomeScreen")}
        />
        <Button
          title="Messages"
          onPress={() => navigation.navigate("UserMessage")}
        />
        <Button
          title="Notifications"
          onPress={() => navigation.navigate("UserNotification")}
        />
        <Button
          title="Profile"
          onPress={() => navigation.navigate("UserProfile")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  navBar: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "space-around",
  },
});

export default UserMessage;
