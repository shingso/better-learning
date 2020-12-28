import firestore from '@react-native-firebase/firestore';
import { v4 as uuid } from 'uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';



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
    });
 
    }
  }



export async function updateUserLastStudied(userID) {

    const ref = firestore().collection('Users').doc(userID)
    await ref.update({
      lastStudied: firestore.FieldValue.serverTimestamp()
    });
   
}


export async function deleteSubject(userID, subjectID) {

  const ref = firestore().collection('Users').doc(userID).collection('Subjects').doc(subjectID)
  await ref.delete();
 
}


export async function updateUserStreakData(userID,  subjectID) {


  const docID = uuid()
  const batch = firestore().batch();

  const ref2 = firestore().collection('Users').doc(userID).collection('DatesStudied').doc(docID)
  const ref3 = firestore().collection('Users').doc(userID).collection('NotesCollection').doc(subjectID)
  

  batch.set(ref2, {   
     timeStamp: firestore.FieldValue.serverTimestamp(),
   })

   batch.update(ref3, {
     lastStudied: firestore.FieldValue.serverTimestamp()
   })


  batch.commit()

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
  
  const ref = firestore().collection('Users').doc(userID).collection('GlobalNotes')
  await ref.add({
    subject: subject,
    text: text,
    textTheme: textTheme,
    timeStamp: firestore.FieldValue.serverTimestamp(),
    recalled : true,
    recallNote: true

  });

  const ref2 = firestore().collection('Users').doc(userID).collection('GlobalNotes').doc(ID)
  await ref2.update({
    recalled : true
  });

}

export async function addNote(userID, subject, text, textTheme) {

  const ref = firestore().collection('Users').doc(userID).collection('GlobalNotes')

  if(subject != ''){
    const ref2 = firestore().collection('Users').doc(userID).collection('Subjects').doc(subject)
    await ref2.update({
      lastUsed: firestore.FieldValue.serverTimestamp()
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
      
      text: text,
      timeStamp: firestore.FieldValue.serverTimestamp(),
      recalled:false
      
    });
   
  }

}




