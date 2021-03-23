import React, { useState, useContext } from 'react'
import { TextInput, View, SafeAreaView, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';
import { useNavigation, StackActions } from '@react-navigation/native';
import { addUser } from '../helperFunctions'
import { Formik } from 'formik';
import { Button, Text ,Icon , Input} from '@ui-kitten/components';
import * as Yup from 'yup';
import SignInComponent from '../UtilComponents/SignInComponent'
import { AuthContext } from '../AuthContext'
import GlobalStyle from '../constants'

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
  const authContext = useContext(AuthContext)
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(false)

  const handleSignUp = (email, password) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((currentUser) => {
        if(currentUser != null){
        authContext.setNewUser(currentUser.additionalUserInfo.isNewUser)
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
    <SafeAreaView style={{flex:1}}>
    <View style={{flex:1, padding:20}}>
    <TouchableOpacity  onPress={()=>navigation.navigate('Login')}>
    <View style={{flexDirection:'row', alignItems:'center', alignSelf:'flex-end'}}>
    
    <View style={{marginRight:4, alignItems:'flex-end'}}>
    <Text category='label' style={{}}>Already have an account?</Text>
    <Text status='info' category='s2'>Go to Login</Text>
    </View>
    <Icon height={30} width={30} name='arrow-ios-forward-outline' fill={'black'}/>
    </View>
    </TouchableOpacity>

       
    <View style={{ flex: 1, marginTop:40}}>
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
    placeholder='Email'
    value={formikProps.values.email}
    size='large'
    onChangeText={formikProps.handleChange('email')}
    status={formikProps.touched.email && formikProps.errors.email != null ? 'danger':'basic'}
    style={{marginBottom:16}}
    textStyle={{height:45}}
    />


    <Input
    value={formikProps.values.password}
    label={formikProps.touched.password && formikProps.errors.password}
    placeholder='Password'
    caption='Should contain at least 9 symbols'
    accessoryRight={renderIcon}
    captionIcon={AlertIcon}
    size='large'
    textStyle={{height:45}}
    secureTextEntry={secureTextEntry}
    onChangeText={formikProps.handleChange('password')}
    status={formikProps.touched.password && formikProps.errors.password != null ? 'danger':'basic'}
    />

    <Button style={{marginVertical:16, borderRadius:30, marginBottom:28, ...GlobalStyle.ButtonShadow}} size='large' onPress={()=>formikProps.handleSubmit()}>Sign Up</Button>
    <Text category='s1' style={{alignSelf:'center', marginBottom:24}}> 
    OR
    </Text>
    <SignInComponent/>
    </React.Fragment>

    )}
    </Formik>
    </View>
    </View>
    </SafeAreaView>
         
    )
     
  
}

export default SignUp