import React from 'react'
import { TextInput, View, SafeAreaView, Dimensions, Platform } from 'react-native'
import auth from '@react-native-firebase/auth';
import { v4 as uuid } from 'uuid'
import { GoogleSignin, GoogleSigninButton, statusCodes  } from '@react-native-community/google-signin';
import { firebase } from '@react-native-firebase/firestore';
import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { Formik } from 'formik';
import { Button, Text ,Icon, Input, Divider} from '@ui-kitten/components';
import * as Yup from 'yup';


const LoginSchema = Yup.object().shape({
  email: Yup.string().email()
    .max(100, 'Too Long!')
    .required('Required'),

  password: Yup.string()
    .min(9, 'Minimum 9 Characters')
    .max(50, 'Too Long!')
    .required('Required'),

});


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
  return auth().signInWithCredential(appleCredential);
}
   
async function onGoogleButtonPress() {

    const { idToken } = await GoogleSignin.signIn()

    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    return auth().signInWithCredential(googleCredential);
}



function AppleSignIn() {
  return (
    <AppleButton
      buttonStyle={AppleButton.Style.WHITE_OUTLINE}
      buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width:'100%',
        height: 45,
      }}

      
      onPress={ Platform.OS == 'ios' ? () => onAppleButtonPressApple() : () => onAppleButtonPress()}
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
      
      <View>
      <Text category='h1' style={{marginBottom:12, marginTop:20}}>Login</Text>
      </View>

      <Formik
      initialValues={{ email:'', password:''}}
      validationSchema={LoginSchema}
      onSubmit={(values, actions) => {
       this.handleLogin(values.email, values.password)
       actions.setSubmitting(false);
      }}
    >

      
    {formikProps => (
    <React.Fragment>
   

    <Input
    placeholder='Email address'
    value={formikProps.values.email}
    size='large'
    status={formikProps.errors.email != null ? 'danger':'basic'}
    onChangeText={formikProps.handleChange('email')}
    textStyle={{fontSize:14}}
    style={{marginVertical:8}}
    />

    <Input
    value={formikProps.values.password}
    textStyle={{fontSize:14}}
    placeholder='Password'  
    status={formikProps.errors.password != null ? 'danger':'basic'}
    //accessoryRight={this.renderIcon}
    //captionIcon={AlertIcon}
    size='large'
    //secureTextEntry={this.state.secureTextEntry}
    onChangeText={formikProps.handleChange('password')}
    />

    <Button style={{marginVertical:16}} onPress={()=>formikProps.handleSubmit()}>
    Login
    </Button>
    </React.Fragment>


      )}
    </Formik>
    
    <View style={{marginVertical:20,  justifyContent:'center'}}>
    <Text category='label' style={{alignSelf:'center', marginVertical:8}}> 
    Sign in with the following
    </Text>
    <Button appearance={'outline'}  onPress={() => onGoogleButtonPress()} style={{marginBottom:20}}> 
    Sign in with Google 
    </Button>
               
    <AppleSignIn/>
    </View>

    <Text category='label' style={{alignSelf:'center', marginVertical:8}}> 
    Don't have an account?
    </Text>
    <Button appearance={'outline'} onPress={() => this.props.navigation.navigate('SignUp')}>
    Sign Up with Email
    </Button>


  
             
    </View>
         
    )
     
  }
}

