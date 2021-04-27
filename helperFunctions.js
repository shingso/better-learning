import React from 'react';
import firestore from '@react-native-firebase/firestore';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'
import { Text, useTheme } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function addUser(userID) {
    

  const ref = firestore().collection('Users').doc(userID)

  const refResponse = await ref.get()

  if(!refResponse.exists){
    
    await ref.set({
      timeStamp: firestore.FieldValue.serverTimestamp(),
      startedStudying: firestore.FieldValue.serverTimestamp(),
      totalNotes:0,

      
    });
 
    }
  }



export async function addCompletedSession(userID, minutesStudied) {


   const ref = firestore().collection('Users').doc(userID).collection('DatesStudied')
   
   await ref.add({
      timeStamp: firestore.FieldValue.serverTimestamp(),
      minutesStudied: minutesStudied
    });

}


export async function deleteSubject(userID, subjectID) {

  const ref = firestore().collection('Users').doc(userID).collection('Subjects').doc(subjectID)
  await ref.delete();
 
}


export async function storeSession(value, endTime) {

    const session = [value, endTime]
    try {
        AsyncStorage.setItem('@sessionStatus', JSON.stringify(session));
    } catch (error) {
        console.log(error)
    }
  
}





export async function addSubject( userID, title ) {
    
  const ref = firestore().collection('Users').doc(userID).collection('Subjects')
  await ref.add({
    title: title,
    noteCount: 0,
    lastUsed: firestore.FieldValue.serverTimestamp(),
  
  });

}

export async function getAppInformation() {
    
  const ref = firestore().collection('App').doc('AppInformation')
  await ref.get()

}



export async function incrementActiveUsers() {
  const increment = firestore.FieldValue.increment(1);
  const ref = firestore().collection('CurrentUsers').doc('ActiveUsers')
  await ref.update({
    NumberOfActiveUsers: increment
  });

}


export async function decrementActiveUsers() {
  const decrement = firestore.FieldValue.increment(-1);
  const ref = firestore().collection('CurrentUsers').doc('ActiveUsers')
  await ref.update({
    NumberOfActiveUsers: decrement
  });


}



export async function addNote(userID, subject, text, textTheme) {
  const increment = firestore.FieldValue.increment(1);
  const ref = firestore().collection('Users').doc(userID).collection('GlobalNotes')

  const ref3 = firestore().collection('Users').doc(userID)
  await ref3.update({
    totalNotes: increment
  });

  if(subject != ''){
    const ref2 = firestore().collection('Users').doc(userID).collection('Subjects').doc(subject)
    await ref2.update({
      lastUsed: firestore.FieldValue.serverTimestamp(),
      noteCount: increment
    });

  }

  if(textTheme != '' && subject == ''){

    await ref.add({
      
      text: text,
      textTheme: textTheme,
      timeStamp: firestore.FieldValue.serverTimestamp(),

    
    });
    
  } else if(textTheme == '' && subject != ''){
    
    await ref.add({
      textTheme: null,
      text: text,
      subject: subject,
      timeStamp: firestore.FieldValue.serverTimestamp(),

    });

  } else if(textTheme != '' && subject != ''){
    
    await ref.add({
      textTheme: textTheme,
      text: text,
      subject: subject,
      timeStamp: firestore.FieldValue.serverTimestamp(),
  
      
    });

  } else {

    await ref.add({
      textTheme: null,
      text: text,
      timeStamp: firestore.FieldValue.serverTimestamp(),

    });
   
  }

}





//20 and 10 for label and font size
export function formatMinutes2(time, numberColor, labelColor, labelSize, numberSize){
  const theme = useTheme()
  const labelStyle = {
    //color:theme['color-basic-700'],
    color: labelColor,
    fontFamily:'Poppins-Regular',
    fontSize:labelSize,
  }

  const numberStyle = {
    fontWeight:'500'  , 
    fontSize:numberSize, 
    fontFamily:'Poppins-SemiBold',
    color: numberColor,


    
  } 

  
  let minutes = (time)
  let hours = Math.floor(minutes/60)
  let remainingMinutes = (minutes % 60)

  //let seconds = Math.floor((duration / 1000) % 60)
  //let minutes = Math.floor((duration / (1000 * 60)) % 60)
  //minutes = (minutes < 10) ? "0" + minutes : minutes;
  //seconds = (seconds < 10) ? "0" 
  //console.log(minutes, hours, remainingMinutes)

  if(remainingMinutes === 0 && hours === 0){
    return <Text style={numberStyle}>0 <Text  style={labelStyle}>minutes</Text></Text>
  }

  if(remainingMinutes > 0 && hours === 0){
    return <Text style={numberStyle}>{remainingMinutes} <Text  style={labelStyle}>minutes</Text></Text>
  }

  if(remainingMinutes > 0 && hours === 1){
    return <Text style={numberStyle}>{hours} <Text  style={labelStyle}>hour</Text>  {remainingMinutes} <Text  style={labelStyle}>minutes</Text></Text>
  }

  if(remainingMinutes > 0){
    return <Text style={numberStyle}>{hours} <Text  style={labelStyle}>hours</Text>  {remainingMinutes} <Text  style={labelStyle}>minutes</Text></Text>
  }

  return <Text style={numberStyle}>{hours} <Text  style={labelStyle}>hours</Text></Text>

}



export function msToTime(duration){

  let seconds = Math.floor((duration / 1000) % 60)
  let minutes = Math.floor((duration / (1000 * 60)) % 60)
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  if(minutes == 0){
    return seconds
  }
  return  minutes + ":" + seconds
}
