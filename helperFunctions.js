import firestore from '@react-native-firebase/firestore';



export async function addUser(userID) {
    const ref = firestore().collection('Users').doc(userID)
    await ref.set({
      timeStamp: firestore.FieldValue.serverTimestamp(),
      currentStreak: 0,
      IQ: 0,
      highestStreak: 0,
      lastStudied: firestore.FieldValue.serverTimestamp(),
    });
  
   
  }



export async function updateUserInfo(userID) {

    const ref = firestore().collection('Users').doc(userID)
    await ref.update({
      timeStamp: firestore.FieldValue.serverTimestamp()
    });

  //population: firebase.firestore.FieldValue.increment(1) - inorder to increament 
   
}

export async function updateUserStreakData(userID, IQ, currentStreak, highestStreak) {

  const ref = firestore().collection('Users').doc(userID)
  await ref.update({
    lastStudied: firestore.FieldValue.serverTimestamp(),
    IQ: IQ,
    currentStreak: currentStreak,
    highestStreak: highestStreak
  });

//population: firebase.firestore.FieldValue.increment(1) - inorder to increament 
 
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



