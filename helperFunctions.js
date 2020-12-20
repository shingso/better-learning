import firestore from '@react-native-firebase/firestore';
import { v4 as uuid } from 'uuid'


export async function addUser(userID) {
    

  const ref = firestore().collection('Users').doc(userID)

  const refResponse = await ref.get()

  if(refResponse.exists){
    console.log('exists',refResponse.exists)
  
  } else {
    
    await ref.set({
      timeStamp: firestore.FieldValue.serverTimestamp(),
      currentStreak: 0,
      IQ: 0,
      highestStreak: 0,
      lastStudied: firestore.FieldValue.serverTimestamp(),
    });
 
    }
  }



export async function updateUserInfo(userID) {

    const ref = firestore().collection('Users').doc(userID)
    await ref.update({
      timeStamp: firestore.FieldValue.serverTimestamp()
    });
   
}


export async function deleteSubject(userID, subjectID) {

  const ref = firestore().collection('Users').doc(userID).collection('NotesCollection').doc(subjectID)
  await ref.delete();
 
}


export async function updateUserStreakData(userID, IQ, currentStreak, highestStreak, subjectID) {
  const docID = uuid()
  const batch = firestore().batch();
  const ref = firestore().collection('Users').doc(userID)
  const ref2 = firestore().collection('Users').doc(userID).collection('DatesStudied').doc(docID)
  const ref3 = firestore().collection('Users').doc(userID).collection('NotesCollection').doc(subjectID)
  
  batch.update(ref,{
    lastStudied: firestore.FieldValue.serverTimestamp(),
    IQ: IQ,
    currentStreak: currentStreak,
    highestStreak: highestStreak
  });
  
  batch.set(ref2, {   
     timeStamp: firestore.FieldValue.serverTimestamp(),
   })


   batch.update(ref3, {
     lastStudied: firestore.FieldValue.serverTimestamp()
   })


  batch.commit()

}


export async function addNotesCollection(userID,subject) {
    
    const ref = firestore().collection('Users').doc(userID).collection('NotesCollection')
    await ref.add({
      title: subject,
      noteCount: 0,
      timeStamp: firestore.FieldValue.serverTimestamp(),
    
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
  const decrement = firestore.FieldValue.decrement(1);
  const ref = firestore().collection('CurrentUsers').doc('ActiveUsers')
  await ref.update({
    NumberOfActiveUsers: decrement
  });

}


export async function getActiveUsers() {
    
  const ref = firestore().collection('CurrentUsers').doc('ActiveUsers')
  await ref.get()

}



export async function addNote(userID, subjectID, text, textTheme) {
    const increment = firestore.FieldValue.increment(1);
    const ref = firestore().collection('Users').doc(userID).collection('NotesCollection').doc(subjectID).collection('Notes')
    const subjectRef = firestore().collection('Users').doc(userID).collection('NotesCollection').doc(subjectID)

    if(textTheme != ''){

      await ref.add({
        
        text: text,
        textTheme: textTheme,
        timeStamp: firestore.FieldValue.serverTimestamp()
        
      });
      
    } else {

      await ref.add({
        
        text: text,
        timeStamp: firestore.FieldValue.serverTimestamp()
        
      });
     
    }

    await subjectRef.update({
      noteCount: increment
    });
  
   
}



