import { StyleSheet, Text, View,Button } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen  from "./app/screens/Login";
import RegisterScreen from './app/screens/Register';
import CompanyHomeScreen from './app/screens/CompanyHome';
import UserHomeScreen from './app/screens/UserHomeScreen';
import UserMessage from './app/screens/UserMessage';
import UserNotification from './app/screens/UserNotifcation';
import UserProfile from './app/screens/UserProfile';
import JobScreen from './app/screens/JobScreen';
import CompanyProfileScreen from './app/screens/CompanyProfileScreen';
import CompanyPostJob from './app/screens/CompanyPostJob';
import CompanyMessages from './app/screens/CompanyMessages';
import CompanyEditJobScreen from './app/screens/CompanyEditJobSceen';









function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Company home screen"
        onPress={() => navigation.navigate('CompanyHome')}
      />
       <Button
        title="Go to Login screen"
        onPress={() => navigation.navigate('Login')}
      />
       <Button
        title="Go to Register screen"
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        title="Go to user home screen"
        onPress={() => navigation.navigate('UserHomeScreen')}
      />
      <Button
        title="Go to user message screen"
        onPress={() => navigation.navigate('UserMessage')}
      />
      <Button
        title="Go to user notification screen"
        onPress={() => navigation.navigate('UserNotification')}
      />
      <Button
        title="Go to user profile screen"
        onPress={() => navigation.navigate('UserProfile')}
      />
      <Button
        title="Go to job screen screen"
        onPress={() => navigation.navigate('JobScreen')}
      />
      <Button
        title="Go to company profile screen"
        onPress={() => navigation.navigate('CompanyProfileScreen')}
      />
      <Button
        title="Go to company post job screen"
        onPress={() => navigation.navigate('CompanyPostJob')}
      />
      <Button
        title="Go to company messages job screen"
        onPress={() => navigation.navigate('CompanyMessages')}
      />
      <Button
        title="Go to company edit job screen"
        onPress={() => navigation.navigate('CompanyEditJobScreen')}
      />
  </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Home" component={Home}/>
   <Stack.Screen name="CompanyHome" component={CompanyHomeScreen}/>
    <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="UserHomeScreen" component={UserHomeScreen} />
  <Stack.Screen name="UserMessage" component={UserMessage} />
    <Stack.Screen name="UserNotification" component={UserNotification} />
  <Stack.Screen name="UserProfile" component={UserProfile} />
    <Stack.Screen name="JobScreen" component={JobScreen} />
  <Stack.Screen name="CompanyProfileScreen" component={CompanyProfileScreen} />
    <Stack.Screen name="CompanyPostJob" component={CompanyPostJob} />
  <Stack.Screen name="CompanyMessages" component={CompanyMessages} />
    <Stack.Screen name="CompanyEditJobScreen" component={CompanyEditJobScreen} />






    </Stack.Navigator>
  </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
