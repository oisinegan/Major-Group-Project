import { StyleSheet, Text, View,Button } from 'react-native';
import * as React from 'react';

function LoginScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Login Screen</Text>
      </View>
    );
  }
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default LoginScreen;
