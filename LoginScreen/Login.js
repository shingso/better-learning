import React from 'react'
import { TextInput, View, SafeAreaView, Dimensions} from 'react-native'
import auth from '@react-native-firebase/auth';

import { v4 as uuid } from 'uuid'
import { GoogleSignin, GoogleSigninButton, statusCodes  } from '@react-native-community/google-signin';

import styles from '../styles'
import { firebase } from '@react-native-firebase/firestore';

import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';

import { AppleButton } from '@invertase/react-native-apple-authentication';

import { Formik } from 'formik';


import { Button, Text ,Icon, Input, Divider} from '@ui-kitten/components';




async function onAppleButtonPress() {
 
  const rawNonce = uuid();
  const state = uuid();


  appleAuthAndroid.configure({

    clientId: 'com.shing.betterlearning',
 
    redirectUri: 'https://betterlearning-88c6f.firebaseapp.com/__/auth/handler',
    responseType: appleAuthAndroid.ResponseType.ALL,
    scope: appleAuthAndroid.Scope.ALL,
    nonce: rawNonce,
    state,
  });


  const response = await appleAuthAndroid.signIn();

  if (response.state === state) {
    const credentials = auth.AppleAuthProvider.credential(
      response.id_token,
      rawNonce, 
    )
    return auth().signInWithCredential(credentials)
  }


}
   
async function onGoogleButtonPress() {

    const { idToken } = await GoogleSignin.signIn()

    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    return auth().signInWithCredential(googleCredential);
}



function AppleSignIn() {
  return (
    <AppleButton
      buttonStyle={AppleButton.Style.WHITE}
      buttonType={AppleButton.Type.SIGN_IN}
      style={{
        
        height: 45,
      }}
      onPress={() => onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
    />
  );
} 


export default class Login extends React.Component {
 
 
  handleLogin = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    
    });
  }
    



    _configureGoogleSignIn() {
      GoogleSignin.configure({
       
        webClientId: '658778667051-mv2fj89vqeu7mp6fj8jjvd26h5s0pjpd.apps.googleusercontent.com',

    
      });
    }
 

    componentDidMount() {

      this._configureGoogleSignIn();
      }


  
  
  render() {
    
 
     return (

       
      <View style={{ flex: 1, justifyContent:'center', padding:16}}>
      <Formik
      initialValues={{ email:'', password:''}}
      //validationSchema={validationSchema}
      onSubmit={(values, actions) => {
       this.handleLogin(values.email, values.password)
       actions.setSubmitting(false);
      }}
    >

      
      {formikProps => (
        <React.Fragment>
   

    <Input
     label='Email'
          placeholder='Enter Email'
          value={formikProps.values.email}
          size='large'
          onChangeText={formikProps.handleChange('email')}
        />

      <Input
          value={formikProps.values.password}
          label='Password'
          placeholder='Password'
          caption='Should contain at least 8 symbols'
          //accessoryRight={this.renderIcon}
          //captionIcon={AlertIcon}
          size='large'
          //secureTextEntry={this.state.secureTextEntry}
          onChangeText={formikProps.handleChange('password')}
        />

      <Button style={{marginVertical:16}} onPress={()=>formikProps.handleSubmit()}>
      LOGIN
      </Button>
        </React.Fragment>


      )}
    </Formik>
    <GoogleSigninButton   onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
    
    style={{marginBottom:20, width:'100%'}}/>
             
           
                <AppleSignIn/>
             
          
                <Button appearance={'ghost'}  onPress={() => this.props.navigation.navigate('SignUp')}>
                Sign Up with Email
                </Button>

             
                </View>
         
            )
     
  }
}

