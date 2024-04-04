import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from 'axios';

const auth = getAuth(app);

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [userDetails,setUserDetails] = useState([])
  const addToCart = _id => {
    console.log(_id);
    const cart = [...cartItem];
    cart.push(_id);
    setCartItem(cart);
    // console.log(cartItem);
  };
  const googleProvider = new GoogleAuthProvider();
  const logInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      console.log("current User: ", currentUser);
    });
    

    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(()=>{
    axios.get(`http://localhost:5000/user/${user?.email}`)
    .then(res=>{
        console.log("user details: ",res)
        setUserDetails(res)
    })
    .catch(err=>{
        console.log('err')
    })
  },[user])
  const authInfo = {
    user,
    auth,
    createUser,
    loading,
    login,
    setSignInSuccess,
    signInSuccess,
    logOut,
    cartItem,
    setCartItem,
    addToCart,
    logInWithGoogle,
    userDetails
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
