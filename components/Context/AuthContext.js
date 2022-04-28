import { useContext, useState, useEffect, createContext } from "react";
import { auth, db, storage, app } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { setDoc, doc, getDoc, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser && !currentUser.image) {
      getUserImageAndAddToCurrentUser();
    }
    if (currentUser) {
      console.log(currentUser.uid);
    }
  }, [currentUser]);

  async function signup(email, password, name, username) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    return await setDoc(doc(db, "users", cred.user.uid), {
      email,
      name,
      username,
    });
  }

  const getUserImageAndAddToCurrentUser = async () => {
    getDownloadURL(ref(storage, `${currentUser.uid}/profile.png`))
      .then((url) => {
        console.log("here");
        updateProfile(currentUser, { photoURL: url });
      })
      .catch((e) => {
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

  function logout() {
    console.log(123);
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
