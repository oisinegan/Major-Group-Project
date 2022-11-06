import { StyleSheet, Text, View,Button } from 'react-native';
import * as React from 'react';


function UserAbout({ navigation }) {
  return (
    <View style={styles.container}>
  
  <Text>user about Screen</Text>



  </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },

    navBar:{
      flexDirection: 'row',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',

      
  
    },
  });

  export default UserAbout;