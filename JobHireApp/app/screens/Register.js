import { StyleSheet, Pressable, TouchableOpacity, KeyboardAvoidingView, Text, View, Button, TextInput, PermissionsAndroid, Image } from 'react-native';
import * as React from 'react';

function RegisterScreen({ navigation }) {
    return (
     
<View style={styles.container}>

 <View style={styles.image}>  
<Image style={{width: 150, height: 150, margin: 20}} 
//Change path to your directory for image
source={require("C:/Users/joela/Documents/GitHub/Major-Group-Project/JobHireApp/app/assets/login_symbol.png")}/>
</View>

<View style={styles.title}>
<Text style={{fontSize:30, letterSpacing: 1}}>Create an Account</Text>
</View>

<KeyboardAvoidingView style={styles.textInput}>

<Text>Username:</Text>
 <TextInput style={{borderWidth: 1, borderColor: '#777',padding:5, width:250, marginBottom: 20}}
     placeholder='Username'
   />
   
<Text>Password:</Text>
   <TextInput secureTextEntry={true} style={{borderWidth: 1, borderColor: '#777',padding:5, width:250}}
   placeholder='Password'
   />


</KeyboardAvoidingView>


<TouchableOpacity style={styles.button}>
      <Text style={{color: 'white',textAlign: 'center', justifyContent: 'center', fontSize:20, lineHeight:40}}>Sign Up</Text>
      </TouchableOpacity>


<View style={styles.footer}>
<Text style={{fontSize:15, marginBottom: 5}}>Forgot password?</Text>
<Text style={{fontSize:15}}>Already have an account? <Text style={{textDecorationLine: 'underline'}}  onPress={() => navigation.navigate('Login')}>Login</Text></Text>
</View>



</View> //end of main view


  );
  }
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
      alignItems: 'center',
    //  justifyContent: 'center',
      textAlign: 'left'
    },

    image:{
      marginBottom: 15

    },
    
    title: {
      marginBottom: 15

    },
    textInput: {
      marginBottom: 50,
      


    },
    input: {
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      width:100,
      borderRadius: 4,
      height: 40,
      backgroundColor: 'grey',
      marginBottom: 50


    },
    footer: {
      fontSize:30, 
      letterSpacing: 1

    },
  
  });

  export default RegisterScreen;