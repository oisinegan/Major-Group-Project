import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { withSafeAreaInsets } from "react-native-safe-area-context";

function HomeNotLoggedIn({ navigation }) {
  return (
    <LinearGradient
      colors={["navy", "white"]}
      style={styles.container}
      start={{ x: 0.2, y: 0.2 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.title}>Jobs.</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttonLog}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSign}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
    marginTop: "35%",
    marginLeft: "10%",
  },
  buttonsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: "45%",
  },
  buttonLog: {
    backgroundColor: "navy",
    padding: 15,
    borderRadius: 50,
    paddingHorizontal: "27%",
    marginBottom: "5%",
  },
  buttonSign: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 50,
    paddingHorizontal: "25%",
  },
  loginText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  registerText: {
    color: "navy",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeNotLoggedIn;
