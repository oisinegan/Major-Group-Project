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
import CompanyJobMoreInfo from "./app/screens/CompanyJobMoreInfo";
import UserAbout from "./app/screens/UserAbout";
import UserViewJobs from "./app/screens/UserViewJobs";
import JobScreen from "./app/screens/JobScreen";
import HomeNotLoggedIn from "./app/screens/HomeNotLoggedIn";
import HomeLoggedIn from "./app/screens/HomeLoggedIn";
import CompanyMessages from "./app/screens/CompanyMessages";
import CompanyViewJobs from "./app/screens/CompanyViewJobs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegisterJobseeker from "./app/screens/RegisterJobseeker";
import RegisterCompany from "./app/screens/RegisterCompany";
import CompanyViewApplicants from "./app/screens/CompanyViewApplicants";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeNotLoggedIn"
          component={HomeNotLoggedIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="HomeLoggedIn" component={HomeLoggedIn} />
        <Stack.Screen
          name="CompanyHome"
          component={CompanyHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserHomeScreen"
          component={UserHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="UserMessage" component={UserMessage} />
        <Stack.Screen name="UserNotification" component={UserNotification} />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CompanyProfileScreen"
          component={CompanyProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="CompanyMessages" component={CompanyMessages} />

        <Stack.Screen name="CompanyPostJob" component={CompanyPostJob} />
        <Stack.Screen
          name="CompanyEditJobScreen"
          component={CompanyEditJobScreen}
          options={{ headerShown: false }}
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
        <Stack.Screen
          name="CompanyJobMoreInfo"
          component={CompanyJobMoreInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="UserAbout" component={UserAbout} />
        <Stack.Screen name="UserViewJobs" component={UserViewJobs} />

        <Stack.Screen name="CompanyViewJobs" component={CompanyViewJobs} />
        <Stack.Screen
          name="JobScreen"
          component={JobScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterJobseeker"
          component={RegisterJobseeker}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterCompany"
          component={RegisterCompany}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CompanyViewApplicants"
          component={CompanyViewApplicants}
          options={{ headerShown: false }}
        />
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
