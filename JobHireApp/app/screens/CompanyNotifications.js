import {StyleSheet, Text, View, Button, Alert, ScrollView, Image, TextInput, Pressable, TouchableOpacity, KeyboardAvoidingView, PermissionsAndroid} from "react-native";
import * as React from "react";
import CompanyNotificationScreen from "./CompanyNotificationScreen";

function CompanyNotifications({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>company notification page</Text>

      <View>
        <Button
          title="clicks on notification screen"
          onPress={() => navigation.navigate("CompanyNotificationScreen")}
        />
      </View>

      <View style={styles.navBar}>
        <Button
          title="Home"
          onPress={() => navigation.navigate("CompanyHome")}
        />
        <Button
          title="Post"
          onPress={() => navigation.navigate("CompanyPostJob")}
        />
        <Button
          title="Messages"
          onPress={() => navigation.navigate("CompanyMessages")}
        />

        <Button
          title="Profile"
          onPress={() => navigation.navigate("CompanyProfileScreen")}
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
  },
});

export default CompanyNotifications;
