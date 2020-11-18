import firestore from '@react-native-firebase/firestore';
import { v4 as uuid } from 'uuid'


export async function addUser(userID) {
    const ref = firestore().collection('Users').doc(userID)
    await ref.set({
      timeStamp: firestore.FieldValue.serverTimestamp(),
      currentStreak: 0,
      IQ: 0,
      highestStreak: 0,
      lastStudied: firestore.FieldValue.serverTimestamp(),
    });
    // Add collection datesstudied
    // everytime studied is complete add to dates studied
    // await ref.add({
    //   
    //   
    //   timeStamp: firestore.FieldValue.serverTimestamp(),
    // });
   
  }



export async function updateUserInfo(userID) {

    const ref = firestore().collection('Users').doc(userID)
    await ref.update({
      timeStamp: firestore.FieldValue.serverTimestamp()
    });

  //population: firebase.firestore.FieldValue.increment(1) - inorder to increament 
   
}

export async function updateUserStreakData(userID, IQ, currentStreak, highestStreak) {
  const docID = uuid()
  const batch = firestore().batch();
  const ref = firestore().collection('Users').doc(userID)
  const ref2 = firestore().collection('Users').doc(userID).collection('DatesStudied').doc(docID)
  batch.update(ref,{
    lastStudied: firestore.FieldValue.serverTimestamp(),
    IQ: IQ,
    currentStreak: currentStreak,
    highestStreak: highestStreak
  });
  
  batch.set(ref,{
    lastStudied: firestore.FieldValue.serverTimestamp(),
    IQ: IQ,
    currentStreak: currentStreak,
    highestStreak: highestStreak
  });

  
  batch.set(ref2, {   
     timeStamp: firestore.FieldValue.serverTimestamp(),
   })

 /*  await ref.add({   
    timeStamp: firestore.FieldValue.serverTimestamp(),
  });
 */

  batch.commit()

/*   await ref.update({
    lastStudied: firestore.FieldValue.serverTimestamp(),
    IQ: IQ,
    currentStreak: currentStreak,
    highestStreak: highestStreak
  });


  await ref.add({   
    timeStamp: firestore.FieldValue.serverTimestamp(),
  }); */


//population: firebase.firestore.FieldValue.increment(1) - inorder to increament 
//here we want to keep track of the users data 
 
}


export async function addNotesCollection(userID,subject) {
    
    const ref = firestore().collection('Users').doc(userID).collection('NotesCollection')
    await ref.add({
      title: subject,
      noteCount: 0,
      timeStamp: firestore.FieldValue.serverTimestamp(),
    
    });


   
}


export async function addNote(userID, subjectID, text) {
    const increment = firestore.FieldValue.increment(1);
    const ref = firestore().collection('Users').doc(userID).collection('NotesCollection').doc(subjectID).collection('Notes')
    const subjectRef = firestore().collection('Users').doc(userID).collection('NotesCollection').doc(subjectID)

    await ref.add({
      
      text: text,
      timeStamp: firestore.FieldValue.serverTimestamp()
      
    });

    await subjectRef.update({
      noteCount: increment
    });
  
   
}



