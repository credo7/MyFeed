import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userSecondaryInfo, setUserSecondaryInfo] = useState();

  useEffect(() => {
    if (currentUser) {
      updateUserSecondaryInfo();
    }
  }, [currentUser]);

  async function signup(email, password, name, username) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', cred.user.uid), {
      email,
      name,
      username: username.toLowerCase(),
      uid: cred.user.uid,
      photoURL:
        'https://firebasestorage.googleapis.com/v0/b/instagram-clone-8f507.appspot.com/o/jFdZGJ09EUY2R85V3KEt6We9oUR2%2Fprofile.png?alt=media&token=a1d5e781-a8e6-42dd-b805-d1ef175e0214',
    });
    return;
  }

  const updateUserSecondaryInfo = async () => {
    const docSnap = await getDoc(doc(db, 'users', currentUser.uid));

    if (docSnap.exists()) {
      setUserSecondaryInfo(docSnap.data());
    }
  };

  function signin(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signinAsGuest() {
    return signInWithEmailAndPassword(auth, 'guest@gmail.com', 'guest123');
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signin,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    userSecondaryInfo,
    signinAsGuest,
    updateUserSecondaryInfo,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
