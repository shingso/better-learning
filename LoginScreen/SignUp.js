import React from 'react'
import { TextInput, View, SafeAreaView, Dimensions, TouchableWithoutFeedback } from 'react-native'
import styles from '../styles'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { addUser, addNotesCollection, addNote, updateUserInfo } from '../helperFunctions'
import { Formik } from 'formik';
import { Button, Text ,Icon , Input} from '@ui-kitten/components';




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
             
      <Formik
      initialValues={{ email:'', password:''}}
      //validationSchema={validationSchema}
      onSubmit={(values, actions) => {
       this.handleSignUp(values.email, values.password)
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
          accessoryRight={this.renderIcon}
          captionIcon={AlertIcon}
          size='large'
          secureTextEntry={this.state.secureTextEntry}
          onChangeText={formikProps.handleChange('password')}
        />


        
          <Button style={{marginVertical:16}} onPress={()=>formikProps.handleSubmit()} />
       
          <Button appearance={'ghost'}  onPress={() => this.props.navigation.navigate('Login')}>
           GO TO LOGIN
          </Button>
        
        </React.Fragment>
      )}
    </Formik>


            
                </View>
         
            )
     
  }
}

