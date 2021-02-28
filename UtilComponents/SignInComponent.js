import React, { useContext, useEffect } from 'react'
import { TextInput, View, SafeAreaView, Dimensions, Platform, Image } from 'react-native'
import auth from '@react-native-firebase/auth';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'
import { GoogleSignin, GoogleSigninButton, statusCodes  } from '@react-native-community/google-signin';
import { AuthContext } from '../AuthContext'
import appleAuth, {
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { Button, Text ,Icon, Input, Layout } from '@ui-kitten/components';
import { addUser } from '../helperFunctions';



const GoogleIcon = (props) => (
  <Icon {...props} name='google' width={22} height={22}/>
);




function SignInComponent(){
 

  const authContext = useContext(AuthContext)


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
  
    try{
  
    const response = await appleAuthAndroid.signIn();
    if (response.state === state) {
      const credentials = auth.AppleAuthProvider.credential(
        response.id_token,
        rawNonce, 
      )
      const authResponse = await auth().signInWithCredential(credentials) 
      addUser(authResponse.user.uid)
      return authResponse
      }
  
    } catch(e){
      console.log(e)
    }
  
  
  }
  
  
  async function onAppleButtonPressApple() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
  
    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    }
  
    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
  
    // Sign the user in with the credential
    const authResponse = await auth().signInWithCredential(appleCredential);
    authContext.setNewUser(authResponse.additionalUserInfo.isNewUser)
    addUser(authResponse.user.uid)
    return authResponse
  }
     
  
  
  
  
  function AppleSignIn() {
    return (
      <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.CONTINUE}
        style={{
          width:'100%',
          height: 54,
          borderRadius:30,
      
        }}

        cornerRadius={18}
        
        textStyle={{fontSize:16, fontWeight:'bold'}}
        leftView={(
          <Image
            style={{
              alignSelf: 'center',
              width: 20,
              height: 20,
              marginRight: 20,
              resizeMode: 'contain',
            }}
            source={require('../assets/images/apple_logo_white.png')}
          />
        )}

        onPress={ Platform.OS == 'ios' ? () => onAppleButtonPressApple() : () => onAppleButtonPress()}
      />
    );
  } 

  
  
  async function onGoogleButtonPress() {

    try{ 
    const { idToken } = await GoogleSignin.signIn()
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    const response = await auth().signInWithCredential(googleCredential)  
    authContext.setNewUser(response.additionalUserInfo.isNewUser)
    addUser(response.user.uid)
    return response
    } catch(e){
      console.log(e)
    }
}

  useEffect(() => {

    GoogleSignin.configure({
      webClientId: '658778667051-mv2fj89vqeu7mp6fj8jjvd26h5s0pjpd.apps.googleusercontent.com',
    });

  }, []);


 
     return (

    
        <View>

        <Button accessoryLeft={GoogleIcon} size='large' status='info' onPress={() => onGoogleButtonPress()} style={{marginBottom:24, borderRadius:30}}> 
        Continue with Google 
        </Button>

        <AppleSignIn/>
        </View>
         
    )
     
  
}


export default SignInComponent
