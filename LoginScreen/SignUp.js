import React from 'react'
import { TextInput, View, SafeAreaView, Dimensions, TouchableWithoutFeedback } from 'react-native'
import styles from '../styles'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { addUser, addNotesCollection, addNote, updateUserInfo } from '../helperFunctions'
import { Formik } from 'formik';
import { Button, Text ,Icon , Input} from '@ui-kitten/components';
import * as Yup from 'yup';



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


export default class SignUp extends React.Component {

  handleSignUp = (email, password) => {
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
    
    
    constructor(args) {
        super(args);

        this.state = {
          secureTextEntry: false

        }
    }

  componentDidMount(){

      
           
  }


  toggleSecureEntry = () => {
    this.setState({
      secureTextEntry : !this.state.secureTextEntry
    })
  };


  renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={this.toggleSecureEntry}>
      <Icon {...props} name={this.state.secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  render() {
    

     return (

       
    <View style={{ flex: 1, justifyContent:'center', padding:16}}>
    <Text category='h1' style={{marginBottom:24}}>Sign Up</Text>
    <Formik
    initialValues={{ email:'', password:''}}
    validationSchema={SignUpSchema}
    onSubmit={(values, actions) => {
       this.handleSignUp(values.email, values.password)
       actions.setSubmitting(false);
      }}
    >

      
    {formikProps => (
    <React.Fragment>
   

    <Input
    label={formikProps.errors.email}
    placeholder='Enter Email'
    value={formikProps.values.email}
    size='large'
    onChangeText={formikProps.handleChange('email')}
    status={formikProps.errors.email != null ? 'danger':'basic'}
    style={{marginBottom:16}}
    />


    <Input
    value={formikProps.values.password}
    label={formikProps.errors.password}
    placeholder='Password'
    caption='Should contain at least 9 symbols'
    accessoryRight={this.renderIcon}
    captionIcon={AlertIcon}
    size='large'
    secureTextEntry={this.state.secureTextEntry}
    onChangeText={formikProps.handleChange('password')}
    status={formikProps.errors.password != null ? 'danger':'basic'}
    />


    <Button style={{marginVertical:16}} onPress={()=>formikProps.handleSubmit()}>Sign Up</Button>
    <Text category='label' style={{alignSelf:'center', marginVertical:8}}> 
    Already have an account?
    </Text>
    <Button appearance={'outline'} onPress={() => this.props.navigation.navigate('Login')}>
    Go to Login
    </Button>
    </React.Fragment>

    )}
    </Formik>
    </View>
         
    )
     
  }
}

