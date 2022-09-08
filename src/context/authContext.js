import { createContext, useContext, useReducer } from "react";
import { authReducer } from "./authReducer";
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { dbService, storageService } from '../firebase/config'
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const AuthContext = createContext();

export const useAuthState = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const init = {
        error: null,
        isAuthenticated: true,
        id: "Robin",
        uid: "8lRT9L7g2qP1tnZmntiN7lExkEr1",
        email: "test@test.com", 
        photoUrl: null,
        userInfo: {
            id: "Robin",
            email: "test@test.com",
            uid: "8lRT9L7g2qP1tnZmntiN7lExkEr1",
        },
        token: "da9sd8af8ad1qada01fb3baasa",
    };

    const updateUserInfo = async (state, fileUrl, userName, userId, userEmail) => {
        const imgRef = ref(storageService, `users/${state.uid}/image`);
        const docRef = doc(dbService, 'userInfo', state.uid);
        await uploadString(imgRef, fileUrl, "data_url")
            .then(async() => {
                const downloadUrl = await getDownloadURL(imgRef)
                await updateDoc(docRef, {
                    photoUrl: downloadUrl,
                    id: userId,
                    name: userName,
                    email: userEmail
                });
            }).then(async() => {
                const docSnap = await getDoc(docRef);
                dispatch({ type: "UPDATE_USERINFO", 
                    name: docSnap.data()?.name, 
                    id: docSnap.data()?.id, 
                    photoUrl: docSnap.data()?.photoUrl,
                    email: docSnap.data()?.email})
            }).then(() => {
                alert("완료 되었습니다.")
            })
    }


    const [state, dispatch] = useReducer(authReducer, init);

    return (
        <AuthContext.Provider value={{state, dispatch, updateUserInfo}}>
                {children}
        </AuthContext.Provider>
    )
}