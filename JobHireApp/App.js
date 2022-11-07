import { StyleSheet, Text, View, Button, Alert, TextInput } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./app/screens/Login";
import RegisterScreen from "./app/screens/Register";
import CompanyHomeScreen from "./app/screens/CompanyHome";
import UserHomeScreen from "./app/screens/UserHomeScreen";
import UserMessage from "./app/screens/UserMessage";
import UserNotification from "./app/screens/UserNotifcation";
import UserProfile from "./app/screens/UserProfile";
import CompanyProfileScreen from "./app/screens/CompanyProfileScreen";
import CompanyPostJob from "./app/screens/CompanyPostJob";
import CompanyEditJobScreen from "./app/screens/CompanyEditJobSceen";
import CompanyNotifications from "./app/screens/CompanyNotifications";
import UserMessageScreen from "./app/screens/UserMessageScreen";
import UserNotificationScreen from "./app/screens/UserNotificationScreen";
import CompanyNotificationScreen from "./app/screens/CompanyNotificationScreen";
import CompanyAbout from "./app/screens/CompanyAbout";
import CompanyPostedJobs from "./app/screens/CompanyPostedJobs";
import UserAbout from "./app/screens/UserAbout";
import UserViewJobs from "./app/screens/UserViewJobs";
import JobScreen from "./app/screens/JobScreen";

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Login screen"
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        title="Go to Register screen"
        onPress={() => navigation.navigate("Register")}
      />
      <Button
        title="Go to user home screen"
        onPress={() => navigation.navigate("UserHomeScreen")}
      />
      <Button
        title="Go to company home screen"
        onPress={() => navigation.navigate("CompanyHome")}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CompanyHome" component={CompanyHomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="UserHomeScreen" component={UserHomeScreen} />
        <Stack.Screen name="UserMessage" component={UserMessage} />
        <Stack.Screen name="UserNotification" component={UserNotification} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen
          name="CompanyProfileScreen"
          component={CompanyProfileScreen}
        />
        <Stack.Screen name="CompanyPostJob" component={CompanyPostJob} />
        <Stack.Screen
          name="CompanyEditJobScreen"
          component={CompanyEditJobScreen}
        />
        <Stack.Screen
          name="CompanyNotifications"
          component={CompanyNotifications}
        />
        <Stack.Screen name="UserMessageScreen" component={UserMessageScreen} />
        <Stack.Screen
          name="UserNotificationScreen"
          component={UserNotificationScreen}
        />
        <Stack.Screen
          name="CompanyNotificationScreen"
          component={CompanyNotificationScreen}
        />
        <Stack.Screen name="CompanyAbout" component={CompanyAbout} />
        <Stack.Screen name="CompanyPostedJobs" component={CompanyPostedJobs} />
        <Stack.Screen name="UserAbout" component={UserAbout} />
        <Stack.Screen name="UserViewJobs" component={UserViewJobs} />
        <Stack.Screen name="JobScreen" component={JobScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
