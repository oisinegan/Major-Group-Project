import { StyleSheet, Text, View, Button } from "react-native";
import * as React from "react";

function UserProfile({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>user profile page</Text>

      <View style={styles.navBar}>
        <Button
          title="About"
          onPress={() => navigation.navigate("UserAbout")}
        />
        <Button
          title="View Jobs"
          onPress={() => navigation.navigate("UserViewJobs")}
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

export default UserProfile;
