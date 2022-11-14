import { StyleSheet, Text, View, Button } from "react-native";
import * as React from "react";

function HomeNotLoggedIn({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Login screen"
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        title="Register screen"
        onPress={() => navigation.navigate("Register")}
      />
      <Button
        title=" Logged in view"
        onPress={() => navigation.navigate("HomeLoggedIn")}
      />
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

export default HomeNotLoggedIn;
