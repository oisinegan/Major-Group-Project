import { StyleSheet, Text, View, Button } from "react-native";
import * as React from "react";

function HomeLoggedIn({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="User home screen"
        onPress={() => navigation.navigate("UserHomeScreen")}
      />
      <Button
        title="Company home screen"
        onPress={() => navigation.navigate("CompanyHome")}
      />
      <Button
        title="Log out"
        onPress={() => navigation.navigate("HomeNotLoggedIn")}
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

export default HomeLoggedIn;
