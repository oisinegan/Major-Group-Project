import {StyleSheet, Text, View, Button, Alert, ScrollView, Image, TextInput, Pressable, TouchableOpacity, KeyboardAvoidingView, PermissionsAndroid} from "react-native";
import * as React from "react";

function CompanyNotificationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>company clicks Notification Screen</Text>
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

export default CompanyNotificationScreen;
