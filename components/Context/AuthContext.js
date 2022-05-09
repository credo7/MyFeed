import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { createContext, useContext, useEffect, useState } from 'react';

import { auth, db, storage } from '../../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userSecondaryInfo, setUserSecondaryInfo] = useState();

  useEffect(() => {
    if (currentUser && !currentUser.image) {
      getUserImageAndAddToCurrentUser();
    }
    if (currentUser) {
      updateUserSecondaryInfo();
    }
  }, [currentUser]);

  async function signup(email, password, name, username) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', cred.user.uid), {
      email,
      name,
      username,
      uid: cred.user.uid,
    });
    return
  }

  const updateUserSecondaryInfo = async () => {
    const docSnap = await getDoc(doc(db, 'users', currentUser.uid));

    if (docSnap.exists()) {
      setUserSecondaryInfo(docSnap.data());
    }
  };

  const getUserImageAndAddToCurrentUser = async () => {
    getDownloadURL(ref(storage, `${currentUser.uid}/profile.png`))
      .then((url) => {
        updateProfile(currentUser, { photoURL: url });
        const userDoc = doc(db, `users/${currentUser.uid}`);
        updateDoc(userDoc, { photoURL: url });
      })
      .catch(() => {
        console.log("Opps.. You haven't got picture");
      });

    // const userImageUrl = await getDownloadURL(imageRef).catch((e) => {
    //   console.log("Don't worry");
    // });
    // if (userImageUrl) {
    //   updateProfile(currentUser, { image: userImageUrl });
    // }
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
