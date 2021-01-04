import React, { useState } from 'react'
import { TextInput, View, SafeAreaView, Dimensions, TouchableWithoutFeedback } from 'react-native'
import auth from '@react-native-firebase/auth';
import { useNavigation, StackActions } from '@react-navigation/native';
import { addUser } from '../helperFunctions'
import { Formik } from 'formik';
import { Button, Text ,Icon , Input} from '@ui-kitten/components';
import * as Yup from 'yup';
import SignInComponent from '../UtilComponents/SignInComponent'


const SignUpSchema = Yup.object().shape({
  email: Yup.string().email()
    .max(100, 'Too Long!')
    .required('Required'),

  password: Yup.string()
    .min(9, 'Minimum 9 Characters')
    .max(50, 'Too Long!')
    .required('Required'),

});

const AlertIcon = (props) => (
  <Icon {...props} name='alert-circle-outline'/>
);





function SignUp(){

  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(false)

  const handleSignUp = (email, password) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((currentUser) => {
        if(currentUser != null){
        addUser(currentUser.user.uid)
        }
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
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

       
    <View style={{ flex: 1, justifyContent:'center', padding:16}}>
    <Text category='h1' style={{marginBottom:24}}>Sign Up</Text>
    <Formik
    initialValues={{ email:'', password:''}}
    validationSchema={SignUpSchema}
    onSubmit={(values, actions) => {
       handleSignUp(values.email, values.password)
       actions.setSubmitting(false);
      }}
    >

      
    {formikProps => (
    <React.Fragment>
   

    <Input
    label={formikProps.touched.email && formikProps.errors.email}
    placeholder='Enter Email'
    value={formikProps.values.email}
    size='large'
    onChangeText={formikProps.handleChange('email')}
    status={formikProps.touched.email && formikProps.errors.email != null ? 'danger':'basic'}
    style={{marginBottom:16}}
    />


    <Input
    value={formikProps.values.password}
    label={formikProps.touched.password && formikProps.errors.password}
    placeholder='Password'
    caption='Should contain at least 9 symbols'
    accessoryRight={renderIcon}
    captionIcon={AlertIcon}
    size='large'
    secureTextEntry={secureTextEntry}
    onChangeText={formikProps.handleChange('password')}
    status={formikProps.touched.password && formikProps.errors.password != null ? 'danger':'basic'}
    />


    <Button style={{marginVertical:16}} onPress={()=>formikProps.handleSubmit()}>Sign Up</Button>

    <SignInComponent/>



    <Text category='label' style={{alignSelf:'center', marginVertical:8}}> 
    Already have an account?
    </Text>
    <Button appearance={'ghost'} onPress={() =>  navigation.navigate('Login')}>
    Go to Login
    </Button>
    </React.Fragment>

    )}
    </Formik>
    </View>
         
    )
     
  
}

export default SignUp