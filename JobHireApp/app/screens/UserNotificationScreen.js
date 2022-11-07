import { StyleSheet, Text, View, Button } from "react-native";
import * as React from "react";

function UserNotificationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>User clicks on notification Screen</Text>
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
});

export default UserNotificationScreen;
