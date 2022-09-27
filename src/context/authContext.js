import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer } from "./authReducer";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { dbService, storageService } from '../firebase/config'
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuthState = () => {
    return useContext(AuthContext);
}

// Auth 초기값 지정
function getInitialState() {
    const init = {
        error: null,
        id: "",
        email: "",
        uid: "",
        photoUrl: null,
        isSignUpAuthenticated: false,
        isAuthenticated: false,
    }
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : init;
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, getInitialState());
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('userInfo', JSON.stringify(state))
    }, [state])

    // 전체 유저 데이터 가져오기
    const getAllUsersData = async () => {
        const querySnapshot = await getDocs(collection(dbService, "userInfo"));
        const user = []
        querySnapshot.forEach((doc) => {
            user.push(doc.data());
        })
        return user;
    }

    // userId에 해당하는 유저 데이터 가져오기
    const getUserData = async (userId) => {
        const userRef = collection(dbService, "userInfo");
        const q = query(userRef, where("id", "==", userId));
        const querySnapshot = await getDocs(q)
        const user = [];
        querySnapshot.forEach(doc => {
            user.push(doc.data());
        })
        return user;
    }

    // user 정보 업데이트 (수정) with 프로필 사진
    const updateUserImg = async (state, fileUrl, userName, userId, userEmail) => {
        const imgRef = ref(storageService, `users/${state.uid}/image`);
        const docRef = doc(dbService, 'userInfo', state.uid);
        await uploadString(imgRef, fileUrl, "data_url")
            .then(async () => {
                const downloadUrl = await getDownloadURL(imgRef)
                await updateDoc(docRef, {
                    photoUrl: downloadUrl,
                    id: userId,
                    name: userName,
                    email: userEmail
                });
            }).then(async () => {
                const docSnap = await getDoc(docRef);
                dispatch({
                    type: "UPDATE_USERINFO",
                    id: docSnap.data()?.id,
                    email: docSnap.data()?.email,
                    name: docSnap.data()?.name,
                    photoUrl: docSnap.data()?.photoUrl,
                })
            }).then(() => {
                alert("완료 되었습니다.")
                navigate('/')
            })
    }

    // user 정보 업데이트 (수정) without 프로필 사진
    const updateUserInfo = async (state, photoUrl, userName, userId, userEmail) => {
        const docRef = doc(dbService, 'userInfo', state.uid)
        await updateDoc(docRef, {
            photoUrl: photoUrl,
            id: userId,
            name: userName,
            email: userEmail
        }).then(async () => {
            const docSnap = await getDoc(docRef);
            dispatch({
                type: "UPDATE_USERINFO",
                id: docSnap.data()?.id,
                email: docSnap.data()?.email,
                name: docSnap.data()?.name,
                photoUrl: docSnap.data()?.photoUrl,
            })
        }).then(() => {
            alert("완료 되었습니다.")
            navigate('/')
        })
    }

    return (
        <AuthContext.Provider value={
            {
                state, dispatch, updateUserInfo,
                updateUserImg, getUserData, getAllUsersData
            }
        }>
            {children}
        </AuthContext.Provider>
    )

};
