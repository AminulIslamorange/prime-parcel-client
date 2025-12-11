import { useEffect, useState } from "react";
import app from "../../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut,GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";



const auth = getAuth(app);
const googleProvider=new GoogleAuthProvider();


const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const signInUser=(email,password)=>{
        setLoading(true);
    return signInWithEmailAndPassword(auth,email,password);
    }
    const signInWithGoogle=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider)

    }
    const updateUserProfile=(profileInfo)=>{
        return updateProfile(auth.currentUser,profileInfo)

    }
    


    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            unSubscribe();
        }
    },[])

    const authInfo={user,
        loading,
        createUser,
        signInUser,signInWithGoogle,updateUserProfile,logOut

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProvider;