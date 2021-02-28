import React, { useState, useEffect, useContext } from 'react'
import { TextInput, View, SafeAreaView, Dimensions, Platform, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';
import { useNavigation, StackActions } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/firestore';
import { Formik } from 'formik';
import { Button, Text ,Icon, Input, Layout } from '@ui-kitten/components';
import * as Yup from 'yup';


import SignInComponent from '../UtilComponents/SignInComponent'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email()
    .max(100, 'Too Long!')
    .required('Required'),

  password: Yup.string()
    .min(9, 'Minimum 9 Characters')
    .max(50, 'Too Long!')
    .required('Required'),

});





function Login(){
 

 const navigation = useNavigation();
 const [secureTextEntry, setSecureTextEntry] = useState(false)


 const handleLogin = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    
    });
  }



 


    const toggleSecureEntry = () => {
      setSecureTextEntry(!secureTextEntry)
    };


    const renderIcon = (props) => (
      <TouchableWithoutFeedback onPress={toggleSecureEntry}>
        <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
      </TouchableWithoutFeedback>
    );

  

     return (
      <SafeAreaView style={{flex:1}}>
      <View  style={{ flex: 1,  padding:20, }}>

      <TouchableOpacity  onPress={()=>navigation.navigate('SignUp')}>
      <View style={{flexDirection:'row', alignItems:'center', alignSelf:'flex-end'}}>
      
      <View style={{marginRight:4, alignItems:'flex-end'}}>
      <Text category='label' style={{}}>Dont have an account?</Text>
      <Text status='info' category='s2'>Go to Sign Up</Text>
      </View>
      
      <Icon height={30} width={30} name='arrow-ios-forward-outline' fill={'black'}/>
      </View>
      </TouchableOpacity>

      <View style={{ flex: 1, marginTop:40}}>
      
      <View>
      <Text category='h1' style={{marginBottom:12}}>Login</Text>
      </View>

      <Formik
      initialValues={{ email:'', password:''}}
      validationSchema={LoginSchema}
      onSubmit={(values, actions) => {
       handleLogin(values.email, values.password)
       actions.setSubmitting(false);
      }}
    >

      
    {formikProps => (
    <React.Fragment>
   

    <Input
    placeholder='Email address'
    value={formikProps.values.email}
    label={formikProps.touched.email && formikProps.errors.email}
    size='large'
    status={formikProps.touched.email && formikProps.errors.email != null ? 'danger':'basic'}
    onChangeText={formikProps.handleChange('email')}
    textStyle={{fontSize:14, height:45}}
    style={{marginVertical:8, borderRadius:4}}
    />

    <Input
    value={formikProps.values.password}
    textStyle={{fontSize:14, height:45}}
    style={{borderRadius:4}}
    placeholder='Password'  
    status={formikProps.touched.password && formikProps.errors.password != null ? 'danger':'basic'}
    accessoryRight={renderIcon}
    label={formikProps.touched.password && formikProps.errors.password}
    size='large'
    secureTextEntry={secureTextEntry}
    onChangeText={formikProps.handleChange('password')}
    />

    <Button size='large' style={{marginTop:16, borderRadius:30}} onPress={()=>formikProps.handleSubmit()}>
    Login
    </Button>
    <Button appearance='ghost' status='basic' onPress={()=>{navigation.navigate('ForgotPassword')}}>Forgot your password?</Button>
    </React.Fragment>


      )}
    </Formik>
    
    <View style={{  justifyContent:'center'}}>
    <Text category='s1' style={{alignSelf:'center', marginTop:8, marginBottom:24}}> 
    OR
    </Text>
    <SignInComponent/>
    </View>
    </View>
    </View>
    </SafeAreaView>
    )
     
  
}


export default Login

