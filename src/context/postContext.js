import { createContext, useContext, useReducer, useState } from "react";
import { postReducer } from "./postReducer";
import { dbService, storageService } from "../firebase/config"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { setDoc, doc, updateDoc, deleteDoc, collection, query, where, getDocs, getDoc } from 'firebase/firestore'

const PostContext = createContext();

export const usePostState = () => {
    return useContext(PostContext);
}

export const PostProvider = ({ children }) => {
    // Post 초기값 지정
    const init = {
        init: '',
        isModal: false,
        uploadPage: 1,
        posted: false,
        imageUrl: null,
        showImg: null,
        content: '',
    }

    // 이미지 업로드
    const uploadImg = async (fileUrl, state, content) => {
        const time = new Date().getTime();
        const imgRef = ref(storageService, `posts/${state.uid}${time}/image`);
        await uploadBytes(imgRef, fileUrl)
            .then(async () => {
                const downloadUrl = await getDownloadURL(imgRef)
                await setDoc(doc(dbService, "posts", `${state.uid}${time}`), {
                    username: state.id,
                    uid: state.uid,
                    photoUrl: state.photoUrl,
                    timestamp: time,
                    contents: content,
                    image: downloadUrl,
                    likes: [],
                    comments: [],
                }).then(() => {
                    postDispatch({ type: "POSTED" })
                    setTimeout(() => {
                        postDispatch({ type: "REMOVE_POSTED" });
                    }, 2000);
                })
            });
    }

    // userId에 해당하는 이미지 데이터 가져오기
    const getPostDataByUserId = async (userId) => {
        const postsRef = collection(dbService, "posts");
        const q = query(postsRef, where("username", "==", userId));
        const querySnapshot = await getDocs(q)
        const feed = [];
        querySnapshot.forEach(doc =>
            feed.push({
                id: doc.id,
                content: doc.data(),
            }))
        return feed;
    }

    // postId에 해당되는 이미지 데이터 가져오기
    const getPostDataByPostId = async (postId) => {
        const docRef = doc(dbService, "posts", postId);
        const docData = await getDoc(docRef);
        return docData.data();    
    }

    // post 제거
    const removePost = async (postId) => {
        await deleteDoc(doc(dbService, "posts", postId))
            .then(() => {
                const desertRef = ref(storageService, `posts/${postId}/image`);
                deleteObject(desertRef)
                postDispatch({ type: "REMOVE" });
                setTimeout(() => {
                    postDispatch({ type: "REMOVE_POSTED" });
                }, 2000);
            })
    }

    // post 관련 데이터 업데이트
    const updateComment = async (comments, postId) => {
        await updateDoc(doc(dbService, "posts", postId), {
            "comments": comments,
        })
    }

    const updateContent = async (content, postId) => {
        await updateDoc(doc(dbService, "posts", postId), {
            "contents": content,
        })
    }

    const updateLike = async (likes, postId) => {
        await updateDoc(doc(dbService, "posts", postId), {
            "likes": likes,
        })
    }

    // post 모달 관련 함수
    const onClose = () => {
        postDispatch({ type: "CLOSE_MODAL" });
        document.body.style.overflow = "unset";
    }

    const [postState, postDispatch] = useReducer(postReducer, init);

    return (
        <PostContext.Provider value={
            {
                postState, postDispatch, updateComment, updateLike, onClose, 
                uploadImg, removePost, updateContent, getPostDataByUserId, getPostDataByPostId
            }
        }>
            {children}
        </PostContext.Provider>
    )
}