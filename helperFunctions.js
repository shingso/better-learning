import React from 'react';
import firestore from '@react-native-firebase/firestore';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, useTheme } from '@ui-kitten/components';


export async function saveThemeValue(value){
  try {
    await AsyncStorage.setItem('@theme', value)
  } catch (e) {
    // saving error
    console.log(e)
  }
}



export async function getThemeValue(){
  try {
    const value = await AsyncStorage.getItem('@theme')
    if(value !== null) {
      // value previously stored
      console.log(value)
    }
  } catch(e) {
    // error reading value
    console.log(e)
  }
}





export async function addUser(userID) {
    

  const ref = firestore().collection('Users').doc(userID)

  const refResponse = await ref.get()

  if(refResponse.exists){

    console.log('exists', refResponse.exists)
  
  } else {
    
    await ref.set({
      timeStamp: firestore.FieldValue.serverTimestamp(),
      lastStudied: firestore.FieldValue.serverTimestamp(),
      lastRecalled: null,
      startedStudying: null,
      totalNotes:0,
      totalRecallNotes:0,
      
    });
 
    }
  }



export async function updateUserLastStudied(userID, dateSinceLastStudy, startedStudy, minutesStudied) {

    const docID = uuid()
    const batch = firestore().batch();

    const ref = firestore().collection('Users').doc(userID)
    const ref2 = firestore().collection('Users').doc(userID).collection('DatesStudied').doc(docID)
    //if the date since last study is greater than 14 than we need to update started studying
    //if there isnt a started studying date - then we need to update it

    
    if(dateSinceLastStudy < 14 && startedStudy != null){
      batch.update(ref, {
        lastStudied: firestore.FieldValue.serverTimestamp()
      })
    } else {

      batch.update(ref, {
        lastStudied: firestore.FieldValue.serverTimestamp(),
        startedStudying: firestore.FieldValue.serverTimestamp()
      })

    }



    batch.set(ref2, {   
      timeStamp: firestore.FieldValue.serverTimestamp(),
      minutesStudied: minutesStudied

    })

    batch.commit()
}


export async function deleteSubject(userID, subjectID) {

  const ref = firestore().collection('Users').doc(userID).collection('Subjects').doc(subjectID)
  await ref.delete();
 
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


export async function skipNote(userID, subjectID) {

  const ref = firestore().collection('Users').doc(userID).collection('GlobalNotes').doc(subjectID)
  await ref.update({
    recalled : true
  });

}

export async function addRecallNote(userID, ID, text, textTheme, subject) {
  
  
 
  const docID = uuid()
  const batch = firestore().batch();
  const ref = firestore().collection('Users').doc(userID)
  const ref2 = firestore().collection('Users').doc(userID).collection('GlobalNotes').doc(docID)
  const increment = firestore.FieldValue.increment(1);
  //if the date since last study is greater than 14 than we need to update started studying

  batch.update(ref, {
    lastRecalled: firestore.FieldValue.serverTimestamp(),
    totalRecallNotes: increment
  })

  batch.set(ref2, {   
    subject: subject,
    text: text,
    textTheme: textTheme,
    timeStamp: firestore.FieldValue.serverTimestamp(),
    recalled : true,
    recallNote: true
  })

  batch.commit()

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
      recalled:false
    
    });
    
  } else if(textTheme == '' && subject != ''){
    
    await ref.add({
      textTheme: null,
      text: text,
      subject: subject,
      timeStamp: firestore.FieldValue.serverTimestamp(),
      recalled:false
    });

  } else if(textTheme != '' && subject != ''){
    
    await ref.add({
      textTheme: textTheme,
      text: text,
      subject: subject,
      timeStamp: firestore.FieldValue.serverTimestamp(),
      recalled:false
      
    });

  } else {

    await ref.add({
      textTheme: null,
      text: text,
      timeStamp: firestore.FieldValue.serverTimestamp(),
      recalled:false
      
    });
   
  }

}



export function formatMinutes(time){
  const theme = useTheme()
  const labelStyle = {
    color:theme['text-hint-color']
  }

  const numberStyle = {
    fontWeight:'500', 
    fontSize:15, 
    fontFamily:'OpenSans-SemiBold'
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
    return <Text style={numberStyle}>0 <Text  style={labelStyle}>mins</Text></Text>
  }

  if(remainingMinutes > 0 && hours === 0){
    return <Text style={numberStyle}>{remainingMinutes} <Text  style={labelStyle}>mins</Text></Text>
  }

  if(remainingMinutes > 0 && hours === 1){
    return <Text style={numberStyle}>{hours} <Text  style={labelStyle}>hour</Text>  {remainingMinutes} <Text  style={labelStyle}>mins</Text></Text>
  }

  if(remainingMinutes > 0){
    return <Text style={numberStyle}>{hours} <Text  style={labelStyle}>hours</Text>  {remainingMinutes} <Text  style={labelStyle}>mins</Text></Text>
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
