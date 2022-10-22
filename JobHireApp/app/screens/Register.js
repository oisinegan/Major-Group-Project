import { StyleSheet, Text, View,Button } from 'react-native';
import * as React from 'react';

function RegisterScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Register Screen</Text>
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

  export default RegisterScreen;