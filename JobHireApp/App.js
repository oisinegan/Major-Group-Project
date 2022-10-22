import { StyleSheet, Text, View,Button } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen  from "./app/screens/Login";
import RegisterScreen from './app/screens/Register';
import CompanyHomeScreen from './app/screens/CompanyHome';

function Home({ navigation }) {
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
